import tinycolor from 'tinycolor2';
import { colors, colorRange, opacities } from './_color.js';

export function generateRingColorClasses() {
    const ringColorClasses = {};

    // Renkler ve opacity'ler ile color sınıflarını oluştur
    for (const [colorName, { value: colorValue, hasRange, hasOpacity }] of Object.entries(colors)) {
        // Opacity olmadan temel sınıfı ekle
        const className = `ring-${colorName}`;
        ringColorClasses[className] = `--kg-ring-opacity: 1; --kg-ring-color: ${colorValue};`;

        // Renk aralığına göre sınıfları ekle (hasRange varsa)
        if (hasRange) {
            colorRange.forEach((value, index) => {
                const darkenedColor = tinycolor(colorValue).darken((index / colorRange.length) * 100).toRgbString();

                // Opacity'siz varyasyon
                ringColorClasses[`ring-${colorName}-${value}`] = `--kg-ring-opacity: 1; --kg-ring-color: ${darkenedColor};`;

                // Her bir range için opacity'li versiyonlar (hasOpacity varsa)
                if (hasOpacity) {
                    for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                        const opacityColor = tinycolor(darkenedColor).setAlpha(opacityValue).toRgbString();
                        ringColorClasses[`ring-${colorName}-${value}\/${opacityKey}`] = `--kg-ring-opacity: ${opacityValue}; --kg-ring-color: ${opacityColor};`;
                    }
                }
            });
        }

        // Sadece opacity'li versiyonlar (colorRange olmadan)
        if (hasOpacity && !hasRange) {
            for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                const opacityColor = tinycolor(colorValue).setAlpha(opacityValue).toRgbString();
                ringColorClasses[`ring-${colorName}\/${opacityKey}`] = `--kg-ring-opacity: ${opacityValue}; --kg-ring-color: ${opacityColor};`;
            }
        }
    }

    return ringColorClasses;
}
