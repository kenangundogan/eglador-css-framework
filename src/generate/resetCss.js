import config from '../eglador.config.js';
import { generateResetClasses } from '../properties/_reset.js';

export function resetCss() {
    if (config.cssreset) {
        return generateResetClasses();
    }
    return '';
}
