import tinycolor from 'tinycolor2';
import { colors, colorRange, opacities } from './_color.js';

export function generateTextColorClasses() {
    const textColorClasses = {};

    // Renkler ve opacity'ler ile color sınıflarını oluştur
    for (const [colorName, { value: colorValue, hasRange, hasOpacity }] of Object.entries(colors)) {
        // Opacity olmadan temel sınıfı ekle
        const className = `text-${colorName}`;
        textColorClasses[className] = `--kg-text-opacity: 1; color: ${colorValue};`;

        // Renk aralığına göre sınıfları ekle (hasRange varsa)
        if (hasRange) {
            colorRange.forEach((value, index) => {
                const darkenedColor = tinycolor(colorValue).darken((index / colorRange.length) * 100).toRgbString();

                // Opacity'siz varyasyon
                textColorClasses[`text-${colorName}-${value}`] = `--kg-text-opacity: 1; color: ${darkenedColor};`;

                // Her bir range için opacity'li versiyonlar (hasOpacity varsa)
                if (hasOpacity) {
                    for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                        const opacityColor = tinycolor(darkenedColor).setAlpha(opacityValue).toRgbString();
                        textColorClasses[`text-${colorName}-${value}\/${opacityKey}`] = `--kg-text-opacity: ${opacityValue}; color: ${opacityColor};`;
                    }
                }
            });
        }

        // Sadece opacity'li versiyonlar (colorRange olmadan)
        if (hasOpacity && !hasRange) {
            for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                const opacityColor = tinycolor(colorValue).setAlpha(opacityValue).toRgbString();
                textColorClasses[`text-${colorName}\/${opacityKey}`] = `--kg-text-opacity: ${opacityValue}; color: ${opacityColor};`;
            }
        }
    }

    return textColorClasses;
}
