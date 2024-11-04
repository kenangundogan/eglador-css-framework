import { pathToFileURL } from 'url';
import fs from 'fs';
import pc from 'picocolors';
import { getImportedFiles } from './getCssImportedFiles.js';

export async function loadConfigFile() {
    const configPath = pathToFileURL(`${process.cwd()}/eglador.config.js`).href;
    let config;

    try {
        config = await import(configPath);
    } catch (err) {
        console.error(pc.red('eglador.config.js dosyası bulunamadı.'));
        console.log(pc.yellow('eglador.config.js dosyasını oluşturmak için'), pc.green('npx eglador init'), pc.yellow('komutunu çalıştırın.'));
        return null;
    }

    const validProjects = config.default.projects.filter(project => {
        const hasRequiredKeys = project.name && project.contents && project.input && project.output;
        const hasValidContents = Array.isArray(project.contents) && project.contents.length > 0;
        const inputFileExists = fs.existsSync(project.input);

        if (!hasRequiredKeys) {
            console.error(pc.red(`Proje ${project.name || 'isimsiz'} geçersiz: Gerekli anahtarlar eksik.`));
            return false;
        }

        if (!hasValidContents) {
            console.error(pc.red(`Proje ${project.name} geçersiz: 'contents' anahtarı geçersiz veya boş.`));
            return false;
        }

        if (!inputFileExists) {
            console.error(pc.red(`Proje ${project.name} geçersiz: 'input' dosya yolu bulunamadı (${project.input}).`));
            return false;
        }
        project.contents.push(project.input);
        project.contents.push(...getImportedFiles(project.input));
        return true;
    });

    if (validProjects.length === 0) {
        console.error(pc.red('Geçerli proje bulunamadı. Lütfen eglador.config.js dosyasını kontrol edin.'));
        return null;
    }

    config.default.projects = validProjects;
    return config;
}
