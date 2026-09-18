"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { verifySession } from "@/lib/admin/dal";
import { getDraftContent, saveTestimonials } from "@/lib/site-data";

const itemSchema = z.object({
  quote: z.string().trim().min(1, "Depoimento obrigatório."),
  name: z.string().trim().min(1, "Nome obrigatório."),
  meta: z.string().trim().min(1, "Informação complementar obrigatória."),
});

export interface TestimonialsState {
  error?: string;
  success?: boolean;
}

function initialsFor(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export async function updateTestimonial(index: number, _prevState: TestimonialsState, formData: FormData): Promise<TestimonialsState> {
  await verifySession();
  const parsed = itemSchema.safeParse({ quote: formData.get("quote"), name: formData.get("name"), meta: formData.get("meta") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };

  const content = await getDraftContent();
  const testimonials = [...content.testimonials];
  if (!testimonials[index]) return { error: "Item não encontrado." };

  testimonials[index] = { ...testimonials[index], ...parsed.data, initials: initialsFor(parsed.data.name) };

  try {
    await saveTestimonials(testimonials);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erro ao salvar." };
  }

  revalidatePath("/admin", "layout");
  return { success: true };
}

export async function addTestimonial(_prevState: TestimonialsState, formData: FormData): Promise<TestimonialsState> {
  await verifySession();
  const parsed = itemSchema.safeParse({ quote: formData.get("quote"), name: formData.get("name"), meta: formData.get("meta") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };

  const content = await getDraftContent();
  const testimonials = [...content.testimonials, { ...parsed.data, initials: initialsFor(parsed.data.name), published: true }];

  try {
    await saveTestimonials(testimonials);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erro ao salvar." };
  }

  revalidatePath("/admin", "layout");
  return { success: true };
}

export async function removeTestimonial(index: number) {
  await verifySession();
  const content = await getDraftContent();
  await saveTestimonials(content.testimonials.filter((_, i) => i !== index));
  revalidatePath("/admin", "layout");
}

export async function toggleTestimonialPublished(index: number) {
  await verifySession();
  const content = await getDraftContent();
  const testimonials = [...content.testimonials];
  if (!testimonials[index]) return;
  testimonials[index] = { ...testimonials[index], published: !testimonials[index].published };
  await saveTestimonials(testimonials);
  revalidatePath("/admin", "layout");
}
