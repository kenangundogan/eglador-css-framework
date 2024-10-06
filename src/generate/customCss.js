import { processCustomClass } from '../utils/customCssProcessor.js';

export function customCss(extractedClasses) {
    let cssOutput = ''; // Tüm CSS kurallarını toplamak için bir değişken

    // Gelen her sınıfı işle
    extractedClasses.forEach(className => {
        // Custom sınıfı işlemek için helper fonksiyonunu kullanalım
        const customClass = processCustomClass(className);
        if (customClass) {
            cssOutput += customClass + '\n'; // CSS çıktısını topluyoruz
        }
    });

    // Tüm oluşturulan CSS kurallarını string formatında döndür
    return cssOutput;
}
