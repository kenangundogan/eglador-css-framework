export function generateBorderWidthClasses() {
    const classes = {};

    const borderWidths = {
        '0': '0px',
        '2': '2px',
        '4': '4px',
        '8': '8px',
        '': '1px'
    };

    Object.keys(borderWidths).forEach((key) => {
        const value = borderWidths[key];
        classes[`border${key !== '' ? `-${key}` : ''}`] = `border-width: ${value};`;
    });

    Object.keys(borderWidths).forEach((key) => {
        const value = borderWidths[key];
        classes[`border-x${key !== '' ? `-${key}` : ''}`] = `border-left-width: ${value}; border-right-width: ${value};`;
    });

    Object.keys(borderWidths).forEach((key) => {
        const value = borderWidths[key];
        classes[`border-y${key !== '' ? `-${key}` : ''}`] = `border-top-width: ${value}; border-bottom-width: ${value};`;
    });

    Object.keys(borderWidths).forEach((key) => {
        const value = borderWidths[key];
        classes[`border-s${key !== '' ? `-${key}` : ''}`] = `border-inline-start-width: ${value};`;
        classes[`border-e${key !== '' ? `-${key}` : ''}`] = `border-inline-end-width: ${value};`;
    });

    Object.keys(borderWidths).forEach((key) => {
        const value = borderWidths[key];
        classes[`border-t${key !== '' ? `-${key}` : ''}`] = `border-top-width: ${value};`;
        classes[`border-r${key !== '' ? `-${key}` : ''}`] = `border-right-width: ${value};`;
        classes[`border-b${key !== '' ? `-${key}` : ''}`] = `border-bottom-width: ${value};`;
        classes[`border-l${key !== '' ? `-${key}` : ''}`] = `border-left-width: ${value};`;
    });

    return classes;
}
