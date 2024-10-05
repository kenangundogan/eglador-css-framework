import { escapeClassName } from '../utils/escapeClassName.js';
import { prefixToPropertyMap } from './../properties/prefixToPropertyMap.js';
import { formatMathExpressions } from '../utils/formatMathExpressions.js';

export function importantCss(important, allClasses) {
    return important
        .map(className => {
            const baseClass = className.split('!')[1];

            if (baseClass.includes('[') && baseClass.includes(']')) {
                const match = baseClass.match(/([a-zA-Z-]+)\[(.+)\]/);
                if (match) {
                    const prefix = match[1].replace(/^-|-$/g, '');
                    let value = match[2];

                    if (prefixToPropertyMap[prefix]) {
                        const cssProperty = prefixToPropertyMap[prefix];
                        value = formatMathExpressions(value);
                        const cssRule = `${cssProperty}: ${value}`;
                        return `.${escapeClassName(className)} { ${cssRule} !important; }`;
                    }
                }
            }

            if (allClasses[baseClass]) {
                const cssRule = allClasses[baseClass].replace(/;/g, '');
                return `.${escapeClassName(className)} { ${cssRule} !important; }`;
            }

            return null;
        })
        .filter(Boolean) // Gereksiz null değerleri temizle
        .sort()
        .join('\n');
}
