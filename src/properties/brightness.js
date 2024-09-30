export function generateBrightnessClasses() {
    const brightnessClasses = {};

    const brightnesses = {
        'brightness-0': 'brightness(0)',
        'brightness-50': 'brightness(.5)',
        'brightness-75': 'brightness(.75)',
        'brightness-90': 'brightness(.9)',
        'brightness-95': 'brightness(.95)',
        'brightness-100': 'brightness(1)',
        'brightness-105': 'brightness(1.05)',
        'brightness-110': 'brightness(1.1)',
        'brightness-125': 'brightness(1.25)',
        'brightness-150': 'brightness(1.5)',
        'brightness-200': 'brightness(2)',
    };

    Object.entries(brightnesses).forEach(([className, brightnessValue]) => {
        brightnessClasses[className] = `
            --kg-brightness: ${brightnessValue};
            filter: var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow);
        `;
    });

    return brightnessClasses;
}
