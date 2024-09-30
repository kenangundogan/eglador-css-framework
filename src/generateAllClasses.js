import { generateAspectRatioClasses } from './properties/aspectRatio.js';
import { generateOverflowClasses } from './properties/overflow.js';
import { generateOverscrollBehaviorClasses } from './properties/overscrollBehavior.js';
import { generatePositionClasses } from './properties/position.js';
import { generateOrderClasses } from './properties/order.js';
import { generateTopRightBottomLeftClasses } from './properties/topRightBottomLeft.js';
import { generateDisplayClasses } from './properties/display.js';
import { generateFloatClasses } from './properties/float.js';
import { generateClearClasses } from './properties/clear.js';
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
import { generateSizeClasses } from './properties/size.js';;
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

import { generateBackgroundAttachmentClasses } from './properties/backgroundAttachment.js';
import { generateBackgroundClipClasses } from './properties/backgroundClip.js';
import { generateBackgroundImageClasses } from './properties/backgroundImage.js';
import { generateBackgroundOriginClasses } from './properties/backgroundOrigin.js';
import { generateBackgroundPositionClasses } from './properties/backgroundPosition.js';
import { generateBackgroundRepeatClasses } from './properties/backgroundRepeat.js';
import { generateBackgroundSizeClasses } from './properties/backgroundSize.js';
import { generateTextAlignClasses } from './properties/textAlign.js';
import { generateTextDecorationClasses } from './properties/textDecoration.js';
import { generateTextDecorationStyleClasses } from './properties/textDecorationStyle.js';
import { generateTextDecorationThicknessClasses } from './properties/textDecorationThickness.js';
import { generateTextIndentClasses } from './properties/textIndent.js';
import { generateTextOverflowClasses } from './properties/textOverflow.js';
import { generateTextTransformClasses } from './properties/textTransform.js';
import { generateTextUnderlineOffsetClasses } from './properties/textUnderlineOffset.js';
import { generateTextWrapClasses } from './properties/textWrap.js';
import { generateListStyleImageClasses } from './properties/listStyleImage.js';
import { generateListStylePositionClasses } from './properties/listStylePosition.js';
import { generateListStyleTypeClasses } from './properties/listStyleType.js';
import { generateContentClasses } from './properties/content.js';
import { generateCursorClasses } from './properties/cursor.js';
import { generateHyphensClasses } from './properties/Hyphens.js';
import { generateIsolationClasses } from './properties/isolation.js';
import { generateColumnsClasses } from './properties/columns.js';
import { generateBoxSizingClasses } from './properties/boxSizing.js';
import { generateBoxDecorationBreakClasses } from './properties/boxDecorationBreak.js';


import { generateVerticalAlignClasses } from './properties/verticalAlign.js';
import { generateVisibilityClasses } from './properties/visibility.js';
import { generateWordBreakClasses } from './properties/wordBreak.js';
import { generateWhiteSpaceClasses } from './properties/whiteSpace.js';
import { generateZIndexClasses } from './properties/zIndex.js';
import { generatePointerEventClasses } from './properties/pointerEvent.js';
import { generateResizeClasses } from './properties/resize.js';
import { generateScrollBehaviorClasses } from './properties/scrollBehavior.js';
import { generateScrollMarginClasses } from './properties/scrollMargin.js';
import { generateScrollPaddingClasses } from './properties/scrollPadding.js';
import { generateScrollSnapAlignClasses } from './properties/scrollSnapAlign.js';
import { generateScrollSnapStopClasses } from './properties/scrollSnapStop.js';
import { generateUserSelectClasses } from './properties/userSelect.js';
import { generateWillChangeClasses } from './properties/willChange.js';
import { generatetouchActionClasses } from './properties/touchAction.js';
import { generateStrokeWidthClasses } from './properties/strokeWidth.js';
import { generateBreakAfterClasses } from './properties/breakAfter.js';
import { generateBreakBeforeClasses } from './properties/breakBefore.js';
import { generateBreakInsideClasses } from './properties/breakInside.js';

