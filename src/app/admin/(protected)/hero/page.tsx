import { getDraftContent } from "@/lib/site-data";
import { HeroForm } from "./hero-form";

export default async function HeroPage() {
  const content = await getDraftContent();
  return (
    <div>
      <p className="text-sm text-[#66736C]">Texto e mídia da primeira seção do site.</p>
      <div className="mt-8">
        <HeroForm initial={content.hero} />
      </div>
    </div>
  );
}
