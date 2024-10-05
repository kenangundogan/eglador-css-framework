// Orijinal haritamız
export const possitivePrefixToPropertyMap = {
    'w': 'width',
    'h': 'height',
    'm': 'margin',
    'mt': 'margin-top',
    'mr': 'margin-right',
    'mb': 'margin-bottom',
    'ml': 'margin-left',
    'mx': ['margin-left', 'margin-right'],
    'my': ['margin-top', 'margin-bottom'],
    'p': 'padding',
    'pt': 'padding-top',
    'pr': 'padding-right',
    'pb': 'padding-bottom',
    'pl': 'padding-left',
    'px': ['padding-left', 'padding-right'],
    'py': ['padding-top', 'padding-bottom'],
    'max-w': 'max-width',
    'max-h': 'max-height',
    'min-w': 'min-width',
    'min-h': 'min-height',
    'top': 'top',
    'right': 'right',
    'bottom': 'bottom',
    'left': 'left',
    'z': 'z-index',
    'bg': 'background-color',
    'text': 'color',
    'border': 'border-color',
};

// Dinamik negatif versiyonları oluşturma fonksiyonu
export const generateNegativeProperties = (map) => {
    const negativeMap = {};
    for (const key in map) {
        if (map.hasOwnProperty(key)) {
            // Negatif versiyonunu oluştur
            negativeMap[`-${key}`] = map[key];
        }
    }
    return negativeMap;
};

// Orijinal haritayı ve dinamik negatif haritayı birleştirelim
export const prefixToPropertyMap = {
    ...possitivePrefixToPropertyMap,
    ...generateNegativeProperties(possitivePrefixToPropertyMap)
};
