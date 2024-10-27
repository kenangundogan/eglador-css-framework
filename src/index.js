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

export async function writeCssFile() {

    const projectClasses = await extractClassesFromFiles();


    if (!Array.isArray(projectClasses)) {
        throw new TypeError('Hata: extractClassesFromFiles bir dizi döndürmedi');
    }

    for (const { project, classes } of projectClasses) {
        const rootDefinationCssResult = rootDefinationCss();
        const resetCssResult = resetCss(project);
        const allClassesResult = allClasses();
        const groupedClasses = groupClasses(project, classes);
        const baseCssResult = baseCss(groupedClasses.base, allClassesResult);
        const customCssResult = customCss(groupedClasses.custom);
        const inputCssContent = readCssFile(project);

        try {
            const importProcessedResult = await postcss([
                postcssNested(),
                postcssImport()
            ]).process(inputCssContent, { from: project.input });

            const combinedCss = `${rootDefinationCssResult}\n${resetCssResult}\n${baseCssResult}\n${customCssResult}\n${importProcessedResult.css}`;

            const finalResult = await postcss([
                autoprefixer(),
                sortMediaQueries(),
                cssnano(),
            ]).process(combinedCss, { from: undefined, to: project.output });

            fs.writeFileSync(project.output, finalResult.css);
            console.log(pc.green('Success: ') + 'CSS dosyası başarıyla oluşturuldu: ' + pc.green(project.output));
        } catch (error) {
            console.log(pc.red('Hata: ') + 'CSS dosyası oluşturulurken bir hata oluştu + ' + pc.red(project.output));
            console.error(error);
        }
    }
}
