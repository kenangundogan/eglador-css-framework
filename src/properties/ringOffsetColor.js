import tinycolor from 'tinycolor2';
import { colors, colorRange, opacities } from './_color.js';

export function generateRingOffsetColorClasses() {
    const ringOffsetColorClasses = {};

    // Renkler ve opacity'ler ile color sınıflarını oluştur
    for (const [colorName, { value: colorValue, hasRange, hasOpacity }] of Object.entries(colors)) {
        // Opacity olmadan temel sınıfı ekle
        const className = `ring-offset-${colorName}`;
        ringOffsetColorClasses[className] = `--kg-ring-offset-opacity: 1; --kg-ring-offset-color: ${colorValue};`;

        // Renk aralığına göre sınıfları ekle (hasRange varsa)
        if (hasRange) {
            colorRange.forEach((value, index) => {
                const darkenedColor = tinycolor(colorValue).darken((index / colorRange.length) * 100).toRgbString();

                // Opacity'siz varyasyon
                ringOffsetColorClasses[`ring-offset-${colorName}-${value}`] = `--kg-ring-offset-opacity: 1; --kg-ring-offset-color: ${darkenedColor};`;

                // Her bir range için opacity'li versiyonlar (hasOpacity varsa)
                if (hasOpacity) {
                    for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                        const opacityColor = tinycolor(darkenedColor).setAlpha(opacityValue).toRgbString();
                        ringOffsetColorClasses[`ring-offset-${colorName}-${value}\/${opacityKey}`] = `--kg-ring-offset-opacity: ${opacityValue}; --kg-ring-offset-color: ${opacityColor};`;
                    }
                }
            });
        }

        // Sadece opacity'li versiyonlar (colorRange olmadan)
        if (hasOpacity && !hasRange) {
            for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                const opacityColor = tinycolor(colorValue).setAlpha(opacityValue).toRgbString();
                ringOffsetColorClasses[`ring-offset-${colorName}\/${opacityKey}`] = `--kg-ring-offset-opacity: ${opacityValue}; --kg-ring-offset-color: ${opacityColor};`;
            }
        }
    }

    return ringOffsetColorClasses;
}
