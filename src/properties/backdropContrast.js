export function generateBackdropContrastClasses() {
    const backdropContrastClasses = {};

    const backdropContrasts = {
        'backdrop-contrast-0': 'contrast(0)',
        'backdrop-contrast-50': 'contrast(.5)',
        'backdrop-contrast-75': 'contrast(.75)',
        'backdrop-contrast-100': 'contrast(1)',
        'backdrop-contrast-125': 'contrast(1.25)',
        'backdrop-contrast-150': 'contrast(1.5)',
        'backdrop-contrast-200': 'contrast(2)',
    };

    Object.entries(backdropContrasts).forEach(([className, backdropContrastValue]) => {
        backdropContrastClasses[className] = `
            --kg-backdrop-contrast: ${backdropContrastValue};
            backdrop-filter: var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia);
        `;
    });

    return backdropContrastClasses;
}
