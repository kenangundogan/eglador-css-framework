import { cssObjectToString } from './../utils/cssObjectToString.js';
import { escapeClassName } from './../utils/escapeClassName.js';

export function generateDivideStyleClasses() {
    const divideClasses = {
        'divide-solid': { 'border-style': 'solid' },
        'divide-dashed': { 'border-style': 'dashed' },
        'divide-dotted': { 'border-style': 'dotted' },
        'divide-double': { 'border-style': 'double' },
        'divide-none': { 'border-style': 'none' },
    };

    return Object.entries(divideClasses)
        .map(([className, cssObj]) => {
            const escapedClassName = escapeClassName(className);
            return `.${escapedClassName} > * + * { ${cssObjectToString(cssObj)} }`;
        })
        .join('\n');
}
