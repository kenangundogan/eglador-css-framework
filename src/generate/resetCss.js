import { generateResetClasses } from '../properties/_reset.js';

export function resetCss(project) {
    if (project.cssreset) {
        return generateResetClasses();
    }
    return '';
}
