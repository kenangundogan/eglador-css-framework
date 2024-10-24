#!/usr/bin/env node

import { createConfigFile } from './createConfigFile.js';
import './checkPackageJson.js';
import chokidar from 'chokidar';
import { exec } from 'child_process';
import { promisify } from 'util';
import { pathToFileURL } from 'url';
import { writeCssFile } from './write/writeCssFile.js';
import fg from 'fast-glob'; // fast-glob ile glob pattern'lerini genişleteceğiz

const execAsync = promisify(exec);
const args = process.argv.slice(2);

(async () => {
    if (args[0] === 'init') {
        createConfigFile();
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
                    }).on('add', (path) => {
                        console.log(`File ${path} has been added and is now being watched.`);
                    }).on('change', (path) => {
                        console.log(`File ${path} has been changed.`);
                    });
                } catch (err) {
                    console.error(`Error setting up watcher for project ${project.name}: ${err}`);
                }
            }
        }
    } else {
        // Run the main function from index.js for CSS compilation
        try {
            writeCssFile();
        } catch (err) {
            console.error('Error executing index.js:', err);
        }
    }
})();
