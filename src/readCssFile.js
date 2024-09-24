import fs from 'fs';
import config from './eglador.config.js';

export function readCssFile() {
    const cssContent = fs.readFileSync(config.input, 'utf8');
    if (!cssContent) {
        console.error(`Error reading CSS file at ${config.input}`);
        process.exit(1);
    }
    return cssContent;
}
