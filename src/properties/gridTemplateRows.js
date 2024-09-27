export function generateGridTemplateRowsClasses() {
    const classes = {};
    const gridRowCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    gridRowCounts.forEach((count) => {
        classes[`grid-rows-${count}`] = `grid-template-rows: repeat(${count}, minmax(0, 1fr));`;
    });

    classes['grid-rows-none'] = 'grid-template-rows: none;';
    classes['grid-rows-subgrid'] = 'grid-template-rows: subgrid;';

    return classes;
}
