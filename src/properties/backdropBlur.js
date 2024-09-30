export function generateBackdropBlurClasses() {
    const backdropBlurClasses = {};

    const backdropBlurs = {
        'backdrop-blur-none': '',
        'backdrop-blur-sm': 'blur(4px)',
        'backdrop-blur': 'blur(8px)',
        'backdrop-blur-md': 'blur(12px)',
        'backdrop-blur-lg': 'blur(16px)',
        'backdrop-blur-xl': 'blur(24px)',
        'backdrop-blur-2xl': 'blur(40px)',
        'backdrop-blur-3xl': 'blur(64px)',
    };

    Object.entries(backdropBlurs).forEach(([className, backdropBlurValue]) => {
        backdropBlurClasses[className] = `
            --kg-backdrop-blur: ${backdropBlurValue};
            backdrop-filter: var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia);
        `;
    });

    return backdropBlurClasses;
}
