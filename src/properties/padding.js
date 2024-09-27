export function generatePaddingClasses() {
    const classes = {};
    const paddingScale = ['auto', '0px', '1px', '0.125rem', '0.25rem', '0.375rem', '0.5rem', '0.625rem', '0.75rem', '0.875rem', '1rem', '1.25rem', '1.5rem', '1.75rem', '2rem', '2.25rem', '2.5rem', '2.75rem', '3rem', '3.5rem', '4rem', '5rem', '6rem', '7rem', '8rem', '9rem', '10rem', '11rem', '12rem', '13rem', '14rem', '15rem', '16rem', '18rem', '20rem', '24rem'];
    const paddingNames = ['auto', '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96'];

    paddingScale.forEach((value, index) => {
        const remValue = `${value}`;
        classes[`p-${paddingNames[index]}`] = `padding: ${remValue};`;
        classes[`pt-${paddingNames[index]}`] = `padding-top: ${remValue};`;
        classes[`pr-${paddingNames[index]}`] = `padding-right: ${remValue};`;
        classes[`pb-${paddingNames[index]}`] = `padding-bottom: ${remValue};`;
        classes[`pl-${paddingNames[index]}`] = `padding-left: ${remValue};`;
        classes[`px-${paddingNames[index]}`] = `padding-left: ${remValue}; padding-right: ${remValue};`;
        classes[`py-${paddingNames[index]}`] = `padding-top: ${remValue}; padding-bottom: ${remValue};`;
    });

    return classes;
}
