import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const glob = require('glob');
import config from './eglador.config.js';

// Herhangi bir yerde geçen kelimeleri yakalayan geniş regex, solunda/sağında ", ', ` zorunlu, boşlukla ayrılan class'lar
const classRegex = /['"`]([\w:-\s]+)['"`]/g; // Class isimlerini yakalayan regex

// Class'ları tarayıp toplama
export function extractClassesFromFiles() {
    const allClasses = new Set();

    // Belirtilen dosya yollarını tara
    config.paths.forEach(path => {
        const files = glob.sync(path);
        files.forEach(filePath => {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            let match;
            while ((match = classRegex.exec(fileContent)) !== null) {
                const classNames = match[1].split(/\s+/); // Class isimlerini boşluklardan ayır
                classNames.forEach(className => {
                    if (className) {
                        allClasses.add(className); // Her bir class'ı set'e ekle
                    }
                });
            }
        });
    });
    console.log(allClasses);

    return [...allClasses];
}
