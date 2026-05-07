import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Inter,
  Montserrat,
} from "next/font/google";
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
  subsets: ["latin"],
  weights: ["400", "500", "600"], // specify the weights you need
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Dhirago - Premium Cloths",
    template: "%s | Your Store",
  },
};

export default function RootLayout({ children }) {
  return (
  
    
    <html lang="en">
      
      <body className={`${montserrat.className} font-sans`}>
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

              <Script id="chatwoot" strategy="afterInteractive">
                {`
window.chatwootSettings = {
position: "right",
type: "standard",
launcherTitle: "Powered by Dhirago"
};


  (function(d,t) {
        var BASE_URL="http://localhost:3000";
        var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=BASE_URL+"/packs/js/sdk.js";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g,s);
        g.onload=function(){
          window.chatwootSDK.run({
            websiteToken: 'XNEUiTEmEKsrCtkCaYAGp9Ed',
            baseUrl: BASE_URL
          })
        }
      })(document,"script");

`}
              </Script>

              <Footer />
            </PopupProvider>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
