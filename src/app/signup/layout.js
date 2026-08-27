import { generateSEO } from "../../utils/seo";

export const metadata = generateSEO({
  title: "Sign Up | Dhirago",
  description: "Create your Dhirago account.",
  path: "/signup",
  noIndex: true,
});

export default function SignupLayout({ children }) {
  return children;
}
