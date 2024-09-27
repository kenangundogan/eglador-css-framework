export function generateGridColumnStartEndClasses() {
    const classes = {};

    // row-span sınıfları
    const columnSpans = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    columnSpans.forEach(span => {
        classes[`column-span-${span}`] = `grid-column: span ${span} / span ${span};`;
    });
    classes['column-span-full'] = 'grid-column: 1 / -1;';

    // column-start sınıfları
    const columnStarts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    columnStarts.forEach(start => {
        classes[`column-start-${start}`] = `grid-column-start: ${start};`;
    });
    classes['column-start-auto'] = 'grid-column-start: auto;';

    // column-end sınıfları
    const columnEnds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    columnEnds.forEach(end => {
        classes[`column-end-${end}`] = `grid-column-end: ${end};`;
    });
    classes['column-end-auto'] = 'grid-column-end: auto;';

    // column-auto sınıfı
    classes['column-auto'] = 'grid-column: auto;';

    return classes;
}
