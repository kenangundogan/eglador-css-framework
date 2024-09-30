export function generateHueRotateClasses() {
    const hueRotateClasses = {};

    const hueRotates = {
        'hue-rotate-0': 'hue-rotate(0deg)',
        'hue-rotate-15': 'hue-rotate(15deg)',
        'hue-rotate-30': 'hue-rotate(30deg)',
        'hue-rotate-60': 'hue-rotate(60deg)',
        'hue-rotate-90': 'hue-rotate(90deg)',
        'hue-rotate-180': 'hue-rotate(180deg)',
    };

    Object.entries(hueRotates).forEach(([className, hueRotateValue]) => {
        hueRotateClasses[className] = `
            --kg-hue-rotate: ${hueRotateValue};
            filter: var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow);
        `;
    });

    return hueRotateClasses;
}
