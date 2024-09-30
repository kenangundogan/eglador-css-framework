export function generateScrollSnapTypeClasses() {
    const scrollSnapTypeClasses = {};

    const snapTypes = {
        'none': 'none',
        'x': 'x var(--kg-scroll-snap-strictness)',
        'y': 'y var(--kg-scroll-snap-strictness)',
        'both': 'both var(--kg-scroll-snap-strictness)',
    };

    const snapStrictness = {
        'mandatory': 'mandatory',
        'proximity': 'proximity'
    };

    // Scroll snap type classes
    Object.entries(snapTypes).forEach(([key, snapType]) => {
        scrollSnapTypeClasses[`snap-${key}`] = `scroll-snap-type: ${snapType};`;
    });

    // Scroll snap strictness classes
    Object.entries(snapStrictness).forEach(([key, strictness]) => {
        scrollSnapTypeClasses[`snap-${key}`] = `--kg-scroll-snap-strictness: ${strictness};`;
    });

    return scrollSnapTypeClasses;
}
