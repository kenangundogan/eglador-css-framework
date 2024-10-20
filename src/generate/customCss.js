// src/generate/customCss.js

import { breakpoints } from './../properties/_breakpoints.js'; // Breakpoint'leri içe aktar
import { pseudoClasses, pseudoElements } from '../properties/_pseudoSelectors.js'; // Pseudo seçicileri içe aktar
import { propertyMap } from '../properties/_propertyMap.js'; // Özellik haritasını içe aktar
import { escapeClassName } from '../utils/escapeClassName.js'; // escapeClassName fonksiyonunu içe aktar
import { sanitizeValue } from '../utils/sanitizeValue.js'; // sanitizeValue fonksiyonunu içe aktar

const themeVariants = {
    'dark': ':is(.dark *)',
    'light': ':is(.light *)',
};

export function customCss(customClasses) {
    let cssOutput = '';

    // İşlenen sınıfları takip etmek için bir Set oluştur
    const processedClasses = new Set();

    // Ana parse fonksiyonu
    function parseKgClass(className) {

        // Eğer daha önce işlendiyse, atla
        if (processedClasses.has(className)) {
            return;
        }

        // İşlenen sınıflara ekle
        processedClasses.add(className);

        let isStarClass = false;
        let adjustedClassName = className;

        // Eğer sınıf ismi '*:' ile başlıyorsa
        if (className.startsWith('*:')) {
            isStarClass = true;
            adjustedClassName = className.slice(2); // '*:' kısmını çıkar
        }

        // Sınıf ismini ':' karakterine göre böl, ancak köşeli parantez içindeki ':' karakterlerini yok say
        const classParts = adjustedClassName.split(/:(?![^\[]*\])/);
        let breakpoint = null;
        let pseudoPrefixes = [];
        let themeVariantSelector = null;

        let propertyAndValue = classParts.pop(); // Son parça özellik ve değer

        // Breakpoint'leri, tema varyantlarını ve pseudo-sınıfları ayır
        classParts.forEach(part => {
            if (breakpoints[part]) {
                breakpoint = part;
            } else if (themeVariants[part]) {
                themeVariantSelector = themeVariants[part];
            } else {
                pseudoPrefixes.push(part);
            }
        });

        // Pseudo-seçicileri ve özelliği çıkar
        let { pseudoSelectors, property } = extractMultiplePseudos(propertyAndValue);

        // Pseudo-prefix'leri pseudo-seçicilerle birleştir
        pseudoPrefixes.forEach(prefix => {
            const { pseudoValue } = extractPseudo(prefix);
            if (pseudoValue) {
                const newPseudoSelectors = [];
                pseudoSelectors.forEach(sel => {
                    pseudoValue.forEach(pv => {
                        newPseudoSelectors.push(pv + sel);
                    });
                });
                pseudoSelectors = newPseudoSelectors;
            }
        });

        let { property: cleanProperty, isImportant } = checkImportant(property);

        // Negatif değerleri işlemek için regex'i güncelle
        const regex = /^(-?[^\s]+)-\[(.+)\]$/;
        const match = cleanProperty.match(regex);

        if (!match) {
            return;
        }

        cleanProperty = match[1];
        let value = match[2];

        // Negatif özellik isimlerini işlemek için
        if (cleanProperty.startsWith('-')) {
            cleanProperty = cleanProperty.slice(1);
            value = '-' + value;
        }

        value = sanitizeValue(value);
        value = addSpacesAroundOperators(value);
        value = addSpacesAroundCommas(value);

        // 'space-' ve 'divide-' kontrolü
        if (cleanProperty.startsWith('space-') || cleanProperty.startsWith('divide-')) {
            const cssRule = handleSpaceOrDivide(cleanProperty, className, value);
            if (cssRule) {
                // CSS çıktısını uygun yere ekle
                addCssRule(breakpoint, cssRule);
            }
            return;
        }

        // Pseudo-element için 'content' özelliğini kontrol et ve ekle
        if (cleanProperty.startsWith('content')) {
            const cssRule = handlePseudoContent(cleanProperty, className, value, pseudoSelectors);
            if (cssRule) {
                // CSS çıktısını uygun yere ekle
                addCssRule(breakpoint, cssRule);
            }
            return;
        }

        // Genel CSS özelliği işleme
        const cssProperties = propertyMap[cleanProperty];
        if (!cssProperties) {
            return;
        }

        const declarations = cssProperties(value);

        // Her bir pseudo-seçici için ayrı CSS kuralı oluştur
        pseudoSelectors.forEach(pseudoSelector => {
            let selector = `.${escapeClassName(className)}`;
            if (isStarClass) {
                selector += ' > *';
            }
            if (pseudoSelector.length > 0) {
                selector += pseudoSelector;
            }

            // Tema varyantı varsa, seçiciye ekle
            if (themeVariantSelector) {
                selector = `${themeVariantSelector} ${selector}`;
            }

            let cssRule = generateCSSOutput(
                selector,
                declarations,
                isImportant,
                pseudoSelector.includes('::before') || pseudoSelector.includes('::after')
            );

            // CSS çıktısını uygun yere ekle
            addCssRule(breakpoint, cssRule);
        });
    }

    // CSS kuralını uygun yere ekleyen yardımcı fonksiyon
    function addCssRule(breakpoint, cssRule) {
        if (breakpoint) {
            const breakpointValue = breakpoints[breakpoint];
            cssOutput += `@media (min-width: ${breakpointValue}) {\n${cssRule}}\n`;
        } else {
            cssOutput += cssRule + '\n';
        }
    }

    function addSpacesAroundOperators(value) {
        return value.replace(/calc\(([^)]+)\)/g, (match, inner) => {
            const spacedInner = inner.replace(/([+\-*/])/g, ' $1 ');
            return `calc(${spacedInner})`;
        });
    }

    // 1fr,3fr,1fr -> 1fr 3fr 1fr
    function addSpacesAroundCommas(value) {
        // tüm fr aralarındaki virgülleri boşlukla değiştir
        return value.replace(/(fr),/g, '$1 ').replace(/,(\d)/g, ', $1');
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

        while (true) {
            const result = extractPseudo(remainingProperty);
            const { pseudoType, pseudoValue } = result;
            remainingProperty = result.property;

            if (!pseudoType) break;

            // Yeni pseudoSelectors seti oluştur
            const newPseudoSelectors = [];
            pseudoSelectors.forEach(sel => {
                pseudoValue.forEach(pv => {
                    newPseudoSelectors.push(sel + pv);
                });
            });
            pseudoSelectors = newPseudoSelectors;
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

        // Eğer pseudo-element ise, content ekle
        if (addContent) {
            cssOutput += `  content: var(--kg-content);\n`;
        }

        // Diğer CSS özelliklerini ekle
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
            return generateCSSOutput(
                `.${escapeClassName(className)} > :not([hidden]) ~ :not([hidden])`,
                declarations,
                ''
            );
        }

        return null;
    }

    function handlePseudoContent(property, className, value, pseudoSelectors) {
        const cssProperties = propertyMap[property];

        // Eğer content tanımlanmışsa, özel işlem yap
        if (property === 'content') {
            const cssRules = pseudoSelectors.map(pseudoSelector => `
.${escapeClassName(className)}${pseudoSelector} {
  --kg-content: ${value};
  content: var(--kg-content);
}`).join('\n');
            return cssRules;
        }

        // Diğer özellikler için normal CSS işlemi
        if (cssProperties) {
            const declarations = cssProperties(value);
            const cssRules = pseudoSelectors.map(pseudoSelector => {
                let selector = `.${escapeClassName(className)}${pseudoSelector}`;
                return generateCSSOutput(
                    selector,
                    declarations,
                    '',
                    true // content eklemek için flag
                );
            }).join('\n');
            return cssRules;
        }

        return null;
    }

    // 'customClasses' parametresinden sınıfları çıkar
    customClasses.forEach(className => {
        parseKgClass(className);
    });

    return cssOutput;
}
