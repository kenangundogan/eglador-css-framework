export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};

// Breakpoints için media queries oluşturma fonksiyonu
export function applyBreakpoints(propertyName, propertyValue) {
    const cssOutput = {};

    Object.keys(breakpoints).forEach(breakpoint => {
        // Responsive class'ları media query içinde oluşturuyoruz
        cssOutput[`@media (min-width: ${breakpoints[breakpoint]})`] = {
            [`.${breakpoint}:${propertyName}`]: `${propertyValue}`, // Media query'de responsive class'ı ekle
        };
    });

    return cssOutput;
}
