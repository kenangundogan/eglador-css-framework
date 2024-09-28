export function generateStrokeWidthClasses() {
    const classes = {};

    const strokeWidths = {
        '0': '0',
        '1': '1',
        '2': '2',
    };

    Object.keys(strokeWidths).forEach((key) => {
        const value = strokeWidths[key];
        classes[`stroke-${key}`] = `stroke-width: ${value};`;
    });

    return classes;
}
