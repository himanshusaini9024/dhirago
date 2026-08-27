import { pageMetadata, PageCrawlSeo } from "../../lib/pageSeo";

export const metadata = pageMetadata("timeless");

export default function TimelessLayout({ children }) {
  return (
    <>
      <PageCrawlSeo pageKey="timeless" />
      {children}
    </>
  );
}
