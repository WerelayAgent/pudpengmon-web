import fs from 'fs';
import path from 'path';
import https from 'https';

const assetsDir = './assets';

function download(filename) {
  return new Promise((resolve, reject) => {
    const url = `https://minimon.world/assets/${filename}`;
    const dest = path.join(assetsDir, decodeURIComponent(filename));
    if (fs.existsSync(dest)) {
      return resolve(true); // already have it
    }

    console.log(`Downloading ${url}...`);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Failed to download ${url}: ${res.statusCode}`);
        return resolve(false);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      console.error(err);
      resolve(false);
    });
  });
}

async function run() {
  const files = fs.readdirSync(assetsDir);
  const regex = /assets\/([\w\-\.\(\)]+\.(?:png|jpg|jpeg|gif|svg|webp))/gi;
  const toDownload = new Set();

  for (const file of files) {
    if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
      const content = fs.readFileSync(path.join(assetsDir, file), 'utf8');
      let m;
      while ((m = regex.exec(content)) !== null) {
        toDownload.add(m[1]);
      }
    }
  }

  // Also check index.html at root
  const indexContent = fs.readFileSync('./index.html', 'utf8');
  let m;
  while ((m = regex.exec(indexContent)) !== null) {
    toDownload.add(m[1]);
  }

  console.log(`Found ${toDownload.size} unique image references.`);
  
  for (const filename of toDownload) {
    await download(filename);
  }
}

run();
