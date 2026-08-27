import { generateSEO } from "../../utils/seo";

export const metadata = generateSEO({
  title: "My Account | Dhirago",
  description: "Manage your Dhirago account.",
  path: "/account",
  noIndex: true,
});

export default function AccountLayout({ children }) {
  return children;
}
