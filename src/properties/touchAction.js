export function generatetouchActionClasses() {
    const classes = {};

    const touchAction = {
        'auto': 'auto',
        'none': 'none',
        'pan-x': 'pan-x',
        'pan-left': 'pan-left',
        'pan-right': 'pan-right',
        'pan-y': 'pan-y',
        'pan-up': 'pan-up',
        'pan-down': 'pan-down',
        'pinch-zoom': 'pinch-zoom',
        'manipulation': 'manipulation',
    };

    Object.keys(touchAction).forEach((key) => {
        const value = touchAction[key];
        classes[`touch-${key}`] = `touch-action: ${value};`;
    });

    return classes;
}
