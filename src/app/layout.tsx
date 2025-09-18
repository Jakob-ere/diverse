import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Name — Portfolio",
  description: "Software Engineer & Builder. I craft reliable web apps with clean UX.",
  metadataBase: new URL("https://example.com"), // change to your domain when ready
  openGraph: {
    title: "Your Name — Portfolio",
    description: "Software Engineer & Builder. I craft reliable web apps with clean UX.",
    url: "https://example.com",
    siteName: "Your Name — Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name — Portfolio",
    description: "Software Engineer & Builder. I craft reliable web apps with clean UX.",
    creator: "@yourhandle",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // why: put dark on <html> for Tailwind's class strategy + allow client toggle to flip it
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100`}>
        <div className="min-h-dvh flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
