import { cssObjectToString } from '../utils/cssObjectToString.js';
import { escapeClassName } from '../utils/escapeClassName.js';

export function baseCss(base, allClasses) {
    const baseCss = base.map(className => {

        if (escapeClassName(className).startsWith('space-') || escapeClassName(className).startsWith('-space-')) {
            const cssObj = allClasses[className + ' > :not([hidden]) ~ :not([hidden])'];
            return `.${escapeClassName(className)} > :not([hidden]) ~ :not([hidden]) { ${cssObjectToString(cssObj)} }`;
        }

        if (escapeClassName(className).startsWith('divide-x') || escapeClassName(className).startsWith('divide-y') || escapeClassName(className).startsWith('-divide-x') || escapeClassName(className).startsWith('-divide-y')) {
            const cssObj = allClasses[className + ' > :not([hidden]) ~ :not([hidden])'];
            return `.${escapeClassName(className)} > :not([hidden]) ~ :not([hidden]) { ${cssObjectToString(cssObj)} }`;
        }

        if (allClasses[className]) {
            return `.${escapeClassName(className)} { ${allClasses[className]} }`;
        }
    });

    return baseCss.sort().join('\n');
}
