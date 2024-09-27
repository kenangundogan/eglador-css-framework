export function generateLeadingClasses() {
    const classes = {};
    const leadingScale = ['0.75rem', '1rem', '1.25rem', '1.5rem', '1.75rem', '2rem', '2.25rem', '1', '1.25', '1.375', '1.5', '1.625', '2'];
    const leadingNames = ['3', '4', '5', '6', '7', '8', '9', 'none', 'tight', 'snug', 'normal', 'relaxed', 'loose'];

    leadingScale.forEach((value, index) => {
        const remValue = `${value}`;
        classes[`leading-${leadingNames[index]}`] = `line-height: ${remValue};`;
    });

    return classes;

}
