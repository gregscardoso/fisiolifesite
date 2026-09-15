import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { RevealEffects } from "@/components/reveal-effects";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { CTASection, GallerySection, LocationSection } from "@/sections/conversion-sections";
import { AboutSection, Hero, TrustBar } from "@/sections/intro-sections";
import { HistorySection, StatsSection, TestimonialsSection } from "@/sections/proof-sections";
import { ServicesSection, StructureSection, VideoSection } from "@/sections/services-sections";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Physiotherapy",
    name: siteConfig.name,
    url: siteConfig.domain,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.domain}/images/hero/estudio-pilates-fisiolife.png`,
    address: { "@type": "PostalAddress", streetAddress: siteConfig.address, addressLocality: "Ibiúna", addressRegion: "SP", addressCountry: "BR" },
    sameAs: [siteConfig.instagram],
  };
  return <>
    <Header />
    <main><Hero /><TrustBar /><AboutSection /><ServicesSection /><VideoSection /><StructureSection /><StatsSection /><HistorySection /><TestimonialsSection /><CTASection /><GallerySection /><LocationSection /></main>
    <Footer /><WhatsAppFloat /><RevealEffects />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
  </>;
}
