import tinycolor from 'tinycolor2';

export function generateColorClasses() {
    const colorClasses = {};

    const colors = {
        slate: '#f8fafc',
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

            // text-decoration-color class'ı için CSS kuralı oluşturalım
            colorClasses[`decoration-${colorName}-${value}`] = `text-decoration-color: ${darkenedColor};`;

            // outline-color class'ı için CSS kuralı oluşturalım
            colorClasses[`outline-${colorName}-${value}`] = `outline-color: ${darkenedColor};`;
        });
    });

    colorClasses['text-inherit'] = 'color: inherit;';
    colorClasses['text-current'] = 'color: currentColor;';
    colorClasses['text-transparent'] = 'color: transparent;';
    colorClasses['text-black'] = 'color: rgb(0 0 0);';
    colorClasses['text-white'] = 'color: rgb(255 255 255);';

    colorClasses['bg-inherit'] = 'background-color: inherit;';
    colorClasses['bg-current'] = 'background-color: currentColor;';
    colorClasses['bg-transparent'] = 'background-color: transparent;';
    colorClasses['bg-black'] = 'background-color: rgb(0 0 0);';
    colorClasses['bg-white'] = 'background-color: rgb(255 255 255);';

    colorClasses['border-inherit'] = 'border-color: inherit;';
    colorClasses['border-current'] = 'border-color: currentColor;';
    colorClasses['border-transparent'] = 'border-color: transparent;';
    colorClasses['border-black'] = 'border-color: rgb(0 0 0);';
    colorClasses['border-white'] = 'border-color: rgb(255 255 255);';

    colorClasses['decoration-inherit'] = 'text-decoration-color: inherit;';
    colorClasses['decoration-current'] = 'text-decoration-color: currentColor;';
    colorClasses['decoration-transparent'] = 'text-decoration-color: transparent;';
    colorClasses['decoration-black'] = 'text-decoration-color: rgb(0 0 0);';
    colorClasses['decoration-white'] = 'text-decoration-color: rgb(255 255 255);';

    colorClasses['outline-inherit'] = 'outline-color: inherit;';
    colorClasses['outline-current'] = 'outline-color: currentColor;';
    colorClasses['outline-transparent'] = 'outline-color: transparent;';
    colorClasses['outline-black'] = 'outline-color: rgb(0 0 0);';
    colorClasses['outline-white'] = 'outline-color: rgb(255 255 255);';

    return colorClasses;
}
