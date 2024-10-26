import fs from 'fs';
import path from 'path';
import pc from 'picocolors';

const packageJsonPath = path.join(process.cwd(), 'package.json');

if (fs.existsSync(packageJsonPath)) {
    try {
        const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
        const packageJson = JSON.parse(packageJsonContent);

        if (!packageJson.type || packageJson.type !== 'module') {
            packageJson.type = 'module';
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
            console.log(pc.green('package.json dosyası modül tipine dönüştürüldü.'));
        }
    } catch (error) {
        console.error(pc.red('package.json dosyası okunurken hata oluştu:'), error);
    }
} else {
    console.error(pc.red('package.json dosyası bulunamadı.'));
}
