import { escapeClassName } from '../utils/escapeClassName.js';
import { prefixToPropertyMap } from './../properties/prefixToPropertyMap.js';

export function cssObjectToString(cssObject) {
    return Object.entries(cssObject)
        .map(([className, rule]) => `.${className} { ${rule} }`)
        .join('\n');
}

export function customCss(extractedClasses) {
    const classes = {};

    // Tüm prefix'ler için dinamik regex oluştur
    const dynamicRegex = new RegExp(`(${Object.keys(prefixToPropertyMap).join('|')})-\\[([^\\]]+)\\]`, 'g');

    // extractedClasses parametresi ile gelen sınıfları işle
    extractedClasses.forEach(className => {
        let match;

        // Tüm sınıflar için dinamik regex eşleşmesini yap
        while ((match = dynamicRegex.exec(className)) !== null) {
            const prefix = match[1];  // Prefix (örn: 'w', 'h', 'm', 'p', 'px', 'my')
            let value = match[2];   // Değer (örn: '28rem', '50%', '12px')

            // Eğer 'calc' veya 'max' fonksiyonları içeriyorsa, operatörlere boşluk ekleyelim
            if (value.includes('calc') || value.includes('max')) {
                value = value.replace(/([+-])/g, ' $1 '); // + ve - işaretleri arasına boşluk ekle
            }

            // Prefix'e göre ilgili CSS özelliğini bul
            const cssProperty = prefixToPropertyMap[prefix];
            const escapedClassName = escapeClassName(`${prefix}-[${value}]`);

            // Normal kurallar
            if (Array.isArray(cssProperty)) {
                cssProperty.forEach(property => {
                    classes[escapedClassName] = classes[escapedClassName]
                        ? `${classes[escapedClassName]} ${property}: ${value};`
                        : `${property}: ${value};`;
                });
            } else {
                classes[escapedClassName] = `${cssProperty}: ${value};`;
            }
        }
    });

    // CSS nesnesini string'e çevir
    return cssObjectToString(classes);
}
