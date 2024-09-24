// Statik class'ları CSS'e dönüştürme ve harf sırasına göre sıralama
export function generateBaseCss(classes, baseClasses) {
    return classes
        .filter(className => !className.includes(':')) // Responsive class'ları hariç tut
        .sort() // Harf sırasına göre sıralama
        .map(className => {
            if (baseClasses[className]) {
                return `.${className} { ${baseClasses[className]} }`; // Statik class'ı ekle
            }
            return null;
        })
        .filter(Boolean)
        .join('\n');
}
