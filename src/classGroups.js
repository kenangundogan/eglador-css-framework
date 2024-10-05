export function groupClasses(classes) {
    const groups = {
        responsive: new Set(),
        pseudoClasses: new Set(),
        pseudoElements: new Set(),
        darkMode: new Set(),
        important: new Set(),
        custom: new Set(),
        base: new Set(),
    };

    // Pseudo-classes ve pseudo-elements tanımları
    const pseudoClasses = ['hover', 'focus', 'focus-within', 'focus-visible', 'active', 'visited', 'target', 'has', 'first', 'last', 'only', 'odd', 'even', 'first-of-type', 'last-of-type', 'only-of-type', 'empty', 'disabled', 'enabled', 'checked', 'indeterminate', 'default', 'required', 'valid', 'invalid', 'in-range', 'out-of-range', 'placeholder-shown', 'autofill', 'read-only'];
    const pseudoElements = ['before', 'after', 'first-letter', 'first-line', 'marker', 'selection', 'file', 'backdrop', 'placeholder'];
    const brekpoints = ['sm:', 'md:', 'lg:', 'xl:', '2xl:'];

    classes.forEach(className => {
        if (brekpoints.some(bp => className.startsWith(bp))) {
            groups.responsive.add(className);
        }
        else if (pseudoClasses.some(pc => className.startsWith(`${pc}:`))) {
            groups.pseudoClasses.add(className);
        }
        else if (pseudoElements.some(pe => className.startsWith(`${pe}:`))) {
            groups.pseudoElements.add(className);
        }
        else if (className.startsWith('dark:')) {
            groups.darkMode.add(className);
        }
        else if (className.startsWith('!')) {
            groups.important.add(className);
        }
        else if (className.includes('[') && className.includes(']')) {
            groups.custom.add(className);
        }
        else {
            groups.base.add(className);
        }
    });

    return {
        responsive: [...groups.responsive].sort(),
        pseudoClasses: [...groups.pseudoClasses].sort(),
        pseudoElements: [...groups.pseudoElements].sort(),
        darkMode: [...groups.darkMode].sort(),
        important: [...groups.important].sort(),
        custom: [...groups.custom].sort(),
        base: [...groups.base].sort(),
    };
}

