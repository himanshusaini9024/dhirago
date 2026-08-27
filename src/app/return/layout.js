import { generateSEO } from "../../utils/seo";

export const metadata = generateSEO({
  title: "Orders | Dhirago",
  description: "Track and manage Dhirago orders.",
  path: "/return",
  noIndex: true,
});

export default function ReturnLayout({ children }) {
  return children;
}
