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
    console.log(`${pc.blue(project.name)} ${pc.green('[Başarılı:]')} ${classes.length} sınıf bulundu: ${groups.base.size} temel, ${groups.custom.size} özel. İçerikler: ${project.contents.map(content => pc.blue(content)).join(', ')}`);
    return {
        custom: [...groups.custom].sort(),
        base: [...groups.base].sort(),
    };
}

