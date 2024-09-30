export function generateRingOffsetWidthClasses() {
    const ringOffsetWidthClasses = {};

    const ringOffsets = {
        '0': '0px',
        '1': '1px',
        '2': '2px',
        '4': '4px',
        '8': '8px'
    };

    Object.entries(ringOffsets).forEach(([key, offsetWidth]) => {
        ringOffsetWidthClasses[`ring-offset-${key}`] = `
            --kg-ring-offset-width: ${offsetWidth};
        `;
    });

    return ringOffsetWidthClasses;
}
