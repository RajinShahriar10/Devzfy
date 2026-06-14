import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { prisma } from "@/lib/prisma";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SessionProvider } from "@/providers/SessionProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Particles } from "@/components/Particles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Devzfy | Modern Web Solutions",
    template: "%s | Devzfy",
  },
  description:
    "Next-gen web development agency crafting futuristic digital experiences with cutting-edge technology.",
  keywords: [
    "web development", "web design", "agency", "next.js", "react",
    "digital solutions", "student portfolio", "business website",
  ],
  openGraph: {
    title: "Devzfy | Modern Web Solutions",
    description:
      "Next-gen web development agency crafting futuristic digital experiences with cutting-edge technology.",
    type: "website",
    locale: "en_US",
    siteName: "Devzfy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devzfy | Modern Web Solutions",
    description:
      "Next-gen web development agency crafting futuristic digital experiences with cutting-edge technology.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://devzfy.vercel.app"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settingsList = await prisma.siteSetting.findMany();
  const settings: Record<string, string> = {};
  for (const s of settingsList) {
    settings[s.key] = s.value;
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <SessionProvider>
            <Particles />
            <Header />
            <main className="relative z-10">{children}</main>
            <Footer settings={settings} />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
