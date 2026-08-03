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
            
            // Replace "0x959d43eef0af6af73c7ae2791716a7146c4c69c2" with the real CA
            content = content.replace(/0x959d43eef0af6af73c7ae2791716a7146c4c69c2/gi, '0x959d43eef0af6af73c7ae2791716a7146c4c69c2');
            
            if (content !== original) {
                fs.writeFileSync(fp, content);
                console.log('Injected CA in', fp);
            }
        }
    }
}
processFiles('.');
console.log('Done.');
