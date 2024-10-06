import { escapeClassName } from '../utils/escapeClassName.js';
import { processCustomClass } from '../utils/customCssProcessor.js';

export function pseudoCss(pseudoClasses, allClasses) {
    return pseudoClasses.map(className => {
        // Pseudo-class ve base class'ı ayır
        const [pseudoClass, baseClass] = className.split(':');
        const escapedClassName = escapeClassName(`${className}`) + ':' + pseudoClass;

        // Custom sınıfı işlemek için helper fonksiyonunu kullanalım
        const customClass = processCustomClass(baseClass);
        if (customClass) {
            // Custom sınıfın pseudo-class ile CSS kuralını döndür
            return customClass.replace(escapeClassName(baseClass), `${escapedClassName}`);
        }

        // Eğer custom sınıf değilse normal işlemi yap
        if (allClasses[baseClass]) {
            const baseClassCss = allClasses[baseClass];
            return `.${escapedClassName} { ${baseClassCss} }`;
        }

        return null; // Eğer sınıf bulunamazsa null döndür
    }).filter(Boolean).join('\n'); // Gereksiz null değerlerini temizle ve string döndür
}
