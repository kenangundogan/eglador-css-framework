import { escapeClassName } from '../utils/escapeClassName.js';
import { prefixToPropertyMap } from './../properties/prefixToPropertyMap.js';
import { formatMathExpressions } from '../utils/formatMathExpressions.js';

export function cssObjectToString(cssObject) {
    // CSS objesini string formatına dönüştür
    return Object.entries(cssObject)
        .map(([className, rule]) => `.${className} { ${rule} }`)
        .join('\n');
}

export function customCss(extractedClasses) {
    const classes = {};

    // Tüm prefix'ler için dinamik regex oluştur (örneğin: 'w-[28rem]')
    const dynamicRegex = new RegExp(`(${Object.keys(prefixToPropertyMap).join('|')})-\\[([^\\]]+)\\]`, 'g');

    // Gelen her sınıfı işle
    extractedClasses.forEach(className => {
        let match;

        // Dinamik regex ile sınıfları eşleştir
        while ((match = dynamicRegex.exec(className)) !== null) {
            const prefix = match[1];  // Prefix (örn: 'w', 'h', 'm', 'p', 'px', 'my')
            let value = match[2];     // Değer (örn: '28rem', '50%', '12px')

            // Matematiksel ifadeleri uygun şekilde formatlayalım (örn: calc, max)
            value = formatMathExpressions(value);

            // Prefix'e karşılık gelen CSS özelliğini bulalım
            const cssProperty = prefixToPropertyMap[prefix];
            if (!cssProperty) continue; // Geçersiz prefix varsa işlemi atla

            // Sınıf ismini uygun şekilde dönüştürelim
            const escapedClassName = escapeClassName(`${prefix}-[${value}]`);

            // Eğer prefix '-' ile başlıyorsa, value'yu negatif yap
            if (prefix[0] === '-') {
                value = `-${value}`;
            }

            // CSS kuralını oluştur ve kaydet
            classes[escapedClassName] = `${cssProperty}: ${value};`;
        }
    });

    // Tüm oluşturulan CSS kurallarını string formatında döndür
    return cssObjectToString(classes);
}
