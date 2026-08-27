import { pageMetadata, PageCrawlSeo } from "../../lib/pageSeo";

export const metadata = pageMetadata("about");

export default function AboutLayout({ children }) {
  return (
    <>
      <PageCrawlSeo pageKey="about" />
      {children}
    </>
  );
}
