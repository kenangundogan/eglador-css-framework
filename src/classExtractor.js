import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const glob = require('glob');
import config from './eglador.config.js';

const classRegex = /class=(["'])([\s\S]*?)\1/g;

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

export function extractClassesFromFiles() {
    const projectClasses = [];

    config.projects.forEach(project => {
        const classesFound = new Set();
        const files = glob.sync(project.contents); // Dosya desenlerini eşleştir ve dosya yollarını al
        files.forEach(filePath => {
            const fileContent = fs.readFileSync(filePath, 'utf8'); // Dosya içeriğini oku
            let match;

            // class özniteliklerini yakala
            while ((match = classRegex.exec(fileContent)) !== null) {
                const classString = match[2]; // class özniteliğinin değerini al
                const classNames = splitClassNames(classString); // Sınıf adlarını ayır
                classNames.forEach(className => {
                    if (className.trim()) {
                        classesFound.add(className.trim()); // Sınıf adını set'e ekle
                    }
                });
            }
        });

        // Bulunan sınıf adlarını alfabetik olarak sırala ve proje sınıflarına ekle
        const sortedClasses = [...classesFound].sort();
        projectClasses.push({ project, classes: sortedClasses });
    });

    return projectClasses; // Her proje için bulunan sıralanmış sınıf adlarını döndür
}
