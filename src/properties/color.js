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

    const opacities = {
        '0': '0',
        '5': '0.05',
        '10': '0.1',
        '15': '0.15',
        '20': '0.2',
        '25': '0.25',
        '30': '0.3',
        '35': '0.35',
        '40': '0.4',
        '45': '0.45',
        '50': '0.5',
        '55': '0.55',
        '60': '0.6',
        '65': '0.65',
        '70': '0.7',
        '75': '0.75',
        '80': '0.8',
        '85': '0.85',
        '90': '0.9',
        '95': '0.95',
        '100': '1'
    };

    const colorValueRange = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

    Object.entries(colors).forEach(([colorName, startColor]) => {
        colorValueRange.forEach((value, index) => {
            const darkenedColor = tinycolor(startColor).darken((index / colorValueRange.length) * 100).toRgbString();
            const transparentColor = tinycolor(startColor).setAlpha(0).toRgbString();

            // background-color
            colorClasses[`bg-${colorName}-${value}`] = `background-color: ${darkenedColor}; --kg-bg-opacity: 1;`;

            // background-color for opacity
            Object.keys(opacities).forEach((opacityKey) => {
                colorClasses[`bg-${colorName}-${value}/${opacityKey}`] = `background-color: ${tinycolor(startColor).darken((index / colorValueRange.length) * 100).setAlpha(parseFloat(opacities[opacityKey])).toRgbString()};`;
            });

            // text-color
            colorClasses[`text-${colorName}-${value}`] = `color: ${darkenedColor}; --kg-text-opacity: 1;`;

            // text-color for opacity
            Object.keys(opacities).forEach((opacityKey) => {
                colorClasses[`text-${colorName}-${value}/${opacityKey}`] = `color: ${tinycolor(startColor).darken((index / colorValueRange.length) * 100).setAlpha(parseFloat(opacities[opacityKey])).toRgbString()};`;
            });

            // border-color
            colorClasses[`border-${colorName}-${value}`] = `border-color: ${darkenedColor}; --kg-border-opacity: 1;`;

            // border-color for opacity
            Object.keys(opacities).forEach((opacityKey) => {
                colorClasses[`border-${colorName}-${value}/${opacityKey}`] = `border-color: ${tinycolor(startColor).darken((index / colorValueRange.length) * 100).setAlpha(parseFloat(opacities[opacityKey])).toRgbString()};`;
            });

            // text-decoration-color
            colorClasses[`decoration-${colorName}-${value}`] = `text-decoration-color: ${darkenedColor};`;

            // outline-color
            colorClasses[`outline-${colorName}-${value}`] = `outline-color: ${darkenedColor};`;

            // accent-color
            colorClasses[`accent-${colorName}-${value}`] = `accent-color: ${darkenedColor};`;

            // caret-color
            colorClasses[`caret-${colorName}-${value}`] = `caret-color: ${darkenedColor};`;

            // fill-color
            colorClasses[`fill-${colorName}-${value}`] = `fill: ${darkenedColor};`;

            // stroke-color
            colorClasses[`stroke-${colorName}-${value}`] = `stroke: ${darkenedColor};`;

            // divide-color
            colorClasses[`divide-${colorName}-${value}` + ' > * + *'] = { 'border-color': darkenedColor };

            // shadow-color
            colorClasses[`shadow-${colorName}-${value}`] = `--kg-shadow-color: ${darkenedColor}; --kg-shadow: var(--kg-shadow-colored)!important;`;

            // background-color to, via, from
            colorClasses[`to-${colorName}-${value}`] = `--kg-gradient-to: ${darkenedColor} var(--kg-gradient-to-position);`;
            colorClasses[`via-${colorName}-${value}`] = `
            --kg-gradient-to: ${transparentColor} var(--kg-gradient-to-position);
            --kg-gradient-stops: var(--kg-gradient-from), ${darkenedColor} var(--kg-gradient-to-position), var(--kg-gradient-to);
            `;
            colorClasses[`from-${colorName}-${value}`] = `
            --kg-gradient-from: ${darkenedColor} var(--kg-gradient-from-position);
            --kg-gradient-to: ${transparentColor} var(--kg-gradient-to-position);
            --kg-gradient-stops: var(--kg-gradient-from), var(--kg-gradient-to);
            `;

        });
    });

    colorClasses['text-inherit'] = 'color: inherit;';
    colorClasses['text-current'] = 'color: currentColor;';
    colorClasses['text-transparent'] = 'color: transparent;';
    colorClasses['text-black'] = 'color: rgb(0 0 0);';
    colorClasses['text-white'] = 'color: rgb(255 255 255);';

    // text-white and black with opacity
    Object.keys(opacities).forEach((opacityKey) => {
        colorClasses[`text-white/${opacityKey}`] = `color: ${tinycolor('#ffffff').setAlpha(parseFloat(opacities[opacityKey])).toRgbString()};`;
        colorClasses[`text-black/${opacityKey}`] = `color: ${tinycolor('#000000').setAlpha(parseFloat(opacities[opacityKey])).toRgbString()};`;
    });

    colorClasses['bg-inherit'] = 'background-color: inherit;';
    colorClasses['bg-current'] = 'background-color: currentColor;';
    colorClasses['bg-transparent'] = 'background-color: transparent;';
    colorClasses['bg-black'] = 'background-color: rgb(0 0 0);';
    colorClasses['bg-white'] = 'background-color: rgb(255 255 255);';

    // bg-white and black with opacity
    Object.keys(opacities).forEach((opacityKey) => {
        colorClasses[`bg-white/${opacityKey}`] = `background-color: ${tinycolor('#ffffff').setAlpha(parseFloat(opacities[opacityKey])).toRgbString()};`;
        colorClasses[`bg-black/${opacityKey}`] = `background-color: ${tinycolor('#000000').setAlpha(parseFloat(opacities[opacityKey])).toRgbString()};`;
    });

    colorClasses['border-inherit'] = 'border-color: inherit;';
    colorClasses['border-current'] = 'border-color: currentColor;';
    colorClasses['border-transparent'] = 'border-color: transparent;';
    colorClasses['border-black'] = 'border-color: rgb(0 0 0);';
    colorClasses['border-white'] = 'border-color: rgb(255 255 255);';

    // border-white and black with opacity
    Object.keys(opacities).forEach((opacityKey) => {
        colorClasses[`border-white/${opacityKey}`] = `border-color: ${tinycolor('#ffffff').setAlpha(parseFloat(opacities[opacityKey])).toRgbString()};`;
        colorClasses[`border-black/${opacityKey}`] = `border-color: ${tinycolor('#000000').setAlpha(parseFloat(opacities[opacityKey])).toRgbString()};`;
    });

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

    colorClasses['accent-inherit'] = 'accent-color: inherit;';
    colorClasses['accent-current'] = 'accent-color: currentColor;';
    colorClasses['accent-transparent'] = 'accent-color: transparent;';
    colorClasses['accent-black'] = 'accent-color: rgb(0 0 0);';
    colorClasses['accent-white'] = 'accent-color: rgb(255 255 255);';

    colorClasses['caret-inherit'] = 'caret-color: inherit;';
    colorClasses['caret-current'] = 'caret-color: currentColor;';
    colorClasses['caret-transparent'] = 'caret-color: transparent;';
    colorClasses['caret-black'] = 'caret-color: rgb(0 0 0);';
    colorClasses['caret-white'] = 'caret-color: rgb(255 255 255);';

    colorClasses['fill-inherit'] = 'fill: inherit;';
    colorClasses['fill-current'] = 'fill: currentColor;';
    colorClasses['fill-transparent'] = 'fill: transparent;';
    colorClasses['fill-black'] = 'fill: rgb(0 0 0);';
    colorClasses['fill-white'] = 'fill: rgb(255 255 255);';

    colorClasses['stroke-inherit'] = 'stroke: inherit;';
    colorClasses['stroke-current'] = 'stroke: currentColor;';
    colorClasses['stroke-transparent'] = 'stroke: transparent;';
    colorClasses['stroke-black'] = 'stroke: rgb(0 0 0);';
    colorClasses['stroke-white'] = 'stroke: rgb(255 255 255);';

    colorClasses['divide-inherit > * + *'] = { 'border-color': 'inherit' };
    colorClasses['divide-current > * + *'] = { 'border-color': 'currentColor' };
    colorClasses['divide-transparent > * + *'] = { 'border-color': 'transparent' };
    colorClasses['divide-black > * + *'] = { 'border-color': 'rgb(0 0 0)' };
    colorClasses['divide-white > * + *'] = { 'border-color': 'rgb(255 255 255)' };

    return colorClasses;
}
