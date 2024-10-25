import fs from 'fs';
import path from 'path';

const packageJsonPath = path.join(process.cwd(), 'package.json');

if (fs.existsSync(packageJsonPath)) {
    try {
        const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
        const packageJson = JSON.parse(packageJsonContent);

        if (!packageJson.type || packageJson.type !== 'module') {
            packageJson.type = 'module';
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
            console.log('"type": "module" package.json dosyasına eklendi.');
        }
    } catch (error) {
        console.error('package.json dosyası okunurken bir hata oluştu:', error.message);
    }
} else {
    console.log('package.json dosyası bulunamadı.');
}
