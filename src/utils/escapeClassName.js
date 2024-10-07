export function escapeClassName(className) {
    // Eğer sınıf adı bir rakamla başlıyorsa, onu karakterin altıgen (hexadecimal) koduyla kaçırıyoruz
    className = className.replace(/^\d/, match => `\\${match.charCodeAt(0).toString(16)}`);

    return className
        // '[' ve ']' karakterlerini önlerine ters eğik çizgi ekleyerek kaçırıyoruz
        .replace(/[\[\]]/g, '\\$&')
        // ':' karakterini kaçırıyoruz
        .replace(/:/g, '\\:')
        // '/' karakterini kaçırıyoruz
        .replace(/\//g, '\\/')
        // '.' karakterini kaçırıyoruz
        .replace(/\./g, '\\.')
        // '!' karakterini kaçırıyoruz
        .replace(/\!/g, '\\!')
        // ',' karakterini altıgen koduyla ve bir boşlukla kaçırıyoruz
        .replace(/,/g, '\\2c ')
        // '(' karakterini kaçırıyoruz
        .replace(/\(/g, '\\(')
        // ')' karakterini kaçırıyoruz
        .replace(/\)/g, '\\)')
        // '%' karakterini kaçırıyoruz
        .replace(/%/g, '\\%')
        // '+' karakterini kaçırıyoruz
        .replace(/\+/g, '\\+')
        // '-' karakterinin etrafındaki boşlukları kaldırıyoruz
        .replace(/(\s*-\s*)/g, '-')
        // '#' karakterini kaçırıyoruz
        .replace(/#/g, '\\#')
        // Çift tırnakları kaçırıyoruz
        .replace(/"/g, `\\"`)
        // Ters tırnak (`) karakterini kaçırıyoruz
        .replace(/`/g, '\\`')
        // '*' karakterini altıgen koduyla ve bir boşlukla kaçırıyoruz
        .replace(/\*/g, '\\2a ')
}
