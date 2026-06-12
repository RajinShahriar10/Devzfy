import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://devzfy.vercel.app";

  const pages = [
    { path: "", priority: "1.0", changeFreq: "weekly" },
    { path: "/contact", priority: "0.8", changeFreq: "monthly" },
    { path: "/#services", priority: "0.9", changeFreq: "weekly" },
    { path: "/#projects", priority: "0.9", changeFreq: "weekly" },
    { path: "/#technologies", priority: "0.7", changeFreq: "monthly" },
    { path: "/#testimonials", priority: "0.7", changeFreq: "monthly" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
