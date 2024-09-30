export function generateGrayscaleClasses() {
    const grayscaleClasses = {};

    const grayscales = {
        'grayscale-0': 'grayscale(0)',
        'grayscale': 'grayscale(100%)',
    };

    Object.entries(grayscales).forEach(([className, grayscaleValue]) => {
        grayscaleClasses[className] = `
            --kg-grayscale: ${grayscaleValue};
            filter: var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow);
        `;
    });

    return grayscaleClasses;
}
