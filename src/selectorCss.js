export function generateSelectorCss(extractedClasses, allClasses) {
    let selectorCss = '';

    // Dinamik selector'ler için bir liste
    const selectorList = [
        'hover:',
        'focus:',
        'active:',
        'visited:',
        'empty:',
        'default:',
        'valid:',
        'invalid:',
        'before:',
        'after:',
        'checked:',
        'default:',
        'disabled:',
        'enabled:',
        'selection:',
    ];

    const filteredClasses = extractedClasses.filter(className => selectorList.some(selector => className.startsWith(selector)));

    // Tüm selector'ler için dön
    selectorList.forEach(selector => {
        // Filtrelenmiş class'lar içinde dön
        filteredClasses.forEach(className => {
            // Selector prefix'ini kaldırıp statik class'ı elde et
            const cleanClass = className.replace(selector, '');

            // Eğer temizlenmiş class allClasses içinde varsa CSS property'yi al
            if (allClasses[cleanClass]) {
                const cssRule = allClasses[cleanClass];

                // Class isimlerini CSS için uygun formata (escape) dönüştürelim
                const escapedClassName = escapeClassName(className);

                // CSS kuralını ekleyelim
                selectorCss += `.${escapedClassName}:${selector.replace(':', '')} { ${cssRule} }\n`;
            }
        });
    });

    return selectorCss;
}

// Class isimlerindeki özel karakterleri kaçış karakteriyle düzeltme fonksiyonu
function escapeClassName(className) {
    return className.replace(/:/g, '\\:');
}
