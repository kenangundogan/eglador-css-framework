// src/generate/customCss.js

import { breakpoints } from './../properties/_breakpoints.js'; // Import breakpoints
import { pseudoClasses, pseudoElements } from '../properties/_pseudoSelectors.js'; // Import pseudo selectors
import { propertyMap } from '../properties/_propertyMap.js'; // Import property map
import { escapeClassName } from '../utils/escapeClassName.js'; // Import escapeClassName function
import { sanitizeValue } from '../utils/sanitizeValue.js'; // Import sanitizeValue function

const themeVariants = {
    'dark': ':is(.dark *)',
    'light': ':is(.light *)',
};

export function customCss(customClasses) {
    let cssOutput = '';
    const mediaQueries = {};

    // Create a Set to keep track of processed classes
    const processedClasses = new Set();

    // Main parse function
    function parseKgClass(className) {

        // If already processed, skip
        if (processedClasses.has(className)) {
            return;
        }

        // Add to processed classes
        processedClasses.add(className);

        let isStarClass = false;
        let adjustedClassName = className;

        // Check if className starts with '*:'
        if (className.startsWith('*:')) {
            isStarClass = true;
            adjustedClassName = className.slice(2); // Remove '*:'
        }

        // Split class name by ':' but ignore colons inside brackets
        const classParts = adjustedClassName.split(/:(?![^\[]*\])/);
        let breakpoint = null;
        let pseudoPrefixes = [];
        let themeVariantSelector = null;

        let propertyAndValue = classParts.pop(); // The last part is property and value

        // Separate breakpoints, theme variants, and pseudo-classes
        classParts.forEach(part => {
            if (breakpoints[part]) {
                breakpoint = part;
            } else if (themeVariants[part]) {
                themeVariantSelector = themeVariants[part];
            } else {
                pseudoPrefixes.push(part);
            }
        });

        // Extract pseudo-selectors and property
        let { pseudoSelectors, property } = extractMultiplePseudos(propertyAndValue);

        // Combine pseudo-prefixes with pseudo-selectors
        pseudoPrefixes.forEach(prefix => {
            const { pseudoValue } = extractPseudo(prefix);
            if (pseudoValue) {
                pseudoSelectors = pseudoSelectors.map(sel => pseudoValue.join('') + sel);
            }
        });

        let { property: cleanProperty, isImportant } = checkImportant(property);

        // Update regex to handle negative values
        const regex = /^(-?[^\s]+)-\[(.+)\]$/;
        const match = cleanProperty.match(regex);

        if (!match) {
            return;
        }

        cleanProperty = match[1];
        let value = match[2];

        // Handle negative property names
        if (cleanProperty.startsWith('-')) {
            cleanProperty = cleanProperty.slice(1);
            value = '-' + value;
        }

        value = sanitizeValue(value);
        value = addSpacesAroundOperators(value);
        value = addSpacesAroundCommas(value);

        // Add check for space- and divide-
        if (cleanProperty.startsWith('space-') || cleanProperty.startsWith('divide-')) {
            const cssRule = handleSpaceOrDivide(cleanProperty, className, value);
            if (cssRule) {
                // Add CSS output to appropriate place
                addCssRule(breakpoint, cssRule);
            }
            return;
        }

        // Check and add content property for pseudo-element
        if (cleanProperty.startsWith('content')) {
            const cssRule = handlePseudoContent(cleanProperty, className, value, pseudoSelectors.join(''));
            if (cssRule) {
                // Add CSS output to appropriate place
                addCssRule(breakpoint, cssRule);
            }
            return;
        }

        // General CSS property handling
        const cssProperties = propertyMap[cleanProperty];
        if (!cssProperties) {
            return;
        }

        let selector = `.${escapeClassName(className)}`;
        if (isStarClass) {
            selector += ' > *';
        }
        if (pseudoSelectors.length > 0) {
            selector += pseudoSelectors.join('');
        }

        // Adjust selector with theme variant if present
        if (themeVariantSelector) {
            selector = `${themeVariantSelector} ${selector}`;
        }

        const declarations = cssProperties(value);

        let cssRule = generateCSSOutput(
            selector,
            declarations,
            isImportant,
            pseudoSelectors.some(ps => ps.includes('::before') || ps.includes('::after'))
        );

        // Add CSS output to appropriate place
        if (cssRule) {
            addCssRule(breakpoint, cssRule);
        }
    }

    // Helper function to add CSS rule to appropriate place
    function addCssRule(breakpoint, cssRule) {
        if (breakpoint) {
            const breakpointValue = breakpoints[breakpoint];
            if (!mediaQueries[breakpointValue]) {
                mediaQueries[breakpointValue] = '';
            }
            mediaQueries[breakpointValue] += cssRule + '\n';
        } else {
            cssOutput += cssRule + '\n';
        }
    }

    function addSpacesAroundOperators(value) {
        return value.replace(/calc\(([^)]+)\)/g, (match, inner) => {
            const spacedInner = inner.replace(/([+\-*/])/g, ' $1 ');
            return `calc(${spacedInner})`;
        });
    }

    // 1fr,3fr,1fr -> 1fr 3fr 1fr
    function addSpacesAroundCommas(value) {
        return value.replace(/([0-9.]+fr),?/g, '$1 ');
    }

    function extractPseudo(property) {
        // Pseudo-element check
        for (const [pseudoElementKey, pseudoElementFunc] of Object.entries(pseudoElements)) {
            if (property.startsWith(`${pseudoElementKey}`)) {
                const pseudoValue = pseudoElementFunc();
                return {
                    pseudoType: 'element',
                    pseudoValue,
                    property: property.slice(pseudoElementKey.length), // Remove pseudo-element
                };
            }
        }

        // Pseudo-class check
        for (const [pseudoClassKey, pseudoClassFunc] of Object.entries(pseudoClasses)) {
            if (property.startsWith(`${pseudoClassKey}`)) {
                const pseudoValue = pseudoClassFunc();
                return {
                    pseudoType: 'class',
                    pseudoValue,
                    property: property.slice(pseudoClassKey.length), // Remove pseudo-class
                };
            }
        }

        // Neither pseudo-class nor pseudo-element
        return {
            pseudoType: null,
            pseudoValue: null,
            property,
        };
    }

    function extractMultiplePseudos(property) {
        let pseudoSelectors = [''];
        let remainingProperty = property;
        let pseudoType, pseudoValue;

        while (true) {
            ({ pseudoType, pseudoValue, property: remainingProperty } = extractPseudo(remainingProperty));
            if (!pseudoType) break;

            pseudoSelectors = pseudoSelectors.map(sel => sel + pseudoValue.join(''));
        }

        return {
            pseudoSelectors,
            property: remainingProperty,
        };
    }

    function checkImportant(property) {
        if (property.startsWith('!')) {
            return {
                property: property.slice(1),
                isImportant: ' !important',
            };
        }
        return {
            property: property,
            isImportant: '',
        };
    }

    function generateCSSOutput(selector, declarations, isImportant, addContent = false) {
        let cssOutput = `${selector} {\n`;

        // If pseudo-element, add content
        if (addContent) {
            cssOutput += `  content: var(--kg-content);\n`;
        }

        // Add other CSS properties
        for (const [prop, val] of Object.entries(declarations)) {
            cssOutput += `  ${prop}: ${val}${isImportant};\n`;
        }

        cssOutput += '}';
        return cssOutput;
    }

    function handleSpaceOrDivide(property, className, value) {
        const spacePropertyKey = `${property} > :not([hidden]) ~ :not([hidden])`;
        const cssProperties = propertyMap[spacePropertyKey];

        if (cssProperties) {
            const declarations = cssProperties(value);
            return generateCSSOutput(
                `.${escapeClassName(className)} > :not([hidden]) ~ :not([hidden])`,
                declarations,
                ''
            );
        }

        return null;
    }

    function handlePseudoContent(property, className, value, pseudoSelector) {
        const cssProperties = propertyMap[property];

        // If content is defined, special handling is needed
        if (property === 'content') {
            return `
.${escapeClassName(className)}${pseudoSelector} {
  --kg-content: ${value};
  content: var(--kg-content);
}`;
        }

        // For other properties, normal CSS handling
        if (cssProperties) {
            const declarations = cssProperties(value);
            return generateCSSOutput(
                `.${escapeClassName(className)}${pseudoSelector}`,
                declarations,
                '',
                true // flag to add content
            );
        }

        return null;
    }

    // Extract classes from 'customClasses' parameter
    customClasses.forEach(className => {
        parseKgClass(className);
    });

    // Append media queries to CSS output
    Object.keys(mediaQueries).forEach(breakpointValue => {
        cssOutput += `@media (min-width: ${breakpointValue}) {\n${mediaQueries[breakpointValue]}}\n`;
    });

    return cssOutput;
}
