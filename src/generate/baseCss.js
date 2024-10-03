import { cssObjectToString } from '../utils/cssObjectToString.js';

export function baseCss(base, allClasses) {
    const baseCss = base.map(className => {
        const escapedClassName = className.replace(/\//g, '\\/').replace(/\./g, '\\.');

        if (escapedClassName.startsWith('space-') || escapedClassName.startsWith('-space-')) {
            const cssObj = allClasses[className + ' > :not([hidden]) ~ :not([hidden])'];
            return `.${escapedClassName} > :not([hidden]) ~ :not([hidden]) { ${cssObjectToString(cssObj)} }`;
        }

        if (escapedClassName.startsWith('divide-x') || escapedClassName.startsWith('divide-y') || escapedClassName.startsWith('-divide-x') || escapedClassName.startsWith('-divide-y')) {
            const cssObj = allClasses[className + ' > :not([hidden]) ~ :not([hidden])'];
            return `.${escapedClassName} > :not([hidden]) ~ :not([hidden]) { ${cssObjectToString(cssObj)} }`;
        }

        if (allClasses[className]) {
            return `.${escapedClassName} { ${allClasses[className]} }`;
        }
    });

    return baseCss.sort().join('\n');
}
