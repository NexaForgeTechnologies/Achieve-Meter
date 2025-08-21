import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/containers/Footer";
import Header from "@/containers/Header";
import FormApplication from "@/containers/FormApplication";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Achieve Meter",
  description: "Created by NexaForge Technologies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <Header />
        <main className="px-5 sm:px-10 md:px-18 lg:px-20 bg-white">
          {children}
          <FormApplication />
        </main>
        <Footer />
      </body>
    </html>
  );
}
