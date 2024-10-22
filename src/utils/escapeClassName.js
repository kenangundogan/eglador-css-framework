import cssesc from 'css.escape';
export function escapeClassName(className) {
    return cssesc(className).replace(/\\,/g, '\\2c ');
}
