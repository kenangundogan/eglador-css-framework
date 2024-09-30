export function generateBackdropHueRotateClasses() {
    const backdropHueRotateClasses = {};

    const backdropHueRotates = {
        'backdrop-hue-rotate-0': 'hue-rotate(0deg)',
        'backdrop-hue-rotate-15': 'hue-rotate(15deg)',
        'backdrop-hue-rotate-30': 'hue-rotate(30deg)',
        'backdrop-hue-rotate-60': 'hue-rotate(60deg)',
        'backdrop-hue-rotate-90': 'hue-rotate(90deg)',
        'backdrop-hue-rotate-180': 'hue-rotate(180deg)',
    };

    Object.entries(backdropHueRotates).forEach(([className, backdropHueRotateValue]) => {
        backdropHueRotateClasses[className] = `
            --kg-backdrop-hue-rotate: ${backdropHueRotateValue};
            backdrop-filter: var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia);
        `;
    });

    return backdropHueRotateClasses;
}
