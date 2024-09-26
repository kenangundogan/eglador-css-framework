import { generateBreakpointsClasses } from './properties/breakpoints.js';
import { generatePseudoClasses } from './properties/pseudoClasses.js';
import { generatePseudoElements } from './properties/pseudoElements.js';

export function generateResponsiveCss(extractedClasses, allClasses) {
    const breakpoints = generateBreakpointsClasses();  // Breakpoint'leri alıyoruz
    const pseudoClasses = generatePseudoClasses();  // Pseudo class'ları alıyoruz
    const pseudoElements = generatePseudoElements();  // Pseudo element'leri alıyoruz

    // Media query'leri toplamak için bir yapı
    const mediaQueryGroups = {};

    extractedClasses.forEach(className => {
        const breakpoint = Object.keys(breakpoints).find(bp => className.startsWith(`${bp}:`));

        if (breakpoint) {
            let restClass = className.replace(`${breakpoint}:`, '');  // Breakpoint'i çıkarıyoruz
            let pseudoClassPrefix = '';
            let pseudoElementPrefix = '';

            // Dinamik olarak pseudo-class'ı çıkar
            Object.keys(pseudoClasses).forEach(pseudoClass => {
                if (restClass.startsWith(pseudoClass)) {
                    pseudoClassPrefix = pseudoClasses[pseudoClass];
                    restClass = restClass.replace(`${pseudoClass}:`, '');  // Pseudo-class'ı çıkar
                }
            });

            // Dinamik olarak pseudo-element'i çıkar
            Object.keys(pseudoElements).forEach(pseudoElement => {
                if (restClass.startsWith(pseudoElement)) {
                    pseudoElementPrefix = pseudoElements[pseudoElement];
                    restClass = restClass.replace(`${pseudoElement}:`, '');  // Pseudo-element'i çıkar
                }
            });

            // Base class'ı bulalım
            const baseClassContent = allClasses[restClass];  // Kalan restClass sadece base class olmalı

            // Eğer baseClassContent varsa media query grubuna ekle
            if (baseClassContent) {
                const breakpointMedia = breakpoints[breakpoint];
                if (!mediaQueryGroups[breakpointMedia]) mediaQueryGroups[breakpointMedia] = [];

                // Full selector'ü oluşturuyoruz
                let fullSelector = "";

                if (breakpoint) {
                    if (breakpoint && pseudoClassPrefix && pseudoElementPrefix) {
                        fullSelector = `.${breakpoint}\\:${pseudoClassPrefix}\\:${pseudoElementPrefix}\\:${restClass}\:${pseudoClassPrefix}\::${pseudoElementPrefix}`;
                    }
                    else if (breakpoint && pseudoClassPrefix) {
                        fullSelector = `.${breakpoint}\\:${pseudoClassPrefix}\\:${restClass}\:${pseudoClassPrefix}`;
                    }
                    else if (breakpoint && pseudoElementPrefix) {
                        fullSelector = `.${breakpoint}\\:${pseudoElementPrefix}\\:${restClass}\::${pseudoElementPrefix}`;
                    }
                    else {
                        fullSelector = `.${breakpoint}\\:${restClass}`;
                    }
                }


                mediaQueryGroups[breakpointMedia].push(`${fullSelector} { ${baseClassContent} }`);
            }
        }
    });

    // Media query'leri oluşturan CSS çıktısı
    let mediaQueryCss = '';
    Object.keys(mediaQueryGroups).forEach(breakpoint => {
        mediaQueryCss += `@media (min-width: ${breakpoint}) { ${mediaQueryGroups[breakpoint].join(' ')} } `;
    });

    console.log('Media Query CSS:', mediaQueryCss);
    return mediaQueryCss;
}
