import ShoppingCart from "../../components/shopping-cart";

import { generateSEO } from "../../utils/seo";

export const metadata = generateSEO({
  title: "Secure Checkout | Dhirago",
  description: "Review your items",
  path: "/cart",
  noIndex: true,
});
const Products = () => (
<>
<ShoppingCart/>
</>
);

export default Products;