import { pageMetadata, PageCrawlSeo } from "../../lib/pageSeo";

export const metadata = pageMetadata("shipping");

export default function ShippingLayout({ children }) {
  return (
    <>
      <PageCrawlSeo pageKey="shipping" />
      {children}
    </>
  );
}
