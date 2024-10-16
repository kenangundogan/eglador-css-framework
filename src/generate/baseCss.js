import { breakpoints } from './../properties/_breakpoints.js'; // Breakpoint'leri içe aktar
import { pseudoClasses, pseudoElements } from '../properties/_pseudoSelectors.js'; // Pseudo sınıfları içe aktar
import { escapeClassName } from '../utils/escapeClassName.js'; // escapeClassName fonksiyonunu içe aktar


// Başında '!' olan class isimlerine 'important' ekleyen fonksiyon
function processImportant(isImportant, cssRule) {
    if (isImportant) {
        return `${cssRule.replace(/;$/, '')} !important;`;
    }
    return cssRule;
}

// Pseudo-class ve pseudo-element işleyen fonksiyon
function processPseudoClassesAndElements(selector, cssRule) {
    return `${selector} {\n  ${cssRule}\n}`;
}

// Tema ve medya sorgularını işlemek için yardımcı fonksiyon
function getThemeSelector(themeClass) {
    const themeSelectors = {
        'dark': ':is(.dark *)',
        'light': ':is(.light *)',
        // Diğer tema sınıflarını burada ekleyebilirsiniz
    };
    return themeSelectors[themeClass] || '';
}

// Pseudo-class, tema ve medya sorgularını ayrıştırma fonksiyonu
function extractClassParts(className) {
    const pseudoClassesList = Object.keys(pseudoClasses);
    const pseudoElementsList = Object.keys(pseudoElements);

    let mediaClass = null;
    let themeClass = null;
    let pseudoClassesInClassName = [];
    let baseClass = className;

    let parts = className.split(':');
    let index = 0;

    // Tema sınıfı kontrolü
    if (getThemeSelector(parts[index])) {
        themeClass = parts[index];
        index++;
    }

    // Medya sınıfı kontrolü
    if (breakpoints[parts[index]]) {
        mediaClass = parts[index];
        index++;
    }

    // Pseudo-class ve pseudo-element kontrolü
    while (pseudoClassesList.includes(parts[index]) || pseudoElementsList.includes(parts[index])) {
        pseudoClassesInClassName.push(parts[index]);
        index++;
    }

    // Geri kalanlar baseClass
    baseClass = parts.slice(index).join(':');

    // '!' işaretini kaldır
    let isImportant = false;
    if (baseClass.startsWith('!')) {
        isImportant = true;
        baseClass = baseClass.slice(1);
    }

    return { themeClass, mediaClass, baseClass, isImportant, pseudoClassesInClassName };
}

// Seçici oluşturma fonksiyonu
function buildSelector(className, isStarClass, pseudoSelectors, themeSelector) {
    let selector = `.${escapeClassName(className)}`;
    if (isStarClass) {
        selector += ' > *';
    }
    if (pseudoSelectors.length > 0) {
        selector += pseudoSelectors.join('');
    }
    if (themeSelector) {
        selector += themeSelector;
    }
    return selector;
}

export function baseCss(base, allClasses) {
    let cssOutput = '';
    const mediaQueries = {};

    // İşlenen class'ları saklamak için bir Set oluşturun
    const processedClasses = new Set();

    base.forEach(className => {
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

        const { themeClass, mediaClass, baseClass, isImportant, pseudoClassesInClassName } = extractClassParts(adjustedClassName);

        // space- ve divide- işlemleri için kontrol ekleyin
        let lookupBaseClass = baseClass;
        let isSpaceOrDivide = false;

        if (lookupBaseClass.startsWith('space-') || lookupBaseClass.startsWith('-space-') ||
            lookupBaseClass.startsWith('divide-') || lookupBaseClass.startsWith('-divide-')) {
            isSpaceOrDivide = true;
        }

        // Eğer space- veya divide- sınıfıysa, selector'u güncelle
        let selector = buildSelector(className, isStarClass, [], getThemeSelector(themeClass));

        if (isSpaceOrDivide) {
            selector += ' > :not([hidden]) ~ :not([hidden])';
            lookupBaseClass += ' > :not([hidden]) ~ :not([hidden])';
        } else if (pseudoClassesInClassName.length > 0) {
            const pseudoSelectors = pseudoClassesInClassName.map(pseudo => {
                if (pseudoClasses[pseudo]) {
                    return pseudoClasses[pseudo]().join('');
                } else if (pseudoElements[pseudo]) {
                    return pseudoElements[pseudo]().join('');
                } else {
                    return '';
                }
            });
            selector = buildSelector(className, isStarClass, pseudoSelectors, getThemeSelector(themeClass));
        }

        // allClasses içinde sınıfı bul

        const cssRuleContent = allClasses[lookupBaseClass];

        if (cssRuleContent) {
            let cssRule = '';

            if (typeof cssRuleContent === 'string') {
                // Eğer cssRuleContent bir string ise, doğrudan kullan
                cssRule = cssRuleContent;
            } else if (typeof cssRuleContent === 'object') {
                // Eğer cssRuleContent bir nesne ise, CSS özelliklerini stringe dönüştür
                cssRule = Object.entries(cssRuleContent)
                    .map(([prop, val]) => `${prop}: ${val};`)
                    .join('\n  ');
            } else {
                // Hatalı bir tür ise, uyarı ver
                // console.warn(`Unsupported cssRuleContent type for class ${className}`);
                return;
            }

            // Important işlemi
            cssRule = processImportant(isImportant, cssRule);

            // CSS kuralını oluştur
            const css = processPseudoClassesAndElements(selector, cssRule);

            // Medya sorgusu oluşturma
            if (mediaClass) {
                const breakpointValue = breakpoints[mediaClass];
                const mediaQueryKey = `@media (min-width: ${breakpointValue})`;
                if (!mediaQueries[mediaQueryKey]) {
                    mediaQueries[mediaQueryKey] = '';
                }
                mediaQueries[mediaQueryKey] += css + '\n';
            } else {
                cssOutput += css + '\n';
            }
        } else {
            // console.log(`${lookupBaseClass} sınıfı allClasses içinde bulunamadı.`);
        }
    });

    // Medya sorgularını CSS çıktısına ekle
    Object.keys(mediaQueries).forEach(mediaQueryKey => {
        if (mediaQueries[mediaQueryKey].trim() !== '') {
            cssOutput += `${mediaQueryKey} {\n${mediaQueries[mediaQueryKey]}}\n`;
        }
    });

    return cssOutput;
}
