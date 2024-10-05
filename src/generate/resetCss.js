import config from '../eglador.config.js';
import { generateResetClasses } from '../properties/reset.js';

export function resetCss() {
    if (config.cssreset) {
        // Reset sınıflarını doğrudan al ve döndür
        const resetClasses = generateResetClasses();
        return resetClasses; // CSS stringini doğrudan döndür
    }
    return ''; // Eğer cssreset false ise boş string döndür
}
