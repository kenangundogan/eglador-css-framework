// Orijinal haritamız
export const possitivePrefixToPropertyMap = {
    'w': 'width',
    'h': 'height',
    'size': ['width', 'height'],
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
    'inset': 'inset',
    'z': 'z-index',
    'bg': 'background-color',
    'text': 'color',
    'border': 'border-color',
    'grid-cols': 'grid-template-columns',
    'grid-rows': 'grid-template-rows',
    'row-start': 'grid-row-start',
    'row-end': 'grid-row-end',
    'col-start': 'grid-column-start',
    'col-end': 'grid-column-end',
    'text': 'font-size',
    'leading': 'line-height',
    'translate-x': '--kg-translate-x',
    'translate-y': '--kg-translate-y',
    'rotate': '--kg-rotate',
    'skew-x': '--kg-skew-x',
    'skew-y': '--kg-skew-y',
    'scale': ['--kg-scale-x', '--kg-scale-y'],
    'scale-x': '--kg-scale-x',
    'scale-y': '--kg-scale-y',
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
