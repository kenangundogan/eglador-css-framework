import fs from 'fs';

export function readCssFile(project) {
    const cssContent = fs.readFileSync(project.input, 'utf8');
    if (!cssContent) {
        console.error(`Error reading CSS file at ${project.input}`);
        return '';
    }
    return cssContent;
}
