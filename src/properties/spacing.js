export function generateSpacingClasses() {
    const classes = {};
    const spacingScale = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48];

    spacingScale.forEach(value => {
        const remValue = `${value}rem`;
        classes[`m-${value}`] = `margin: ${remValue};`;
        classes[`mb-${value}`] = `margin-bottom: ${remValue};`;
        classes[`mt-${value}`] = `margin-top: ${remValue};`;
        classes[`ml-${value}`] = `margin-left: ${remValue};`;
        classes[`mr-${value}`] = `margin-right: ${remValue};`;
        classes[`mx-${value}`] = `margin-left: ${remValue}; margin-right: ${remValue};`;
        classes[`my-${value}`] = `margin-top: ${remValue}; margin-bottom: ${remValue};`;
        classes[`p-${value}`] = `padding: ${remValue};`;
        classes[`pt-${value}`] = `padding-top: ${remValue};`;
        classes[`pb-${value}`] = `padding-bottom: ${remValue};`;
        classes[`pl-${value}`] = `padding-left: ${remValue};`;
        classes[`pr-${value}`] = `padding-right: ${remValue};`;
        classes[`px-${value}`] = `padding-left: ${remValue}; padding-right: ${remValue};`;
        classes[`py-${value}`] = `padding-top: ${remValue}; padding-bottom: ${remValue};`;
    });

    return classes;
}
