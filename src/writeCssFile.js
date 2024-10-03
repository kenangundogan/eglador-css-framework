import fs from 'fs';
import config from './eglador.config.js';
import { readCssFile } from './readCssFile.js';
import { extractClassesFromFiles } from './classExtractor.js';
import { rootDefinationCss } from './properties/rootDefination.js';
import { resetCss } from './generate/resetCss.js';
import { generateAllClasses } from './generateAllClasses.js';
import { baseCss } from './generate/baseCss.js';
import { responsiveCss } from './generate/responsiveCss.js';
import { customCss } from './generate/customCss.js';
import { generateSelectorCss } from './selectorCss.js';
import { groupClasses } from './classGroups.js';

// Tüm class'ları toplayıp CSS dosyasına yazan fonksiyon
export function writeCssFile() {

    // Root defination class'larını oluştur
    const rootDefinationCssResult = rootDefinationCss();

    // CSS reset dosyasını oluştur
    const resetCssResult = resetCss();

    // Tüm base class'ları al
    const allClasses = generateAllClasses();

    // Dosyalardan kullanılan class'ları topla
    const extractedClasses = extractClassesFromFiles();

    // Class'ları grupla
    const groupedClasses = groupClasses(extractedClasses);
    console.log(groupedClasses);

    // Custom class'ları işleyelim
    const customCssResult = customCss(extractedClasses);

    // Statik class'ları işleyelim
    const baseCssResult = baseCss(groupedClasses.base, allClasses);

    // Media query class'larını işleyelim
    const responsiveCssResult = responsiveCss(groupedClasses.responsive, allClasses);

    // Tüm selector class'ları işleyelim
    // const selectorCss = generateSelectorCss(extractedClasses, allClasses);

    // CSS dosyasını belirtilen input dosyasını oku ve içeriğini al
    const inputCssContent = readCssFile();

    // CSS dosyasını belirlenen output dosyasına yaz
    fs.writeFileSync(config.output, `${rootDefinationCssResult}\n${resetCssResult}\n${baseCssResult}\n${customCssResult}\n${responsiveCssResult}\n${inputCssContent}`);
    console.log(`CSS file generated successfully at ${config.output}`);
}
