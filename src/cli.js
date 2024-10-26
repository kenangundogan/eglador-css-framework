#!/usr/bin/env node

import { checkConfigFile } from './checkConfigFile.js';
import './checkPackageJson.js';
import chokidar from 'chokidar';
import { exec } from 'child_process';
import { promisify } from 'util';
import { pathToFileURL } from 'url';
import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';
import pc from 'picocolors';

const execAsync = promisify(exec);
const args = process.argv.slice(2);
console.log(pc.blue('Arguments:'), args);

function getImportedFiles(filePath, visitedFiles = new Set()) {
    if (visitedFiles.has(filePath)) return [];  // Tekrar okuma yapılmıyor
    visitedFiles.add(filePath);

    const content = fs.readFileSync(filePath, 'utf8');
    const importRegex = /@import\s+['"]([^'"\s]+)['"]/g;
    let match;
    const importedFiles = [];

    while ((match = importRegex.exec(content)) !== null) {
        const importPath = path.resolve(path.dirname(filePath), match[1]);
        importedFiles.push(importPath);
        importedFiles.push(...getImportedFiles(importPath, visitedFiles));
    }

    return importedFiles;
}

(async () => {
    if (args[0] === 'init') {
        await checkConfigFile();
    } else if (args[0] === '--watch') {
        const configPath = pathToFileURL(`${process.cwd()}/eglador.config.js`).href;
        let config;

        try {
            config = await import(configPath);
        } catch (err) {
            console.error(pc.red('eglador.config.js yüklenirken hata oluştu:'), err);
            return;
        }

        if (config) {
            const projects = config.default.projects;

            // Paralel çalıştırmak için Promise.all
            await Promise.all(projects.map(async (project) => {
                const startTime = Date.now();
                try {
                    await execAsync(`npx eglador -i ${project.input} -o ${project.output}`);
                    const duration = Date.now() - startTime;
                    console.log(pc.green(`\n${project.name} - İlk CSS ${duration} ms içinde oluşturuldu.`));
                } catch (err) {
                    console.error(pc.red(`Proje ${project.name} içinde hata:`), err.stderr || err);
                }
            }));

            // Tüm projeler için dosya izleyicilerini ayarla
            for (const project of projects) {
                try {
                    // Glob desenlerini fast-glob ile genişletiyoruz ve benzersiz dosya listesini oluşturuyoruz
                    let filesToWatch = await fg(project.contents, {
                        onlyFiles: true,
                        unique: true
                    });
                    filesToWatch.push(project.input);
                    filesToWatch.push(...getImportedFiles(project.input));

                    console.log(pc.blue(`Proje ${project.name} için değişiklikler izleniyor...`));

                    const watcher = chokidar.watch(filesToWatch, {
                        persistent: true,
                        usePolling: true,
                        ignoreInitial: false,
                        awaitWriteFinish: {
                            stabilityThreshold: 50, // Performans ayarı
                            pollInterval: 10 // Hızlı algılama için
                        }
                    });

                    watcher.on('change', async (filePath) => {
                        const startTime = Date.now();
                        try {
                            // Yeni içeri aktarılan dosyalar varsa filesToWatch'u güncelle
                            const newFilesToWatch = await fg(project.contents, {
                                onlyFiles: true,
                                unique: true
                            });
                            newFilesToWatch.push(project.input);
                            newFilesToWatch.push(...getImportedFiles(project.input));

                            // Sadece yeni dosyaları ekleyerek belleği optimize ediyoruz
                            newFilesToWatch.forEach(file => {
                                if (!filesToWatch.includes(file)) {
                                    watcher.add(file);
                                    filesToWatch.push(file);
                                }
                            });

                            await execAsync(`npx eglador -i ${project.input} -o ${project.output}`);
                            const duration = Date.now() - startTime;
                            console.log(pc.green(`\n${project.name} - CSS ${duration} ms içinde yeniden oluşturuldu.`));
                        } catch (err) {
                            console.error(pc.red(`Proje ${project.name} içinde hata:`), err.stderr || err);
                        }
                    }).on('add', async (filePath) => {
                        if (!filesToWatch.includes(filePath)) {
                            console.log(pc.yellow(`Dosya ${filePath} eklendi.`));
                            filesToWatch.push(filePath);
                            watcher.add(filePath);
                        }
                    }).on('unlink', (filePath) => {
                        console.log(pc.yellow(`Dosya ${filePath} kaldırıldı.`));
                        filesToWatch = filesToWatch.filter(f => f !== filePath);
                        watcher.unwatch(filePath);
                    }).on('addDir', (filePath) => {
                        console.log(pc.yellow(`Dizin ${filePath} eklendi`));
                    }).on('unlinkDir', (filePath) => {
                        console.log(pc.yellow(`Dizin ${filePath} kaldırıldı`));
                    }).on('error', (error) => {
                        console.error(pc.red(`İzleyici hatası:`), error);
                    }).on('ready', () => {
                        console.log(pc.blue('İlk tarama tamamlandı. Değişiklikler için hazır.'));
                    });
                } catch (err) {
                    console.error(pc.red(`Proje ${project.name} için izleyici ayarlanırken hata:`), err);
                }
            }
        }
    } else {
        try {
            const { writeCssFile } = await import('./index.js');
            writeCssFile();
        } catch (err) {
            console.error(pc.red('index.js çalıştırılırken hata:'), err);
        }
    }
})();
