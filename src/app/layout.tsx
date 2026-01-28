"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Navbar } from "./components/navbar";
import { ThemeToggle } from "./components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SplashOverlay = dynamic(() => import("./components/SplashOverlay"), { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Images/pria-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/Images/pria-logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Timed splash overlay that fades out and routes to #about */}
        <SplashOverlay />
        <ThemeToggle />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
