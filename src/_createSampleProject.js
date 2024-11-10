import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import pc from 'picocolors';

export async function createSampleProject() {
    try {
        const configPath = pathToFileURL(`${process.cwd()}/egladorcss.config.js`).href;
        const configModule = await import(configPath);
        const config = configModule.default;

        if (!config || !config.projects) {
            console.log(pc.red('Config dosyası yüklenemedi veya "projects" bölümü bulunamadı.'));
            return;
        }
        for (const project of config.projects) {
            const inputFilePath = path.resolve(project.input);
            const inputDir = path.dirname(inputFilePath);

            fs.mkdirSync(inputDir, { recursive: true });
            fs.writeFileSync(inputFilePath, `/* ${project.name} project input file for testing */`);
            console.log(pc.green(`Dummy input dosyası oluşturuldu: ${inputFilePath}`));

            const htmlDir = path.resolve(inputDir, '../', 'pages');
            fs.mkdirSync(htmlDir, { recursive: true });

            const outputRelativePath = path.relative(htmlDir, path.resolve(project.output));

            const exampleHtmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.name} Project Sample</title>
    <link rel="stylesheet" href="${outputRelativePath}">
</head>
<body class="bg-gray-50 text-gray-800 flex items-center justify-center min-h-screen">
    <main class="bg-white shadow-xl p-10 max-w-sm">
        <div>
            <a href="https://github.com/kenangundogan/egladorcss" target="_blank" class="block border-b pb-6 mb-4">
                <img src="https://raw.githubusercontent.com/kenangundogan/egladorcss/HEAD/.github/egladorcss-logo.svg" alt="Eglador Css" class="w-full mx-auto">
            </a>
            <h1 class="font-bold text-xl mb-4">
                egladorcss
            </h1>
            <p class="mb-4 text-sm">
                Egladorcss is a flexible, customizable, and low-level configurable CSS framework for modern web
                projects. It enables you to quickly add CSS properties to your projects with high performance and
                minimal output.
            </p>
            <ul class="text-sm">
                <li><b>Flexible Configuration:</b> Customize classes, media queries, and much more with the
                    configuration file.</li>
                <li><b>Minimalist Approach:</b> Only the necessary CSS classes are generated, preventing clutter in the
                    project.</li>
                <li><b>Dynamic Watch Mode:</b> Automatically detects changes during development and updates the CSS
                    file.</li>
                <li><b>PostCSS Support:</b> Comes with PostCSS support for plugin compatibility.</li>
                <li><b>Performance Optimization:</b> Prevents unnecessary class conflicts and ensures fast loading with
                    custom structures.</li>
            </ul>
        </div>
    </main>
</body>
</html>
`;

            const htmlFilePath = path.join(htmlDir, `${project.name}-sample.html`);
            fs.writeFileSync(htmlFilePath, exampleHtmlContent);
            console.log(pc.green(`Dummy HTML dosyası oluşturuldu: ${htmlFilePath}`));
        }
    } catch (error) {
        console.error(pc.red('Config dosyası okunurken hata oluştu:'), error);
    }
}
