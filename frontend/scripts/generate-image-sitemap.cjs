const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const outPath = path.join(__dirname, '..', 'public', 'sitemap-images.xml');
const baseUrl = 'https://www.mahim.live';

function build() {
  if (!fs.existsSync(imagesDir)) {
    console.warn('Images directory not found, skipping image sitemap');
    return;
  }
  const files = fs.readdirSync(imagesDir).filter(f => /\.(png|jpe?g|gif|webp|svg)$/i.test(f));
  const now = new Date().toISOString().split('T')[0];
  const urls = files.map(f => `  <url>\n    <loc>${baseUrl}/images/${f}</loc>\n    <lastmod>${now}</lastmod>\n    <image:image>\n      <image:loc>${baseUrl}/images/${f}</image:loc>\n    </image:image>\n  </url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`;
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log('Image sitemap generated at', outPath);
}

build();
