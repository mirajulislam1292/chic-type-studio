const fs = require('fs');
const path = require('path');

const cfgPath = path.join(__dirname, '..', 'sitemap.config.json');
const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

function build() {
  const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  const now = new Date().toISOString().split('T')[0];
  const urls = cfg.routes.map((r) => `  <url>\n    <loc>${cfg.baseUrl}${r}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${cfg.changefreq}</changefreq>\n    <priority>${cfg.priority}</priority>\n  </url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log('Sitemap generated at', outPath);
}

build();
