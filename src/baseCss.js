import { cssObjectToString } from './utils/cssObjectToString.js';
import { escapeClassName } from './utils/escapeClassName.js';

export function generateBaseCss(base, allClasses) {
    const baseCss = base.map(className => {
        if (className.startsWith('space-') || className.startsWith('-space-')) {
            const cssObj = allClasses[className + ' > :not([hidden]) ~ :not([hidden])'];
            return `.${escapeClassName(className)} > :not([hidden]) ~ :not([hidden]) { ${cssObjectToString(cssObj)} }`;
        }

        if (className.startsWith('divide-x') || className.startsWith('divide-y') || className.startsWith('-divide-x') || className.startsWith('-divide-y')) {
            const cssObj = allClasses[className + ' > :not([hidden]) ~ :not([hidden])'];
            return `.${escapeClassName(className)} > :not([hidden]) ~ :not([hidden]) { ${cssObjectToString(cssObj)} }`;
        }

        if (allClasses[className]) {
            return `.${escapeClassName(className)} { ${allClasses[className]} }`;
        }
    });

    return baseCss.sort().join('\n');
}
