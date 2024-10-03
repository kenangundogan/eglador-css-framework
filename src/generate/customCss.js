export function cssObjectToString(cssObject) {
    return Object.entries(cssObject)
        .map(([className, rule]) => `.${className} { ${rule} }`)
        .join('\n');
}

export function escapeClassName(className) {
    return className
        .replace(/[\[\]]/g, '\\$&')  // Sadece köşeli parantezleri kaçırıyoruz
        .replace(/:/g, '\\:')        // Responsive modifikasyonlar için ':' kaçırıyoruz
        .replace(/\//g, '\\/')       // Virgülleri kaçırıyoruz (CSS değerleri içinde)
        .replace(/\./g, '\\.');      // '.' karakterini kaçırıyoruz
}

export function customCss(extractedClasses) {
    const classes = {};

    // Dinamik olarak desteklenecek prefix'ler ve karşılık gelen CSS özellikleri
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
        'top': 'top',
        'right': 'right',
        'bottom': 'bottom',
        'left': 'left',
        'z': 'z-index',
        // Diğer prefix ve CSS özelliklerini burada ekleyebilirsiniz
    };

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
