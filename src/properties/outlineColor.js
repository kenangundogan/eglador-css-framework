import tinycolor from 'tinycolor2';
import { colors, colorRange, opacities } from './_color.js';

export function generateOutlineColorClasses() {
    const outlineColorClasses = {};

    // Renkler ve opacity'ler ile color sınıflarını oluştur
    for (const [colorName, { value: colorValue, hasRange, hasOpacity }] of Object.entries(colors)) {
        // Opacity olmadan temel sınıfı ekle
        const className = `outline-${colorName}`;
        outlineColorClasses[className] = `--kg-outline-opacity: 1; outline-color: ${colorValue};`;

        // Renk aralığına göre sınıfları ekle (hasRange varsa)
        if (hasRange) {
            colorRange.forEach((value, index) => {
                const darkenedColor = tinycolor(colorValue).darken((index / colorRange.length) * 100).toRgbString();

                // Opacity'siz varyasyon
                outlineColorClasses[`outline-${colorName}-${value}`] = `--kg-outline-opacity: 1; outline-color: ${darkenedColor};`;

                // Her bir range için opacity'li versiyonlar (hasOpacity varsa)
                if (hasOpacity) {
                    for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                        const opacityColor = tinycolor(darkenedColor).setAlpha(opacityValue).toRgbString();
                        outlineColorClasses[`outline-${colorName}-${value}\/${opacityKey}`] = `--kg-outline-opacity: ${opacityValue}; outline-color: ${opacityColor};`;
                    }
                }
            });
        }

        // Sadece opacity'li versiyonlar (colorRange olmadan)
        if (hasOpacity && !hasRange) {
            for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                const opacityColor = tinycolor(colorValue).setAlpha(opacityValue).toRgbString();
                outlineColorClasses[`outline-${colorName}\/${opacityKey}`] = `--kg-outline-opacity: ${opacityValue}; outline-color: ${opacityColor};`;
            }
        }
    }

    return outlineColorClasses;
}
