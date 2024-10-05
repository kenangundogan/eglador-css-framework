import tinycolor from 'tinycolor2';
import { colors, colorRange, opacities } from './_color.js';

export function generateStrokeClasses() {
    const strokeColorClasses = {};

    // Renkler ve opacity'ler ile color sınıflarını oluştur
    for (const [colorName, { value: colorValue, hasRange, hasOpacity }] of Object.entries(colors)) {
        // Opacity olmadan temel sınıfı ekle
        const className = `stroke-${colorName}`;
        strokeColorClasses[className] = `stroke: ${colorValue};`;

        // Renk aralığına göre sınıfları ekle (hasRange varsa)
        if (hasRange) {
            colorRange.forEach((value, index) => {
                const darkenedColor = tinycolor(colorValue).darken((index / colorRange.length) * 100).toRgbString();

                // Opacity'siz varyasyon
                strokeColorClasses[`stroke-${colorName}-${value}`] = `stroke: ${darkenedColor};`;

                // Her bir range için opacity'li versiyonlar (hasOpacity varsa)
                if (hasOpacity) {
                    for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                        const opacityColor = tinycolor(darkenedColor).setAlpha(opacityValue).toRgbString();
                        strokeColorClasses[`stroke-${colorName}-${value}\/${opacityKey}`] = `stroke: ${opacityColor};`;
                    }
                }
            });
        }

        // Sadece opacity'li versiyonlar (colorRange olmadan)
        if (hasOpacity && !hasRange) {
            for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                const opacityColor = tinycolor(colorValue).setAlpha(opacityValue).toRgbString();
                strokeColorClasses[`stroke-${colorName}\/${opacityKey}`] = `stroke: ${opacityColor};`;
            }
        }
    }

    return strokeColorClasses;
}
