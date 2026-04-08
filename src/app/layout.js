import { Geist, Geist_Mono,Playfair_Display, Inter,Montserrat } from "next/font/google";
import "./globals.css";
import "../assets/css/styles.scss";

const inter = Inter({ subsets: ["latin"] });

import Header from "../components/header";
import ReduxProvider from "../store/provider";
import Script from "next/script";
import PopupProvider from "../components/loginpopup/PopupProvider";
import LayoutWrapper from "../components/LayoutWrapper";
import AuthLoader from "../components/AuthLoader";
import Footer from "../components/footer";
import CartSync from "../components/shopping-cart/cartsync";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weights: ['400', '500', '600'], // specify the weights you need
});


const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
 title: "Dhirago - Premium Menswear",
  description:
    "Shop premium menswear including shirts, t-shirts, polos, trousers & more. High quality products with fast delivery.",
icons: {
  icon: [
    { url: "favicon.ico", sizes: "48x48" },
    { url: "favicon.ico", sizes: "48x48" },
  ],
},
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <body
        className={`${playfair.className} font-sans`}
      >
            <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
        <div className="app-main">
          <ReduxProvider>
              <AuthLoader />
            <PopupProvider>
            
                <Header />


              <LayoutWrapper>
                <CartSync />
                {children}
              </LayoutWrapper>

              <Footer />
            </PopupProvider>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
