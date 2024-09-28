import { generateAspectRatioClasses } from './properties/aspectRatio.js';
import { generateOverflowClasses } from './properties/overflow.js';
import { generatePositionClasses } from './properties/position.js';
import { generateOrderClasses } from './properties/order.js';
import { generateTopRightBottomLeftClasses } from './properties/topRightBottomLeft.js';
import { generateDisplayClasses } from './properties/display.js';
import { generateJustifyContentClasses } from './properties/justifyContent.js';
import { generateJustifyItemsClasses } from './properties/justifyItems.js';
import { generateJustifySelfClasses } from './properties/justifySelf.js';
import { generateAlignContentClasses } from './properties/alignContent.js';
import { generateAlignItemsClasses } from './properties/alignItems.js';
import { generateAlignSelfClasses } from './properties/alignSelf.js';
import { generatePlaceContentClasses } from './properties/placeContent.js';
import { generatePlaceItemsClasses } from './properties/placeItems.js';
import { generatePlaceSelfClasses } from './properties/placeSelf.js';
import { generateFlexDirectionClasses } from './properties/flexDirection.js';
import { generateFlexWrapClasses } from './properties/flexWrap.js';
import { generateFlexBasisClasses } from './properties/flexBasis.js';
import { generateFlexClasses } from './properties/flex.js';
import { generateFlexGrowClasses } from './properties/flexGrow.js';
import { generateFlexShrinkClasses } from './properties/flexShrink.js';
import { generateAppearanceClasses } from './properties/appearance.js';
import { generateObjectFitClasses } from './properties/objectFit.js';
import { generateObjectPositionClasses } from './properties/objectPosition.js';
import { generateWidthClasses } from './properties/width.js';
import { generateMaxWidthClasses } from './properties/maxWidth.js';
import { generateMinWidthClasses } from './properties/minWidth.js';
import { generateHeightClasses } from './properties/height.js';
import { generateMaxHeightClasses } from './properties/maxHeight.js';
import { generateMinHeightClasses } from './properties/minHeight.js';
import { generateSizeClasses } from './properties/size.js';
import { generateSpaceClasses } from './properties/space.js';
import { generateMarginClasses } from './properties/margin.js';
import { generatePaddingClasses } from './properties/padding.js';
import { generateLeadingClasses } from './properties/leading.js';
import { generateLetterSpacingClasses } from './properties/letterSpacing.js';
import { generateLineClampClasses } from './properties/lineClamp.js';
import { generateLineHeightClasses } from './properties/lineHeight.js';
import { generateGapClasses } from './properties/gap.js';
import { generateGridTemplateColumnsClasses } from './properties/gridTemplateColumns.js';
import { generateGridTemplateRowsClasses } from './properties/gridTemplateRows.js';
import { generateGridAutoFlowClasses } from './properties/gridAutoFlow.js';
import { generateGridAutoColumnsClasses } from './properties/gridAutoColumns.js';
import { generateGridAutoRowsClasses } from './properties/gridAutoRows.js';
import { generateGridRowStartEndClasses } from './properties/gridRowStartEnd.js';
import { generateGridColumnStartEndClasses } from './properties/gridColumnStartEnd.js';
import { generateFontSizeClasses } from './properties/fontSize.js';
import { generateFontSmoothingClasses } from './properties/fontSmoothing.js';
import { generateFontStyleClasses } from './properties/fontStyle.js';
import { generateFontWeightClasses } from './properties/fontWeight.js';
import { generateFontVariantNumericClasses } from './properties/fontVariantNumeric.js';
import { generateFontFamilyClasses } from './properties/fontFamily.js';
import { generateBorderClasses } from './properties/border.js';
import { generateBorderRadiusClasses } from './properties/borderRadius.js';
import { generateBackgroundAttachmentClasses } from './properties/backgroundAttachment.js';
import { generateBackgroundClipClasses } from './properties/backgroundClip.js';
import { generateBackgroundOriginClasses } from './properties/backgroundOrigin.js';
import { generateBackgroundPositionClasses } from './properties/backgroundPosition.js';
import { generateBackgroundRepeatClasses } from './properties/backgroundRepeat.js';
import { generateBackgroundSizeClasses } from './properties/backgroundSize.js';
import { generateTextAlignClasses } from './properties/textAlign.js';
import { generateTextDecorationClasses } from './properties/textDecoration.js';
import { generateTextDecorationStyleClasses } from './properties/textDecorationStyle.js';
import { generateTextIndentClasses } from './properties/textIndent.js';
import { generateTextOverflowClasses } from './properties/textOverflow.js';
import { generateTextTransformClasses } from './properties/textTransform.js';
import { generateTextUnderlineOffsetClasses } from './properties/textUnderlineOffset.js';
import { generateTextWrapClasses } from './properties/textWrap.js';
import { generateListStyleImageClasses } from './properties/listStyleImage.js';
import { generateListStylePositionClasses } from './properties/listStylePosition.js';
import { generateListStyleTypeClasses } from './properties/listStyleType.js';
import { generateContentClasses } from './properties/content.js';
import { generateHyphensClasses } from './properties/Hyphens.js';
import { generateVerticalAlignClasses } from './properties/verticalAlign.js';
import { generateWordBreakClasses } from './properties/wordBreak.js';
import { generateWhiteSpaceClasses } from './properties/whiteSpace.js';
import { generateColorClasses } from './properties/color.js';
import { generateBreakpointsClasses } from './properties/breakpoints.js';

