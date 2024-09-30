export function generateBackdropInvertClasses() {
    const backdropInvertClasses = {};

    const backdropInverts = {
        'backdrop-invert-0': 'invert(0)',
        'backdrop-invert': 'invert(100%)',
    };

    Object.entries(backdropInverts).forEach(([className, backdropInvertValue]) => {
        backdropInvertClasses[className] = `
            --kg-backdrop-invert: ${backdropInvertValue};
            backdrop-filter: var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia);
        `;
    });

    return backdropInvertClasses;
}
