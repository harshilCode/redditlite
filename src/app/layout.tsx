import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "./_providers/ReactQueryProvider";
import SiteShell from "@/components/SiteShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Redditlite",
  description: "A Reddit clone built with Next.js and Tailwind CSS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en" className={geistSans.variable}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-accent`}
        >
          <SiteShell>{children}</SiteShell>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
