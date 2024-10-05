import tinycolor from 'tinycolor2';
import { colors, colorRange, opacities } from './_color.js';

export function generateBorderColorClasses() {
    const borderColorClasses = {};

    const borders = {
        '': 'border-color', // Boş borderKey için
        't': 'border-top-color',
        'r': 'border-right-color',
        'b': 'border-bottom-color',
        'l': 'border-left-color',
        'x': ['border-left-color', 'border-right-color'],
        'y': ['border-top-color', 'border-bottom-color'],
        's': 'border-inline-start-color',
        'e': 'border-inline-end-color'
    };

    // Renkler ve opacity'ler ile border-x ve border-y sınıflarını oluştur
    for (const [colorName, { value: colorValue, hasRange, hasOpacity }] of Object.entries(colors)) {
        // Opacity olmadan temel sınıfı ekle
        for (const [borderKey, borderSides] of Object.entries(borders)) {
            if (Array.isArray(borderSides)) {
                const className = `border${borderKey ? `-${borderKey}` : ''}-${colorName}`;
                borderColorClasses[className] = `${borderSides[0]}: ${colorValue}; ${borderSides[1]}: ${colorValue};`;
            } else {
                const className = `border${borderKey ? `-${borderKey}` : ''}-${colorName}`;
                borderColorClasses[className] = `${borderSides}: ${colorValue};`;
            }
        }

        // Renk aralığına göre sınıfları ekle (hasRange varsa)
        if (hasRange) {
            colorRange.forEach((value, index) => {
                const darkenedColor = tinycolor(colorValue).darken((index / colorRange.length) * 100).toRgbString();
                for (const [borderKey, borderSides] of Object.entries(borders)) {
                    if (Array.isArray(borderSides)) {
                        const className = `border${borderKey ? `-${borderKey}` : ''}-${colorName}-${value}`;
                        borderColorClasses[className] = `--kg-border-opacity: 1; ${borderSides[0]}: ${darkenedColor}; ${borderSides[1]}: ${darkenedColor};`;
                    } else {
                        const className = `border${borderKey ? `-${borderKey}` : ''}-${colorName}-${value}`;
                        borderColorClasses[className] = `--kg-border-opacity: 1; ${borderSides}: ${darkenedColor};`;
                    }
                }

                // Her bir range için opacity'li versiyonlar (hasOpacity varsa)
                if (hasOpacity) {
                    for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                        const opacityColor = tinycolor(darkenedColor).setAlpha(opacityValue).toRgbString();
                        for (const [borderKey, borderSides] of Object.entries(borders)) {
                            if (Array.isArray(borderSides)) {
                                const className = `border${borderKey ? `-${borderKey}` : ''}-${colorName}-${value}\/${opacityKey}`;
                                borderColorClasses[className] = `--kg-border-opacity: ${opacityValue}; ${borderSides[0]}: ${opacityColor}; ${borderSides[1]}: ${opacityColor};`;
                            } else {
                                const className = `border${borderKey ? `-${borderKey}` : ''}-${colorName}-${value}\/${opacityKey}`;
                                borderColorClasses[className] = `--kg-border-opacity: ${opacityValue}; ${borderSides}: ${opacityColor};`;
                            }
                        }
                    }
                }
            });
        }

        // Sadece opacity'li versiyonlar (colorRange olmadan)
        if (hasOpacity && !hasRange) {
            for (const [opacityKey, opacityValue] of Object.entries(opacities)) {
                const opacityColor = tinycolor(colorValue).setAlpha(opacityValue).toRgbString();
                for (const [borderKey, borderSides] of Object.entries(borders)) {
                    if (Array.isArray(borderSides)) {
                        const className = `border${borderKey ? `-${borderKey}` : ''}-${colorName}\/${opacityKey}`;
                        borderColorClasses[className] = `--kg-border-opacity: ${opacityValue}; ${borderSides[0]}: ${opacityColor}; ${borderSides[1]}: ${opacityColor};`;
                    } else {
                        const className = `border${borderKey ? `-${borderKey}` : ''}-${colorName}\/${opacityKey}`;
                        borderColorClasses[className] = `--kg-border-opacity: ${opacityValue}; ${borderSides}: ${opacityColor};`;
                    }
                }
            }
        }
    }

    return borderColorClasses;
}
