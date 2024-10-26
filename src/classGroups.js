import pc from 'picocolors';
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
    console.log(pc.blue('Custom / Base ') + pc.black('class : ') + groups.custom.size + ' / ' + groups.base.size);
    return {
        custom: [...groups.custom].sort(),
        base: [...groups.base].sort(),
    };
}

