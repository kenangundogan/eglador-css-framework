export function generateOrderClasses() {
    const classes = {};
    const orderScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, '-9999', '9999', 0];

    orderScale.forEach((value, index) => {
        classes[`order-${value}`] = `order: ${value};`;
    });

    return classes;
}
