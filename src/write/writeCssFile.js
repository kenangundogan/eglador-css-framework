import fs from 'fs';
import config from '../eglador.config.js';
import postcss from 'postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import sortMediaQueries from 'postcss-sort-media-queries';
import { readCssFile } from '../read/readCssFile.js';
import { rootDefinationCss } from '../properties/rootDefination.js';
import { resetCss } from '../generate/resetCss.js';
import { extractClassesFromFiles } from '../classExtractor.js';
import { groupClasses } from '../classGroups.js';
import { generateAllClasses } from '../generateAllClasses.js';
import { baseCss } from '../generate/baseCss.js';
import { customCss } from '../generate/customCss.js';

export function writeCssFile() {

    const rootDefinationCssResult = rootDefinationCss();
    const resetCssResult = resetCss();
    const allClasses = generateAllClasses();
    const extractedClasses = extractClassesFromFiles();
    const groupedClasses = groupClasses(extractedClasses);
    const baseCssResult = baseCss(groupedClasses.base, allClasses);
    const customCssResult = customCss(groupedClasses.custom);
    const inputCssContent = readCssFile();
    let combinedCss = `${rootDefinationCssResult}\n${resetCssResult}\n${baseCssResult}\n${customCssResult}\n${inputCssContent}`;

    postcss([
        autoprefixer(),
        sortMediaQueries(),
        cssnano(),
    ]).process(combinedCss, { from: undefined }).then(result => {
        fs.writeFileSync(config.output, result.css);
    });
}