// Borders
import { generateBorderRadiusClasses } from './properties/borderRadius.js';
import { generateBorderWidthClasses } from './properties/borderWidth.js';
import { generateBorderStyleClasses } from './properties/borderStyle.js';
import { generateDivideWidthClasses } from './properties/divideWidth.js';
import { generateDivideStyleClasses } from './properties/divideStyle.js';
import { generateOutlineWidthClasses } from './properties/outlineWidth.js';
import { generateOutlineStyleClasses } from './properties/outlineStyle.js';
import { generateOutlineOffsetClasses } from './properties/outlineOffset.js';
import { generateRingWidthClasses } from './properties/ringWidth.js';
import { generateRingOffsetWidthClasses } from './properties/ringOffsetWidth.js';

// Effects
import { generateBoxShadowClasses } from './properties/boxShadow.js';
import { generateOpacityClasses } from './properties/opacity.js';
import { generateMixBlendModeClasses } from './properties/mixBlendMode.js';
import { generateBackgroundBlendModeClasses } from './properties/backgroundBlendMode.js';

// Accessibility
import { generateScreenReadersClasses } from './properties/screenReaders.js';
import { generateForcedColorAdjustClasses } from './properties/forcedColorAdjust.js';

// Filters
import { generateBlurClasses } from './properties/blur.js';
import { generateBrightnessClasses } from './properties/brightness.js';
import { generateContrastClasses } from './properties/contrast.js';
import { generateDropShadowClasses } from './properties/dropShadow.js';
import { generateGrayscaleClasses } from './properties/grayscale.js';
import { generateHueRotateClasses } from './properties/hueRotate.js';
import { generateInvertClasses } from './properties/invert.js';
import { generateSaturateClasses } from './properties/saturate.js';
import { generateSepiaClasses } from './properties/sepia.js';
import { generateBackdropBlurClasses } from './properties/backdropBlur.js';
import { generateBackdropBrightnessClasses } from './properties/backdropBrightness.js';
import { generateBackdropContrastClasses } from './properties/backdropContrast.js';
import { generateBackdropGrayscaleClasses } from './properties/backdropGrayscale.js';
import { generateBackdropHueRotateClasses } from './properties/backdropHueRotate.js';
import { generateBackdropInvertClasses } from './properties/backdropInvert.js';
import { generateBackdropOpacityClasses } from './properties/backdropOpacity.js';
import { generateBackdropSaturateClasses } from './properties/backdropSaturate.js';
import { generateBackdropSepiaClasses } from './properties/backdropSepia.js';

// Tables
import { generateBorderCollapseClasses } from './properties/borderCollapse.js';
import { generateBorderSpacingClasses } from './properties/borderSpacing.js';
import { generateTableLayoutClasses } from './properties/tableLayout.js';
import { generateCaptionSideClasses } from './properties/captionSide.js';

import { generateColorClasses } from './properties/color.js';
import { generateSpaceClasses } from './properties/space.js'
import { generateBreakpointsClasses } from './properties/breakpoints.js';

