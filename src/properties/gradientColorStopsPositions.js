export function generateGradientColorStopsPositionsClasses() {
    const gradientColorStopsPositionsClasses = {};

    // From, via ve to için pozisyon sınıflarını oluştur
    const positions = [
        0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100
    ];

    positions.forEach(position => {
        // from-... pozisyon sınıfları
        gradientColorStopsPositionsClasses[`from-${position}%`] = `--kg-gradient-from-position: ${position}%;`;

        // via-... pozisyon sınıfları
        gradientColorStopsPositionsClasses[`via-${position}%`] = `--kg-gradient-via-position: ${position}%;`;

        // to-... pozisyon sınıfları
        gradientColorStopsPositionsClasses[`to-${position}%`] = `--kg-gradient-to-position: ${position}%;`;
    });

    return gradientColorStopsPositionsClasses;
}
