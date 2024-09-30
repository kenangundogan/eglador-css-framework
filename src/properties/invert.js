export function generateInvertClasses() {
    const invertClasses = {};

    const inverts = {
        'invert-0': 'invert(0)',
        'invert': 'invert(100%)',
    };

    Object.entries(inverts).forEach(([className, invertValue]) => {
        invertClasses[className] = `
            --kg-invert: ${invertValue};
            filter: var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow);
        `;
    });

    return invertClasses;
}
