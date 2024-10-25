import fs from 'fs';
import path from 'path';

// Yapılandırma dosyasını oluşturma fonksiyonu
export function createConfigFile() {
    const configPath = path.join(process.cwd(), 'eglador.config.js');

    if (fs.existsSync(configPath)) {
        console.log('eglador.config.js already exists.');
        return false;  // Dosya zaten varsa false döndür
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
    console.log('eglador.config.js file has been created with default structure.');
    return true;  // Dosya oluşturulduysa true döndür
}
