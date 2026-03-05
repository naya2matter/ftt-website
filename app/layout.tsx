import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const materialSymbols = localFont({
  src: "../public/fonts/MaterialSymbolsOutlined.ttf",
  variable: "--font-material-symbols",
  display: "swap",
});

const sragen = localFont({
  src: "../public/fonts/sragenbold.ttf",
  variable: "--font-sragen",
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "First Team Trucking",
  description: "First Team Trucking - Join Our Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${barlowCondensed.variable} ${sragen.variable} ${materialSymbols.variable} antialiased font-display`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
