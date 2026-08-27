import { pageMetadata, PageCrawlSeo } from "../../../lib/pageSeo";

export const metadata = pageMetadata("betterMaterials");

export default function CmsPageLayout({ children }) {
  return (
    <>
      <PageCrawlSeo pageKey="betterMaterials" />
      {children}
    </>
  );
}
