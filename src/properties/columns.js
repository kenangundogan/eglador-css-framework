export function generateColumnsClasses() {
    const classes = {};

    const columnValues = {
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
        '12': '12',
        'auto': 'auto',
        '3xs': '16rem',  // 256px
        '2xs': '18rem',  // 288px
        'xs': '20rem',   // 320px
        'sm': '24rem',   // 384px
        'md': '28rem',   // 448px
        'lg': '32rem',   // 512px
        'xl': '36rem',   // 576px
        '2xl': '42rem',  // 672px
        '3xl': '48rem',  // 768px
        '4xl': '56rem',  // 896px
        '5xl': '64rem',  // 1024px
        '6xl': '72rem',  // 1152px
        '7xl': '80rem',  // 1280px
    };

    Object.keys(columnValues).forEach(key => {
        const value = columnValues[key];
        classes[`columns-${key}`] = `columns: ${value};`;
    });

    return classes;
}
