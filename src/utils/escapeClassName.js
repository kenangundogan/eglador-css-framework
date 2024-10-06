export function escapeClassName(className) {
    // Eğer sınıf ismi rakamla başlıyorsa, rakamı sıkı bir kaçışla kaçırıyoruz (boşluksuz)
    className = className.replace(/^\d/, match => `\\3${match}`);

    return className
        .replace(/[\[\]]/g, '\\$&')     // Sadece köşeli parantezleri kaçırıyoruz
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
}
