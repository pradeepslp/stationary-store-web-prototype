import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import ThemeSync from "@/components/ThemeSync";
import { prisma } from "@/lib/prisma";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kavya Fancy Store | Fine Stationery",
  description: "A small fancy stationery store. Browse our curated collection.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

async function getBackgroundImage() {
  try {
    const setting = await prisma.settings.findUnique({
      where: { key: "background_image" },
    });
    return setting?.value || null;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const backgroundImage = await getBackgroundImage();

  return (
    <html lang="en" className={`${cormorant.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        {/* Global Background Layer */}
        {backgroundImage && (
          <div className="fixed inset-0 z-[-10] overflow-hidden">
            <Image
              src={backgroundImage}
              alt="Background"
              fill
              priority
              quality={75}
              className="object-cover blur-[3px] opacity-70"
            />

            {/* Transparent overlay to keep content readable - uses CSS var for theming */}
            <div className="absolute inset-0" style={{ backgroundColor: "var(--background-overlay)" }} />

            {/* ThemeSync runs client-side only (useEffect) to avoid hydration mismatch */}
            <ThemeSync image={backgroundImage} />
          </div>
        )}
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
