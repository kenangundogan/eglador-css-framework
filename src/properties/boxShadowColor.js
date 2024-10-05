import tinycolor from 'tinycolor2';
import { colors, colorRange, opacities } from './_color.js';

export function generateBoxShadowColorClasses() {
    const boxShadowColorClasses = {};

    // Renkler ve opacity'ler ile color sınıflarını oluştur
    for (const [colorName, { value: colorValue, hasRange, hasOpacity }] of Object.entries(colors)) {
        // Opacity olmadan temel sınıfı ekle
        const className = `shadow-${colorName}`;
        boxShadowColorClasses[className] = `--kg-shadow-color: ${colorValue}; --kg-shadow: var(--kg-shadow-colored);`;

        // Renk aralığına göre sınıfları ekle (hasRange varsa)
        if (hasRange) {
            colorRange.forEach((value, index) => {
                const darkenedColor = tinycolor(colorValue).darken((index / colorRange.length) * 100).toRgbString();

                // Opacity'siz varyasyon
                boxShadowColorClasses[`shadow-${colorName}-${value}`] = `--kg-shadow-color: ${darkenedColor}; --kg-shadow: var(--kg-shadow-colored);`;

                // Her bir range için opacity'li versiyonlar (hasOpacity varsa)
                if (hasOpacity) {
                    for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                        const opacityColor = tinycolor(darkenedColor).setAlpha(opacityValue).toRgbString();
                        boxShadowColorClasses[`shadow-${colorName}-${value}\/${opacityKey}`] = `--kg-shadow-color: ${opacityColor}; --kg-shadow: var(--kg-shadow-colored);`;
                    }
                }
            });
        }

        // Sadece opacity'li versiyonlar (colorRange olmadan)
        if (hasOpacity && !hasRange) {
            for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                const opacityColor = tinycolor(colorValue).setAlpha(opacityValue).toRgbString();
                boxShadowColorClasses[`shadow-${colorName}\/${opacityKey}`] = `--kg-shadow-color: ${opacityColor}; --kg-shadow: var(--kg-shadow-colored);`;
            }
        }
    }

    return boxShadowColorClasses;
}
