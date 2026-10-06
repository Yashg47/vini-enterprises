const SITE_URL = "https://vinienterprises.co.in";

export async function GET() {
  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return new Response("Supabase configuration missing", {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/products?select=slug&order=created_at.desc`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    if (!response.ok) {
      return new Response("Failed to fetch products", {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    const products = await response.json();

    const staticUrls = [
      `${SITE_URL}/`,
      `${SITE_URL}/collections`,
      `${SITE_URL}/about`,
      `${SITE_URL}/contact`,
    ];

    const productUrls = products
      .filter((product: { slug?: string }) => product.slug)
      .map(
        (product: { slug: string }) =>
          `${SITE_URL}/product/${product.slug}`
      );

    const urls = [...staticUrls, ...productUrls];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url: string) => `  <url>
    <loc>${url}</loc>
  </url>`
  )
  .join("\n")}
</urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);

    return new Response("Failed to generate sitemap", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}