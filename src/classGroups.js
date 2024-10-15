export function groupClasses(classes) {
    const groups = {
        custom: new Set(),
        base: new Set(),
    };

    classes.forEach(className => {
        if (className.includes('[') && className.includes(']')) {
            groups.custom.add(className);
        }
        else {
            groups.base.add(className);
        }
    });
    return {
        custom: [...groups.custom].sort(),
        base: [...groups.base].sort(),
    };
}

