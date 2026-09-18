"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { verifySession } from "@/lib/admin/dal";
import { getDraftContent, saveGallery } from "@/lib/site-data";
import { uploadFile } from "@/lib/blob";
import { galleryLabels } from "@/lib/content";

const ratios = ["4 / 3", "3 / 4", "1 / 1"] as const;

const itemSchema = z.object({
  alt: z.string().trim().min(1, "Descrição (alt) obrigatória."),
  ratio: z.enum(ratios),
  label: z.enum(galleryLabels),
});

export interface GalleryState {
  error?: string;
  success?: boolean;
}

export async function updateGalleryItem(index: number, _prevState: GalleryState, formData: FormData): Promise<GalleryState> {
  await verifySession();
  const parsed = itemSchema.safeParse({ alt: formData.get("alt"), ratio: formData.get("ratio"), label: formData.get("label") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };

  const content = await getDraftContent();
  const gallery = [...content.gallery];
  if (!gallery[index]) return { error: "Item não encontrado." };

  let src = gallery[index].src;
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    const url = await uploadFile(file, "gallery");
    if (url) src = url;
  }

  gallery[index] = { src, alt: parsed.data.alt, ratio: parsed.data.ratio, label: parsed.data.label };

  try {
    await saveGallery(gallery);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erro ao salvar." };
  }

  revalidatePath("/admin", "layout");
  return { success: true };
}

export async function addGalleryItem(_prevState: GalleryState, formData: FormData): Promise<GalleryState> {
  await verifySession();
  const parsed = itemSchema.safeParse({ alt: formData.get("alt"), ratio: formData.get("ratio"), label: formData.get("label") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return { error: "Selecione uma foto." };

  const url = await uploadFile(file, "gallery");
  if (!url) return { error: "Falha ao enviar a imagem." };

  const content = await getDraftContent();
  const gallery = [...content.gallery, { src: url, alt: parsed.data.alt, ratio: parsed.data.ratio, label: parsed.data.label }];

  try {
    await saveGallery(gallery);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erro ao salvar." };
  }

  revalidatePath("/admin", "layout");
  return { success: true };
}

export async function removeGalleryItem(index: number) {
  await verifySession();
  const content = await getDraftContent();
  await saveGallery(content.gallery.filter((_, i) => i !== index));
  revalidatePath("/admin", "layout");
}
