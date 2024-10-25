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
import pc from 'picocolors';

const execAsync = promisify(exec);
const args = process.argv.slice(2);
console.log(pc.blue('Arguments:'), args);

function getImportedFiles(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const importRegex = /@import\s+['"]([^'"\s]+)['"]/g;
    let match;
    const importedFiles = [];

    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        const resolvedPath = path.resolve(path.dirname(filePath), importPath);
        importedFiles.push(resolvedPath);
        // İçeri aktarılan dosyaları özyinelemeli olarak al
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
            console.error(pc.red('eglador.config.js yüklenirken hata oluştu:'), err);
            return;
        }

        if (config) {
            const projects = config.default.projects;

            // Tüm projeler için başlangıçta CSS çıktısını üret
            for (const project of projects) {
                const startTime = Date.now();
                try {
                    await execAsync(`npx eglador -i ${project.input} -o ${project.output}`);
                    const duration = Date.now() - startTime;
                    console.log(pc.green(`\n${project.name} - İlk CSS ${duration} ms içinde oluşturuldu.`));
                } catch (err) {
                    console.error(pc.red(`Proje ${project.name} içinde hata:`), err.stderr || err);
                }
            }

            // Tüm projeler için dosya izleyicilerini ayarla
            for (const project of projects) {
                try {
                    // Glob desenlerini fast-glob ile genişletiyoruz
                    let filesToWatch = await fg(project.contents);
                    filesToWatch.push(project.input); // İzlenecek dosyalar listesine giriş CSS dosyasını da ekle

                    // Giriş CSS dosyasından içeri aktarılan dosyaları ekle
                    filesToWatch.push(...getImportedFiles(project.input));

                    console.log(pc.blue(`Proje ${project.name} için değişiklikler izleniyor...`));

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
                            // Yeni içeri aktarılan dosyalar varsa filesToWatch'u güncelle
                            filesToWatch = await fg(project.contents);
                            filesToWatch.push(project.input);
                            filesToWatch.push(...getImportedFiles(project.input));
                            watcher.add(filesToWatch);

                            await execAsync(`npx eglador -i ${project.input} -o ${project.output}`);
                            const duration = Date.now() - startTime;
                            console.log(pc.green(`\n${project.name} - CSS ${duration} ms içinde yeniden oluşturuldu.`));
                        } catch (err) {
                            console.error(pc.red(`Proje ${project.name} içinde hata:`), err.stderr || err);
                        }
                    }).on('add', async (filePath) => {
                        console.log(pc.yellow(`Dosya ${filePath} eklendi.`));
                        // İzleyiciyi, project.contents ile eşleşen yeni dosyaları içerecek şekilde güncelle
                        filesToWatch = await fg(project.contents);
                        filesToWatch.push(project.input);
                        filesToWatch.push(...getImportedFiles(project.input));
                        watcher.add(filesToWatch);
                    }).on('unlink', (filePath) => {
                        console.log(pc.yellow(`Dosya ${filePath} kaldırıldı.`));
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
            const { writeCssFile } = await import('./write/writeCssFile.js');
            writeCssFile();
        } catch (err) {
            console.error(pc.red('index.js çalıştırılırken hata:'), err);
        }
    }
})();
