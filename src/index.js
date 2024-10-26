import fs from 'fs';
import pc from 'picocolors';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import sortMediaQueries from 'postcss-sort-media-queries';
import { readCssFile } from './read/readCssFile.js';
import { rootDefinationCss } from './properties/rootDefination.js';
import { resetCss } from './generate/resetCss.js';
import { extractClassesFromFiles } from './classExtractor.js';
import { groupClasses } from './classGroups.js';
import { allClasses } from './generate/allClasses.js';
import { baseCss } from './generate/baseCss.js';
import { customCss } from './generate/customCss.js';

export function writeCssFile() {
    const projectClasses = extractClassesFromFiles();

    projectClasses.forEach(({ project, classes }) => {
        const rootDefinationCssResult = rootDefinationCss();
        const resetCssResult = resetCss(project);
        const groupedClasses = groupClasses(project, classes);
        const baseCssResult = baseCss(groupedClasses.base, allClasses);
        const customCssResult = customCss(groupedClasses.custom);
        const inputCssContent = readCssFile(project);

        postcss([
            postcssNested(),
            postcssImport()
        ])
            .process(inputCssContent, { from: project.input })
            .then(importProcessedResult => {
                const combinedCss = `${rootDefinationCssResult}\n${resetCssResult}\n${baseCssResult}\n${customCssResult}\n${importProcessedResult.css}`;

                return postcss([
                    autoprefixer(),
                    sortMediaQueries(),
                    cssnano(),
                ]).process(combinedCss, { from: undefined, to: project.output });
            })
            .then(finalResult => {
                fs.writeFileSync(project.output, finalResult.css);
                console.log(pc.green('Success: ') + 'CSS file created at ' + pc.green(project.output));
            })
            .catch(error => {
                console.log(pc.red('Error: ') + 'Error processing CSS file at ' + pc.red(project.input));
                console.log(error);
            });
    });
}
