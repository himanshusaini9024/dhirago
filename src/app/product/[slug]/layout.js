import CrawlSeo from "../../../components/seo/CrawlSeo";
import { SITE_LINKS } from "../../../lib/pageSeo";

export default function ProductLayout({ children }) {
  return (
    <>
      <CrawlSeo
        h2="Explore more from Dhirago"
        description="Continue shopping premium menswear, learn about our craft, or get help with your order."
        links={SITE_LINKS}
      />
      {children}
    </>
  );
}
