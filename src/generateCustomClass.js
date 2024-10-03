export function cssObjectToString(cssObject) {
    return Object.entries(cssObject)
        .map(([className, rule]) => `.${className} { ${rule} }`)
        .join('\n');
}

export function cssObjectToResponsiveString(cssObject) {
    return Object.entries(cssObject)
        .map(([className, rules]) => {
            if (typeof rules === 'string') {
                return `.${className} { ${rules} }`;
            } else {
                return Object.entries(rules)
                    .map(([mediaQuery, rule]) => `@media ${mediaQuery} { .${className} { ${rule} } }`)
                    .join('\n');
            }
        })
        .join('\n');
}

export function escapeClassName(className) {
    return className
        .replace(/[^a-zA-Z0-9-_]/g, '\\$&') // Kaçış karakterleri ekleyerek CSS güvenliği sağlanır
        .replace(/:/g, '\\:'); // Tailwind'e özgü responsive modifikasyonlar için ':' karakterini kaçır
}

export function generateCustomClass(extractedClasses) {
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
        // Diğer prefix ve CSS özelliklerini burada ekleyebilirsiniz
    };

    // Medya sorgusu (responsive) prefix'leri
    const responsivePrefixMap = {
        'sm': '(min-width: 640px)',
        'md': '(min-width: 768px)',
        'lg': '(min-width: 1024px)',
        'xl': '(min-width: 1280px)',
        '2xl': '(min-width: 1536px)',
    };

    // Tüm prefix'ler için dinamik regex oluştur
    const dynamicRegex = new RegExp(`(${Object.keys(prefixToPropertyMap).join('|')})-\\[([^\\]]+)\\]`, 'g');

    // extractedClasses parametresi ile gelen sınıfları işle
    extractedClasses.forEach(className => {
        let match;
        let responsivePrefix = null;

        // Responsive prefix'leri kontrol et (örneğin sm:, md:, lg: vb.)
        const responsiveMatch = className.match(/^(\w+):/);
        if (responsiveMatch && responsivePrefixMap[responsiveMatch[1]]) {
            responsivePrefix = responsivePrefixMap[responsiveMatch[1]];
            className = className.replace(`${responsiveMatch[1]}:`, ''); // Prefix'i kaldır
        }

        // Tüm sınıflar için dinamik regex eşleşmesini yap
        while ((match = dynamicRegex.exec(className)) !== null) {
            const prefix = match[1];  // Prefix (örn: 'w', 'h', 'm', 'p', 'px', 'my')
            const value = match[2];   // Değer (örn: '28rem', '50%', '12px')

            // Prefix'e göre ilgili CSS özelliğini bul
            const cssProperty = prefixToPropertyMap[prefix];
            const escapedClassName = responsivePrefix
                ? escapeClassName(`${responsiveMatch[1]}:${prefix}-[${value}]`)
                : escapeClassName(`${prefix}-[${value}]`);

            // Responsive kurallar
            if (responsivePrefix) {
                if (!classes[escapedClassName]) {
                    classes[escapedClassName] = {};
                }
                if (Array.isArray(cssProperty)) {
                    cssProperty.forEach(property => {
                        classes[escapedClassName][responsivePrefix] = classes[escapedClassName][responsivePrefix]
                            ? `${classes[escapedClassName][responsivePrefix]} ${property}: ${value};`
                            : `${property}: ${value};`;
                    });
                } else {
                    classes[escapedClassName][responsivePrefix] = `${cssProperty}: ${value};`;
                }
            } else {
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
        }
    });

    // CSS nesnesini string'e çevir (responsive kurallar dahil)
    return cssObjectToResponsiveString(classes);
}
