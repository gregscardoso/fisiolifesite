"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { verifySession } from "@/lib/admin/dal";
import { saveContactContent } from "@/lib/site-data";

const schema = z.object({
  phone: z.string().trim().min(8, "Telefone muito curto."),
  phoneDisplay: z.string().trim().min(8, "Telefone muito curto."),
  whatsappMessage: z.string().trim().min(1, "Mensagem obrigatória."),
  email: z.email("E-mail inválido."),
  address: z.string().trim().min(1, "Endereço obrigatório."),
  addressDetail: z.string().trim(),
  city: z.string().trim().min(1, "Cidade obrigatória."),
  hoursWeekdays: z.string().trim().min(1),
  hoursSaturday: z.string().trim().min(1),
  hoursSunday: z.string().trim().min(1),
  instagram: z.string().trim(),
});

export interface ContactState {
  error?: string;
  success?: boolean;
}

export async function saveContact(_prevState: ContactState, formData: FormData): Promise<ContactState> {
  await verifySession();

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };

  try {
    await saveContactContent(parsed.data);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erro ao salvar." };
  }

  revalidatePath("/admin", "layout");
  return { success: true };
}
