import { cssObjectToString } from '../utils/cssObjectToString.js';
import { escapeClassName } from '../utils/escapeClassName.js';

export function baseCss(base, allClasses) {
    return base
        .map(className => {
            const escapedClass = escapeClassName(className);

            // space- ve divide- sınıfları için kontrol yap
            const isSpaceClass = escapedClass.startsWith('space-') || escapedClass.startsWith('-space-');
            const isDivideClass = escapedClass.startsWith('divide-x') || escapedClass.startsWith('divide-y') || escapedClass.startsWith('-divide-x') || escapedClass.startsWith('-divide-y');
            const isDivideColorClass = escapedClass.startsWith('divide-');

            // space- ve divide- sınıfları için belirli bir formatta CSS kuralı oluştur
            if (isSpaceClass || isDivideClass) {
                const cssObj = allClasses[className + ' > :not([hidden]) ~ :not([hidden])'];
                return `.${escapedClass} > :not([hidden]) ~ :not([hidden]) { ${cssObjectToString(cssObj)} }`;
            }

            // divide-color sınıfları için belirli bir formatta CSS kuralı oluştur
            if (isDivideColorClass) {
                const cssObj = allClasses[className + ' > :not([hidden]) ~ :not([hidden])'];
                return `.${escapedClass} > :not([hidden]) ~ :not([hidden]) { ${cssObj} }`;
            }

            // Eğer sınıf allClasses içinde varsa, normal CSS kuralını döndür
            if (allClasses[className]) {
                return `.${escapedClass} { ${allClasses[className]} }`;
            }

            return null; // Uygun sınıf bulunamazsa null döndür
        })
        .filter(Boolean)  // null değerleri filtrele
        .sort()
        .join('\n'); // CSS kurallarını string olarak döndür
}
