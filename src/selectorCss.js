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

    // Her selector için extractedClasses'i kontrol et
    selectorList.forEach(selector => {
        const selectedClasses = extractedClasses.filter(className => className.startsWith(selector));

        selectedClasses.forEach(className => {
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
