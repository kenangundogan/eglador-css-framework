export function generateOutlineWidthClasses() {
    const classes = {};

    const outlineWidths = {
        '0': '0px',
        '1': '1px',
        '2': '2px',
        '4': '4px',
        '8': '8px'
    };

    Object.keys(outlineWidths).forEach((key) => {
        const value = outlineWidths[key];
        classes[`outline-${key}`] = `outline-width: ${value};`;
    });

    return classes;
}
