export function generateLetterSpacingClasses() {
    const classes = {};

    const letterSpacingValues = {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em'
    };

    Object.keys(letterSpacingValues).forEach(key => {
        const value = letterSpacingValues[key];

        // Pozitif letter-spacing sınıfları
        classes[`tracking-${key}`] = `letter-spacing: ${value};`;

        // Negatif letter-spacing sınıfları
        if (value.startsWith('-')) {
            // Eğer negatifse, pozitif hale getiriyoruz
            const positiveValue = value.slice(1); // "-" işaretini kaldırıyoruz
            classes[`-tracking-${key}`] = `letter-spacing: ${positiveValue};`;
        } else {
            // Eğer pozitifse, negatif hale getiriyoruz
            const negativeValue = `-${value}`;
            classes[`-tracking-${key}`] = `letter-spacing: ${negativeValue};`;
        }
    });

    return classes;
}
