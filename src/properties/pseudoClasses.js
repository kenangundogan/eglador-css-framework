export function generatePseudoClasses() {
    return {
        'hover': 'hover',
        'focus': 'focus',
        'focus-within': 'focus-within',
        'focus-visible': 'focus-visible',
        'active': 'active',
        'visited': 'visited',
        'target': 'target',
        'has': 'has',
        'first': 'first-child',
        'last': 'last-child',
        'only': 'only-child',
        'odd': 'nth-child(odd)',
        'even': 'nth-child(even)',
        'first-of-type': 'first-of-type',
        'last-of-type': 'last-of-type',
        'only-of-type': 'only-of-type',
        'empty': 'empty',
        'disabled': 'disabled',
        'enabled': 'enabled',
        'checked': 'checked',
        'indeterminate': 'indeterminate',
        'default': 'default',
        'required': 'required',
        'valid': 'valid',
        'invalid': 'invalid',
        'in-range': 'in-range',
        'out-of-range': 'out-of-range',
        'placeholder-shown': 'placeholder-shown',
        'autofill': 'autofill',
        'read-only': 'read-only',
    };
}
