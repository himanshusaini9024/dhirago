import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Inter,
  Montserrat,
} from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import "../assets/css/styles.scss";
import GoogleAnalytics from "../components/GoogleAnalytics";
import PageTracker from "../components/PageTracker";

const inter = Inter({ subsets: ["latin"] });
import { futura } from "./font";
import Header from "../components/header";
import ReduxProvider from "../store/provider";
import Script from "next/script";
import PopupProvider from "../components/loginpopup/PopupProvider";
import LayoutWrapper from "../components/LayoutWrapper";
import AuthLoader from "../components/AuthLoader";
import ChatwootSync from "../components/ChatwootSync";
import Footer from "../components/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import CartSync from "../components/shopping-cart/cartsync";
import MetaPixel from "../components/MetaPixel";
import MetaPageTracker from "../components/MetaPageTracker";
import { GoogleTagManager } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Dhirago — Premium Menswear",
    template: "%s | Dhirago",
  },
    description:
    "Discover Dhirago, a luxury Indian menswear brand offering handcrafted shirts with contemporary designs and considered detailing.",

  alternates: {
    canonical: "https://www.dhirago.com/",
  },
  robots: (() => {
    const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
    return {
      index: allowIndexing,
      follow: allowIndexing,
      googleBot: {
        index: allowIndexing,
        follow: allowIndexing,
      },
    };
  })(),
  verification: {
    google: "VAG1hHNGSz3usCxHr8pXpFnc5DY42snyTnwXp2A2PiY",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${futura.variable} `}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://www.dhirago.com/#organization",
                name: "Dhirago Fashion Private Limited",
                url: "https://www.dhirago.com/",
                logo: "https://images.dhirago.com/ecommerce/logo/logo.jpg",
                description:
                  "Dhirago is a luxury Indian menswear brand offering handcrafted shirts with contemporary designs and considered detailing.",
                sameAs: [
                  "https://www.instagram.com/dhirago_/"
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+91-8905524932",
                  contactType: "customer service",
                  email: "contact@dhirago.com",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://www.dhirago.com/#website",
                url: "https://www.dhirago.com/",
                name: "Dhirago",
                publisher: {
                  "@id": "https://www.dhirago.com/#organization",
                },
              },
            ]),
          }}
        />
        <GoogleTagManager gtmId="GTM-5TDSXPBS" />

        <div className="app-main">
          <MetaPixel />

          <ReduxProvider>
            <AuthLoader />
            <PopupProvider>
            <Header />

            <LayoutWrapper>
              <CartSync />
              <ChatwootSync />
              <Suspense fallback={null}>
                <PageTracker />
              </Suspense>
              <Suspense fallback={null}>
                <MetaPageTracker />
              </Suspense>

              {children}

              {/* <GoogleAnalytics /> */}
              <Analytics />
              <SpeedInsights />
            </LayoutWrapper>
            {/* <Script
                id="tawk-chat"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
        var s1=document.createElement("script"),
        s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/69e607917d06101c37be0508/1jml8r4fe';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
      })();
    `,
                }}
              /> */}

            {/* <Script id="chatwoot" strategy="afterInteractive">
                {`
            window.chatwootSettings = {
            position: "right",
            type: "standard",
            locale: "en",
            launcherTitle: "Need help with your order?"
            };


            (function(d,t) {
            var BASE_URL= "${process.env.NEXT_PUBLIC_CHAT_URL || "https://chat.dhirago.com"}";
            // var BASE_URL= "http://192.168.137.10:3001";

            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+"/packs/js/sdk.js";
            g.defer = true;
            g.async = true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
            window.chatwootSDK.run({
            websiteToken: '${process.env.NEXT_PUBLIC_CHAT_TOKEN}',
            baseUrl: BASE_URL
            })
            }
            })(document,"script");

            `}
              </Script> */}

            <Footer />
            </PopupProvider>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
