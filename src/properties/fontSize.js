export function generateFontSizeClasses() {
    const classes = {};

    const fontSizes = {
        'xs': { 'fontSize': '0.75rem', 'lineHeight': '1rem' }, // 12px font-size, 16px line-height
        'sm': { 'fontSize': '0.875rem', 'lineHeight': '1.25rem' }, // 14px font-size, 20px line-height
        'base': { 'fontSize': '1rem', 'lineHeight': '1.5rem' }, // 16px font-size, 24px line-height
        'lg': { 'fontSize': '1.125rem', 'lineHeight': '1.75rem' }, // 18px font-size, 28px line-height
        'xl': { 'fontSize': '1.25rem', 'lineHeight': '1.75rem' }, // 20px font-size, 28px line-height
        '2xl': { 'fontSize': '1.5rem', 'lineHeight': '2rem' }, // 24px font-size, 32px line-height
        '3xl': { 'fontSize': '1.875rem', 'lineHeight': '2.25rem' }, // 30px font-size, 36px line-height
        '4xl': { 'fontSize': '2.25rem', 'lineHeight': '2.5rem' }, // 36px font-size, 40px line-height
        '5xl': { 'fontSize': '3rem', 'lineHeight': '1' }, // 48px font-size, line-height 1
        '6xl': { 'fontSize': '3.75rem', 'lineHeight': '1' }, // 60px font-size, line-height 1
        '7xl': { 'fontSize': '4.5rem', 'lineHeight': '1' }, // 72px font-size, line-height 1
        '8xl': { 'fontSize': '6rem', 'lineHeight': '1' }, // 96px font-size, line-height 1
        '9xl': { 'fontSize': '8rem', 'lineHeight': '1' }, // 128px font-size, line-height 1
    };

    Object.keys(fontSizes).forEach((key) => {
        const { fontSize, lineHeight } = fontSizes[key];
        classes[`text-${key}`] = `font-size: ${fontSize}; line-height: ${lineHeight};`;
    });

    return classes;
}