export function generateAllClasses() {
    return {
        ...generateAspectRatioClasses(),
        ...generateOverflowClasses(),
        ...generateOverscrollBehaviorClasses(),
        ...generatePositionClasses(),
        ...generateOrderClasses(),
        ...generateTopRightBottomLeftClasses(),
        ...generateDisplayClasses(),
        ...generateFloatClasses(),
        ...generateClearClasses(),
        ...generateJustifyContentClasses(),
        ...generateJustifyItemsClasses(),
        ...generateJustifySelfClasses(),
        ...generateAlignContentClasses(),
        ...generateAlignItemsClasses(),
        ...generateAlignSelfClasses(),
        ...generatePlaceContentClasses(),
        ...generatePlaceItemsClasses(),
        ...generatePlaceSelfClasses(),
        ...generateFlexDirectionClasses(),
        ...generateFlexWrapClasses(),
        ...generateFlexBasisClasses(),
        ...generateFlexClasses(),
        ...generateFlexGrowClasses(),
        ...generateFlexShrinkClasses(),
        ...generateAppearanceClasses(),
        ...generateObjectFitClasses(),
        ...generateObjectPositionClasses(),
        ...generateOpacityClasses(),
        ...generateMixBlendModeClasses(),
        ...generateBackgroundBlendModeClasses(),
        ...generateWidthClasses(),
        ...generateMaxWidthClasses(),
        ...generateMinWidthClasses(),
        ...generateHeightClasses(),
        ...generateMaxHeightClasses(),
        ...generateMinHeightClasses(),
        ...generateSizeClasses(),
        ...generateMarginClasses(),
        ...generatePaddingClasses(),
        ...generateLeadingClasses(),
        ...generateLetterSpacingClasses(),
        ...generateLineClampClasses(),
        ...generateLineHeightClasses(),
        ...generateGapClasses(),
        ...generateGridTemplateColumnsClasses(),
        ...generateGridTemplateRowsClasses(),
        ...generateGridAutoFlowClasses(),
        ...generateGridAutoColumnsClasses(),
        ...generateGridAutoRowsClasses(),
        ...generateGridRowStartEndClasses(),
        ...generateGridColumnStartEndClasses(),
        ...generateFontSizeClasses(),
        ...generateFontSmoothingClasses(),
        ...generateFontStyleClasses(),
        ...generateFontWeightClasses(),
        ...generateFontVariantNumericClasses(),
        ...generateFontFamilyClasses(),
        ...generateBorderRadiusClasses(),
        ...generateBorderStyleClasses(),
        ...generateBorderWidthClasses(),
        ...generateBackgroundAttachmentClasses(),
        ...generateBackgroundClipClasses(),
        ...generateBackgroundImageClasses(),
        ...generateBackgroundOriginClasses(),
        ...generateBackgroundPositionClasses(),
        ...generateBackgroundRepeatClasses(),
        ...generateBackgroundSizeClasses(),
        ...generateTextAlignClasses(),
        ...generateTextDecorationClasses(),
        ...generateTextDecorationStyleClasses(),
        ...generateTextDecorationThicknessClasses(),
        ...generateTextIndentClasses(),
        ...generateTextOverflowClasses(),
        ...generateTextTransformClasses(),
        ...generateTextUnderlineOffsetClasses(),
        ...generateTextWrapClasses(),
        ...generateListStyleImageClasses(),
        ...generateListStylePositionClasses(),
        ...generateListStyleTypeClasses(),
        ...generateContentClasses(),
        ...generateCursorClasses(),
        ...generateHyphensClasses(),
        ...generateIsolationClasses(),
        ...generateColumnsClasses(),
        ...generateBoxSizingClasses(),
        ...generateBoxDecorationBreakClasses(),
        ...generateBoxShadowClasses(),
        ...generateOutlineOffsetClasses(),
        ...generateRingWidthClasses(),
        ...generateRingOffsetWidthClasses(),
        ...generateOutlineStyleClasses(),
        ...generateOutlineWidthClasses(),
        ...generateVerticalAlignClasses(),
        ...generateVisibilityClasses(),
        ...generateWordBreakClasses(),
        ...generateWhiteSpaceClasses(),
        ...generateZIndexClasses(),
        ...generatePointerEventClasses(),
        ...generateResizeClasses(),
        ...generateScrollBehaviorClasses(),
        ...generateScrollMarginClasses(),
        ...generateScrollPaddingClasses(),
        ...generateScrollSnapAlignClasses(),
        ...generateScrollSnapStopClasses(),
        ...generateUserSelectClasses(),
        ...generateWillChangeClasses(),
        ...generatetouchActionClasses(),
        ...generateStrokeWidthClasses(),
        ...generateBreakAfterClasses(),
        ...generateBreakBeforeClasses(),
        ...generateBreakInsideClasses(),
        ...generateScreenReadersClasses(),
        ...generateForcedColorAdjustClasses(),
        ...generateBlurClasses(),
        ...generateBrightnessClasses(),
        ...generateContrastClasses(),
        ...generateDropShadowClasses(),
        ...generateGrayscaleClasses(),
        ...generateHueRotateClasses(),
        ...generateInvertClasses(),
        ...generateSaturateClasses(),
        ...generateSepiaClasses(),
        ...generateBackdropBlurClasses(),
        ...generateBackdropBrightnessClasses(),
        ...generateBackdropContrastClasses(),
        ...generateBackdropGrayscaleClasses(),
        ...generateBackdropHueRotateClasses(),
        ...generateBackdropInvertClasses(),
        ...generateBackdropOpacityClasses(),
        ...generateBackdropSaturateClasses(),
        ...generateBackdropSepiaClasses(),
        ...generateBorderCollapseClasses(),
        ...generateBorderSpacingClasses(),
        ...generateTableLayoutClasses(),
        ...generateCaptionSideClasses(),
        ...generateColorClasses(),
        ...generateSpaceClasses(),
        ...generateDivideStyleClasses(),
        ...generateDivideWidthClasses(),
        ...generateBreakpointsClasses(),
    };
}
