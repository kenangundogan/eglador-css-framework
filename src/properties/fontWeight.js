export function generateFontWeightClasses() {
    const classes = {};

    const fontWeightValues = {
        'thin': 100,
        'extralight': 200,
        'light': 300,
        'normal': 400,
        'medium': 500,
        'semibold': 600,
        'bold': 700,
        'extrabold': 800,
        'black': 900
    };

    Object.keys(fontWeightValues).forEach(key => {
        const value = fontWeightValues[key];
        classes[`font-${key}`] = `font-weight: ${value};`;
    });

    return classes;
}
