import tinycolor from 'tinycolor2';

export function generateColorClasses() {
    const colorClasses = {};

    const colors = {
        gray: '#f9fafb',
        zinc: '#fafafa',
        neutral: '#fafafa',
        stone: '#fafaf9',
        red: '#fef2f2',
        orange: '#fff7ed',
        amber: '#fffbeb',
        yellow: '#fefce8',
        lime: '#f7fee7',
        green: '#f0fdf4',
        emerald: '#ecfdf5',
        teal: '#f0fdfa',
        cyan: '#ecfeff',
        sky: '#f0f9ff',
        blue: '#eff6ff',
        indigo: '#eef2ff',
        violet: '#f5f3ff',
        purple: '#fae8ff',
        fuchsia: '#fdf4ff',
        pink: '#fdf2f8',
        rose: '#fff1f2',
    };

    const colorValueRange = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

    // Her renk için background-color ve text-color sınıflarını hesaplayalım
    Object.entries(colors).forEach(([colorName, startColor]) => {
        colorValueRange.forEach((value, index) => {
            // Rengi her adımda biraz karartarak ilerliyoruz
            const darkenedColor = tinycolor(startColor).darken((index / colorValueRange.length) * 100).toRgbString();

            // background-color class'ı için CSS kuralı oluşturalım
            colorClasses[`bg-${colorName}-${value}`] = `background-color: ${darkenedColor};`;

            // text-color class'ı için CSS kuralı oluşturalım
            colorClasses[`text-${colorName}-${value}`] = `color: ${darkenedColor};`;

            // border-color class'ı için CSS kuralı oluşturalım
            colorClasses[`border-${colorName}-${value}`] = `border-color: ${darkenedColor};`;
        });
    });

    return colorClasses;
}
