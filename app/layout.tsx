import type { Metadata } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import "./globals.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Østrungens Venner",
  description: "Østrungens Venner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nb"
      className={`${robotoSans.variable} ${robotoSlab.variable} antialiased`}
    >
      <body>
        <div>
          <Header />
          <div className="min-h-screen flex flex-col max-w-7xl mx-auto">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}