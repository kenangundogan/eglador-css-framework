export function generateZIndexClasses() {
    const classes = {};

    const zIndexValues = {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        'auto': 'auto',
    };

    Object.keys(zIndexValues).forEach(key => {
        const value = zIndexValues[key];
        classes[`z-${key}`] = `z-index: ${value};`;
    });

    return classes;
}
