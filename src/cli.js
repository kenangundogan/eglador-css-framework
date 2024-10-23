#!/usr/bin/env node

import { createConfigFile } from './createConfigFile.js';
import './checkPackageJson.js';

// Argüman kontrolü (init komutu için)
const args = process.argv.slice(2);

if (args[0] === 'init') {
    // Eğer `init` argümanı verilmişse yapılandırma dosyasını oluştur
    createConfigFile();
} else {
    // Eğer `init` değilse, CSS derleme işlemi için index.js dosyasını çalıştır
    import('./index.js')
        .then((module) => {
            module.default(); // index.js'deki ana fonksiyonu çalıştır
        })
        .catch((err) => {
            console.error('Error executing index.js:', err);
        });
}
