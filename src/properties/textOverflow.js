export function generateTextOverflowClasses() {
    return {
        'truncate': 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
        'ellipsis': 'text-overflow: ellipsis;',
        'clip': 'text-overflow: clip;',
    };
}
