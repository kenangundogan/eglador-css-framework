import fs from 'fs';
import { pathToFileURL } from 'url';
import { glob } from 'glob';
import pc from 'picocolors';

const configPath = pathToFileURL(`${process.cwd()}/eglador.config.js`).href;

let config;
try {
    config = await import(configPath);
} catch (err) {
    console.log(pc.red('Hata: ') + 'Config dosyası okunurken hata oluştu. ' + pc.red(configPath));
    process.exit(1);
}

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

    config.default.projects.forEach(project => {
        const classesFound = new Set();
        const files = glob.sync(project.contents);
        files.forEach(filePath => {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            let match;

            while ((match = classRegex.exec(fileContent)) !== null) {
                const classString = match[2];
                const classNames = splitClassNames(classString);
                classNames.forEach(className => {
                    if (className.trim()) {
                        classesFound.add(className.trim());
                    }
                });
            }
        });

        const sortedClasses = [...classesFound].sort();
        console.log(pc.blue(project.name) + ' için ' + sortedClasses.length + ' sınıf bulundu ' + pc.blue(project.input));
        projectClasses.push({ project, classes: sortedClasses });
    });

    return projectClasses;
}
