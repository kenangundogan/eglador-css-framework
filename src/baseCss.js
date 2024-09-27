// Statik class'ları CSS'e dönüştürme ve harf sırasına göre sıralama
export function generateBaseCss(extractedClasses, allClasses) {
    return extractedClasses
        .filter(className => !className.includes(':')) // Responsive class'ları hariç tut
        .sort() // Harf sırasına göre sıralama
        .map(className => {
            if (allClasses[className]) {
                return `.${className} { ${allClasses[className]} }`; // Statik class'ı ekle
            }
            return null;
        })
        .filter(Boolean)
        .join('\n');
}
