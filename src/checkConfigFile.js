import fs from 'fs';
import path from 'path';
import pc from 'picocolors';

export function checkConfigFile() {
    const configPath = path.join(process.cwd(), 'eglador.config.js');

    if (fs.existsSync(configPath)) {
        console.log(pc.yellow('eglador.config.js dosyası zaten var.'));
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
            input: './dist/css/input1.css',
            output: './dist/css/output1.css'
        },
        {
            name: 'secondary',
            contents: [
                './dist/**/*.html',
                './dist/**/*.js',
                './dist/**/*.php',
                './dist/**/*.tsx'
            ],
            cssreset: true,
            input: './dist/css/input2.css',
            output: './dist/css/output2.css'
        }
    ]
};
  `;

    fs.writeFileSync(configPath, defaultConfig);
    console.log(pc.green('eglador.config.js dosyası oluşturuldu.'));
    return true;
}
