import { breakpoints } from './breakpoints.js';
import { escapeClassName } from './escapeClassName.js';

// Media query'leri gruplayarak toplamak için bir yapı
const mediaQueryGroups = {};

// Breakpoint ile media query oluşturma
export function generateResponsiveCss(classes, baseClasses) {
    classes.forEach(className => {
        if (className.includes(':')) {
            const [breakpointPrefix, baseClassName] = className.split(':'); // Örneğin: "sm:flex" => ["sm", "flex"]
            const breakpointMedia = breakpoints[breakpointPrefix];

            // Base class'ın içeriğini al
            const baseClassContent = baseClasses[baseClassName];

            if (breakpointMedia && baseClassContent) {
                const escapedClassName = escapeClassName(className); // Class'ı escape et
                // Media query'yi grupla ve birleştir
                if (!mediaQueryGroups[breakpointMedia]) {
                    mediaQueryGroups[breakpointMedia] = []; // Eğer bu breakpoint için bir grup yoksa oluştur
                }
                mediaQueryGroups[breakpointMedia].push(`.${escapedClassName} { ${baseClassContent} }`);
            }
        }
    });

    // Media query gruplarını optimize et ve tek bir blokta topla
    let mediaQueryCss = '';
    Object.keys(mediaQueryGroups).forEach(breakpoint => {
        mediaQueryCss += `@media (min-width: ${breakpoint}) { ${mediaQueryGroups[breakpoint].join(' ')} } `;
    });

    return mediaQueryCss;
}
