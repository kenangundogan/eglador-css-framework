export function generateFlexShrinkClasses() {
    const classes = {};

    const flexShrinkValues = {
        '': '1',
        '0': '0'
    };

    Object.keys(flexShrinkValues).forEach(key => {
        const value = flexShrinkValues[key];
        const className = key === '' ? 'shrink' : `shrink-${key}`;
        const classNameOld = key === '' ? 'flex-shrink' : `flex-shrink-${key}`;
        classes[className] = `flex-shrink: ${value};`;
        classes[classNameOld] = `flex-shrink: ${value};`;
    });
    return classes;
}
