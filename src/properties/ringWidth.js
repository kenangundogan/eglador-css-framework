export function generateRingWidthClasses() {
    const ringWidthClasses = {};

    const ringWidths = {
        '0': '0px',
        '1': '1px',
        '2': '2px',
        '': '3px',
        '4': '4px',
        '8': '8px'
    };

    Object.entries(ringWidths).forEach(([key, width]) => {
        const className = key === '' ? 'ring' : `ring-${key}`;

        ringWidthClasses[className] = `
            --kg-ring-offset-shadow: var(--kg-ring-inset) 0 0 0 var(--kg-ring-offset-width) var(--kg-ring-offset-color);
            --kg-ring-shadow: var(--kg-ring-inset) 0 0 0 calc(${width} + var(--kg-ring-offset-width)) var(--kg-ring-color);
            box-shadow: var(--kg-ring-offset-shadow), var(--kg-ring-shadow), var(--kg-shadow, 0 0 #0000);
        `;
    });

    ringWidthClasses['ring-inset'] = `--kg-ring-inset: inset;`;

    return ringWidthClasses;
}
