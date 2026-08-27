import { pageMetadata, PageCrawlSeo } from "../../lib/pageSeo";

export const metadata = pageMetadata("essence");

export default function EssenceLayout({ children }) {
  return (
    <>
      <PageCrawlSeo pageKey="essence" />
      {children}
    </>
  );
}
