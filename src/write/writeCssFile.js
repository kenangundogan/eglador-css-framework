import fs from 'fs';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
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
    const projectClasses = extractClassesFromFiles();

    projectClasses.forEach(({ project, classes }) => {
        const rootDefinationCssResult = rootDefinationCss();
        const resetCssResult = resetCss(project);
        const allClasses = generateAllClasses();
        const groupedClasses = groupClasses(classes);
        const baseCssResult = baseCss(groupedClasses.base, allClasses);
        const customCssResult = customCss(groupedClasses.custom);
        const inputCssContent = readCssFile(project);

        // Önce inputCssContent üzerinde @import'ları çözmek için işlem yapalım
        postcss([
            postcssNested(), // Handles nested CSS
            postcssImport() // Handles @import statements first
        ])
            .process(inputCssContent, { from: project.input })
            .then(importProcessedResult => {
                // @import'ları çözülmüş input CSS'i diğer CSS içerikleri ile birleştirelim
                const combinedCss = `${rootDefinationCssResult}\n${resetCssResult}\n${baseCssResult}\n${customCssResult}\n${importProcessedResult.css}`;

                // Tümleşik CSS içeriğini işleyelim
                return postcss([
                    autoprefixer(),
                    sortMediaQueries(),
                    cssnano(),
                ]).process(combinedCss, { from: undefined, to: project.output });
            })
            .then(finalResult => {
                fs.writeFileSync(project.output, finalResult.css);
                console.log('CSS processing complete.');
            })
            .catch(error => {
                console.error('Error processing CSS:', error);
            });
    });
}
