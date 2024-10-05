const mathFunctions = [
    'calc',
    'min',
    'max',
    'clamp',
    'mod',
    'rem',
    'sin',
    'cos',
    'tan',
    'asin',
    'acos',
    'atan',
    'atan2',
    'pow',
    'sqrt',
    'hypot',
    'log',
    'exp',
    'round',
];

export function formatMathExpressions(value) {
    // Eğer value içinde mathFunctions'tan biri varsa, virgülleri ve operatörleri düzenleyelim
    const hasMathFunction = mathFunctions.some(func => value.includes(func));

    if (hasMathFunction) {
        // Virgülleri \2c ile değiştir
        // let formattedValue = value.replace(/,/g, '\\2c ');
        // + ve - işaretleri arasına boşluk ekle
        let formattedValue = value.replace(/([+-])/g, ' $1 ');

        return formattedValue;
    }

    return value;
}
