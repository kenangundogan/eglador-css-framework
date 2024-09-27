export function generateHeightClasses() {
    const classes = {};
    const heightScale = ['0px', '1px', '0.125rem', '0.25rem', '0.375rem', '0.5rem', '0.625rem', '0.75rem', '0.875rem', '1rem', '1.25rem', '1.5rem', '1.75rem', '2rem', '2.25rem', '2.5rem', '2.75rem', '3rem', '3.5rem', '4rem', '5rem', '6rem', '7rem', '8rem', '9rem', '10rem', '11rem', '12rem', '13rem', '14rem', '15rem', '16rem', '18rem', '20rem', '24rem', 'auto', '50%', '33.333333%', '66.666667%', '25%', '50%', '75%', '20%', '40%', '60%', '80%', '16.666667%', '33.333333%', '50%', '66.666667%', '83.333333%', '100%', '100vh', '100svh', '100lvh', '100dvh', 'min-content', 'max-content', 'fit-content'];
    const heightNames = ['0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', 'auto', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4', '1/5', '2/5', '3/5', '4/5', '1/6', '2/6', '3/6', '4/6', '5/6', 'full', 'screen', 'svh', 'lvh', 'dvh', 'min', 'max', 'fit'];

    heightScale.forEach((value, index) => {
        const remValue = `${value}`;
        classes[`h-${heightNames[index]}`] = `height: ${remValue};`;
    });

    return classes;
}
