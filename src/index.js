import { writeCssFile } from './write/writeCssFile.js';

// CSS dosyasını oluşturma işlemini başlat
export default function () {
    writeCssFile();
    console.log('CSS generation process has been completed.');
}
