import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const glob = require('glob');
import config from './eglador.config.js';

// const classRegex = /['"`]([\w:-\s]+)['"`]/g;
const classRegex = /class=["'`]([:\w\s\/%.-]+)["'`]/g;

// Class'ları tarayıp toplama
export function extractClassesFromFiles(allClasses) {
    const classesFound = new Set();

    // Belirtilen dosya yollarını tara
    config.contents.forEach(content => {
        const files = glob.sync(content);
        files.forEach(filePath => {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            let match;
            while ((match = classRegex.exec(fileContent)) !== null) {
                const classNames = match[1].split(/\s+/);
                classNames.forEach(className => {
                    if (className.trim()) {
                        classesFound.add(className);
                    }
                });
            }
        });
    });
    console.log('classesFound', classesFound);

    return [...classesFound];
}
