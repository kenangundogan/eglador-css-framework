export function generateBackgroundBlendModeClasses() {
    const classes = {};

    const blendModes = {
        'normal': 'normal',
        'multiply': 'multiply',
        'screen': 'screen',
        'overlay': 'overlay',
        'darken': 'darken',
        'lighten': 'lighten',
        'color-dodge': 'color-dodge',
        'color-burn': 'color-burn',
        'hard-light': 'hard-light',
        'soft-light': 'soft-light',
        'difference': 'difference',
        'exclusion': 'exclusion',
        'hue': 'hue',
        'saturation': 'saturation',
        'color': 'color',
        'luminosity': 'luminosity',
    };

    Object.keys(blendModes).forEach((key) => {
        const value = blendModes[key];
        classes[`bg-blend-${key}`] = `background-blend-mode: ${value};`;
    });

    return classes;
}
