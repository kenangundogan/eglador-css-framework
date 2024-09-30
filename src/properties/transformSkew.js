export function generateTransformSkewClasses() {
    const transformSkewClasses = {};

    const skews = {
        '0': '0deg',
        '1': '1deg',
        '2': '2deg',
        '3': '3deg',
        '6': '6deg',
        '12': '12deg'
    };

    // Skew-X sınıfları oluşturma
    Object.entries(skews).forEach(([key, skewValue]) => {
        transformSkewClasses[`skew-x-${key}`] = `
            --kg-skew-x: ${skewValue};
            transform: translate(var(--kg-translate-x), var(--kg-translate-y)) rotate(var(--kg-rotate)) skewX(var(--kg-skew-x)) skewY(var(--kg-skew-y)) scaleX(var(--kg-scale-x)) scaleY(var(--kg-scale-y));
        `;

        transformSkewClasses[`skew-y-${key}`] = `
            --kg-skew-y: ${skewValue};
            transform: translate(var(--kg-translate-x), var(--kg-translate-y)) rotate(var(--kg-rotate)) skewX(var(--kg-skew-x)) skewY(var(--kg-skew-y)) scaleX(var(--kg-scale-x)) scaleY(var(--kg-scale-y));
        `;
    });

    return transformSkewClasses;
}
