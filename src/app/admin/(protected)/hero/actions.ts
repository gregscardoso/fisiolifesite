"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { verifySession } from "@/lib/admin/dal";
import { saveHeroContent, type HeroContent } from "@/lib/site-data";
import { uploadFile } from "@/lib/blob";

const schema = z.object({
  eyebrow: z.string().trim().min(1, "Campo obrigatório."),
  titlePrefix: z.string().trim().min(1, "Campo obrigatório."),
  titleEmphasis: z.string().trim().min(1, "Campo obrigatório."),
  subtitle: z.string().trim().min(1, "Campo obrigatório."),
});

export interface HeroState {
  error?: string;
  success?: boolean;
}

export async function saveHero(_prevState: HeroState, formData: FormData): Promise<HeroState> {
  await verifySession();

  const parsed = schema.safeParse({
    eyebrow: formData.get("eyebrow"),
    titlePrefix: formData.get("titlePrefix"),
    titleEmphasis: formData.get("titleEmphasis"),
    subtitle: formData.get("subtitle"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };

  const posterFile = formData.get("posterImage");
  const videoFile = formData.get("videoFile");

  try {
    const update: Partial<HeroContent> = { ...parsed.data };
    if (posterFile instanceof File && posterFile.size > 0) {
      const url = await uploadFile(posterFile, "hero");
      if (url) update.posterImage = url;
    }
    if (videoFile instanceof File && videoFile.size > 0) {
      const url = await uploadFile(videoFile, "hero");
      if (url) update.videoUrl = url;
    }
    await saveHeroContent(update);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erro ao salvar." };
  }

  revalidatePath("/admin", "layout");
  return { success: true };
}
