"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { verifySession } from "@/lib/admin/dal";
import { getDraftContent, saveServices } from "@/lib/site-data";
import { uploadFile } from "@/lib/blob";

const itemSchema = z.object({
  name: z.string().trim().min(1, "Nome obrigatório."),
  description: z.string().trim().min(1, "Descrição obrigatória."),
});

export interface ServicesState {
  error?: string;
  success?: boolean;
}

export async function updateService(index: number, _prevState: ServicesState, formData: FormData): Promise<ServicesState> {
  await verifySession();
  const parsed = itemSchema.safeParse({ name: formData.get("name"), description: formData.get("description") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };

  const content = await getDraftContent();
  const services = [...content.services];
  if (!services[index]) return { error: "Item não encontrado." };

  let image = services[index].image;
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    const url = await uploadFile(file, "services");
    if (url) image = url;
  }

  services[index] = { ...services[index], name: parsed.data.name, description: parsed.data.description, image };

  try {
    await saveServices(services);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erro ao salvar." };
  }

  revalidatePath("/admin", "layout");
  return { success: true };
}

export async function addService(_prevState: ServicesState, formData: FormData): Promise<ServicesState> {
  await verifySession();
  const parsed = itemSchema.safeParse({ name: formData.get("name"), description: formData.get("description") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return { error: "Selecione uma imagem para o novo serviço." };

  const url = await uploadFile(file, "services");
  if (!url) return { error: "Falha ao enviar a imagem." };

  const content = await getDraftContent();
  const services = [...content.services, { name: parsed.data.name, description: parsed.data.description, image: url, published: true }];

  try {
    await saveServices(services);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erro ao salvar." };
  }

  revalidatePath("/admin", "layout");
  return { success: true };
}

export async function removeService(index: number) {
  await verifySession();
  const content = await getDraftContent();
  await saveServices(content.services.filter((_, i) => i !== index));
  revalidatePath("/admin", "layout");
}

export async function moveService(index: number, direction: -1 | 1) {
  await verifySession();
  const content = await getDraftContent();
  const services = [...content.services];
  const target = index + direction;
  if (target < 0 || target >= services.length) return;
  [services[index], services[target]] = [services[target], services[index]];
  await saveServices(services);
  revalidatePath("/admin", "layout");
}

export async function toggleServicePublished(index: number) {
  await verifySession();
  const content = await getDraftContent();
  const services = [...content.services];
  if (!services[index]) return;
  services[index] = { ...services[index], published: !services[index].published };
  await saveServices(services);
  revalidatePath("/admin", "layout");
}
