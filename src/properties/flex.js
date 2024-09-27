export function generateFlexClasses() {
    const classes = {};

    const flexValues = {
        '1': '1 1 0%',
        'auto': '1 1 auto',
        'initial': '0 1 auto',
        'none': 'none'
    };

    Object.keys(flexValues).forEach(key => {
        const value = flexValues[key];
        classes[`flex-${key}`] = `flex: ${value};`;
    });

    return classes;
}
