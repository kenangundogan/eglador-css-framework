import { cssObjectToString } from '../utils/cssObjectToString.js';
import { escapeClassName } from '../utils/escapeClassName.js';

export function baseCss(base, allClasses) {
    return base
        .map(className => {
            const escapedClass = escapeClassName(className);

            // space- ve divide- prefix'lerini kontrol et
            const isSpaceClass = escapedClass.startsWith('space-') || escapedClass.startsWith('-space-');
            const isDivideClass = escapedClass.startsWith('divide-x') || escapedClass.startsWith('divide-y') ||
                                  escapedClass.startsWith('-divide-x') || escapedClass.startsWith('-divide-y');

            // space veya divide sınıfıysa, belirli bir formatta CSS kuralı oluştur
            if (isSpaceClass || isDivideClass) {
                const cssObj = allClasses[className + ' > :not([hidden]) ~ :not([hidden])'];
                return `.${escapedClass} > :not([hidden]) ~ :not([hidden]) { ${cssObjectToString(cssObj)} }`;
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
