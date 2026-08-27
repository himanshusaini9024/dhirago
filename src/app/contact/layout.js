import { pageMetadata, PageCrawlSeo } from "../../lib/pageSeo";

export const metadata = pageMetadata("contact");

export default function ContactLayout({ children }) {
  return (
    <>
      <PageCrawlSeo pageKey="contact" />
      {children}
    </>
  );
}
