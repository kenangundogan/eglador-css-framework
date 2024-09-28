export function generateMixBlendModeClasses() {
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
        'plus-darker': 'plus-darker',
        'plus-lighter': 'plus-lighter'
    };

    Object.keys(blendModes).forEach((key) => {
        const value = blendModes[key];
        classes[`mix-blend-${key}`] = `mix-blend-mode: ${value};`;
    });

    return classes;
}
