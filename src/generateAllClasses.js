import { generateOverflowClasses } from './properties/overflow.js';
import { generatePositionClasses } from './properties/position.js';
import { generateDisplayClasses } from './properties/display.js';
import { generateJustifyContentClasses } from './properties/justifyContent.js';
import { generateAlignItemsClasses } from './properties/alignItems.js';
import { generateFlexDirectionClasses } from './properties/flexDirection.js';
import { generateSpacingClasses } from './properties/spacing.js';

// Tüm class'ları birleştiren fonksiyon
export function generateAllClasses() {
    return {
        ...generateOverflowClasses(),    // Statik overflow class'ları
        ...generatePositionClasses(),   // Statik position class'ları
        ...generateDisplayClasses(),     // Statik display class'ları
        ...generateJustifyContentClasses(), // Statik justify-content class'ları
        ...generateAlignItemsClasses(), // Statik align-items class'ları
        ...generateFlexDirectionClasses(), // Statik flex-direction class'ları
        ...generateSpacingClasses(),    // Statik margin/padding class'ları
    };
}
