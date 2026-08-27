import { pageMetadata, PageCrawlSeo } from "../../lib/pageSeo";

export const metadata = pageMetadata("productCare");

export default function ProductCareLayout({ children }) {
  return (
    <>
      <PageCrawlSeo pageKey="productCare" />
      {children}
    </>
  );
}
