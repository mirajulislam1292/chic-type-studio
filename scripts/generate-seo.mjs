import { writeFile } from "node:fs/promises";

const origin = (process.env.VITE_SITE_URL || "").replace(/\/$/, "");
const paths = ["/", "/projects", "/achievements", "/gallery", "/blog"];

const robots = ["User-agent: *", "Allow: /", "Disallow: /admin/", origin ? `Sitemap: ${origin}/sitemap.xml` : ""].filter(Boolean).join("\n");
await writeFile(new URL("../dist/robots.txt", import.meta.url), `${robots}\n`);

if (origin) {
  const urls = paths.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(new URL("../dist/sitemap.xml", import.meta.url), sitemap);
}
