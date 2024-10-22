export function sanitizeValue(value) {
    return value
        .replace(/\\\//g, '/')
        .replace(/\\:/g, ':')
        .replace(/\\;/g, ';')
        .replace(/\\,/g, ',')
        .replace(/\\\./g, '.')
        .replace(/_/g, ' ')
        .replace(/\(\s+/g, '(').replace(/\s+\)/g, ')')
        .replace(/\s+/g, ' ').trim();
}
