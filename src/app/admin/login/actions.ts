"use server";

import { timingSafeEqual } from "node:crypto";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/admin/session";

export interface LoginState {
  error?: string;
}

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const remember = formData.get("remember") === "on";

  if (!email || !password) return { error: "Informe e-mail e senha para continuar." };
  if (!/.+@.+\..+/.test(email)) return { error: "O e-mail informado não parece válido." };

  const expectedEmail = process.env.ADMIN_EMAIL ?? "";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedEmail || !expectedPassword) return { error: "ADMIN_EMAIL ou ADMIN_PASSWORD não configurados no servidor." };

  const emailValid = email.toLowerCase() === expectedEmail.toLowerCase();

  const a = Buffer.from(password);
  const b = Buffer.from(expectedPassword);
  const passwordValid = a.length === b.length && timingSafeEqual(a, b);

  if (!emailValid || !passwordValid) return { error: "E-mail ou senha incorretos." };

  await createSession(remember);
  redirect("/admin");
}
