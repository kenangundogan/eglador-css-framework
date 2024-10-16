// src/generate/customCss.js

import { breakpoints } from './../properties/_breakpoints.js'; // Breakpoint'leri içe aktar
import { pseudoClasses, pseudoElements } from '../properties/_pseudoSelectors.js'; // Pseudo class'ları içe aktar
import { propertyMap } from '../properties/_propertyMap.js'; // Property map'ini içe aktar
import { escapeClassName } from '../utils/escapeClassName.js'; // escapeClassName fonksiyonunu içe aktar
import { sanitizeValue } from '../utils/sanitizeValue.js'; // sanitizeValue fonksiyonunu içe aktar

export function customCss(customClasses) {
    let cssOutput = '';
    const mediaQueries = {};

    // İşlenen class'ları saklamak için bir Set oluşturun
    const processedClasses = new Set();

    // Ana parse fonksiyonu
    function parseKgClass(className) {

        // Eğer daha önce işlenmişse, tekrar işleme gerek yok
        if (processedClasses.has(className)) {
            return;
        }

        // İşlenen class'ları ekleyin
        processedClasses.add(className);

        let isStarClass = false;
        let adjustedClassName = className;

        // Eğer className '*:' ile başlıyorsa, bunu işaretleyelim
        if (className.startsWith('*:')) {
            isStarClass = true;
            adjustedClassName = className.slice(2); // '*:' kısmını çıkar
        }

        // Class ismini ':' karakterine göre bölüyoruz ama [ ] içindekileri hariç tutuyor
        const classParts = adjustedClassName.split(/:(?![^\[]*\])/);
        let breakpoint = null;
        let pseudoPrefixes = [];
        let propertyAndValue = classParts.pop(); // Son kısım property ve value

        // Breakpoint ve pseudo-class'ları ayırıyoruz
        classParts.forEach(part => {
            if (breakpoints[part]) {
                breakpoint = part;
            } else {
                pseudoPrefixes.push(part);
            }
        });

        // Pseudo-class ve pseudo-element'leri property'den ayırıyoruz
        let { pseudoSelectors, property } = extractMultiplePseudos(propertyAndValue);

        // Önceki pseudo-selectors ile birleştiriyoruz
        pseudoPrefixes.forEach(prefix => {
            const { pseudoValue } = extractPseudo(prefix);
            if (pseudoValue) {
                pseudoSelectors = pseudoSelectors.map(sel => pseudoValue.join('') + sel);
            }
        });

        let { property: cleanProperty, isImportant } = checkImportant(property);

        // Negatif değerleri işlemek için regex'i güncelleyin
        const regex = /^(-?[^\s]+)-\[(.+)\]$/;
        const match = cleanProperty.match(regex);

        if (!match) {
            return;
        }

        cleanProperty = match[1];
        let value = match[2];

        // Eğer property ismi '-' ile başlıyorsa, negatif değeri işleyin
        if (cleanProperty.startsWith('-')) {
            cleanProperty = cleanProperty.slice(1);
            value = '-' + value;
        }

        value = sanitizeValue(value);
        value = addSpacesAroundOperators(value);

        // space- ve divide- işlemleri için kontrol ekleyin
        if (cleanProperty.startsWith('space-') || cleanProperty.startsWith('divide-')) {
            const cssRule = handleSpaceOrDivide(cleanProperty, className, value);
            if (cssRule) {
                // CSS çıktısını uygun yere ekleyin
                addCssRule(breakpoint, cssRule);
            }
            return;
        }

        // Pseudo-element için content özelliğini kontrol et ve ekle
        if (cleanProperty.startsWith('content')) {
            const cssRule = handlePseudoContent(cleanProperty, className, value, pseudoSelectors.join(''));
            if (cssRule) {
                // CSS çıktısını uygun yere ekleyin
                addCssRule(breakpoint, cssRule);
            }
            return;
        }

        // Genel CSS property işlemi
        const cssProperties = propertyMap[cleanProperty];
        if (!cssProperties) {
            return;
        }

        let selector = `.${escapeClassName(className)}`;
        if (isStarClass) {
            selector += ' > *';
        }
        if (pseudoSelectors.length > 0) {
            selector += pseudoSelectors.join('');
        }

        const declarations = cssProperties(value);

        let cssRule = generateCSSOutput(
            selector,
            declarations,
            isImportant,
            pseudoSelectors.some(ps => ps.includes('::before') || ps.includes('::after'))
        );

        // CSS çıktısını uygun yere ekleyin
        if (cssRule) {
            addCssRule(breakpoint, cssRule);
        }
    }

    // CSS çıktısını uygun yere ekleyen yardımcı fonksiyon
    function addCssRule(breakpoint, cssRule) {
        if (breakpoint) {
            const breakpointValue = breakpoints[breakpoint];
            if (!mediaQueries[breakpointValue]) {
                mediaQueries[breakpointValue] = '';
            }
            mediaQueries[breakpointValue] += cssRule + '\n';
        } else {
            cssOutput += cssRule + '\n';
        }
    }

    // Diğer yardımcı fonksiyonlar...

    function addSpacesAroundOperators(value) {
        return value.replace(/calc\(([^)]+)\)/g, (match, inner) => {
            const spacedInner = inner.replace(/([+\-*/])/g, ' $1 ');
            return `calc(${spacedInner})`;
        });
    }

    function extractPseudo(property) {
        // Pseudo-element kontrolü
        for (const [pseudoElementKey, pseudoElementFunc] of Object.entries(pseudoElements)) {
            if (property.startsWith(`${pseudoElementKey}`)) {
                const pseudoValue = pseudoElementFunc();
                return {
                    pseudoType: 'element',
                    pseudoValue,
                    property: property.slice(pseudoElementKey.length), // Pseudo-element'i kaldır
                };
            }
        }

        // Pseudo-class kontrolü
        for (const [pseudoClassKey, pseudoClassFunc] of Object.entries(pseudoClasses)) {
            if (property.startsWith(`${pseudoClassKey}`)) {
                const pseudoValue = pseudoClassFunc();
                return {
                    pseudoType: 'class',
                    pseudoValue,
                    property: property.slice(pseudoClassKey.length), // Pseudo-class'ı kaldır
                };
            }
        }

        // Ne pseudo-class ne pseudo-element ise
        return {
            pseudoType: null,
            pseudoValue: null,
            property,
        };
    }

    function extractMultiplePseudos(property) {
        let pseudoSelectors = [''];
        let remainingProperty = property;
        let pseudoType, pseudoValue;

        while (true) {
            ({ pseudoType, pseudoValue, property: remainingProperty } = extractPseudo(remainingProperty));
            if (!pseudoType) break;

            pseudoSelectors = pseudoSelectors.map(sel => sel + pseudoValue.join(''));
        }

        return {
            pseudoSelectors,
            property: remainingProperty,
        };
    }

    function checkImportant(property) {
        if (property.startsWith('!')) {
            return {
                property: property.slice(1),
                isImportant: ' !important',
            };
        }
        return {
            property: property,
            isImportant: '',
        };
    }

    function generateCSSOutput(selector, declarations, isImportant, addContent = false) {
        let cssOutput = `${selector} {\n`;

        // Eğer pseudo-element varsa, content ekleyelim
        if (addContent) {
            cssOutput += `  content: var(--kg-content);\n`;
        }

        // Diğer CSS özelliklerini ekleyelim
        for (const [prop, val] of Object.entries(declarations)) {
            cssOutput += `  ${prop}: ${val}${isImportant};\n`;
        }

        cssOutput += '}';
        return cssOutput;
    }

    function handleSpaceOrDivide(property, className, value) {
        const spacePropertyKey = `${property} > :not([hidden]) ~ :not([hidden])`;
        const cssProperties = propertyMap[spacePropertyKey];

        if (cssProperties) {
            const declarations = cssProperties(value);
            return generateCSSOutput(`.${escapeClassName(className)} > :not([hidden]) ~ :not([hidden])`, declarations, '');
        }

        return null;
    }

    function handlePseudoContent(property, className, value, pseudoSelector) {
        const cssProperties = propertyMap[property];

        // Eğer content tanımlanmışsa, özel content işlemi yapılmalı
        if (property === 'content') {
            return `
                .${escapeClassName(className)}${pseudoSelector} {
                --kg-content: ${value};
                content: var(--kg-content);
                }`;
        }

        // Diğer özellikler için normal CSS işlemi
        if (cssProperties) {
            const declarations = cssProperties(value);
            return generateCSSOutput(
                `.${escapeClassName(className)}${pseudoSelector}`,
                declarations,
                '',
                true // content eklemek için flag
            );
        }

        return null;
    }

    // 'customClasses' parametresinden class'ları çıkarıyoruz
    customClasses.forEach(className => {
        parseKgClass(className);
    });

    // Medya sorgularını CSS çıktısına ekle
    Object.keys(mediaQueries).forEach(breakpointValue => {
        cssOutput += `@media (min-width: ${breakpointValue}) {\n${mediaQueries[breakpointValue]}}\n`;
    });

    return cssOutput;
}
