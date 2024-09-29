export function cssObjectToString(cssObject) {
    return Object.entries(cssObject)
        .map(([key, value]) => `${key}: ${value};`)
        .join(' ');
}
