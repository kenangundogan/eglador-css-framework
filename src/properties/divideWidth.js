export function generateDivideWidthClasses() {
    const classes = {};

    const divideValues = {
        '0': '0px',
        '2': '2px',
        '4': '4px',
        '8': '8px',
        'default': '1px',
    };

    // X ve Y yönü için sınıfları oluştur
    Object.keys(divideValues).forEach(valueKey => {
        const value = divideValues[valueKey];

        // divide-x sınıfları
        const classNameX = valueKey === 'default' ? 'divide-x' : `divide-x-${valueKey}`;
        classes[`${classNameX} > * + *`] = {
            '--kg-divide-x-reverse': '0',
            'border-right-width': `calc(${value} * var(--kg-divide-x-reverse))`,
            'border-left-width': `calc(${value} * calc(1 - var(--kg-divide-x-reverse)))`,
        };

        // divide-y sınıfları
        const classNameY = valueKey === 'default' ? 'divide-y' : `divide-y-${valueKey}`;
        classes[`${classNameY} > * + *`] = {
            '--kg-divide-y-reverse': '0',
            'border-top-width': `calc(${value} * calc(1 - var(--kg-divide-y-reverse)))`,
            'border-bottom-width': `calc(${value} * var(--kg-divide-y-reverse))`,
        };
    });

    // Reverse sınıflarını oluştur
    classes['divide-x-reverse > * + *'] = {
        '--kg-divide-x-reverse': '1',
    };
    classes['divide-y-reverse > * + *'] = {
        '--kg-divide-y-reverse': '1',
    };

    return classes;
}
