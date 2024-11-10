import fs from 'fs';
import path from 'path';
import pc from 'picocolors';

export function checkConfigFile() {
    const configPath = path.join(process.cwd(), 'egladorcss.config.js');

    if (fs.existsSync(configPath)) {
        console.log(pc.yellow('egladorcss.config.js dosyası zaten var.'));
        return false;
    }

    const defaultConfig = `
export default {
    projects: [
        {
            name: 'primary',
            contents: [
                './dist/**/*.html',
                './dist/**/*.js',
                './dist/**/*.php',
                './dist/**/*.tsx'
            ],
            cssreset: true,
            input: './dist/css/input-primary.css',
            output: './dist/css/output-primary.css'
        },
        {
            name: 'secondary',
            contents: [
                './dist/**/secondary.html',
            ],
            cssreset: true,
            input: './dist/css/input-secondary.css',
            output: './dist/css/output-secondary.css'
        }
    ]
};
  `;

    fs.writeFileSync(configPath, defaultConfig);
    console.log(pc.green('egladorcss.config.js dosyası oluşturuldu.'));
    return true;
}
