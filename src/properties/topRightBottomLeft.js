export function generateTopRightBottomLeftClasses() {
    const classes = {};

    const insetScale = {
        '0': '0px',
        'px': '1px',
        '0.5': '0.125rem', // 2px
        '1': '0.25rem', // 4px
        '1.5': '0.375rem', // 6px
        '2': '0.5rem', // 8px
        '2.5': '0.625rem', // 10px
        '3': '0.75rem', // 12px
        '3.5': '0.875rem', // 14px
        '4': '1rem', // 16px
        '5': '1.25rem', // 20px
        '6': '1.5rem', // 24px
        '7': '1.75rem', // 28px
        '8': '2rem', // 32px
        '9': '2.25rem', // 36px
        '10': '2.5rem', // 40px
        '12': '3rem', // 48px
        '14': '3.5rem', // 56px
        '16': '4rem', // 64px,
        'auto': 'auto',
        'full': '100%',
    };

    const directions = ['inset', 'top', 'right', 'bottom', 'left', 'inset-x', 'inset-y', 'start', 'end'];

    directions.forEach((direction) => {
        Object.keys(insetScale).forEach((key) => {
            const value = insetScale[key];

            // Pozitif değerler
            switch (direction) {
                case 'inset':
                    classes[`inset-${key}`] = `inset: ${value};`;
                    break;
                case 'top':
                    classes[`top-${key}`] = `top: ${value};`;
                    break;
                case 'right':
                    classes[`right-${key}`] = `right: ${value};`;
                    break;
                case 'bottom':
                    classes[`bottom-${key}`] = `bottom: ${value};`;
                    break;
                case 'left':
                    classes[`left-${key}`] = `left: ${value};`;
                    break;
                case 'inset-x':
                    classes[`inset-x-${key}`] = `left: ${value}; right: ${value};`;
                    break;
                case 'inset-y':
                    classes[`inset-y-${key}`] = `top: ${value}; bottom: ${value};`;
                    break;
                case 'start':
                    classes[`start-${key}`] = `inset-inline-start: ${value};`;
                    break;
                case 'end':
                    classes[`end-${key}`] = `inset-inline-end: ${value};`;
                    break;
            }

            // Negatif değerler
            if (key !== 'auto' && key !== 'full') {
                const negativeValue = `-${value}`;
                switch (direction) {
                    case 'inset':
                        classes[`-inset-${key}`] = `inset: ${negativeValue};`;
                        break;
                    case 'top':
                        classes[`-top-${key}`] = `top: ${negativeValue};`;
                        break;
                    case 'right':
                        classes[`-right-${key}`] = `right: ${negativeValue};`;
                        break;
                    case 'bottom':
                        classes[`-bottom-${key}`] = `bottom: ${negativeValue};`;
                        break;
                    case 'left':
                        classes[`-left-${key}`] = `left: ${negativeValue};`;
                        break;
                    case 'inset-x':
                        classes[`-inset-x-${key}`] = `left: ${negativeValue}; right: ${negativeValue};`;
                        break;
                    case 'inset-y':
                        classes[`-inset-y-${key}`] = `top: ${negativeValue}; bottom: ${negativeValue};`;
                        break;
                    case 'start':
                        classes[`-start-${key}`] = `inset-inline-start: ${negativeValue};`;
                        break;
                    case 'end':
                        classes[`-end-${key}`] = `inset-inline-end: ${negativeValue};`;
                        break;
                }
            }
        });
    });

    return classes;
}
