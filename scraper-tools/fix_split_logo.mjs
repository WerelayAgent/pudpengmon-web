import fs from 'fs';

const filePath = 'assets/index-C8UtyeK9.js';
let content = fs.readFileSync(filePath, 'utf-8');

// Replace the split "MINI" and "MON" text
const original = content;
content = content.replace(/"MINI",m\.jsx\("span",\{style:\{color:([^}]+)\},children:"MON"\}\)/g, '"PUDPENG",m.jsx("span",{style:{color:$1},children:"MON"})');

if (content !== original) {
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Fixed split logo text!');
} else {
  console.log('Pattern not found.');
}
