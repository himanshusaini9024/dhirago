import { pageMetadata, PageCrawlSeo } from "../../lib/pageSeo";

export const metadata = pageMetadata("privacy");

export default function PrivacyLayout({ children }) {
  return (
    <>
      <PageCrawlSeo pageKey="privacy" />
      {children}
    </>
  );
}
