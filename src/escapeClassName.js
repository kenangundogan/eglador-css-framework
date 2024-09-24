// Class isimlerindeki özel karakterleri escape etmek için fonksiyon
export function escapeClassName(className) {
    // Eğer class ismi rakamla başlıyorsa CSS uyumluluğu için başına kaçış karakteri ekle
    if (/^\d/.test(className)) {
        className = `\\3${className[0]}${className.slice(1)}`; // İlk karakter rakam ise kaçış karakteri ekle, boşluk koyma
    }

    // ":" karakterlerini escape et
    return className.replace(/:/g, '\\:');
}
