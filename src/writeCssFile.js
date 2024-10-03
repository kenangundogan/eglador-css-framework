import fs from 'fs';
import config from './eglador.config.js';
import { readCssFile } from './readCssFile.js';
import { extractClassesFromFiles } from './classExtractor.js';
import { generateCustomClass } from './generateCustomClass.js';
import { generateRootDefinationClasses } from './properties/rootDefination.js';
import { generateResetCss } from './generateResetCss.js';
import { generateAllClasses } from './generateAllClasses.js';
import { generateBaseCss } from './baseCss.js';
import { generateResponsiveCss } from './generateResponsiveCss.js';
import { generateSelectorCss } from './selectorCss.js';
import { groupClasses } from './classGroups.js';

// Tüm class'ları toplayıp CSS dosyasına yazan fonksiyon
export function writeCssFile() {

    // Root defination class'larını oluştur
    const rootDefinationCss = generateRootDefinationClasses();

    // CSS reset dosyasını oluştur
    const resetCss = generateResetCss();

    // Tüm base class'ları al
    const allClasses = generateAllClasses();

    // Dosyalardan kullanılan class'ları topla
    const extractedClasses = extractClassesFromFiles();

    // Class'ları grupla
    const groupedClasses = groupClasses(extractedClasses);
    console.log(groupedClasses);

    // Custom class'ları işleyelim
    // const customCss = generateCustomClass(extractedClasses);

    // Statik class'ları işleyelim
    const baseCss = generateBaseCss(groupedClasses.base, allClasses);

    // Media query class'larını işleyelim
    const responsiveCss = generateResponsiveCss(groupedClasses.responsive, allClasses);

    // Tüm selector class'ları işleyelim
    // const selectorCss = generateSelectorCss(extractedClasses, allClasses);

    // CSS dosyasını belirtilen input dosyasını oku ve içeriğini al
    const inputCssContent = readCssFile();

    // CSS dosyasını belirlenen output dosyasına yaz
    fs.writeFileSync(config.output, `${rootDefinationCss}\n${resetCss}\n${baseCss}\n${responsiveCss}\n${inputCssContent}`);
    console.log(`CSS file generated successfully at ${config.output}`);
}
