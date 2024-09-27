export function generateFontSizeClasses() {
    const classes = {};
    const fontSizeScale = [0.75, 0.875, 1, 1.125, 1.25, 1.5, 1.875, 2.25, 3, 3.75, 4.5, 6, 8];
    const fontSizeNames = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '9xl'];

    fontSizeScale.forEach((value, index) => {
        const remValue = `${value}rem`;
        classes[`text-${fontSizeNames[index]}`] = `font-size: ${remValue};`;
    });

    return classes;
}
