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
  const targetDir = './'; // Root directory now
  let filesModified = 0;

  walkDir(targetDir, (filePath) => {
    if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.ttf') || filePath.endsWith('.woff2') || filePath.includes('node_modules') || filePath.includes('.git')) {
      return;
    }
    
    if (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      let original = content;

      // Replace $PUD with $PUDPENG
      content = content.replace(/\$PUD/g, '$PUDPENG');

      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated: ${filePath}`);
        filesModified++;
      }
    }
  });

  console.log(`Total files modified: ${filesModified}`);
}

processFiles();
