import fs from 'fs';
import path from 'path';

// package.json dosyasının var olup olmadığını kontrol et
const packageJsonPath = path.join(process.cwd(), 'package.json');

if (fs.existsSync(packageJsonPath)) {
    console.log('package.json dosyası bulundu.');

    try {
        // package.json dosyasını oku
        const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
        const packageJson = JSON.parse(packageJsonContent);

        // "type": "module" alanının olup olmadığını kontrol et
        if (!packageJson.type || packageJson.type !== 'module') {
            packageJson.type = 'module';

            // package.json dosyasını güncelle
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
            console.log('"type": "module" package.json dosyasına eklendi.');
        } else {
            console.log('"type": "module" zaten package.json dosyasında mevcut.');
        }
    } catch (error) {
        console.error('package.json dosyası okunurken bir hata oluştu:', error.message);
    }
} else {
    console.log('package.json dosyası bulunamadı.');
}
