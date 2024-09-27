export function generateFlexGrowClasses() {
    const classes = {};

    const flexGrowValues = {
        '': '1',  // grow -> flex-grow: 1
        '0': '0'  // grow-0 -> flex-grow: 0
    };

    Object.keys(flexGrowValues).forEach(key => {
        const value = flexGrowValues[key];
        const className = key === '' ? 'grow' : `grow-${key}`;
        classes[className] = `flex-grow: ${value};`;
    });

    return classes;
}
