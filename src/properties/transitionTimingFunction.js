export function generateTransitionTimingFunctionClasses() {
    const transitionTimingFunctionClasses = {};

    const timingFunctions = {
        'linear': 'linear',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
    };

    Object.entries(timingFunctions).forEach(([key, value]) => {
        transitionTimingFunctionClasses[`ease-${key}`] = `
            transition-timing-function: ${value};
        `;
    });

    return transitionTimingFunctionClasses;
}
