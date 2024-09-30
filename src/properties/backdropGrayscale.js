export function generateBackdropGrayscaleClasses() {
    const backdropGrayscaleClasses = {};

    const backdropGrayscales = {
        'backdrop-grayscale-0': 'grayscale(0)',
        'backdrop-grayscale': 'grayscale(100%)',
    };

    Object.entries(backdropGrayscales).forEach(([className, backdropGrayscaleValue]) => {
        backdropGrayscaleClasses[className] = `
            --kg-backdrop-grayscale: ${backdropGrayscaleValue};
            backdrop-filter: var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia);
        `;
    });

    return backdropGrayscaleClasses;
}
