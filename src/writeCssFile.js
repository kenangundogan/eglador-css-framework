import fs from 'fs';
import config from './eglador.config.js';
import { readCssFile } from './readCssFile.js';
import { extractClassesFromFiles } from './classExtractor.js';
import { generateResetCss } from './generateResetCss.js';
import { generateAllClasses } from './generateAllClasses.js';
import { generateBaseCss } from './baseCss.js';
import { generateResponsiveCss } from './responsiveCss.js';

// Tüm class'ları toplayıp CSS dosyasına yazan fonksiyon
export function writeCssFile() {
    // Dosyalardan kullanılan class'ları topla
    const extractedClasses = extractClassesFromFiles();

    // CSS reset dosyasını oluştur
    const resetCss = generateResetCss();

    // Tüm base class'ları al
    const allClasses = generateAllClasses();

    // Statik class'ları işleyelim
    const baseCss = generateBaseCss(extractedClasses, allClasses);

    // Media query class'larını işleyelim
    const responsiveCss = generateResponsiveCss(extractedClasses, allClasses);

    // CSS dosyasını belirtilen input dosyasını oku ve içeriğini al
    const inputCssContent = readCssFile();

    // CSS dosyasını belirlenen output dosyasına yaz
    fs.writeFileSync(config.output, `${resetCss}\n${baseCss}\n${responsiveCss}\n${inputCssContent}`);
    console.log(`CSS file generated successfully at ${config.output}`);
}
