"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { verifySession } from "@/lib/admin/dal";
import { saveTagsConfig } from "@/lib/site-data";

const schema = z.object({
  ga4Id: z.string().trim(),
  ga4Enabled: z.boolean(),
  gtmId: z.string().trim(),
  gtmEnabled: z.boolean(),
  metaPixelId: z.string().trim(),
  metaPixelEnabled: z.boolean(),
  consentBannerEnabled: z.boolean(),
});

export interface TagsState {
  error?: string;
  success?: boolean;
}

export async function saveTags(_prevState: TagsState, formData: FormData): Promise<TagsState> {
  await verifySession();

  const parsed = schema.safeParse({
    ga4Id: formData.get("ga4Id") ?? "",
    ga4Enabled: formData.get("ga4Enabled") === "on",
    gtmId: formData.get("gtmId") ?? "",
    gtmEnabled: formData.get("gtmEnabled") === "on",
    metaPixelId: formData.get("metaPixelId") ?? "",
    metaPixelEnabled: formData.get("metaPixelEnabled") === "on",
    consentBannerEnabled: formData.get("consentBannerEnabled") === "on",
  });

  if (!parsed.success) return { error: "Dados inválidos." };

  try {
    await saveTagsConfig(parsed.data);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erro ao salvar." };
  }

  revalidatePath("/admin", "layout");
  return { success: true };
}
