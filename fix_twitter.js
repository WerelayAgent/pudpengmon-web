const fs = require('fs');
const path = require('path');

function processFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fp = path.join(dir, file);
        if (fs.statSync(fp).isDirectory()) {
            if (file !== '.git' && file !== 'node_modules' && file !== '.next') {
                processFiles(fp);
            }
        } else if (fp.endsWith('.html') || fp.endsWith('.js') || fp.endsWith('.json') || fp.endsWith('.txt') || fp.endsWith('.tsx') || fp.endsWith('.ts')) {
            let content = fs.readFileSync(fp, 'utf8');
            let original = content;
            
            // Replace the incorrect twitter handle
            content = content.replace(/x\.com\/pudpengmonworld/gi, 'x.com/pudpengmon');
            content = content.replace(/twitter\.com\/pudpengmonworld/gi, 'x.com/pudpengmon');
            
            if (content !== original) {
                fs.writeFileSync(fp, content);
                console.log('Fixed twitter handle in', fp);
            }
        }
    }
}
processFiles('.');
console.log('Done.');
