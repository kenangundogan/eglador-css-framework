export function generateLineClampClasses() {
    const classes = {};

    const lineClampValues = [1, 2, 3, 4, 5, 6];

    lineClampValues.forEach(value => {
        classes[`line-clamp-${value}`] = `
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: ${value};
        `;
    });

    classes['line-clamp-none'] = `
        overflow: visible;
        display: block;
        -webkit-box-orient: horizontal;
        -webkit-line-clamp: none;
    `;

    return classes;
}
