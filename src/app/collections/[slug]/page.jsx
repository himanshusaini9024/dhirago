import Categorybaner from "../../../components/categorybanner";
import ProductsContent from "../../../components/products-content";
import CrawlSeo from "../../../components/seo/CrawlSeo";
import { notFound } from "next/navigation";
import { generateSEO } from "../../../utils/seo";
import { getCategoryProducts } from "../../../lib/fetchCategory";
import { SITE_LINKS } from "../../../lib/pageSeo";

function formatName(slug) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const COLLECTION_COPY = {
  shirts:
    "Explore Dhirago’s premium men’s shirts — crafted in natural fabrics with hand embroidery, block printing, and refined construction. Each piece is made to be worn, kept, and remembered.",
};

const COLLECTION_META = {
  shirts:
    "Shop premium men’s shirts online at Dhirago. Natural fabrics, hand embroidery, and timeless design—crafted to last.",
};

function collectionDescription(slug, displayName) {
  return (
    COLLECTION_COPY[slug] ||
    `Shop ${displayName} from Dhirago — premium menswear rooted in traditional textiles, thoughtful craft, and timeless design.`
  );
}

function collectionMetaDescription(slug, displayName) {
  if (COLLECTION_META[slug]) return COLLECTION_META[slug];
  return collectionDescription(slug, displayName);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const name = formatName(slug);

  return generateSEO({
    title: `Buy ${name} Online in India | Dhirago`,
    description: collectionMetaDescription(slug, name),
    path: `/collections/${slug}`,
  });
}

export default async function ProductsPage({ params }) {
  const { slug } = await params;

  const products = await getCategoryProducts(slug);

  if (!products?.category || products.category.length === 0) {
    notFound();
  }

  const name = formatName(slug);
  const intro = collectionDescription(slug, name);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.dhirago.com";

  return (
    <>
      <Categorybaner
        catbanner={products?.catbanner}
        catbannerMobile={products?.catbanner_mobile}
        slug={slug}
      />

      <CrawlSeo
        h2={`${name} collection`}
        description={intro}
        links={SITE_LINKS}
      />

      <section>
        <ProductsContent products={products?.category || []} slug={slug} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name,
            url: `${siteUrl}/collections/${slug}`,
            description: intro,
          }),
        }}
      />
    </>
  );
}
