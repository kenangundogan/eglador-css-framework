export function generateOrderClasses() {
    const classes = {};

    const orderValues = {
        'first': '-9999',
        'last': '9999',
        'none': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12'
    };

    Object.keys(orderValues).forEach(key => {
        const value = orderValues[key];

        // Eğer değer "-" ile başlıyorsa pozitif yap
        if (value.startsWith('-')) {
            const positiveValue = value.slice(1); // "-" işaretini kaldırıyoruz
            classes[`-order-${key}`] = `order: ${positiveValue};`;
        } else {
            // Değer pozitifse, negatif yap
            const negativeValue = `-${value}`;
            classes[`-order-${key}`] = `order: ${negativeValue};`;
        }

        // Normal order sınıfı
        classes[`order-${key}`] = `order: ${value};`;
    });

    return classes;
}
