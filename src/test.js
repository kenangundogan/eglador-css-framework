import fs from 'fs';
import cssesc from 'css.escape';
const propertyMap = {
    'aspect': function (value) { return { 'aspect-ratio': value }; },
    'columns': function (value) { return { 'columns': value }; },
    'object': function (value) { return { 'object-position': value }; },
    'top': function (value) { return { 'top': value }; },
    'right': function (value) { return { 'right': value }; },
    'bottom': function (value) { return { 'bottom': value }; },
    'left': function (value) { return { 'left': value }; },
    'inset': function (value) { return { 'inset': value }; },
    'z': function (value) { return { 'z-index': value }; },

    'basis': function (value) { return { 'flex-basis': value }; },
    'flex': function (value) { return { 'flex': value }; },
    'grow': function (value) { return { 'flex-grow': value }; },
    'flex-shrink': function (value) { return { 'flex-shrink': value }; },
    'shrink': function (value) { return { 'flex-shrink': value }; },
    'order': function (value) { return { 'order': value }; },
    'grid-cols': function (value) { return { 'grid-template-columns': value }; },
    'col': function (value) { return { 'grid-column': value }; },
    'grid-rows': function (value) { return { 'grid-template-rows': value }; },
    'row': function (value) { return { 'grid-row': value }; },
    'auto-cols': function (value) { return { 'grid-auto-columns': value }; },
    'auto-rows': function (value) { return { 'grid-auto-rows': value }; },
    'gap': function (value) { return { 'gap': value }; },

    'p': function (value) { return { 'padding': value }; },
    'pt': function (value) { return { 'padding-top': value }; },
    'pr': function (value) { return { 'padding-right': value }; },
    'pb': function (value) { return { 'padding-bottom': value }; },
    'pl': function (value) { return { 'padding-left': value }; },
    'px': function (value) {
        return { 'padding-left': value, 'padding-right': value };
    },
    'py': function (value) {
        return { 'padding-top': value, 'padding-bottom': value };
    },

    'm': function (value) { return { 'margin': value }; },
    'mt': function (value) { return { 'margin-top': value }; },
    'mr': function (value) { return { 'margin-right': value }; },
    'mb': function (value) { return { 'margin-bottom': value }; },
    'ml': function (value) { return { 'margin-left': value }; },
    'mx': function (value) {
        return { 'margin-left': value, 'margin-right': value };
    },
    'my': function (value) {
        return { 'margin-top': value, 'margin-bottom': value };
    },

    'space-y > :not([hidden]) ~ :not([hidden]) ': function (value) {
        return {
            '--kg-space-y-reverse': '0',
            'margin-top': `calc(${value} * calc(1 - var(--kg-space-y-reverse)))`,
            'margin-bottom': `calc(${value} * var(--kg-space-y-reverse))`
        };
    },
    'space-x > :not([hidden]) ~ :not([hidden]) ': function (value) {
        return {
            '--kg-space-x-reverse': '0',
            'margin-right': `calc(${value} * var(--kg-space-x-reverse))`,
            'margin-left': `calc(${value} * calc(1 - var(--kg-space-x-reverse)))`
        };
    },

    'w': function (value) { return { 'width': value }; },
    'min-w': function (value) { return { 'min-width': value }; },
    'max-w': function (value) { return { 'max-width': value }; },
    'h': function (value) { return { 'height': value }; },
    'min-h': function (value) { return { 'min-height': value }; },
    'max-h': function (value) { return { 'max-height': value }; },
    'size': function (value) {
        return { 'width': value, 'height': value };
    },

    'font': function (value) {
        if (value.startsWith("'") || value.startsWith('"')) {
            return { 'font-family': value.replace(/_/g, ' ') };
        } else {
            return { 'font-weight': value };
        }
    },
    'text': function (value) {
        if (/^#|rgba?\(|hsla?\(|hsl\(|var\(--/.test(value)) {
            return {
                '--kg-text-opacity': '1',
                'color': `${processColor(value)}`
            };
        } else {
            return { 'font-size': value };
        }
    },
    'tracking': function (value) { return { 'letter-spacing': value }; },
    'line-clamp': function (value) {
        return {
            'overflow': 'hidden',
            'display': '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': value
        };
    },
    'leading': function (value) { return { 'line-height': value }; },
    'list-image': function (value) { return { 'list-style-image': value }; },
    'list': function (value) { return { 'list-style-type': value }; },
    'decoration': function (value) {
        if (/^#/.test(value) || /^rgba?\(/.test(value)) {
            return { 'text-decoration-color': value };
        } else {
            return { 'text-decoration-thickness': value };
        }
    },
    'underline-offset': function (value) { return { 'text-underline-offset': value }; },
    'indent': function (value) { return { 'text-indent': value }; },
    'align': function (value) { return { 'vertical-align': value }; },

    'before:content': function (value) {
        return { '--kg-content': value.replace(/_/g, ' '), 'content': 'var(--kg-content)' };
    },
    'after:content': function (value) {
        return { '--kg-content': value.replace(/_/g, ' '), 'content': 'var(--kg-content)' };
    },

    'bg': function (value) {
        if (value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl')) {
            return {
                '--kg-bg-opacity': '1',
                'background-color': `${processColor(value)}`
            };
        } else if (value.startsWith('url(')) {
            return { 'background-image': value };
        } else if (value.startsWith('length:')) {
            return { 'background-size': value.replace('length:', '') };
        } else {
            return { 'background-position': value.replace(/_/g, ' ') };
        }
    },
    'from': function (value) {
        return {
            '--kg-gradient-from': `${value} var(--kg-gradient-from-position)`,
            '--kg-gradient-to': `${processColorWithOpacity(value, 0)} var(--kg-gradient-to-position)`,
            '--kg-gradient-stops': 'var(--kg-gradient-from), var(--kg-gradient-to)'
        };
    },
    'via': function (value) {
        return {
            '--kg-gradient-to': `${processColorWithOpacity(value, 0)} var(--kg-gradient-to-position)`,
            '--kg-gradient-stops': `var(--kg-gradient-from), ${value} var(--kg-gradient-via-position), var(--kg-gradient-to)`
        };
    },
    'to': function (value) {
        return {
            '--kg-gradient-to': `${value} var(--kg-gradient-to-position)`
        };
    },

    'rounded': function (value) { return { 'border-radius': value }; },
    'rounded-t': function (value) {
        return {
            'border-top-left-radius': value,
            'border-top-right-radius': value
        };
    },
    'rounded-r': function (value) {
        return {
            'border-top-right-radius': value,
            'border-bottom-right-radius': value
        };
    },
    'rounded-b': function (value) {
        return {
            'border-bottom-right-radius': value,
            'border-bottom-left-radius': value
        };
    },
    'rounded-l': function (value) {
        return {
            'border-top-left-radius': value,
            'border-bottom-left-radius': value
        };
    },
    'rounded-tl': function (value) { return { 'border-top-left-radius': value }; },
    'rounded-tr': function (value) { return { 'border-top-right-radius': value }; },
    'rounded-br': function (value) { return { 'border-bottom-right-radius': value }; },
    'rounded-bl': function (value) { return { 'border-bottom-left-radius': value }; },
    'rounded-ss': function (value) { return { 'border-start-start-radius': value }; },
    'rounded-se': function (value) { return { 'border-start-end-radius': value }; },
    'rounded-ee': function (value) { return { 'border-end-end-radius': value }; },
    'rounded-es': function (value) { return { 'border-end-start-radius': value }; },

    'border-t': function (value) { return { 'border-top-width': value }; },
    'border-r': function (value) { return { 'border-right-width': value }; },
    'border-b': function (value) { return { 'border-bottom-width': value }; },
    'border-l': function (value) { return { 'border-left-width': value }; },
    'border-x': function (value) {
        return {
            'border-left-width': value,
            'border-right-width': value
        };
    },
    'border-y': function (value) {
        return {
            'border-top-width': value,
            'border-bottom-width': value
        };
    },
    'border-s': function (value) { return { 'border-inline-start-width': value }; },
    'border-e': function (value) { return { 'border-inline-end-width': value }; },

    'border': function (value) {
        if (value.startsWith('#') || value.startsWith('rgb')) {
            return {
                '--kg-border-opacity': '1',
                'border-color': `${processColor(value)}`
            };
        } else {
            return { 'border-width': value };
        }
    },
    'divide-x > :not([hidden]) ~ :not([hidden]) ': function (value) {
        return {
            '--kg-divide-x-reverse': '0',
            'border-right-width': `calc(${value} * var(--kg-divide-x-reverse))`,
            'border-left-width': `calc(${value} * calc(1 - var(--kg-divide-x-reverse)))`
        };
    },
    'divide-y > :not([hidden]) ~ :not([hidden]) ': function (value) {
        return {
            '--kg-divide-y-reverse': '0',
            'border-top-width': `calc(${value} * calc(1 - var(--kg-divide-y-reverse)))`,
            'border-bottom-width': `calc(${value} * var(--kg-divide-y-reverse))`
        };
    },
    'divide': function (value) {
        if (value.startsWith('#') || value.startsWith('rgb')) {
            return {
                '--kg-divide-opacity': '1',
                'border-color': `${processColor(value)}`
            };
        } else {
            return { 'border-width': value };
        }
    },

    'outline': function (value) {
        if (value.startsWith('#') || value.startsWith('rgb')) {
            return { 'outline-color': value };
        } else {
            return { 'outline-width': value };
        }
    },
    'outline-offset': function (value) { return { 'outline-offset': value }; },

    'ring': function (value) {
        if (value.startsWith('#') || value.startsWith('rgb')) {
            return {
                '--kg-ring-opacity': '1',
                '--kg-ring-color': `${processColor(value)}`
            };
        } else {
            return {
                '--kg-ring-offset-shadow': 'var(--kg-ring-inset) 0 0 0 var(--kg-ring-offset-width) var(--kg-ring-offset-color)',
                '--kg-ring-shadow': `var(--kg-ring-inset) 0 0 0 calc(${value} + var(--kg-ring-offset-width)) var(--kg-ring-color)`,
                'box-shadow': 'var(--kg-ring-offset-shadow), var(--kg-ring-shadow), var(--kg-shadow, 0 0 #0000)'
            };
        }
    },
    'ring-offset': function (value) {
        if (value.startsWith('#') || value.startsWith('rgb')) {
            return { '--kg-ring-offset-color': value };
        } else {
            return { '--kg-ring-offset-width': value };
        }
    },

    'shadow': function (value) {
        if (value.startsWith('#') || value.startsWith('rgb')) {
            return {
                '--kg-shadow-color': value,
                '--kg-shadow': 'var(--kg-shadow-colored)',
                'box-shadow': 'var(--kg-shadow)'
            };
        } else {
            return {
                '--kg-shadow': value,
                '--kg-shadow-colored': value.replace(/rgba?\([^\)]*\)/g, 'var(--kg-shadow-color)'),
                'box-shadow': 'var(--kg-shadow)'
            };
        }
    },
    'opacity': function (value) { return { 'opacity': value }; },

    'blur': function (value) {
        return {
            '--kg-blur': `blur(${value})`,
            'filter': 'var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow)'
        };
    },
    'brightness': function (value) {
        return {
            '--kg-brightness': `brightness(${value})`,
            'filter': 'var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow)'
        };
    },
    'contrast': function (value) {
        return {
            '--kg-contrast': `contrast(${value})`,
            'filter': 'var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow)'
        };
    },
    'drop-shadow': function (value) {
        return {
            '--kg-drop-shadow': `drop-shadow(${value})`,
            'filter': 'var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow)'
        };
    },
    'grayscale': function (value) {
        return {
            '--kg-grayscale': `grayscale(${value})`,
            'filter': 'var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow)'
        };
    },
    'hue-rotate': function (value) {
        return {
            '--kg-hue-rotate': `hue-rotate(${value})`,
            'filter': 'var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow)'
        };
    },
    'invert': function (value) {
        return {
            '--kg-invert': `invert(${value})`,
            'filter': 'var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow)'
        };
    },
    'saturate': function (value) {
        return {
            '--kg-saturate': `saturate(${value})`,
            'filter': 'var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow)'
        };
    },
    'sepia': function (value) {
        return {
            '--kg-sepia': `sepia(${value})`,
            'filter': 'var(--kg-blur) var(--kg-brightness) var(--kg-contrast) var(--kg-grayscale) var(--kg-hue-rotate) var(--kg-invert) var(--kg-saturate) var(--kg-sepia) var(--kg-drop-shadow)'
        };
    },

    'backdrop-blur': function (value) {
        return {
            '--kg-backdrop-blur': `blur(${value})`,
            '-webkit-backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)',
            'backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)'
        };
    },
    'backdrop-brightness': function (value) {
        return {
            '--kg-backdrop-brightness': `brightness(${value})`,
            '-webkit-backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)',
            'backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)'
        };
    },
    'backdrop-contrast': function (value) {
        return {
            '--kg-backdrop-contrast': `contrast(${value})`,
            '-webkit-backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)',
            'backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)'
        };
    },
    'backdrop-grayscale': function (value) {
        return {
            '--kg-backdrop-grayscale': `grayscale(${value})`,
            '-webkit-backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)',
            'backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)'
        };
    },
    'backdrop-hue-rotate': function (value) {
        return {
            '--kg-backdrop-hue-rotate': `hue-rotate(${value})`,
            '-webkit-backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)',
            'backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)'
        };
    },
    'backdrop-invert': function (value) {
        return {
            '--kg-backdrop-invert': `invert(${value})`,
            '-webkit-backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)',
            'backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)'
        };
    },
    'backdrop-opacity': function (value) {
        return {
            '--kg-backdrop-opacity': `opacity(${value})`,
            '-webkit-backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)',
            'backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)'
        };
    },
    'backdrop-saturate': function (value) {
        return {
            '--kg-backdrop-saturate': `saturate(${value})`,
            '-webkit-backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)',
            'backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)'
        };
    },
    'backdrop-sepia': function (value) {
        return {
            '--kg-backdrop-sepia': `sepia(${value})`,
            '-webkit-backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)',
            'backdrop-filter': 'var(--kg-backdrop-blur) var(--kg-backdrop-brightness) var(--kg-backdrop-contrast) var(--kg-backdrop-grayscale) var(--kg-backdrop-hue-rotate) var(--kg-backdrop-invert) var(--kg-backdrop-opacity) var(--kg-backdrop-saturate) var(--kg-backdrop-sepia)'
        };
    },

    'border-spacing': function (value) {
        return {
            '--kg-border-spacing-x': value,
            '--kg-border-spacing-y': value,
            'border-spacing': 'var(--kg-border-spacing-x) var(--kg-border-spacing-y)'
        };
    },

    'transition': function (value) {
        return {
            'transition-property': value,
            'transition-duration': '150ms',
            'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)'
        };
    },
    'duration': function (value) { return { 'transition-duration': value }; },
    'ease': function (value) { return { 'transition-timing-function': value }; },
    'delay': function (value) { return { 'transition-delay': value }; },
    'animate': function (value) { return { 'animation': value }; },

    'scale': function (value) {
        return {
            '--kg-scale-x': value,
            '--kg-scale-y': value,
            'transform': 'translate(var(--kg-translate-x), var(--kg-translate-y)) rotate(var(--kg-rotate)) skewX(var(--kg-skew-x)) skewY(var(--kg-skew-y)) scaleX(var(--kg-scale-x)) scaleY(var(--kg-scale-y))'
        };
    },
    'scale-x': function (value) {
        return {
            '--kg-scale-x': value,
            'transform': 'translate(var(--kg-translate-x), var(--kg-translate-y)) rotate(var(--kg-rotate)) skewX(var(--kg-skew-x)) skewY(var(--kg-skew-y)) scaleX(var(--kg-scale-x)) scaleY(var(--kg-scale-y))'
        };
    },
    'scale-y': function (value) {
        return {
            '--kg-scale-y': value,
            'transform': 'translate(var(--kg-translate-x), var(--kg-translate-y)) rotate(var(--kg-rotate)) skewX(var(--kg-skew-x)) skewY(var(--kg-skew-y)) scaleX(var(--kg-scale-x)) scaleY(var(--kg-scale-y))'
        };
    },
    'rotate': function (value) {
        return {
            '--kg-rotate': value,
            'transform': 'translate(var(--kg-translate-x), var(--kg-translate-y)) rotate(var(--kg-rotate)) skewX(var(--kg-skew-x)) skewY(var(--kg-skew-y)) scaleX(var(--kg-scale-x)) scaleY(var(--kg-scale-y))'
        };
    },
    'translate-x': function (value) {
        return {
            '--kg-translate-x': value,
            'transform': 'translate(var(--kg-translate-x), var(--kg-translate-y)) rotate(var(--kg-rotate)) skewX(var(--kg-skew-x)) skewY(var(--kg-skew-y)) scaleX(var(--kg-scale-x)) scaleY(var(--kg-scale-y))'
        };
    },
    'translate-y': function (value) {
        return {
            '--kg-translate-y': value,
            'transform': 'translate(var(--kg-translate-x), var(--kg-translate-y)) rotate(var(--kg-rotate)) skewX(var(--kg-skew-x)) skewY(var(--kg-skew-y)) scaleX(var(--kg-scale-x)) scaleY(var(--kg-scale-y))'
        };
    },
    'skew-x': function (value) {
        return {
            '--kg-skew-x': value,
            'transform': 'translate(var(--kg-translate-x), var(--kg-translate-y)) rotate(var(--kg-rotate)) skewX(var(--kg-skew-x)) skewY(var(--kg-skew-y)) scaleX(var(--kg-scale-x)) scaleY(var(--kg-scale-y))'
        };
    },
    'skew-y': function (value) {
        return {
            '--kg-skew-y': value,
            'transform': 'translate(var(--kg-translate-x), var(--kg-translate-y)) rotate(var(--kg-rotate)) skewX(var(--kg-skew-x)) skewY(var(--kg-skew-y)) scaleX(var(--kg-scale-x)) scaleY(var(--kg-scale-y))'
        };
    },
    'origin': function (value) { return { 'transform-origin': value }; },

    'accent': function (value) { return { 'accent-color': value }; },
    'cursor': function (value) { return { 'cursor': value }; },
    'caret': function (value) { return { 'caret-color': value }; },
    'scroll-m': function (value) { return { 'scroll-margin': value }; },
    'scroll-p': function (value) { return { 'scroll-padding': value }; },
    'will-change': function (value) { return { 'will-change': value }; },
    'fill': function (value) { return { 'fill': value }; },
    'stroke': function (value) {
        if (/^\d/.test(value)) {
            return { 'stroke-width': value };
        } else {
            return { 'stroke': value };
        }
    }
};

