export function generateSepiaClasses() {
    const sepiaClasses = {};

    const sepias = {
        'sepia-0': 'sepia(0)',
        'sepia': 'sepia(100%)',
    };

    Object.entries(sepias).forEach(([className, sepiaValue]) => {
        sepiaClasses[className] = `
            --kg-sepia: ${sepiaValue};
            filter: var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow);
        `;
    });

    return sepiaClasses;
}
