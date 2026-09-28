import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ASSETS_SRC = path.resolve('./assets-src');
const PUBLIC_IMG = path.resolve('./public/images/products');
const REMOVED_LOG = path.resolve('./docs/removed-assets.txt');

// Ensure directories
if (!fs.existsSync(ASSETS_SRC)) {
  fs.mkdirSync(ASSETS_SRC, { recursive: true });
}
if (!fs.existsSync(PUBLIC_IMG)) {
  fs.mkdirSync(PUBLIC_IMG, { recursive: true });
}

async function optimizeImages() {
  console.log('Optimizing product images using sharp...');
  const files = fs.readdirSync(PUBLIC_IMG);
  let removedList = [];

  for (const f of files) {
    const fullPath = path.join(PUBLIC_IMG, f);
    const stat = fs.statSync(fullPath);
    if (!stat.isFile()) continue;

    // Remove unneeded extras or duplicate screenshots
    if (f.startsWith('extras-') || f.endsWith('.jpeg') || f.includes('PXL_')) {
      console.log(`Moving unreferenced extra to assets-src: ${f}`);
      fs.renameSync(fullPath, path.join(ASSETS_SRC, f));
      removedList.push(f);
      continue;
    }

    // Process original JPGs
    if (f.endsWith('.jpg') || f.endsWith('.png')) {
      const baseName = f.replace(/\.(jpg|png)$/i, '');
      const srcBuffer = fs.readFileSync(fullPath);

      // Save raw original to assets-src if not already there
      const archivePath = path.join(ASSETS_SRC, f);
      if (!fs.existsSync(archivePath)) {
        fs.copyFileSync(fullPath, archivePath);
      }

      // Generate WebP responsive sizes: 400, 800, 1200
      const sizes = [
        { width: 400, suffix: '-400' },
        { width: 800, suffix: '-800' },
        { width: 1200, suffix: '-1200' },
      ];

      for (const s of sizes) {
        const outPath = path.join(PUBLIC_IMG, `${baseName}${s.suffix}.webp`);
        await sharp(srcBuffer)
          .resize(s.width, s.width, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 78, effort: 4 })
          .toFile(outPath);
      }

      // Also create an optimized fallback .webp with baseName.webp
      const mainWebp = path.join(PUBLIC_IMG, `${baseName}.webp`);
      await sharp(srcBuffer)
        .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 78, effort: 4 })
        .toFile(mainWebp);

      // Re-compress the fallback JPG to under 150 KB
      await sharp(srcBuffer)
        .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 75, mozjpeg: true })
        .toFile(fullPath);

      const newStat = fs.statSync(fullPath);
      console.log(`Optimized ${f}: ${(stat.size / 1024).toFixed(0)} KB -> ${(newStat.size / 1024).toFixed(0)} KB (WebP: ~${(fs.statSync(mainWebp).size / 1024).toFixed(0)} KB)`);
    }
  }

  // Remove duplicate hero video (keep IMG_0199.mp4, remove public/videos/hero_video.mp4)
  const dupVideo = path.resolve('./public/videos/hero_video.mp4');
  if (fs.existsSync(dupVideo)) {
    console.log('Removing duplicate video: public/videos/hero_video.mp4');
    fs.unlinkSync(dupVideo);
    removedList.push('public/videos/hero_video.mp4 (duplicate of IMG_0199.mp4)');
  }

  // Remove homepage screenshots if present in public root
  const publicRootFiles = fs.readdirSync('./public');
  for (const f of publicRootFiles) {
    if (f.startsWith('homepage_') && f.endsWith('.png')) {
      console.log(`Removing screenshot artifact: ${f}`);
      fs.unlinkSync(path.join('./public', f));
      removedList.push(`public/${f}`);
    }
  }

  // Produce social OG image and touch icon from logo
  const logoPath = path.resolve('./public/favicon.jpg');
  if (fs.existsSync(logoPath)) {
    const logoBuf = fs.readFileSync(logoPath);
    await sharp(logoBuf)
      .resize(180, 180, { fit: 'cover' })
      .png()
      .toFile('./public/apple-touch-icon.png');

    await sharp(logoBuf)
      .resize(1200, 630, { fit: 'contain', background: '#0E0904' })
      .jpeg({ quality: 85 })
      .toFile('./public/og-image.jpg');
    console.log('Generated apple-touch-icon.png (180x180) and og-image.jpg (1200x630).');
  }

  fs.writeFileSync(REMOVED_LOG, removedList.join('\n'), 'utf8');
  console.log(`Done! Logged ${removedList.length} cleaned files to docs/removed-assets.txt.`);
}

optimizeImages().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
