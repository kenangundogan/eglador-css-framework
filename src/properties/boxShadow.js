export function generateBoxShadowClasses() {
    const classes = {};

    const shadows = {
        'shadow-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'shadow': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'shadow-xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'shadow-2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'shadow-inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'shadow-none': '0 0 #0000',
    };

    Object.entries(shadows).forEach(([className, shadowValue]) => {
        classes[className] = `
            --kg-shadow: ${shadowValue};
            --kg-shadow-colored: ${shadowValue.replace(/rgb\(0 0 0 \/\s*[0-9.]+\)/g, 'var(--kg-shadow-color)')};
            box-shadow: var(--kg-ring-offset-shadow, 0 0 #0000), var(--kg-ring-shadow, 0 0 #0000), var(--kg-shadow);
            `;
    });
    return classes;
}
