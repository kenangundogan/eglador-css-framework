export function generateTransitionDurationClasses() {
    const transitionDurationClasses = {};

    const durations = {
        '0': '0s',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms'
    };

    Object.entries(durations).forEach(([key, value]) => {
        transitionDurationClasses[`duration-${key}`] = `
            transition-duration: ${value};
        `;
    });

    return transitionDurationClasses;
}
