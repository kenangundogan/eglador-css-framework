export function generateFlexShrinkClasses() {
    const classes = {};

    const flexShrinkValues = {
        '': '1',  // shrink -> flex-shrink: 1
        '0': '0'  // shrink-0 -> flex-shrink: 0
    };

    Object.keys(flexShrinkValues).forEach(key => {
        const value = flexShrinkValues[key];
        const className = key === '' ? 'shrink' : `shrink-${key}`;
        classes[className] = `flex-shrink: ${value};`;
    });

    return classes;
}
