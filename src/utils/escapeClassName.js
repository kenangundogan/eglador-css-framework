export function escapeClassName(className) {
    className = className.replace(/^\d/, match => `\\3${match}`);

    return className
        .replace(/[\[\]]/g, '\\$&')     // Köşeli parantezleri kaçırıyoruz
        .replace(/:/g, '\\:')           // ':' karakterini kaçırıyoruz
        .replace(/\//g, '\\/')          // '/' karakterini kaçırıyoruz
        .replace(/\./g, '\\.')          // '.' karakterini kaçırıyoruz
        .replace(/\!/g, '\\!')          // '!' karakterini kaçırıyoruz
        .replace(/,/g, '\\2c ')         // ',' karakterini kaçırıyoruz
        .replace(/\(/g, '\\(')          // '(' karakterini kaçırıyoruz
        .replace(/\)/g, '\\)')          // ')' karakterini kaçırıyoruz
        .replace(/%/g, '\\%')           // '%' karakterini kaçırıyoruz
        .replace(/\+/g, '\\+')          // '+' karakterini kaçırıyoruz
        .replace(/(\s*-\s*)/g, '-')     // '-' karakterini boşluk olmadan kaçırıyoruz
        .replace(/#/g, '\\#')           // '#' karakterini kaçırıyoruz
        .replace(/"/g, `\\"`)           // Çift tırnakları kaçırıyoruz
        .replace(/`/g, '\\`')           // Backtick karakterini kaçırıyoruz
        .replace(/\*/g, '\\2a')         // '*' karakterini kaçırıyoruz
}
