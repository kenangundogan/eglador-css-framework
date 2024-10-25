#!/usr/bin/env node

import { createConfigFile } from './createConfigFile.js';
import './checkPackageJson.js';
import chokidar from 'chokidar';
import { exec } from 'child_process';
import { promisify } from 'util';
import { pathToFileURL } from 'url';
import fg from 'fast-glob';

const execAsync = promisify(exec);
const args = process.argv.slice(2);
console.log(args);

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

                    console.log(`Watching ${project.name} for changes...`);

                    chokidar.watch(filesToWatch, {
                        persistent: true,
                        usePolling: true, // Daha güvenilir izleme için polling modunu kullanıyoruz
                        ignoreInitial: false,
                        awaitWriteFinish: {
                            stabilityThreshold: 500,
                            pollInterval: 100
                        }
                    }).on('change', async (path) => {
                        const startTime = Date.now();
                        try {
                            await execAsync(`npx eglador -i ${project.input} -o ${project.output}`);
                            const duration = Date.now() - startTime;
                            console.log('\x1b[32m%s\x1b[0m', `${project.name} - CSS has been regenerated in ${duration} ms.`);
                        } catch (err) {
                            console.error(`Error in Project ${project.name}: ${err.stderr || err}`);
                        }
                    }).on('add', (path) => { console.log(`File ${path} has been added.`) })
                        .on('change', (path) => { console.log(`File ${path} has been changed.`) })
                        .on('unlink', (path) => { console.log(`File ${path} has been removed.`) })
                        .on('addDir', (path) => { console.log(`Directory ${path} has been added`) })
                        .on('unlinkDir', (path) => { console.log(`Directory ${path} has been removed`) })
                        .on('error', (error) => { console.error(`Watcher error: ${error}`) })
                        .on('ready', () => { console.log('Initial scan complete. Ready for changes.') });
                        // .on('raw', (event, path, details) => {console.log('Raw event info:', event, path, details)});
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
