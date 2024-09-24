import { generateDisplayClasses } from './properties/display.js';
import { generateSpacingClasses } from './properties/spacing.js';
import { generatePositionClasses } from './properties/position.js';

// Tüm class'ları birleştiren fonksiyon
export function generateAllBaseClasses() {
    return {
        ...generateSpacingClasses(),    // Statik margin/padding class'ları
        ...generatePositionClasses(),   // Statik position class'ları
        ...generateDisplayClasses()     // Statik display class'ları
    };
}
