import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const glob = require('glob');
import config from './eglador.config.js';

// Gelişmiş regex: class attribute'unu ve içeriğini yakalar
const classRegex = /class=(["'])([\s\S]*?)\1/g;  // [^]* yerine [\s\S]* kullanarak her türlü karakteri kapsar


// Sınıf adlarını ayıran fonksiyon
function splitClassNames(classString) {
    const classNames = [];
    let current = '';
    let bracketDepth = 0;
    let inSingleQuote = false;
    let inDoubleQuote = false;

    for (let i = 0; i < classString.length; i++) {
        const char = classString[i];
        if (char === ' ' && bracketDepth === 0 && !inSingleQuote && !inDoubleQuote) {
            if (current.length > 0) {
                classNames.push(current);
                current = '';
            }
        } else {
            current += char;
            if (char === '[' && !inSingleQuote && !inDoubleQuote) {
                bracketDepth++;
            } else if (char === ']' && !inSingleQuote && !inDoubleQuote) {
                bracketDepth--;
            } else if (char === "'" && !inDoubleQuote) {
                inSingleQuote = !inSingleQuote;
            } else if (char === '"' && !inSingleQuote) {
                inDoubleQuote = !inDoubleQuote;
            }
        }
    }
    if (current.length > 0) {
        classNames.push(current);
    }
    return classNames;
}

// Class'ları tarayıp toplama
export function extractClassesFromFiles() {
    const classesFound = new Set();

    // Belirtilen dosya yollarını tara
    config.contents.forEach(content => {
        const files = glob.sync(content);
        files.forEach(filePath => {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            let match;

            // class attribute'larını yakala
            while ((match = classRegex.exec(fileContent)) !== null) {
                const classString = match[2]; // Attribute değerini al
                const classNames = splitClassNames(classString); // Sınıf adlarını ayır
                classNames.forEach(className => {
                    if (className.trim()) {
                        classesFound.add(className.trim());
                    }
                });
            }
        });
    });

    return [...classesFound];
}
