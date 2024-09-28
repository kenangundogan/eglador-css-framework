export function generateTextDecorationThicknessClasses() {
    const classes = {};

    const textDecorationThicknessValues = {
        'auto': 'auto',
        'from-font': 'from-font',
        '0': '0px',
        '1': '1px',
        '2': '2px',
        '4': '4px',
        '8': '8px',
    };

    Object.keys(textDecorationThicknessValues).forEach(key => {
        const value = textDecorationThicknessValues[key];
        classes[`decoration-${key}`] = `text-decoration-thickness: ${value};`;
    });

    return classes;
}
