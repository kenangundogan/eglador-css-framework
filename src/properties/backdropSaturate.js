export function generateBackdropSaturateClasses() {
    const backdropSaturateClasses = {};

    const backdropSaturates = {
        'backdrop-saturate-0': 'saturate(0)',
        'backdrop-saturate-50': 'saturate(.5)',
        'backdrop-saturate-100': 'saturate(1)',
        'backdrop-saturate-150': 'saturate(1.5)',
        'backdrop-saturate-200': 'saturate(2)',
    };

    Object.entries(backdropSaturates).forEach(([className, backdropSaturateValue]) => {
        backdropSaturateClasses[className] = `
            --kg-backdrop-saturate: ${backdropSaturateValue};
            backdrop-filter: var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia);
        `;
    });

    return backdropSaturateClasses;
}
