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
        classes[`tracking-${key}`] = `letter-spacing: ${value};`;
    });

    return classes;
}