function processColor(value) {
    if (value.startsWith('#') && value.length === 7) {
        const r = parseInt(value.slice(1, 3), 16);
        const g = parseInt(value.slice(3, 5), 16);
        const b = parseInt(value.slice(5, 7), 16);
        return `rgb(${r} ${g} ${b} / var(--kg-text-opacity))`;
    }
    return value;
}

function processColorWithOpacity(value, opacity) {
    if (value.startsWith('#') && value.length === 7) {
        const r = parseInt(value.slice(1, 3), 16);
        const g = parseInt(value.slice(3, 5), 16);
        const b = parseInt(value.slice(5, 7), 16);
        return `rgb(${r} ${g} ${b} / ${opacity})`;
    }
    return value;
}

function addSpacesAroundOperators(value) {
    return value.replace(/calc\(([^)]+)\)/g, (match, inner) => {
        const spacedInner = inner.replace(/([+\-*/])/g, ' $1 ');
        return `calc(${spacedInner})`;
    });
}

function specialCharToOriginal(value) {
    return value
        .replace(/\\\//g, '/') // Slash'leri escape etme
        .replace(/\\:/g, ':') // İki noktaları escape etme
        .replace(/\\;/g, ';') // Noktalı virgülleri escape etme
        .replace(/\\,/g, ',') // Virgülleri escape etme
        .replace(/\\\./g, '.') // Noktaları escape etme
        .replace(/_/g, ' ') // Alt çizgileri boşlukla değiştir
        .replace(/\(\s+/g, '(').replace(/\s+\)/g, ')') // Boşlukları parantezlerin içinden kaldır
        .replace(/\s+/g, ' ').trim(); // Birden fazla boşluğu tek boşlukla değiştir ve baştaki ve sondaki boşlukları kaldır
}

function escapeClassName(className) {
    let result = cssesc(className).replace(/\\,/g, '\\2c ');
    return result;
}

function parseKgClass(className) {
    const regex = /^([^\s]+)-\[(.+)\]$/;
    const match = className.match(regex);

    if (!match) {
        return null;
    }

    let property = match[1];
    let value = match[2];
    let declarations = {};

    value = specialCharToOriginal(value);
    value = addSpacesAroundOperators(value);

    if (property.startsWith('space-') || property.startsWith('divide-')) {
        const spacePropertyKey = `${property} > :not([hidden]) ~ :not([hidden]) `;
        const cssProperties = propertyMap[spacePropertyKey];

        if (cssProperties) {
            const declarations = cssProperties(value);

            // CSS sınıf adını escape etme
            const escapedClassName = escapeClassName(className);

            // CSS çıktısını oluşturma
            let cssOutput = `.${escapedClassName} > :not([hidden]) ~ :not([hidden]) {\n`;
            for (const [prop, val] of Object.entries(declarations)) {
                cssOutput += `  ${prop}: ${val};\n`;
            }
            cssOutput += '}';
            return cssOutput;
        }
    }

    if (property.startsWith('before:content') || property.startsWith('after:content')) {
        const pseudoPropertyKey = `${property}`;
        const cssProperties = propertyMap[pseudoPropertyKey];

        if (cssProperties) {
            const declarations = cssProperties(value);

            // CSS sınıf adını escape etme
            const escapedClassName = escapeClassName(className);

            // CSS çıktısını oluşturma
            let cssOutput = `.${escapedClassName}::${property.split(':')[0]} {\n`;
            for (const [prop, val] of Object.entries(declarations)) {
                cssOutput += `  ${prop}: ${val};\n`;
            }
            cssOutput += '}';
            return cssOutput;
        }

        return null;

    }

    const cssProperties = propertyMap[property];

    if (!cssProperties) {
        return null;
    }

    if (typeof cssProperties === 'function') {
        declarations = cssProperties(value);
    } else if (typeof cssProperties === 'string') {
        declarations[cssProperties] = value;
    } else {
        declarations = cssProperties;
    }

    const escapedClassName = escapeClassName(className);

    // CSS çıktısını oluşturma
    let cssOutput = `.${escapedClassName} {\n`;
    for (const [prop, val] of Object.entries(declarations)) {
        cssOutput += `  ${prop}: ${val};\n`;
    }
    cssOutput += '}';

    return cssOutput;
}


const customHtml = fs.readFileSync('./dist/custom.html', 'utf-8');

const regex = /class="([^"]+)"/g;
const classes = new Set();
let match;
while ((match = regex.exec(customHtml)) !== null) {
    const classList = match[1].split(' ');
    classList.forEach((className) => {
        classes.add(className);
    });
}

classes.forEach(element => {
    const cssOutput = parseKgClass(element);
    if (cssOutput) {
        fs.appendFileSync('./dist/custom.css', cssOutput + '\n\n');
    }
});

