import Link from "next/link";
import CrawlSeo from "../../components/seo/CrawlSeo";
import { generateSEO } from "../../utils/seo";
import { SITE_LINKS } from "../../lib/pageSeo";
import { fetchProductSlugs, SITEMAP_PAGES } from "../../lib/sitemap";

export const metadata = generateSEO({
  title: "Sitemap | Dhirago Menswear — All Pages",
  description:
    "Browse all Dhirago pages and premium men's shirt products. Official sitemap for the Dhirago luxury Indian menswear store.",
  path: "/sitemap",
});

export const revalidate = 3600;

export default async function HtmlSitemapPage() {
  const products = await fetchProductSlugs();
  const pages = SITEMAP_PAGES.filter((p) => p.path !== "/sitemap");

  const pageLabel = (path) => {
    if (path === "") return "Home";
    return path
      .replace(/^\//, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <CrawlSeo
        h1="Dhirago Website Sitemap"
        h2="All Dhirago menswear pages and products"
        description="HTML sitemap of Dhirago Fashion — premium men's shirts and luxury Indian menswear from Udaipur."
        links={SITE_LINKS}
      />

      <h1 className="text-[28px] md:text-[34px] text-[#1a1a1a] mb-3">
        Sitemap
      </h1>
      <p className="text-[15px] text-[#555] leading-relaxed mb-10">
        Explore every page on Dhirago — premium men&apos;s shirts and luxury
        Indian menswear.
      </p>

      <section className="mb-12">
        <h2 className="text-[13px] tracking-[0.14em] uppercase text-[#888] mb-4">
          Pages
        </h2>
        <ul className="space-y-2">
          {pages.map((page) => (
            <li key={page.path || "home"}>
              <Link
                href={page.path || "/"}
                className="text-[15px] text-[#1a1a1a] underline-offset-4 hover:underline"
              >
                {pageLabel(page.path)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-[13px] tracking-[0.14em] uppercase text-[#888] mb-4">
          Products
        </h2>
        {products.length === 0 ? (
          <p className="text-[14px] text-[#777]">
            Products are listed on the{" "}
            <Link href="/collections/shirts" className="underline">
              shirts collection
            </Link>
            .
          </p>
        ) : (
          <ul className="space-y-2">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/product/${p.slug}`}
                  className="text-[15px] text-[#1a1a1a] underline-offset-4 hover:underline"
                >
                  {p.name ||
                    p.slug
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
