export function escapeClassName(className) {
    return className
        .replace(/[\[\]]/g, '\\$&')  // Sadece köşeli parantezleri kaçırıyoruz
        .replace(/:/g, '\\:')        // ':' karakterini kaçırıyoruz
        .replace(/\//g, '\\/')       // '/' karakterini kaçırıyoruz
        .replace(/\./g, '\\.');      // '.' karakterini kaçırıyoruz
}
