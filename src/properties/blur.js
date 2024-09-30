export function generateBlurClasses() {
    const blurClasses = {};

    const blurs = {
        'blur-none': '',
        'blur': 'blur(8px)',
        'blur-2xl': 'blur(40px)',
        'blur-3xl': 'blur(64px)',
        'blur-lg': 'blur(16px)',
        'blur-md': 'blur(12px)',
        'blur-sm': 'blur(4px)',
        'blur-xl': 'blur(24px)',
    };

    Object.entries(blurs).forEach(([className, blurValue]) => {
        blurClasses[className] = `
            --kg-blur: ${blurValue};
            filter: var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow);
        `;
    });

    return blurClasses;
}
