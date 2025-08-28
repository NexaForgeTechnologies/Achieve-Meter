import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/containers/Footer";
import Header from "@/containers/Header";
import FormApplication from "@/containers/FormApplication";
import { Toaster } from "react-hot-toast";

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
  title: "Achieve Meter | Enterprise Growth Solutions",
  description: "VISION | VALUE | VELOCITY",
  openGraph: {
    title: "Achieve Meter",
    description: "VISION | VALUE | VELOCITY",
    url: "https://achievemeter.com",
    siteName: "Achieve Meter",
    images: [
      {
        url: "https://achievemeter.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Achieve Meter",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Achieve Meter",
    description: "VISION | VALUE | VELOCITY",
    images: ["https://achievemeter.com/logo.png"],
  },
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
        
        <Toaster position="top-right" reverseOrder={false} toastOptions={{
          className: "!bg-slate-800 !text-white !rounded-2xl !p-4 !shadow-lg", duration: 10000
        }} />

      </body>
    </html>
  );
}
