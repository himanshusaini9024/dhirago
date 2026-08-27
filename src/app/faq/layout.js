import { pageMetadata, PageCrawlSeo } from "../../lib/pageSeo";

export const metadata = pageMetadata("faq");

export default function FaqLayout({ children }) {
  return (
    <>
      <PageCrawlSeo pageKey="faq" />
      {children}
    </>
  );
}
