import type { Metadata } from "next";
import { Lato, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";

const lato = Lato({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Holidaze",
  description: "Book unique venues for your next stay",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
