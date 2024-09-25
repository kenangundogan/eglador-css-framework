export function generateBorderClasses() {
    const borderWidth = {};
    const borderStyle = {};
    const borderWidthValues = ['0', '1', '2', '4', '8'];
    const borderStyleValues = ['solid', 'dashed', 'dotted', 'double', 'hidden', 'none'];

    borderWidthValues.forEach(value => {
        const remPx = `${value}px`;
        borderWidth[`border-${value}`] = `border-width: ${remPx};`;
        borderWidth[`border-t-${value}`] = `border-top-width: ${remPx};`;
        borderWidth[`border-r-${value}`] = `border-right-width: ${remPx};`;
        borderWidth[`border-b-${value}`] = `border-bottom-width: ${remPx};`;
        borderWidth[`border-l-${value}`] = `border-left-width: ${remPx};`;
        borderWidth[`border-x-${value}`] = `border-left-width: ${remPx}; border-right-width: ${remPx};`;
        borderWidth[`border-y-${value}`] = `border-top-width: ${remPx}; border-bottom-width: ${remPx};`;
    });

    borderStyleValues.forEach(value => {
        borderStyle[`border-${value}`] = `border-style: ${value};`;
        borderStyle[`border-t-${value}`] = `border-top-style: ${value};`;
        borderStyle[`border-r-${value}`] = `border-right-style: ${value};`;
        borderStyle[`border-b-${value}`] = `border-bottom-style: ${value};`;
        borderStyle[`border-l-${value}`] = `border-left-style: ${value};`;
        borderStyle[`border-x-${value}`] = `border-left-style: ${value}; border-right-style: ${value};`;
        borderStyle[`border-y-${value}`] = `border-top-style: ${value}; border-bottom-style: ${value};`;
    });

    return {
        ...borderWidth,
        ...borderStyle,
    };
}
