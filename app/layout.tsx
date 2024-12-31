import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FooterMenu } from "@/components/footer-menu";
import { MovieProvider } from "@/context/MovieContext";
import { Toaster } from "@/components/ui/sonner";
import { SettingsProvider } from "@/context/SettingsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "cinema-shedule",
  description: "Cinema Shedule",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SettingsProvider>
          <MovieProvider>
            <main className="container mx-auto p-4">
              {children}
            </main>
            <Toaster />
            <FooterMenu />
          </MovieProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
