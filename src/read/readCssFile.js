import fs from 'fs';
import pc from 'picocolors';

export function readCssFile(project) {
    try {
        const cssContent = fs.readFileSync(project.input, 'utf8');
        console.log(`${pc.blue(project.name)} ${pc.green('[Başarılı:]')} ${pc.blue(project.input)} dosyası okundu.`);
        return cssContent;
    } catch (error) {
        console.log(`${pc.blue(project.name)} ${pc.red('[Hata:]')} ${pc.blue(project.input)} dosyası okunurken bir hata oluştu.`);
        return false;
    }
}
