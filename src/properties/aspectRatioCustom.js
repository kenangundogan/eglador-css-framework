export function generateAspectRatioCustomClasses() {
    const maxRatio = 16; // Maksimum oran değeri
    const classes = {};

    // Genişlik oranları için döngü
    for (let w = 1; w <= maxRatio; w++) {
        classes[`aspect-w-${w}`] = `
            position: relative;
            padding-bottom: calc(var(--kg-aspect-h, 1) / var(--kg-aspect-w, ${w}) * 100%);
            --kg-aspect-w: ${w};
        `;

        classes[`aspect-w-${w} > *`] = `
            position: absolute; height: 100%; width: 100%; top: 0; right: 0; bottom: 0; left: 0;
        `;
    }

    // Yükseklik oranları için döngü
    for (let h = 1; h <= maxRatio; h++) {
        classes[`aspect-h-${h}`] = `--kg-aspect-h: ${h};`;
    }

    return classes;
}
