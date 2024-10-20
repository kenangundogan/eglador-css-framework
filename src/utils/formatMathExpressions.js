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
    const hasMathFunction = mathFunctions.some(func => value.startsWith(func));

    if (hasMathFunction) {
        let formattedValue = value.replace(/([+\-*/])/g, ' $1 ');
        return formattedValue;
    }

    return value;
}
