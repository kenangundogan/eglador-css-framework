import cssesc from 'css.escape';
export function escapeClassName(className) {

    return cssesc(className).replace(/\\,/g, '\\2c ');

    // Eğer sınıf adı bir rakamla başlıyorsa, onu karakterin altıgen (hexadecimal) koduyla kaçırıyoruz
    // className = className.replace(/^\d/, match => `\\${match.charCodeAt(0).toString(16)}`);

    // return className
    //     .replace(/[\[\]]/g, '\\$&')// '[' ve ']' karakterlerini önlerine ters eğik çizgi ekleyerek kaçırıyoruz
    //     .replace(/:/g, '\\:')// ':' karakterini kaçırıyoruz
    //     .replace(/\//g, '\\/')// '/' karakterini kaçırıyoruz
    //     .replace(/\./g, '\\.')// '.' karakterini kaçırıyoruz
    //     .replace(/\!/g, '\\!')// '!' karakterini kaçırıyoruz
    //     .replace(/,/g, '\\2c ')// ',' karakterini altıgen koduyla ve bir boşlukla kaçırıyoruz
    //     .replace(/\(/g, '\\(')// '(' karakterini kaçırıyoruz
    //     .replace(/\)/g, '\\)')// ')' karakterini kaçırıyoruz
    //     .replace(/%/g, '\\%')// '%' karakterini kaçırıyoruz
    //     .replace(/\+/g, '\\+')// '+' karakterini kaçırıyoruz
    //     .replace(/(\s*-\s*)/g, '-')// '-' karakterinin etrafındaki boşlukları kaldırıyoruz
    //     .replace(/#/g, '\\#')// '#' karakterini kaçırıyoruz
    //     .replace(/"/g, `\\"`)// Çift tırnakları kaçırıyoruz
    //     .replace(/`/g, '\\`')// Ters tırnak (`) karakterini kaçırıyoruz
    //     .replace(/\*/g, '\\2a ')// '*' karakterini altıgen koduyla ve bir boşlukla kaçırıyoruz
}
