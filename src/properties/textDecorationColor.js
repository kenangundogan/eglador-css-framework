import tinycolor from 'tinycolor2';
import { colors, colorRange, opacities } from './_color.js';

export function generateTextDecorationColorClasses() {
    const textDecorationColorClasses = {};

    // Renkler ve opacity'ler ile color sınıflarını oluştur
    for (const [colorName, { value: colorValue, hasRange, hasOpacity }] of Object.entries(colors)) {
        // Opacity olmadan temel sınıfı ekle
        const className = `decoration-${colorName}`;
        textDecorationColorClasses[className] = `text-decoration-color: ${colorValue};`;

        // Renk aralığına göre sınıfları ekle (hasRange varsa)
        if (hasRange) {
            colorRange.forEach((value, index) => {
                const darkenedColor = tinycolor(colorValue).darken((index / colorRange.length) * 100).toRgbString();

                // Opacity'siz varyasyon
                textDecorationColorClasses[`decoration-${colorName}-${value}`] = `text-decoration-color: ${darkenedColor};`;

                // Her bir range için opacity'li versiyonlar (hasOpacity varsa)
                if (hasOpacity) {
                    for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                        const opacityColor = tinycolor(darkenedColor).setAlpha(opacityValue).toRgbString();
                        textDecorationColorClasses[`decoration-${colorName}-${value}\/${opacityKey}`] = `text-decoration-color: ${opacityColor};`;
                    }
                }
            });
        }

        // Sadece opacity'li versiyonlar (colorRange olmadan)
        if (hasOpacity && !hasRange) {
            for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                const opacityColor = tinycolor(colorValue).setAlpha(opacityValue).toRgbString();
                textDecorationColorClasses[`decoration-${colorName}\/${opacityKey}`] = `text-decoration-color: ${opacityColor};`;
            }
        }
    }

    return textDecorationColorClasses;
}
