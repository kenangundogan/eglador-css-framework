import { escapeClassName } from '../utils/escapeClassName.js';
import { prefixToPropertyMap } from './../properties/prefixToPropertyMap.js';

export function importantCss(important, allClasses) {
    const importantCss = important.map(className => {
        const baseClass = className.split('!')[1];

        // eğer baseClass içinde custom bir sınıf varsa
        if (baseClass.includes('[') && baseClass.includes(']')) {
            const match = baseClass.match(/([a-zA-Z-]+)\[(.+)\]/);
            const prefix = match[1].replace(/^-|-$/g, '');
            const value = match[2];

            // prefixToPropertyMap içinde prefix var mı kontrol et
            if (prefixToPropertyMap[prefix]) {
                const cssProperty = prefixToPropertyMap[prefix];
                let cssRule = `${cssProperty}: ${value}`;

                // Eğer 'calc' veya 'max' fonksiyonları içeriyorsa virgülleri kaçış karakteriyle değiştirelim
                if (value.includes('calc') || value.includes('max')) {
                    cssRule = cssRule.replace(/,/g, '\\2c '); // Virgülleri \2c ile değiştir
                    cssRule = cssRule.replace(/([+-])/g, ' $1 '); // + ve - işaretleri arasına boşluk ekle
                }

                return `.${escapeClassName(className)} { ${cssRule} !important; }`;
            }

        }
        if (allClasses[baseClass]) {
            const cssRule = allClasses[baseClass].replace(/;/g, '');
            return `.${escapeClassName(className)} { ${cssRule} !important; }`;
        }
    });

    return importantCss.sort().join('\n');
}
