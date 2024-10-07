import { prefixToPropertyMap } from '../properties/_prefixToPropertyMap.js';
import { formatMathExpressions } from '../utils/formatMathExpressions.js';

export function processCustomCss(restClass) {
    // Custom sınıf formatı: "prefix[value]"
    const match = restClass.match(/([a-zA-Z-]+)\[(.+)\]/);

    // Eğer sınıf bu formata uymuyorsa null döndür
    if (!match) return null;

    // Eşleşen prefix (örn: 'left') ve value (örn: 'max(0px, calc(50%-45rem))') değerlerini al
    let prefix = match[1];
    let value = match[2];

    // Prefix'in başında veya sonunda "-" karakteri varsa temizleyelim
    prefix = prefix.replace(/^-|-$/g, '');

    // prefixToPropertyMap içinde bu prefix'e karşılık gelen CSS özelliğini bulalım
    const cssProperty = prefixToPropertyMap[prefix];

    // Eğer geçersiz bir prefix ise null döndür
    if (!cssProperty) return null;

    // Matematiksel ifadeleri (örn: calc, max) uygun şekilde formatlayalım
    value = formatMathExpressions(value);

    // CSS kuralını oluştur ve döndür (örn: 'left: max(0px, calc(50%-45rem));')
    return `${cssProperty}: ${value};`;
}
