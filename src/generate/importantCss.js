import { escapeClassName } from '../utils/escapeClassName.js';
import { processCustomClass } from '../utils/customCssProcessor.js';

export function importantCss(important, allClasses) {
    return important
        .map(className => {
            const baseClass = className.split('!')[1];
            const escapedClassName = escapeClassName('!' + baseClass);

            // Custom sınıfı işlemek için helper fonksiyonunu kullanalım
            const customClass = processCustomClass(baseClass);
            if (customClass) {
                // Custom sınıfın CSS kuralını `!important` ile birlikte döndür
                return customClass.replace(escapeClassName(baseClass), escapedClassName).replace('; }', ' !important; }');
            }

            // Eğer custom sınıf değilse normal işlemi yap
            if (allClasses[baseClass]) {
                const cssRule = allClasses[baseClass].replace(/;/g, ''); // Fazladan noktayı kaldır
                return `.${escapedClassName} { ${cssRule} !important; }`;
            }

            return null;
        })
        .filter(Boolean) // Gereksiz null değerleri temizle
        .sort()
        .join('\n');
}
