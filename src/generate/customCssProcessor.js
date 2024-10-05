import { escapeClassName } from './../utils/escapeClassName.js';
import { prefixToPropertyMap } from './../properties/prefixToPropertyMap.js';

export function processCustomCss(restClass) {

    const match = restClass.match(/([a-zA-Z-]+)\[(.+)\]/);
    if (match) {
        let propertyPrefix = match[1]; // Örneğin: 'left'
        let value = match[2]; // Örneğin: 'max(0px,calc(50%-45rem))'

        // Başta veya sonda "-" varsa temizleyelim
        propertyPrefix = propertyPrefix.replace(/^-|-$/g, '');

        // CSS özelliğini bulalım
        const cssProperty = prefixToPropertyMap[propertyPrefix];

        if (!cssProperty) {
            console.warn(`Tanımlanmamış prefix: ${propertyPrefix}`);
            return null;
        }

        // Eğer 'calc' veya 'max' fonksiyonları içeriyorsa virgülleri kaçış karakteriyle değiştirelim
        if (value.includes('calc') || value.includes('max')) {
            value = value.replace(/,/g, '\\2c '); // Virgülleri \2c ile değiştir
            value = value.replace(/([+-])/g, ' $1 '); // + ve - işaretleri arasına boşluk ekle
        }

        // Parantezleri ve özel karakterleri kaçış yapalım
        const escapedClassName = escapeClassName(`${propertyPrefix}-[${value.replace(/\(/g, '\\(').replace(/\)/g, '\\)')}]`);


        // CSS çıktısını oluşturalım
        let cssRule = `${cssProperty}: ${value};`;

        // Sonuç olarak class ismi ve CSS kuralını dönelim
        // return `.${escapedClassName} { ${cssRule} }`;
        return `${cssRule}`;
    }

    return null;
}
