export function generateTransitionPropertyClasses() {
    const transitionPropertyClasses = {};

    const properties = {
        'none': 'none',
        'all': 'all',
        '': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        'opacity': 'opacity',
        'shadow': 'box-shadow',
        'transform': 'transform'
    };

    const defaultTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
    const defaultDuration = '150ms';

    Object.entries(properties).forEach(([key, property]) => {
        const className = key === '' ? 'transition' : `transition-${key}`;

        transitionPropertyClasses[className] = `
            transition-property: ${property};
            transition-timing-function: ${defaultTimingFunction};
            transition-duration: ${defaultDuration};
        `;
    });

    return transitionPropertyClasses;
}
