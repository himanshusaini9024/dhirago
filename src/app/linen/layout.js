import { pageMetadata, PageCrawlSeo } from "../../lib/pageSeo";

export const metadata = pageMetadata("linen");

export default function LinenLayout({ children }) {
  return (
    <>
      <PageCrawlSeo pageKey="linen" />
      {children}
    </>
  );
}
