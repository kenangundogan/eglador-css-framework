export function generateDropShadowClasses() {
    const dropShadowClasses = {};

    const dropShadows = {
        'drop-shadow-sm': 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
        'drop-shadow': 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))',
        'drop-shadow-md': 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
        'drop-shadow-lg': 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
        'drop-shadow-xl': 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))',
        'drop-shadow-2xl': 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
        'drop-shadow-none': 'drop-shadow(0 0 #0000)',
    };

    Object.entries(dropShadows).forEach(([className, dropShadowValue]) => {
        dropShadowClasses[className] = `
            --kg-drop-shadow: ${dropShadowValue};
            filter: var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow);
        `;
    });

    return dropShadowClasses;
}
