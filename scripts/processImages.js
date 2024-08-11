const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const assetsDir = path.join(__dirname, '..', 'src', 'assets');

const sizes = [300, 600, 1200, 2000];

async function processImage(file) {
  const image = sharp(path.join(publicDir, file));
  const metadata = await image.metadata();
  const baseName = path.basename(file, path.extname(file));

  const isTransparent = metadata.hasAlpha;
  
  for (const size of sizes) {
    // Generate WebP
    await image
      .resize(size)
      .webp()
      .toFile(path.join(assetsDir, `${baseName}-${size}.webp`));

    // Generate fallback (PNG or JPEG)
    if (isTransparent) {
      await image
        .resize(size)
        .png()
        .toFile(path.join(assetsDir, `${baseName}-${size}.png`));
    } else {
      await image
        .resize(size)
        .jpeg()
        .toFile(path.join(assetsDir, `${baseName}-${size}.jpg`));
    }
  }
}

async function processAllImages() {
  const files = fs.readdirSync(publicDir);
  const pngFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');

  for (const file of pngFiles) {
    await processImage(file);
  }
}

processAllImages().then(() => console.log('Image processing complete'));
