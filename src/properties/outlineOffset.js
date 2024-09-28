export function generateOutlineOffsetClasses() {
    const classes = {};

    const outlineOffsets = {
        '0': '0px',
        '1': '1px',
        '2': '2px',
        '4': '4px',
        '8': '8px'
    };

    Object.keys(outlineOffsets).forEach((key) => {
        const value = outlineOffsets[key];
        classes[`outline-offset-${key}`] = `outline-offset: ${value};`;
    });

    return classes;
}
