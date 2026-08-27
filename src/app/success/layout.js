import { generateSEO } from "../../utils/seo";

export const metadata = generateSEO({
  title: "Order Success | Dhirago",
  description: "Your Dhirago order confirmation.",
  path: "/success",
  noIndex: true,
});

export default function SuccessLayout({ children }) {
  return children;
}
