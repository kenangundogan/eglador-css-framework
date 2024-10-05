import tinycolor from 'tinycolor2';
import { colors, colorRange, opacities } from './_color.js';

export function generateBackgroundColorClasses() {
    const backgroundColorClasses = {};

    // Renkler ve opacity'ler ile background-color sınıflarını oluştur
    for (const [colorName, { value: colorValue, hasRange, hasOpacity }] of Object.entries(colors)) {
        // Opacity olmadan temel sınıfı ekle
        const className = `bg-${colorName}`;
        backgroundColorClasses[className] = `--kg-bg-opacity: 1; background-color: ${colorValue};`;

        // Renk aralığına göre sınıfları ekle (hasRange varsa)
        if (hasRange) {
            colorRange.forEach((value, index) => {
                const darkenedColor = tinycolor(colorValue).darken((index / colorRange.length) * 100).toRgbString();

                // Opacity'siz varyasyon
                backgroundColorClasses[`bg-${colorName}-${value}`] = `--kg-bg-opacity: 1; background-color: ${darkenedColor};`;

                // Her bir range için opacity'li versiyonlar (hasOpacity varsa)
                if (hasOpacity) {
                    for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                        const opacityColor = tinycolor(darkenedColor).setAlpha(opacityValue).toRgbString();
                        backgroundColorClasses[`bg-${colorName}-${value}\/${opacityKey}`] = `--kg-bg-opacity: ${opacityValue}; background-color: ${opacityColor};`;
                    }
                }
            });
        }

        // Sadece opacity'li versiyonlar (colorRange olmadan)
        if (hasOpacity && !hasRange) {
            for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                const opacityColor = tinycolor(colorValue).setAlpha(opacityValue).toRgbString();
                backgroundColorClasses[`bg-${colorName}\/${opacityKey}`] = `--kg-bg-opacity: ${opacityValue}; background-color: ${opacityColor};`;
            }
        }
    }

    return backgroundColorClasses;
}
