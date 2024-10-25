#!/usr/bin/env node

import { createConfigFile } from './createConfigFile.js';
import './checkPackageJson.js';
import chokidar from 'chokidar';
import { exec } from 'child_process';
import { promisify } from 'util';
import { pathToFileURL } from 'url';
import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);
const args = process.argv.slice(2);
console.log(args);

function getImportedFiles(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const importRegex = /@import\s+['"]([^'"\s]+)['"]/g;
    let match;
    const importedFiles = [];

    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        const resolvedPath = path.resolve(path.dirname(filePath), importPath);
        importedFiles.push(resolvedPath);
        // Recursively get imported files
        importedFiles.push(...getImportedFiles(resolvedPath));
    }

    return importedFiles;
}

(async () => {
    if (args[0] === 'init') {
        await createConfigFile();
    } else if (args[0] === '--watch') {
        const configPath = pathToFileURL(`${process.cwd()}/eglador.config.js`).href;
        let config;

        try {
            config = await import(configPath);
        } catch (err) {
            console.error('Error loading eglador.config.js:', err);
            return;
        }

        if (config) {
            const projects = config.default.projects;

            // Generate initial CSS output for all projects
            for (const project of projects) {
                const startTime = Date.now();
                try {
                    await execAsync(`npx eglador -i ${project.input} -o ${project.output}`);
                    const duration = Date.now() - startTime;
                    console.log('\x1b[32m%s\x1b[0m', `${project.name} - Initial CSS generated in ${duration} ms.`);
                } catch (err) {
                    console.error(`Error in Project ${project.name}: ${err.stderr || err}`);
                }
            }

            // Set up file watchers for all projects
            for (const project of projects) {
                try {
                    // Glob pattern'lerini fast-glob ile genişletiyoruz
                    let filesToWatch = await fg(project.contents);
                    filesToWatch.push(project.input); // Add the input CSS file to be watched as well

                    // Add imported files from input CSS
                    filesToWatch.push(...getImportedFiles(project.input));

                    console.log(`Watching ${project.name} for changes...`);

                    const watcher = chokidar.watch(filesToWatch, {
                        persistent: true,
                        usePolling: true, // Daha güvenilir izleme için polling modunu kullanıyoruz
                        ignoreInitial: false,
                        awaitWriteFinish: {
                            stabilityThreshold: 500,
                            pollInterval: 100
                        }
                    });

                    watcher.on('change', async (filePath) => {
                        const startTime = Date.now();
                        try {
                            // Update filesToWatch with newly imported files if any
                            filesToWatch = await fg(project.contents);
                            filesToWatch.push(project.input);
                            filesToWatch.push(...getImportedFiles(project.input));
                            watcher.add(filesToWatch);

                            await execAsync(`npx eglador -i ${project.input} -o ${project.output}`);
                            const duration = Date.now() - startTime;
                            console.log('\x1b[32m%s\x1b[0m', `${project.name} - CSS has been regenerated in ${duration} ms.`);
                        } catch (err) {
                            console.error(`Error in Project ${project.name}: ${err.stderr || err}`);
                        }
                    }).on('add', async (filePath) => {
                        console.log(`File ${filePath} has been added.`);
                        // Update watcher to include new files matching project.contents
                        filesToWatch = await fg(project.contents);
                        filesToWatch.push(project.input);
                        filesToWatch.push(...getImportedFiles(project.input));
                        watcher.add(filesToWatch);
                    }).on('unlink', (filePath) => {
                        console.log(`File ${filePath} has been removed.`);
                    }).on('addDir', (filePath) => {
                        console.log(`Directory ${filePath} has been added`);
                    }).on('unlinkDir', (filePath) => {
                        console.log(`Directory ${filePath} has been removed`);
                    }).on('error', (error) => {
                        console.error(`Watcher error: ${error}`);
                    }).on('ready', () => {
                        console.log('Initial scan complete. Ready for changes.');
                    });
                } catch (err) {
                    console.error(`Error setting up watcher for project ${project.name}: ${err}`);
                }
            }
        }
    } else {
        try {
            const { writeCssFile } = await import('./write/writeCssFile.js');
            writeCssFile();
        } catch (err) {
            console.error('Error executing index.js:', err);
        }
    }
})();
