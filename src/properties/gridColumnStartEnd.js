export function generateGridColumnStartEndClasses() {
    const classes = {};

    const columnSpans = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    columnSpans.forEach(span => {
        classes[`col-span-${span}`] = `grid-column: span ${span} / span ${span};`;
    });
    classes['col-span-full'] = 'grid-column: 1 / -1;';

    const columnStarts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    columnStarts.forEach(start => {
        classes[`col-start-${start}`] = `grid-column-start: ${start};`;
    });
    classes['col-start-auto'] = 'grid-column-start: auto;';

    const columnEnds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    columnEnds.forEach(end => {
        classes[`col-end-${end}`] = `grid-column-end: ${end};`;
    });
    classes['col-end-auto'] = 'grid-column-end: auto;';

    classes['col-auto'] = 'grid-column: auto;';

    return classes;
}
