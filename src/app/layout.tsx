import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "./_providers/ReactQueryProvider";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
      <html lang="en" className={inter.className}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen ">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <main className="p-4">{children}</main>
          </div>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
