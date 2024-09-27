export function generateGridTemplateColumnsClasses() {
    const classes = {};
    const gridColumnCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    gridColumnCounts.forEach((count) => {
        classes[`grid-cols-${count}`] = `grid-template-columns: repeat(${count}, minmax(0, 1fr));`;
    });

    classes['grid-cols-none'] = 'grid-template-columns: none;';
    classes['grid-cols-subgrid'] = 'grid-template-columns: subgrid;';

    return classes;
}
