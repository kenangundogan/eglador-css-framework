import { generateBreakpointsClasses } from './properties/breakpoints.js';
import { generateSelectorsClasses } from './properties/selectors.js';
import { escapeClassName } from './escapeClassName.js';

// Media query'leri gruplayarak toplamak için bir yapı
const mediaQueryGroups = {};

// Breakpoint ile media query oluşturma
export function generateResponsiveCss(classes, baseClasses) {
    const breakpoints = generateBreakpointsClasses();
    const selectors = generateSelectorsClasses();

    // Breakpoints ve selectors'a göre sınıfları ayır
    const breakpointClasses = classes.reduce((acc, className) => {
        const breakpointPrefix = Object.keys(breakpoints).find(breakpoint => className.startsWith(breakpoint + ':'));
        if (breakpointPrefix) {
            let restClass = className.replace(breakpointPrefix + ':', ''); // Breakpoint'i kaldır
            let selectorPrefix = '';

            // Birden fazla selector varsa, her birini sırayla işle
            Object.keys(selectors).forEach(selector => {
                if (restClass.startsWith(selector)) {
                    selectorPrefix += selector;
                    restClass = restClass.replace(selector, ''); // Selector'ü kaldır ve sıradaki base class'ı al
                }
            });

            const baseClassName = restClass;
            acc.push({ className, breakpointPrefix, selectorPrefix, baseClassName });
        }
        return acc;
    }, []);

    // Breakpoint sınıflarını işleme
    breakpointClasses.forEach(({ className, breakpointPrefix, selectorPrefix, baseClassName }) => {
        const breakpointMedia = breakpoints[breakpointPrefix]; // Breakpoint'e uygun media query al
        const baseClassContent = baseClasses[baseClassName];  // Base class'ın içeriğini al

        if (baseClassContent) {
            const escapedClassName = escapeClassName(baseClassName); // Base class'ı escape et
            const fullSelector = buildSelector(breakpointPrefix, selectorPrefix, escapedClassName);
            groupMediaQuery(breakpointMedia, fullSelector, baseClassContent);
        }
    });

    // Medya sorguları gruplarını optimize edip çıktıyı döndür
    return generateMediaQueryCss();
}

// Media query'yi grupla ve birleştir
function groupMediaQuery(breakpointMedia, fullSelector, baseClassContent) {
    if (!mediaQueryGroups[breakpointMedia]) {
        mediaQueryGroups[breakpointMedia] = []; // Eğer bu breakpoint için bir grup yoksa oluştur
    }
    mediaQueryGroups[breakpointMedia].push(`${fullSelector} { ${baseClassContent} }`);
}

// Media query gruplarını optimize et ve tek bir blokta topla
function generateMediaQueryCss() {
    let mediaQueryCss = '';
    Object.keys(mediaQueryGroups).forEach(breakpoint => {
        mediaQueryCss += `@media (min-width: ${breakpoint}) { ${mediaQueryGroups[breakpoint].join(' ')} } `;
    });
    return mediaQueryCss;
}

// Selector'ü oluşturma
function buildSelector(breakpointPrefix, selectorPrefix, escapedClassName) {
    let fullSelector = `.${breakpointPrefix}\\:${escapedClassName}`;
    if (selectorPrefix) {
        const selectorParts = selectorPrefix.split(':').filter(Boolean); // Boş olmayan selector'leri al
        fullSelector = `.${breakpointPrefix}\\:${selectorParts.join('\\:')}\\:${escapedClassName}:${selectorParts.join(':')}`;
    }
    return fullSelector;
}
