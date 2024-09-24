import config from './eglador.config.js';
import { generateResetClasses } from './properties/reset.js';

export function generateResetCss() {
    if (config.cssreset) {
        const resetClasses = generateResetClasses();
        let cssString = '';

        // Reset sınıflarını CSS stringine çevir
        for (const selector in resetClasses) {
            cssString += `${selector} { ${resetClasses[selector]} }\n`;
        }
        return cssString;
    }
    return ''; // Eğer cssreset false ise boş string döndür
}
