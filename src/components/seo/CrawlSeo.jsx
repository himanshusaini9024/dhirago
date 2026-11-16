import Link from "next/link";

/**
 * Crawl/index-only SEO block. Visually hidden from shoppers (sr-only),
 * but present in HTML for search engines.
 */
export default function CrawlSeo({
  h1,
  h2,
  description,
  links = [],
}) {
  if (!h1 && !h2 && !description && !links.length) return null;

  return (
    <section className="sr-only">
      {h1 ? <h1>{h1}</h1> : null}
      {h2 ? <h2>{h2}</h2> : null}
      {description ? <p>{description}</p> : null}
      {links.length > 0 ? (
        <nav aria-label="Related pages">
          {links.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </section>
  );
}
