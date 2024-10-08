// Orijinal haritamız
export const possitivePrefixToPropertyMap = {
    'w': 'width',
    'max-w': 'max-width',
    'min-w': 'min-width',
    'h': 'height',
    'max-h': 'max-height',
    'min-h': 'min-height',
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
    'space-x': ['margin-right', 'margin-left'],
    'space-y': ['margin-top', 'margin-bottom'],
    'top': 'top',
    'right': 'right',
    'bottom': 'bottom',
    'left': 'left',
    'inset': 'inset',
    'z': 'z-index',
    'bg': 'background-color',
    'border': 'border-color',
    'font': 'font-weight',
    'text': 'font-size',
    'tracking': 'letter-spacing',
    'line-clamp': 'line-clamp',
    'leading': 'line-height',
    'list-image': 'list-style-image',
    'list': 'list-style-type',
    'translate-x': '--kg-translate-x',
    'translate-y': '--kg-translate-y',
    'rotate': '--kg-rotate',
    'skew-x': '--kg-skew-x',
    'skew-y': '--kg-skew-y',
    'scale': ['--kg-scale-x', '--kg-scale-y'],
    'scale-x': '--kg-scale-x',
    'scale-y': '--kg-scale-y',
    'columns': 'columns',
    'basis': 'flex-basis',
    'flex': 'flex',
    'grow': 'flex-grow',
    'shrink': 'flex-shrink',
    'order': 'order',
    'grid-cols': 'grid-template-columns',
    'col': 'grid-column',
    'grid-rows': 'grid-template-rows',
    'row': 'grid-row',
    'auto-cols': 'grid-auto-columns',
    'auto-rows': 'grid-auto-rows',
    'gap': 'gap',
    'decoration': 'text-decoration-color',
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
