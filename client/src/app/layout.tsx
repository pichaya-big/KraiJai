import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { StoreHydration } from "@/components/providers/StoreHydration";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleSans = localFont({
  src: [
    { path: "./fonts/GoogleSans-Variable.ttf", style: "normal", weight: "400 700" },
    { path: "./fonts/GoogleSans-Italic-Variable.ttf", style: "italic", weight: "400 700" },
  ],
  variable: "--font-google-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KraiJai — Split Bills Easily",
  description: "Split restaurant and party bills with ease. Calculate fair shares with VAT and service charges.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StoreHydration />
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
