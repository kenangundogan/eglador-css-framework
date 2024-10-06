import { escapeClassName } from '../utils/escapeClassName.js';
import { processCustomClass } from '../utils/customCssProcessor.js';

export function pseudoElementCss(pseudoElements, allClasses) {
    return pseudoElements.map(className => {
        // Pseudo-element ve base class'ı ayır
        const [pseudoElement, baseClass] = className.split(':');

        // Sınıf adındaki tek tırnakları kaçır
        const escapedBaseClass = baseClass.replace(/'/g, "\\'");
        const escapedClassName = escapeClassName(`${pseudoElement}:${escapedBaseClass}`) + '::' + pseudoElement;

        // Custom sınıfı işlemek için helper fonksiyonunu kullanalım
        const customClass = processCustomClass(baseClass);
        if (customClass) {
            // Custom sınıfın pseudo-element ile CSS kuralını döndür
            let cssRule = customClass.replace(escapeClassName(baseClass), `${escapedClassName}`);
            if (pseudoElement === 'before' || pseudoElement === 'after') {
                // Pseudo-element için content kuralı ekle
                cssRule = cssRule.replace('}', `content: var(--kg-content); }`);
            }
            return cssRule;
        }

        // Eğer content-[...] gibi bir yapıysa
        if (baseClass.startsWith('content-[')) {
            const contentMatch = baseClass.match(/content-\[(.+)\]/);
            if (contentMatch) {
                let contentValue = contentMatch[1];

                // İçerik değerinin başındaki ve sonundaki tırnakları kaldır
                contentValue = contentValue.replace(/^['"]|['"]$/g, '');

                // İçeriği çift tırnak içine al
                contentValue = `"${contentValue}"`;

                return `.${escapedClassName} { --kg-content: ${contentValue}; content: var(--kg-content); }`;
            }
        }

        // Eğer custom sınıf değilse normal işlemi yap
        if (allClasses[baseClass]) {
            const baseClassCss = allClasses[baseClass];
            // Pseudo-element için content kuralı ekle
            const contentRule = pseudoElement === 'before' || pseudoElement === 'after'
                ? `content: var(--kg-content); `
                : '';
            return `.${escapedClassName} { ${contentRule}${baseClassCss} }`;
        }

        return null; // Eğer sınıf bulunamazsa null döndür
    }).filter(Boolean).join('\n'); // Gereksiz null değerleri temizle ve string döndür
}
