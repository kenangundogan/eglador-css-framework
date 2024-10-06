export function generateBorderRadiusClasses() {
    const classes = {};

    const sizes = {
        'none': '0px',
        'sm': '0.125rem',  // 2px
        'DEFAULT': '0.25rem',  // 4px (standart rounded sınıfı)
        'md': '0.375rem',  // 6px
        'lg': '0.5rem',    // 8px
        'xl': '0.75rem',   // 12px
        '2xl': '1rem',   // 16px
        '3xl': '1.5rem', // 24px
        'full': '9999px'
    };

    const directions = {
        '': '',  // genel 'rounded' için
        't': ['top-left', 'top-right'],  // üst kenarlar
        'r': ['top-right', 'bottom-right'],  // sağ kenarlar
        'b': ['bottom-right', 'bottom-left'],  // alt kenarlar
        'l': ['top-left', 'bottom-left'],  // sol kenarlar
        's': ['start-start', 'end-start'],  // sol başlangıç (sol)
        'e': ['start-end', 'end-end'],  // sağ son (sağ)
        'tl': 'top-left',  // sadece üst sol
        'tr': 'top-right',  // sadece üst sağ
        'br': 'bottom-right',  // sadece alt sağ
        'bl': 'bottom-left',  // sadece alt sol
        'ss': 'start-start',  // sadece start-start
        'se': 'start-end',  // sadece start-end
        'ee': 'end-end',  // sadece end-end
        'es': 'end-start',  // sadece end-start
    };

    // Border-radius değerleri oluştur
    for (const [key, value] of Object.entries(sizes)) {
        for (const [dirKey, dirValue] of Object.entries(directions)) {
            const className = `rounded${dirKey ? '-' + dirKey : ''}${key !== 'DEFAULT' ? '-' + key : ''}`;

            if (Array.isArray(dirValue)) {
                // Eğer yön belirli bir köşe veya kenarsa, her iki taraf için de aynı değeri uygula
                classes[className] = `border-${dirValue[0]}-radius: ${value}; border-${dirValue[1]}-radius: ${value};`;
            } else {
                // Genel border-radius
                classes[className] = `border-radius: ${value};`;
            }
        }
    }
    return classes;
}
