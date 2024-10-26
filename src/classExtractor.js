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

const classRegex = /(?:class(?:Name)?\s*=\s*|classList\.add\s*\(|(?:const|let|var)\s+\w+\s*=\s*)(["'`])([\s\S]*?)\1/g;

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

export async function extractClassesFromFiles() {
    const projectClasses = [];

    for (const project of config.default.projects) {
        const classesFound = new Set();
        const files = glob.sync(project.contents);

        for (const filePath of files) {
            try {
                const fileContent = await fs.promises.readFile(filePath, 'utf8');
                let match;

                while ((match = classRegex.exec(fileContent)) !== null) {
                    const classString = match[2];
                    if (classString) {
                        const classNames = splitClassNames(classString);
                        classNames.forEach(className => {
                            if (className.trim()) {
                                classesFound.add(className.trim());
                            }
                        });
                    }
                }
            } catch (err) {
                console.log(pc.red('Hata: ') + `Dosya okunurken hata oluştu: ${filePath}`);
            }
        }

        const sortedClasses = [...classesFound].sort();
        console.log(pc.blue(project.name) + ' için ' + sortedClasses.length + ' sınıf bulundu. ' + pc.blue(project.input));
        projectClasses.push({ project, classes: sortedClasses });
    }

    return projectClasses;
}
