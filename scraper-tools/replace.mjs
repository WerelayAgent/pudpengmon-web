import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFiles() {
  const targetDir = './site/minimon.world';
  let filesModified = 0;

  walkDir(targetDir, (filePath) => {
    if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.ttf') || filePath.endsWith('.woff2')) {
      return;
    }

    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // Replacements
    content = content.replace(/Minimon/g, 'Pudpengmon');
    content = content.replace(/MINIMON/g, 'PUDPENGMON');
    content = content.replace(/minimon/g, 'pudpengmon');
    content = content.replace(/Robinhood Chain/gi, 'pump.fun');
    content = content.replace(/\$MINI/g, '$PUD');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated: ${filePath}`);
      filesModified++;
    }
  });

  console.log(`Total files modified: ${filesModified}`);
}

processFiles();
