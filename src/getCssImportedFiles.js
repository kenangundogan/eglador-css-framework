import fs from 'fs';
import path from 'path';
import pc from 'picocolors';

export function getImportedFiles(filePath, visitedFiles = new Set()) {
    if (visitedFiles.has(filePath)) return [];  // Tekrar okuma yapılmıyor
    visitedFiles.add(filePath);

    if (!fs.existsSync(filePath)) {
        console.log(pc.yellow(`Dosya bulunamadı: ${filePath}`));
        return [];
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const importRegex = /@import\s+['"]([^'"\s]+)['"]/g;
    let match;
    const importedFiles = [];

    while ((match = importRegex.exec(content)) !== null) {
        const importPath = path.resolve(path.dirname(filePath), match[1]);
        importedFiles.push(importPath);
        importedFiles.push(...getImportedFiles(importPath, visitedFiles));
    }

    return importedFiles;
}
