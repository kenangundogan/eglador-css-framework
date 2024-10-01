export function generateTransformScaleClasses() {
    const transformScaleClasses = {};

    const scales = {
        '0': '0',
        '50': '.5',
        '75': '.75',
        '90': '.9',
        '95': '.95',
        '100': '1',
        '105': '1.05',
        '110': '1.1',
        '125': '1.25',
        '150': '1.5'
    };

    Object.entries(scales).forEach(([key, scaleValue]) => {
        // Pozitif Genel scale sınıfı
        transformScaleClasses[`scale-${key}`] = `
            --kg-scale-x: ${scaleValue};
            --kg-scale-y: ${scaleValue};
            transform: translate(var(--kg-translate-x), var(--kg-translate-y)) rotate(var(--kg-rotate)) skewX(var(--kg-skew-x)) skewY(var(--kg-skew-y)) scaleX(var(--kg-scale-x)) scaleY(var(--kg-scale-y));
        `;

        // Pozitif X ekseni için scale sınıfı
        transformScaleClasses[`scale-x-${key}`] = `
            --kg-scale-x: ${scaleValue};
            transform: translate(var(--kg-translate-x), var(--kg-translate-y)) rotate(var(--kg-rotate)) skewX(var(--kg-skew-x)) skewY(var(--kg-skew-y)) scaleX(var(--kg-scale-x)) scaleY(var(--kg-scale-y));
        `;

        // Pozitif Y ekseni için scale sınıfı
        transformScaleClasses[`scale-y-${key}`] = `
            --kg-scale-y: ${scaleValue};
            transform: translate(var(--kg-translate-x), var(--kg-translate-y)) rotate(var(--kg-rotate)) skewX(var(--kg-skew-x)) skewY(var(--kg-skew-y)) scaleX(var(--kg-scale-x)) scaleY(var(--kg-scale-y));
        `;

        // Negatif Genel scale sınıfı
        transformScaleClasses[`-scale-${key}`] = `
            --kg-scale-x: -${scaleValue};
            --kg-scale-y: -${scaleValue};
            transform: translate(var(--kg-translate-x), var(--kg-translate-y)) rotate(var(--kg-rotate)) skewX(var(--kg-skew-x)) skewY(var(--kg-skew-y)) scaleX(var(--kg-scale-x)) scaleY(var(--kg-scale-y));
        `;

        // Negatif X ekseni için scale sınıfı
        transformScaleClasses[`-scale-x-${key}`] = `
            --kg-scale-x: -${scaleValue};
            transform: translate(var(--kg-translate-x), var(--kg-translate-y)) rotate(var(--kg-rotate)) skewX(var(--kg-skew-x)) skewY(var(--kg-skew-y)) scaleX(var(--kg-scale-x)) scaleY(var(--kg-scale-y));
        `;

        // Negatif Y ekseni için scale sınıfı
        transformScaleClasses[`-scale-y-${key}`] = `
            --kg-scale-y: -${scaleValue};
            transform: translate(var(--kg-translate-x), var(--kg-translate-y)) rotate(var(--kg-rotate)) skewX(var(--kg-skew-x)) skewY(var(--kg-skew-y)) scaleX(var(--kg-scale-x)) scaleY(var(--kg-scale-y));
        `;
    });

    return transformScaleClasses;
}
