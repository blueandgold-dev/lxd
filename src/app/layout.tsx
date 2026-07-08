import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactionsProvider } from "@/components/blog/ReactionsProvider";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learning Experience Design",
  description:
    "A modern blog about Learning Experience Design, learner-centered teaching, AI-assisted course creation, and practical teaching strategies.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ReactionsProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </ReactionsProvider>
      </body>
    </html>
  );
}
