import { getDraftContent } from "@/lib/site-data";
import { GalleryRow } from "./gallery-row";
import { AddGalleryForm } from "./add-gallery-form";

export default async function GaleriaPage() {
  const content = await getDraftContent();
  return (
    <div>
      <p className="text-sm text-[#66736C]">{content.gallery.length} fotos publicadas. Formatos JPG ou PNG, até 5 MB.</p>
      <div className="mt-8 max-w-xl space-y-4">
        {content.gallery.map((photo, index) => (
          <GalleryRow key={`${photo.src}-${index}`} index={index} photo={photo} />
        ))}
        <AddGalleryForm />
      </div>
    </div>
  );
}
