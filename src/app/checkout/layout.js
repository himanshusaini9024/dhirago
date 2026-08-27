import { generateSEO } from "../../utils/seo";

export const metadata = generateSEO({
  title: "Checkout | Dhirago",
  description: "Secure checkout for your Dhirago order.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutLayout({ children }) {
  return children;
}
