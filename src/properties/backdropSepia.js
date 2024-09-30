export function generateBackdropSepiaClasses() {
    const backdropSepiaClasses = {};
    const backdropSepias = {
        'backdrop-sepia-0': 'sepia(0)',
        'backdrop-sepia': 'sepia(100%)',
    };

    Object.entries(backdropSepias).forEach(([className, backdropSepiaValue]) => {
        backdropSepiaClasses[className] = `
            --kg-backdrop-sepia: ${backdropSepiaValue};
            backdrop-filter: var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia);
        `;
    });

    return backdropSepiaClasses;
}
