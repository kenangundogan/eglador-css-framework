export function generateBorderRadiusClasses() {
    const classes = {};
    const borderRadiusScale = {
        'none': '0px',
        'sm': '0.125rem',
        '': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px'
    };

    const positionPrefix = ['', 's-', 'e-', 't-', 'r-', 'b-', 'l-', 'ss-', 'se-', 'ee-', 'es-', 'tl-', 'tr-', 'br-', 'bl-'];

    positionPrefix.forEach((prefix) => {
        Object.keys(borderRadiusScale).forEach((key) => {
            const className = `rounded-${prefix}${key}`;
            const borderRadiusValue = borderRadiusScale[key];
            if (prefix === '') {
                classes[className] = `border-radius: ${borderRadiusValue};`;
            } else if (['s-', 'e-'].includes(prefix)) {
                classes[className] = `
                    border-${prefix === 's-' ? 'start-start-radius' : 'start-end-radius'}: ${borderRadiusValue};
                    border-${prefix === 's-' ? 'end-start-radius' : 'end-end-radius'}: ${borderRadiusValue};
                `;
            } else {
                classes[className] = `
                    border-${prefix === 't-' ? 'top-left-radius' : prefix === 'r-' ? 'top-right-radius' : prefix === 'b-' ? 'bottom-right-radius' : 'bottom-left-radius'}: ${borderRadiusValue};
                    border-${prefix === 't-' ? 'top-right-radius' : prefix === 'r-' ? 'bottom-right-radius' : prefix === 'b-' ? 'bottom-left-radius' : 'top-left-radius'}: ${borderRadiusValue};
                `;
            }
        });
    });

    return classes;
}
