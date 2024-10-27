import pc from 'picocolors';
export function groupClasses(project, classes) {
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
    console.log(pc.blue(project.name) + ' için ' + + groups.base.size + pc.blue(' Base') + ' , ' + groups.custom.size + pc.blue(' Custom ') + pc.black('class bulundu'));
    return {
        custom: [...groups.custom].sort(),
        base: [...groups.base].sort(),
    };
}

