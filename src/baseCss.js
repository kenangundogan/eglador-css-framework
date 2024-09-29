import { cssObjectToString } from './utils/cssObjectToString.js';
import { escapeClassName } from './utils/escapeClassName.js';

// Statik class'ları CSS'e dönüştürme ve harf sırasına göre sıralama
export function generateBaseCss(extractedClasses, allClasses) {
    console.log(allClasses);
    return extractedClasses
        .filter(className => !className.includes(':')) // Responsive class'ları hariç tut
        .sort() // Harf sırasına göre sıralama
        .map(className => {
            const escapedClassName = escapeClassName(className);

            // allClasses içinde space- ile başlayan bir class varsa, onu işle
            if (className.startsWith('space-')) {
                const cssObj = allClasses[className + ' > * + *'];
                return `.${escapedClassName} > * + * { ${cssObjectToString(cssObj)} }`;
            }
            if (className.startsWith('divide-') || className.startsWith('divide-')) {
                const cssObj = allClasses[className + ' > * + *'];
                return `.${escapedClassName} > * + * { ${cssObjectToString(cssObj)} }`;
            }
            if (allClasses[className]) {
                return `.${escapedClassName} { ${allClasses[className]} }`; // Statik class'ı ekle
            }
            return null;
        })
        .filter(Boolean)
        .join('\n');
}
