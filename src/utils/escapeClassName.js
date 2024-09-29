export function escapeClassName(className) {
    return className.replace(/[^a-zA-Z0-9-]/g, '\\$&');
}
