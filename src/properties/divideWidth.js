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
            '--tw-divide-x-reverse': '0',
            'border-right-width': `calc(${value} * var(--tw-divide-x-reverse))`,
            'border-left-width': `calc(${value} * calc(1 - var(--tw-divide-x-reverse)))`,
        };

        // divide-y sınıfları
        const classNameY = valueKey === 'default' ? 'divide-y' : `divide-y-${valueKey}`;
        classes[`${classNameY} > * + *`] = {
            '--tw-divide-y-reverse': '0',
            'border-top-width': `calc(${value} * calc(1 - var(--tw-divide-y-reverse)))`,
            'border-bottom-width': `calc(${value} * var(--tw-divide-y-reverse))`,
        };
    });

    // Reverse sınıflarını oluştur
    classes['divide-x-reverse > * + *'] = {
        '--tw-divide-x-reverse': '1',
    };
    classes['divide-y-reverse > * + *'] = {
        '--tw-divide-y-reverse': '1',
    };

    return classes;
}
