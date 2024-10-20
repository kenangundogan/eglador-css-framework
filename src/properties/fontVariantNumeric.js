export function generateFontVariantNumericClasses() {

    const classes = {};

    const fontVariantNumericValues = [
        {
            name: 'normal-nums',
            value: 'font-variant-numeric: normal;',
            variable: false
        },
        {
            name: 'ordinal',
            value: '--kg-ordinal: ordinal;',
            variable: true
        },
        {
            name: 'slashed-zero',
            value: '--kg-slashed-zero: slashed-zero;',
            variable: true
        },
        {
            name: 'lining-nums',
            value: '--kg-numeric-figure: lining-nums;',
            variable: true
        },
        {
            name: 'oldstyle-nums',
            value: '--kg-numeric-figure: oldstyle-nums;',
            variable: true
        },
        {
            name: 'proportional-nums',
            value: '--kg-numeric-spacing: proportional-nums;',
            variable: true
        },
        {
            name: 'tabular-nums',
            value: '--kg-numeric-spacing: tabular-nums;',
            variable: true
        },
        {
            name: 'diagonal-fractions',
            value: '--kg-numeric-fraction: diagonal-fractions;',
            variable: true
        },
        {
            name: 'stacked-fractions',
            value: '--kg-numeric-fraction: stacked-fractions;',
            variable: true
        }
    ];

    fontVariantNumericValues.forEach(({ name, value, variable }) => {
        if (variable) {
            classes[name] = `${value} font-variant-numeric: var(--kg-ordinal) var(--kg-slashed-zero) var(--kg-numeric-figure) var(--kg-numeric-spacing) var(--kg-numeric-fraction);`;
        } else {
            classes[name] = value;
        }
    });
    return classes;
}
