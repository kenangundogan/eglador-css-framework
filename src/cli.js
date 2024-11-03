#!/usr/bin/env node

import chokidar from 'chokidar';
import fg from 'fast-glob';
import pc from 'picocolors';
import './checkPackageJson.js';
import { checkConfigFile } from './checkConfigFile.js';
import { loadConfigFile } from './loadConfigFile.js';
import { writeCssFile } from './writeCssFile.js';

const args = process.argv.slice(2);
console.log(pc.blue('Arguments:'), args);

async function handleInit() {
    checkConfigFile();
}

async function getConfigFileProjects() {
    const config = await loadConfigFile();
    if (!config) return;
    const projects = config.default.projects;
    return projects;
}

async function handleDefault() {
    for (const project of await getConfigFileProjects()) {
        const startTime = Date.now();
        await writeCssFile(project);
        const duration = Date.now() - startTime;
        console.log(`${pc.blue(project.name)} ${pc.green('[Başarılı:]')} CSS ${duration} ms içinde oluşturuldu.`);
    }
}

async function handleWatch() {

    await handleDefault();

    for (const project of await getConfigFileProjects()) {
        try {
            let filesToWatch = await fg(project.contents, {
                onlyFiles: true,
                unique: true
            });

            console.log(pc.blue(`Proje ${project.name} için değişiklikler izleniyor...`));

            const watcher = chokidar.watch(filesToWatch, {
                persistent: true,
                ignoreInitial: true,
                usePolling: true,
                interval: 10,
                binaryInterval: 10,
                awaitWriteFinish: {
                    stabilityThreshold: 50,
                    pollInterval: 10
                },
                ignorePermissionErrors: false,
                atomic: true
            });

            watcher.on('all', async (event, filePath) => {
                console.log(pc.yellow(`Değişiklik tespit edildi: ${event} - ${filePath}`));
                const startTime = Date.now();
                try {
                    const newFilesToWatch = await fg(project.contents, {
                        onlyFiles: true,
                        unique: true
                    });

                    newFilesToWatch.forEach(file => {
                        if (!filesToWatch.includes(file)) {
                            watcher.add(file);
                            filesToWatch.push(file);
                        }
                    });
                    await writeCssFile(project);
                    const duration = Date.now() - startTime;
                    console.log(`${pc.blue(project.name)} ${pc.green('[Başarılı:]')} CSS ${duration} ms içinde oluşturuldu.`);
                } catch (err) {
                    console.error(pc.red(`Proje ${project.name} içinde hata:`), err);
                }
            }).on('error', (error) => {
                console.error(pc.red(`İzleyici hatası:`), error);
            });
        } catch (err) {
            console.error(pc.red(`Proje ${project.name} için izleyici ayarlanırken hata:`), err);
        }
    }
}

(async () => {
    if (args[0] === 'init') {
        await handleInit();
    } else if (args[0] === '--watch') {
        await handleWatch();
    } else if (!args[0]) {
        await handleDefault();
    } else {
        console.log(pc.red('Geçersiz komut.'));
    }
})();
