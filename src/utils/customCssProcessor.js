import { escapeClassName } from '../utils/escapeClassName.js';
import { prefixToPropertyMap } from '../properties/_prefixToPropertyMap.js';
import { formatMathExpressions } from '../utils/formatMathExpressions.js';

// Custom sınıf işleme fonksiyonu
export function processCustomClass(className) {
    if (className.includes('[') && className.includes(']')) {
        const match = className.match(/([a-zA-Z-]+)\[(.+)\]/);
        if (match) {
            const originalPrefix = match[1];
            const isNegative = originalPrefix.startsWith('-');
            const prefix = originalPrefix.replace(/^-|-$/g, '');
            let value = match[2];

            if (prefixToPropertyMap[prefix]) {
                const cssProperty = prefixToPropertyMap[prefix];
                value = formatMathExpressions(value);

                // Burada '_' karakterlerini boşluklarla değiştiriyoruz
                value = value.replace(/_/g, ' ');

                // Eğer sınıf negatifse, değerin başına '-' ekliyoruz
                if (isNegative) {
                    value = `-${value}`;
                }

                // Eğer cssProperty bir dizi ise, her bir özelliği işleyelim
                if (Array.isArray(cssProperty)) {
                    let arrayTotal = "";
                    cssProperty.forEach((prop) => {
                        arrayTotal += `${prop}: ${value};`;
                    });

                    const result = `.${escapeClassName(className)} { ${arrayTotal} }`;
                    return result;
                }

                // Tek bir cssProperty varsa
                const cssRule = `${cssProperty}: ${value};`;
                const result = `.${escapeClassName(className)} { ${cssRule} }`;
                return result;
            }
        }
    }
    return null; // Eğer custom sınıf değilse null döndür
}
