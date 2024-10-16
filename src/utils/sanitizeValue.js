export function sanitizeValue(value) {
    return value
        .replace(/\\\//g, '/') // Slash'leri escape etme
        .replace(/\\:/g, ':') // İki noktaları escape etme
        .replace(/\\;/g, ';') // Noktalı virgülleri escape etme
        .replace(/\\,/g, ',') // Virgülleri escape etme
        .replace(/\\\./g, '.') // Noktaları escape etme
        .replace(/_/g, ' ') // Alt çizgileri boşlukla değiştir
        .replace(/\(\s+/g, '(').replace(/\s+\)/g, ')') // Boşlukları parantezlerin içinden kaldır
        .replace(/\s+/g, ' ').trim(); // Birden fazla boşluğu tek boşlukla değiştir ve baştaki ve sondaki boşlukları kaldır
}
