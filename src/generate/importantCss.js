import { escapeClassName } from '../utils/escapeClassName.js';

export function importantCss(important, allClasses) {
    const importantCss = important.map(className => {
        const baseClass = className.split('!')[1];
        console.log("baseClass", baseClass);
        if (allClasses[baseClass]) {
            console.log("baseClass", allClasses[baseClass]);
            return `.${escapeClassName(className)} { ${allClasses[baseClass]} }`;
        }
    });

    return importantCss.sort().join('\n');
}
