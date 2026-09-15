import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  weight: "400 800",
  display: "swap",
});
const instrumentSerif = localFont({
  src: [
    { path: "./fonts/instrument-serif-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-italic-latin.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: "Fisiolife | Fisioterapia e Pilates em Ibiúna",
  description: "Fisioterapia, Pilates, Quiropraxia e tratamentos especializados em Ibiúna. Conheça a Fisiolife e agende sua avaliação.",
  keywords: ["fisioterapia em Ibiúna", "Pilates em Ibiúna", "quiropraxia", "Pilates terapêutico", "Fisiolife"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Fisiolife | Fisioterapia e Pilates em Ibiúna",
    description: "Cuidado individualizado para mais movimento, saúde e qualidade de vida.",
    url: "/",
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/images/hero/estudio-pilates-fisiolife.png", width: 960, height: 745, alt: "Estúdio de Pilates da Fisiolife em Ibiúna" }],
  },
  twitter: { card: "summary_large_image", title: "Fisiolife | Fisioterapia e Pilates em Ibiúna", description: "Cuidado individualizado para mais movimento, saúde e qualidade de vida.", images: ["/images/hero/estudio-pilates-fisiolife.png"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#124d35" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
