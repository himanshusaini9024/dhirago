import { pageMetadata, PageCrawlSeo } from "../../lib/pageSeo";

export const metadata = pageMetadata("terms");

export default function TermsLayout({ children }) {
  return (
    <>
      <PageCrawlSeo pageKey="terms" />
      {children}
    </>
  );
}
