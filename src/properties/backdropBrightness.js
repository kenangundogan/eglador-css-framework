export function generateBackdropBrightnessClasses() {
    const backdropBrightnessClasses = {};

    const backdropBrightnesses = {
        'backdrop-brightness-0': 'brightness(0)',
        'backdrop-brightness-50': 'brightness(.5)',
        'backdrop-brightness-75': 'brightness(.75)',
        'backdrop-brightness-90': 'brightness(.9)',
        'backdrop-brightness-95': 'brightness(.95)',
        'backdrop-brightness-100': 'brightness(1)',
        'backdrop-brightness-105': 'brightness(1.05)',
        'backdrop-brightness-110': 'brightness(1.1)',
        'backdrop-brightness-125': 'brightness(1.25)',
        'backdrop-brightness-150': 'brightness(1.5)',
        'backdrop-brightness-200': 'brightness(2)',
    };

    Object.entries(backdropBrightnesses).forEach(([className, backdropBrightnessValue]) => {
        backdropBrightnessClasses[className] = `
            --kg-backdrop-brightness: ${backdropBrightnessValue};
            backdrop-filter: var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia);
        `;
    });

    return backdropBrightnessClasses;
}
