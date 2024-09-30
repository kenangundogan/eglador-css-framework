export function generateContrastClasses() {
    const contrastClasses = {};

    const contrasts = {
        'contrast-0': 'contrast(0)',
        'contrast-50': 'contrast(.5)',
        'contrast-75': 'contrast(.75)',
        'contrast-100': 'contrast(1)',
        'contrast-125': 'contrast(1.25)',
        'contrast-150': 'contrast(1.5)',
        'contrast-200': 'contrast(2)',
    };

    Object.entries(contrasts).forEach(([className, contrastValue]) => {
        contrastClasses[className] = `
            --kg-contrast: ${contrastValue};
            filter: var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow);
        `;
    });

    return contrastClasses;
}
