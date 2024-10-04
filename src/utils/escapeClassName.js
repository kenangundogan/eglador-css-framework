export function escapeClassName(className) {
    return className
        .replace(/[\[\]]/g, '\\$&')  // Sadece köşeli parantezleri kaçırıyoruz
        .replace(/:/g, '\\:')        // ':' karakterini kaçırıyoruz
        .replace(/\//g, '\\/')       // '/' karakterini kaçırıyoruz
        .replace(/\./g, '\\.')      // '.' karakterini kaçırıyoruz
        .replace(/\!/g, '\\!')      // '!' karakterini kaçırıyoruz
        .replace(/,/g, '\\2c ')     // ',' karakterini kaçırıyoruz
        .replace(/\(/g, '\\(')      // '(' karakterini kaçırıyoruz
        .replace(/\)/g, '\\)')      // ')' karakterini kaçırıyoruz
        .replace(/%/g, '\\%')       // '%' karakterini kaçırıyoruz
        .replace(/(\s*-\s*)/g, '-');// '-' karakterini boşluk olmadan kaçırıyoruz
}
