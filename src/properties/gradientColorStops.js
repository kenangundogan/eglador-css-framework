import tinycolor from 'tinycolor2';
import { colors, colorRange, opacities } from './_color.js';

export function generateGradientColorStopsClasses() {
    const gradientColorStopsClasses = {};

    // Gradient color stops sınıflarını oluştur
    for (const [colorName, { value: colorValue, hasRange }] of Object.entries(colors)) {
        // from-... sınıfları
        gradientColorStopsClasses[`from-${colorName}`] = `--kg-gradient-from: ${colorValue} var(--kg-gradient-from-position); --kg-gradient-to: rgb(255 255 255 / 0) var(--kg-gradient-to-position); --kg-gradient-stops: var(--kg-gradient-from), var(--kg-gradient-to);`;

        // via-... sınıfları
        gradientColorStopsClasses[`via-${colorName}`] = `--kg-gradient-stops: var(--kg-gradient-from), ${colorValue} var(--kg-gradient-via-position), var(--kg-gradient-to);`;

        // to-... sınıfları
        gradientColorStopsClasses[`to-${colorName}`] = `--kg-gradient-to: ${colorValue} var(--kg-gradient-to-position);`;

        // Renk aralığına göre from-..., via-... ve to-... sınıflarını ekle
        if (hasRange) {
            colorRange.forEach((value, index) => {
                const rangeColor = tinycolor(colorValue).darken((index / colorRange.length) * 100).toRgbString();

                gradientColorStopsClasses[`from-${colorName}-${value}`] = `--kg-gradient-from: ${rangeColor} var(--kg-gradient-from-position); --kg-gradient-to: rgb(255 255 255 / 0) var(--kg-gradient-to-position); --kg-gradient-stops: var(--kg-gradient-from), var(--kg-gradient-to);`;

                gradientColorStopsClasses[`via-${colorName}-${value}`] = `--kg-gradient-stops: var(--kg-gradient-from), ${rangeColor} var(--kg-gradient-via-position), var(--kg-gradient-to);`;

                gradientColorStopsClasses[`to-${colorName}-${value}`] = `--kg-gradient-to: ${rangeColor} var(--kg-gradient-to-position);`;
            });
        }

        // Opacity'lere göre from-..., via-... ve to-... sınıflarını ekle
        Object.entries(opacities).forEach(([opacityKey, opacityValue]) => {
            const opacityFromColor = tinycolor(colorValue).setAlpha(opacityValue).toRgbString();
            gradientColorStopsClasses[`from-${colorName}\/${opacityKey}`] = `--kg-gradient-from: ${opacityFromColor} var(--kg-gradient-from-position); --kg-gradient-to: rgb(255 255 255 / 0) var(--kg-gradient-to-position); --kg-gradient-stops: var(--kg-gradient-from), var(--kg-gradient-to);`;

            const opacityViaColor = tinycolor(colorValue).setAlpha(opacityValue).toRgbString();
            gradientColorStopsClasses[`via-${colorName}\/${opacityKey}`] = `--kg-gradient-stops: var(--kg-gradient-from), ${opacityViaColor} var(--kg-gradient-via-position), var(--kg-gradient-to);`;

            const opacityToColor = tinycolor(colorValue).setAlpha(opacityValue).toRgbString();
            gradientColorStopsClasses[`to-${colorName}\/${opacityKey}`] = `--kg-gradient-to: ${opacityToColor} var(--kg-gradient-to-position);`;
        });
    }

    return gradientColorStopsClasses;
}