// Tüm class'ları birleştiren fonksiyon
export function generateAllClasses() {
    return {
        ...generateAspectRatioClasses(), // Statik aspect-ratio class'ları
        ...generateOverflowClasses(),    // Statik overflow class'ları
        ...generatePositionClasses(),   // Statik position class'ları
        ...generateOrderClasses(),     // Statik order class'ları
        ...generateTopRightBottomLeftClasses(), // Statik top, right, bottom, left class'ları
        ...generateDisplayClasses(),     // Statik display class'ları
        ...generateJustifyContentClasses(), // Statik justify-content class'ları
        ...generateJustifyItemsClasses(),  // Statik justify-items class'ları
        ...generateJustifySelfClasses(),   // Statik justify-self class'ları
        ...generateAlignContentClasses(),  // Statik align-content class'ları
        ...generateAlignItemsClasses(), // Statik align-items class'ları
        ...generateAlignSelfClasses(),   // Statik align-self class'ları
        ...generatePlaceContentClasses(),  // Statik place-content class'ları
        ...generatePlaceItemsClasses(),   // Statik place-items class'ları
        ...generatePlaceSelfClasses(),    // Statik place-self class'ları
        ...generateFlexDirectionClasses(), // Statik flex-direction class'ları
        ...generateFlexWrapClasses(),    // Statik flex-wrap class'ları
        ...generateFlexBasisClasses(),    // Statik flex-basis class'ları
        ...generateFlexClasses(),     // Statik flex class'ları
        ...generateFlexGrowClasses(),    // Statik flex-grow class'ları
        ...generateFlexShrinkClasses(),   // Statik flex-shrink class'ları
        ...generateAppearanceClasses(),   // Statik appearance class'ları
        ...generateObjectFitClasses(),    // Statik object-fit class'ları
        ...generateObjectPositionClasses(), // Statik object-position class'ları
        ...generateWidthClasses(),     // Statik width class'ları
        ...generateMaxWidthClasses(),    // Statik max-width class'ları
        ...generateMinWidthClasses(),    // Statik min-width class'ları
        ...generateHeightClasses(),    // Statik height class'ları
        ...generateMaxHeightClasses(),   // Statik max-height class'ları
        ...generateMinHeightClasses(),   // Statik min-height class'ları
        ...generateSizeClasses(),     // Statik width ve height class'ları
        ...generateSpaceClasses(),   // Statik space class'ları
        ...generateMarginClasses(),     // Statik margin class'ları
        ...generatePaddingClasses(),    // Statik padding class'ları
        ...generateLeadingClasses(),    // Statik line-height
        ...generateLetterSpacingClasses(), // Statik letter-spacing class'ları
        ...generateLineClampClasses(),   // Statik line-clamp class'ları
        ...generateLineHeightClasses(),   // Statik line-height class'ları
        ...generateGapClasses(),     // Statik gap class'ları
        ...generateGridTemplateColumnsClasses(), // Statik grid-template-columns class'ları
        ...generateGridTemplateRowsClasses(), // Statik grid-template-rows class'ları
        ...generateGridAutoFlowClasses(),   // Statik grid-auto-flow class'ları
        ...generateGridAutoColumnsClasses(), // Statik grid-auto-columns class'ları
        ...generateGridAutoRowsClasses(),   // Statik grid-auto-rows class'ları
        ...generateGridRowStartEndClasses(), // Statik grid-row-start-end class'ları
        ...generateGridColumnStartEndClasses(), // Statik grid-column-start-end class'ları
        ...generateFontSizeClasses(),    // Statik font-size class'ları
        ...generateFontSmoothingClasses(),  // Statik font-smoothing class'ları
        ...generateFontStyleClasses(),    // Statik font-style class'ları
        ...generateFontWeightClasses(),   // Statik font-weight class'ları
        ...generateFontVariantNumericClasses(), // Statik font-variant-numeric class'ları
        ...generateFontFamilyClasses(),   // Statik font-family class'ları
        ...generateBorderClasses(),     // Statik border class'ları
        ...generateBorderRadiusClasses(), // Statik border-radius class'ları
        ...generateBackgroundAttachmentClasses(), // Statik background-attachment class'ları
        ...generateBackgroundClipClasses(),  // Statik background-clip class'ları
        ...generateBackgroundOriginClasses(), // Statik background-origin class'ları
        ...generateBackgroundPositionClasses(), // Statik background-position class'ları
        ...generateBackgroundRepeatClasses(), // Statik background-repeat class'ları
        ...generateBackgroundSizeClasses(),  // Statik background-size class'ları
        ...generateTextAlignClasses(),    // Statik text-align class'ları
        ...generateTextDecorationClasses(), // Statik text-decoration class'ları
        ...generateTextDecorationStyleClasses(), // Statik text-decoration-style class'ları
        ...generateTextIndentClasses(),   // Statik text-indent class'ları
        ...generateTextOverflowClasses(),  // Statik text-overflow class'ları
        ...generateTextTransformClasses(),  // Statik text-transform class'ları
        ...generateTextUnderlineOffsetClasses(), // Statik text-underline-offset class'ları
        ...generateTextWrapClasses(),    // Statik text-wrap class'ları
        ...generateListStyleImageClasses(), // Statik list-style-image class'ları
        ...generateListStylePositionClasses(), // Statik list-style-position class'ları
        ...generateListStyleTypeClasses(),  // Statik list-style-type class'ları
        ...generateContentClasses(),     // Statik content class'ları
        ...generateHyphensClasses(),     // Statik hyphens class'ları
        ...generateVerticalAlignClasses(), // Statik vertical-align class'ları
        ...generateWordBreakClasses(),    // Statik word-break class'ları
        ...generateWhiteSpaceClasses(),   // Statik white-space class'ları
        ...generateColorClasses(),     // Statik background-color class'ları
        ...generateBreakpointsClasses(), // Statik breakpoint class'ları
    };
}
