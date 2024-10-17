import { breakpoints } from './../properties/_breakpoints.js'; // Breakpoint'leri içe aktar
import { pseudoClasses, pseudoElements } from '../properties/_pseudoSelectors.js'; // Pseudo sınıfları içe aktar
import { escapeClassName } from '../utils/escapeClassName.js'; // escapeClassName fonksiyonunu içe aktar

function createClassIndex(allClasses) {
    const classIndex = {};

    Object.keys(allClasses).forEach(className => {
        const [baseClassPart] = className.split(' >');
        if (!classIndex[baseClassPart]) {
            classIndex[baseClassPart] = [];
        }
        classIndex[baseClassPart].push(className);
    });
    return classIndex;
}

// Başında '!' olan class isimlerine 'important' ekleyen fonksiyon
function addImportantFlag(isImportant, cssRule) {
    return isImportant ? `${cssRule.replace(/;$/, '')} !important;` : cssRule;
}

// Pseudo-class ve pseudo-element işleyen fonksiyon
function formatCssRule(selector, cssRule) {
    return `${selector} {\n  ${cssRule}\n}`;
}

// Tema seçicisini döndüren fonksiyon
function getThemeSelector(themeClass) {
    const themeSelectors = {
        'dark': ':is(.dark *)',
        'light': ':is(.light *)',
    };
    return themeSelectors[themeClass] || '';
}

// Pseudo-class, tema ve medya sorgularını ayrıştırma fonksiyonu
function parseClassName(className) {
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
function createSelector(className, isStarClass, pseudoSelectors, themeSelector) {
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

export function baseCss(baseClasses, allClasses) {
    let cssOutput = '';
    const processedClasses = new Set();

    // İndeks nesnesini oluşturun
    const classIndex = createClassIndex(allClasses);

    baseClasses.forEach(className => {
        if (processedClasses.has(className)) return;
        processedClasses.add(className);

        let isStarClass = false;
        let adjustedClassName = className;

        if (className.startsWith('*:')) {
            isStarClass = true;
            adjustedClassName = className.slice(2);
        }

        const { themeClass, mediaClass, baseClass, isImportant, pseudoClassesInClassName } = parseClassName(adjustedClassName);

        let selector = createSelector(className, isStarClass, [], getThemeSelector(themeClass));

        if (pseudoClassesInClassName.length > 0) {
            const pseudoSelectors = pseudoClassesInClassName.map(pseudo => {
                if (pseudoClasses[pseudo]) {
                    return pseudoClasses[pseudo]().join('');
                } else if (pseudoElements[pseudo]) {
                    return pseudoElements[pseudo]().join('');
                } else {
                    return '';
                }
            });
            selector = createSelector(className, isStarClass, pseudoSelectors, getThemeSelector(themeClass));
        }

        // İndeksten ilgili tüm sınıfları alın
        const matchingClassNames = classIndex[baseClass];

        if (matchingClassNames && matchingClassNames.length > 0) {
            // Tüm eşleşen sınıfların CSS kurallarını birleştirin
            let combinedCssRuleContent = '';

            matchingClassNames.forEach(matchingClassName => {
                let cssRuleContent = allClasses[matchingClassName];
                let cssRule = '';

                if (typeof cssRuleContent === 'string') {
                    cssRule = cssRuleContent;
                } else if (typeof cssRuleContent === 'object') {
                    cssRule = Object.entries(cssRuleContent)
                        .map(([prop, val]) => `${prop}: ${val};`)
                        .join('\n  ');
                } else {
                    return;
                }

                // Important işlemi
                cssRule = addImportantFlag(isImportant, cssRule);

                // Child selector varsa seçiciye ekleyin
                if (matchingClassName !== baseClass) {
                    const childSelectorPart = matchingClassName.slice(baseClass.length);
                    const fullSelector = selector + childSelectorPart;
                    combinedCssRuleContent += formatCssRule(fullSelector, cssRule) + '\n';
                } else {
                    // Tam eşleşme için orijinal seçiciyi kullanın
                    combinedCssRuleContent += formatCssRule(selector, cssRule) + '\n';
                }
            });

            // CSS kurallarını çıktı olarak ekleyin
            if (mediaClass) {
                const breakpointValue = breakpoints[mediaClass];
                cssOutput += `@media (min-width: ${breakpointValue}) {\n${combinedCssRuleContent}}\n`;
            } else {
                cssOutput += combinedCssRuleContent;
            }
        } else {
            // console.log(`${baseClass} ------- sınıfı allClasses içinde bulunamadı.`);
        }
    });

    return cssOutput;
}
