import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-tools-catalog.vercel.app'),
  title: {
    default: "ToolNest - Discover the Best AI Tools",
    template: "%s | ToolNest",
  },
  description: "A curated directory of the best AI tools, chatbots, image generators, and more. Find the perfect AI tool for your workflow.",
  keywords: ["AI tools", "artificial intelligence", "chatbots", "image generation", "productivity tools", "software directory"],
  authors: [{ name: "ToolNest Team" }],
  creator: "ToolNest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-tools-catalog.vercel.app",
    title: "ToolNest - Discover the Best AI Tools",
    description: "A curated directory of the best AI tools, chatbots, image generators, and more.",
    siteName: "ToolNest",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolNest - Discover the Best AI Tools",
    description: "Find the perfect AI tool for your workflow in our curated directory.",
    creator: "@toolnest",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col antialiased")} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
