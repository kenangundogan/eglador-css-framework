import fs from 'fs';
import pc from 'picocolors';
export function readCssFile(project) {
    const cssContent = fs.readFileSync(project.input, 'utf8');
    if (!cssContent) {
        console.log(pc.red('Hata: ') + 'CSS dosyası okunurken hata oluştu ' + pc.red(project.input));
        return '';
    }
    return cssContent;
}
