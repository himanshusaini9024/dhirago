import { pageMetadata, PageCrawlSeo } from "../../lib/pageSeo";

export const metadata = pageMetadata("handwork");

export default function HandworkLayout({ children }) {
  return (
    <>
      <PageCrawlSeo pageKey="handwork" />
      {children}
    </>
  );
}
