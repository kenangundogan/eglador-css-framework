import { escapeClassName } from './../utils/escapeClassName.js';

export function processCustomCss(restClass) {
    const prefixToPropertyMap = {
        'w': 'width',
        'h': 'height',
        'm': 'margin',
        'mt': 'margin-top',
        'mr': 'margin-right',
        'mb': 'margin-bottom',
        'ml': 'margin-left',
        'mx': ['margin-left', 'margin-right'], // margin-x (horizontal)
        'my': ['margin-top', 'margin-bottom'], // margin-y (vertical)
        'p': 'padding',
        'pt': 'padding-top',
        'pr': 'padding-right',
        'pb': 'padding-bottom',
        'pl': 'padding-left',
        'px': ['padding-left', 'padding-right'], // padding-x (horizontal)
        'py': ['padding-top', 'padding-bottom'], // padding-y (vertical)
        'max-w': 'max-width',
        'max-h': 'max-height',
        'min-w': 'min-width',
        'min-h': 'min-height',
        'left': 'left',  // 'left' özelliği
        'right': 'right', // 'right' özelliği
        'top': 'top',     // 'top' özelliği
        'bottom': 'bottom' // 'bottom' özelliği
    };

    const match = restClass.match(/([a-zA-Z-]+)\[(.+)\]/);
    if (match) {
        let propertyPrefix = match[1]; // Örneğin: 'left'
        let value = match[2]; // Örneğin: 'max(0px,calc(50%-45rem))'

        // Başta veya sonda "-" varsa temizleyelim
        propertyPrefix = propertyPrefix.replace(/^-|-$|-/g, ''); // Gereksiz '-' işaretini temizler

        // CSS özelliğini bulalım
        const cssProperty = prefixToPropertyMap[propertyPrefix];

        if (!cssProperty) {
            console.warn(`Tanımlanmamış prefix: ${propertyPrefix}`);
            return null;
        }

        // Eğer 'calc' veya 'max' fonksiyonları içeriyorsa aralardaki operatörlere boşluk ekleyelim
        if (value.includes('calc') || value.includes('max')) {
            value = value.replace(/([+-])/g, ' $1 '); // + ve - işaretleri arasına boşluk ekle
        }

        // Virgülleri işlemeyelim, olduğu gibi bırakıyoruz
        const escapedClassName = escapeClassName(`${propertyPrefix}-[${value}]`);

        // CSS çıktısını oluşturalım
        let cssRule = `${cssProperty}: ${value};`;

        // Sonuç olarak class ismi ve CSS kuralını dönelim
        // return `.${escapedClassName} { ${cssRule} }`;
        return `${cssRule}`;
    }

    return null;
}
