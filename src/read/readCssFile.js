import fs from 'fs';
import pc from 'picocolors';
export function readCssFile(project) {
    const cssContent = fs.readFileSync(project.input, 'utf8');
    if (!cssContent) {
        console.log(pc.red('Error: ') + 'Error reading CSS file at ' + pc.red(project.input));
        return '';
    }
    return cssContent;
}
