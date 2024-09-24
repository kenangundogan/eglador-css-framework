import fs from 'fs';
import { extractClassesFromFiles } from './classExtractor.js';
import { generateAllBaseClasses } from './generateProperties.js';
import { generateBaseCss } from './baseCss.js';
import { generateResponsiveCss } from './responsiveCss.js';
import config from './eglador.config.js'; // Config dosyasını yükle

// Tüm class'ları toplayıp CSS dosyasına yazan fonksiyon
export function writeCssFile() {
    // Dosyalardan kullanılan class'ları topla
    const classes = extractClassesFromFiles();

    // Tüm base class'ları al
    const baseClasses = generateAllBaseClasses();

    // Statik class'ları işleyelim
    const baseCss = generateBaseCss(classes, baseClasses);

    // Media query class'larını işleyelim
    const responsiveCss = generateResponsiveCss(classes, baseClasses);

    // CSS dosyasını belirlenen output dosyasına yaz
    fs.writeFileSync(config.output, `${baseCss}\n${responsiveCss}`);
    console.log(`CSS file generated successfully at ${config.output}`);
}
