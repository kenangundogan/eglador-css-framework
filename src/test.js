import fs from 'fs';
import cssesc from 'css.escape';

import { generateBreakpointsClasses } from './properties/_breakpoints.js'; // Breakpoint'leri içe aktar
import { pseudoClasses, pseudoElements } from './properties/_pseudoSelectors.js'; // Pseudo class'ları içe aktar
import { propertyMap } from './properties/_propertyMap.js'; // Property map'ini içe aktar

function addSpacesAroundOperators(value) {
    return value.replace(/calc\(([^)]+)\)/g, (match, inner) => {
        const spacedInner = inner.replace(/([+\-*/])/g, ' $1 ');
        return `calc(${spacedInner})`;
    });
}

function sanitizeValue(value) {
    return value
        .replace(/\\\//g, '/') // Slash'leri escape etme
        .replace(/\\:/g, ':') // İki noktaları escape etme
        .replace(/\\;/g, ';') // Noktalı virgülleri escape etme
        .replace(/\\,/g, ',') // Virgülleri escape etme
        .replace(/\\\./g, '.') // Noktaları escape etme
        .replace(/_/g, ' ') // Alt çizgileri boşlukla değiştir
        .replace(/\(\s+/g, '(').replace(/\s+\)/g, ')') // Boşlukları parantezlerin içinden kaldır
        .replace(/\s+/g, ' ').trim(); // Birden fazla boşluğu tek boşlukla değiştir ve baştaki ve sondaki boşlukları kaldır
}

function escapeClassName(className) {
    return cssesc(className).replace(/\\,/g, '\\2c ');
}

// Pseudo-class ve Pseudo-element'leri ayırmak için yardımcı fonksiyon
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

// Pseudo-class ve Pseudo-element'leri ayırmak için recursive fonksiyon
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

// !important kontrolü için yardımcı fonksiyon
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

// CSS çıktılarını oluşturmak için yardımcı fonksiyon
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

// space- ve divide- işlemleri için fonksiyon
function handleSpaceOrDivide(property, className, value) {
    const spacePropertyKey = `${property} > :not([hidden]) ~ :not([hidden])`;
    const cssProperties = propertyMap[spacePropertyKey];

    if (cssProperties) {
        const declarations = cssProperties(value);
        return generateCSSOutput(`.${escapeClassName(className)} > :not([hidden]) ~ :not([hidden])`, declarations, '');
    }

    return null;
}

// before:content ve after:content işlemleri için fonksiyon
function handlePseudoContent(property, className, value, pseudoSelector) {
    const cssProperties = propertyMap[property];

    // Eğer content tanımlanmışsa, özel content işlemi yapılmalı
    if (property === 'content') {

        return `
            .${escapeClassName(className)}${pseudoSelector} {
            --kg-content: ${value};
            content: var(--kg-content);
            }
        `;
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

// İşlenen class'ları saklamak için bir Set oluşturun
const processedClasses = new Set();

// CSS çıktıları breakpoint'lere göre gruplamak için nesneler ekledim
const breakpointCssMap = {};
const defaultCssOutputs = [];

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

    // Class ismini ':' karakterine göre bölüyoruz
    const classParts = adjustedClassName.split(':');
    let breakpoint = null;
    let pseudoPrefixes = [];
    let propertyAndValue = classParts.pop(); // Son kısım property ve value

    // Breakpoint ve pseudo-class'ları ayırıyoruz
    classParts.forEach(part => {
        if (generateBreakpointsClasses[part]) {
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
    const regex = /^([^\s]+)-\[(.+)\]$/;
    const match = cleanProperty.match(regex);

    if (!match) {
        return;
    }

    cleanProperty = match[1];
    let value = match[2];

    value = sanitizeValue(value);
    value = addSpacesAroundOperators(value);

    // space- ve divide- işlemleri için kontrol ekleyin
    if (cleanProperty.startsWith('space-') || cleanProperty.startsWith('divide-')) {
        const cssOutput = handleSpaceOrDivide(cleanProperty, className, value);
        if (cssOutput) {
            if (breakpoint) {
                if (!breakpointCssMap[breakpoint]) breakpointCssMap[breakpoint] = [];
                breakpointCssMap[breakpoint].push(cssOutput);
            } else {
                defaultCssOutputs.push(cssOutput);
            }
        }
        return;
    }

    // Pseudo-element için content özelliğini kontrol et ve ekle
    if (cleanProperty.startsWith('content')) {
        const cssOutput = handlePseudoContent(cleanProperty, className, value, pseudoSelectors.join(''));
        if (cssOutput) {
            if (breakpoint) {
                if (!breakpointCssMap[breakpoint]) breakpointCssMap[breakpoint] = [];
                breakpointCssMap[breakpoint].push(cssOutput);
            } else {
                defaultCssOutputs.push(cssOutput);
            }
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

    let cssOutput = generateCSSOutput(
        selector,
        declarations,
        isImportant,
        pseudoSelectors.some(ps => ps.includes('::before') || ps.includes('::after'))
    );

    // CSS çıktısını oluşturduktan sonra breakpoint kontrolü yapıyoruz
    if (cssOutput) {
        if (breakpoint) {
            if (!breakpointCssMap[breakpoint]) breakpointCssMap[breakpoint] = [];
            breakpointCssMap[breakpoint].push(cssOutput);
        } else {
            defaultCssOutputs.push(cssOutput);
        }
    }
}

const customHtml = fs.readFileSync('./dist/custom.html', 'utf-8');

const classRegex = /class=(["'])(.*?)\1|class=([^\s>]+)/g;
const classes = new Set();
let match;
while ((match = classRegex.exec(customHtml)) !== null) {
    const classAttribute = match[2] || match[3];
    const classList = classAttribute.split(/\s+/);
    classList.forEach((className) => {
        classes.add(className);
    });
}

// custom.css dosyasını temizleyin
fs.writeFileSync('./dist/custom.css', '');

classes.forEach(element => {
    parseKgClass(element);
});

// Tüm class'ları işledikten sonra CSS çıktıları oluşturuyoruz
let cssOutputs = '';

// Önce default CSS çıktıları ekleyin
if (defaultCssOutputs.length > 0) {
    cssOutputs += defaultCssOutputs.join('\n\n') + '\n\n';
}

// Breakpoint'lere göre CSS çıktıları ekleyin
for (const [breakpoint, cssArray] of Object.entries(breakpointCssMap)) {
    const minWidth = generateBreakpointsClasses[breakpoint];
    cssOutputs += `@media (min-width: ${minWidth}) {\n`;
    cssOutputs += cssArray.map(css => css.split('\n').map(line => '  ' + line).join('\n')).join('\n\n') + '\n';
    cssOutputs += '}\n\n';
}

fs.writeFileSync('./dist/custom.css', cssOutputs);
