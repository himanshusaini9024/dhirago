import { Playfair_Display, Inter } from "next/font/google";


import localFont from "next/font/local";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const inter = Inter({
  subsets: ["latin"],
});




export const futura = localFont({
  src: [
    {
      path: "../fonts/Futura/futurabt-light-webfont.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Futura/futura-book-webfont.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Futura/futura-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-futura",
  display: "swap",
});