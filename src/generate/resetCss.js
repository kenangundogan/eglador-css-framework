import config from '../eglador.config.js';
import { generateResetClasses } from '../properties/reset.js';

export function resetCss() {
    if (config.cssreset) {
        return generateResetClasses();
    }
    return '';
}
