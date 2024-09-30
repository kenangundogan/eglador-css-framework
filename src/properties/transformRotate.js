export function generateTransformRotateClasses() {
    const transformRotateClasses = {};

    const rotations = {
        '0': '0deg',
        '1': '1deg',
        '2': '2deg',
        '3': '3deg',
        '6': '6deg',
        '12': '12deg',
        '45': '45deg',
        '90': '90deg',
        '180': '180deg'
    };

    Object.entries(rotations).forEach(([key, rotationValue]) => {
        transformRotateClasses[`rotate-${key}`] = `
            --kg-rotate: ${rotationValue};
            transform: translate(var(--kg-translate-x), var(--kg-translate-y)) rotate(var(--kg-rotate)) skewX(var(--kg-skew-x)) skewY(var(--kg-skew-y)) scaleX(var(--kg-scale-x)) scaleY(var(--kg-scale-y));
        `;
    });

    return transformRotateClasses;
}
