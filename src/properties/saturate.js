export function generateSaturateClasses() {
    const saturateClasses = {};

    const saturates = {
        'saturate-0': 'saturate(0)',
        'saturate-50': 'saturate(.5)',
        'saturate-100': 'saturate(1)',
        'saturate-150': 'saturate(1.5)',
        'saturate-200': 'saturate(2)',
    };

    Object.entries(saturates).forEach(([className, saturateValue]) => {
        saturateClasses[className] = `
            --kg-saturate: ${saturateValue};
            filter: var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow);
        `;
    });

    return saturateClasses;
}
