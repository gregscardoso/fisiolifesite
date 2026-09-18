"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

const stats = [
  { value: "+10", label: "anos de experiência" },
  { value: "+1.000", label: "pacientes atendidos" },
  { value: "98%", label: "de satisfação" },
];

const serifItalic = { fontFamily: "var(--font-instrument), Georgia, serif", fontWeight: 400, fontStyle: "italic" as const };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  return (
    <div className="grid min-h-screen text-[#1C2621]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))" }}>
      <section className="flex min-w-0 flex-col justify-center bg-[#F8FAF8] px-6 py-12 sm:px-12 sm:py-16">
        <div className="mx-auto w-full max-w-[420px]">
          <Link href="/" className="mb-8 inline-block sm:mb-11">
            <Image src="/images/brand/logo-fisiolife-verde.png" width={328} height={137} alt="Fisiolife Fisioterapia & Pilates" priority />
          </Link>

          <h1 className="text-[clamp(28px,3.4vw,38px)] font-extrabold leading-[1.1] tracking-[-0.035em] text-[#124D35]">
            Bem-vindo de <span style={serifItalic}>volta</span>.
          </h1>
          <p className="mt-3.5 text-base leading-relaxed text-[#66736C]">Acesse para gerenciar o conteúdo, os tratamentos e as tags do site.</p>

          {state.error && (
            <div className="mt-6 rounded-2xl border border-[rgba(178,58,58,0.22)] bg-[rgba(178,58,58,0.07)] px-4 py-3.5 text-sm font-semibold leading-relaxed text-[#96322F]">
              {state.error}
            </div>
          )}

          <form action={formAction} className="mt-7 flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-[12.5px] font-bold uppercase tracking-[0.08em] text-[#9AA6A0]">E-mail</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="voce@fisiolifepilates.com.br"
                className="w-full rounded-2xl border border-[rgba(28,38,33,0.14)] bg-white px-4 py-[15px] text-[15.5px] text-[#1C2621] transition focus:border-[#1E6848] focus:shadow-[0_0_0_4px_rgba(30,104,72,0.1)] focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-[12.5px] font-bold uppercase tracking-[0.08em] text-[#9AA6A0]">Senha</span>
              <span className="relative block">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-[rgba(28,38,33,0.14)] bg-white py-[15px] pl-4 pr-24 text-[15.5px] text-[#1C2621] transition focus:border-[#1E6848] focus:shadow-[0_0_0_4px_rgba(30,104,72,0.1)] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-[10px] px-2.5 py-2 text-[13px] font-bold text-[#1E6848] transition hover:bg-[#E8F1EC]"
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </span>
            </label>

            <div className="mt-0.5 flex flex-wrap items-center justify-between gap-3.5">
              <button type="button" onClick={() => setRemember((value) => !value)} className="flex items-center gap-2.5 text-[14.5px] font-semibold text-[#66736C]">
                <span
                  className="grid h-5 w-5 place-items-center rounded-[6px] border-[1.5px] text-xs font-extrabold text-white transition"
                  style={{ background: remember ? "#1E6848" : "#fff", borderColor: remember ? "#1E6848" : "rgba(28,38,33,0.2)" }}
                >
                  {remember && "✓"}
                </span>
                <span>Manter conectado</span>
              </button>
              <input type="hidden" name="remember" value={remember ? "on" : ""} />
              <a href="#recuperar" className="text-[14.5px] font-semibold text-[#1E6848] hover:text-[#124D35]">Esqueci minha senha</a>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="mt-2.5 w-full rounded-2xl px-6 py-[17px] text-[15.5px] font-bold text-white shadow-[0_14px_28px_-16px_rgba(18,77,53,0.65)] transition"
              style={{ background: pending ? "#3C7D5F" : "#124D35", cursor: pending ? "default" : "pointer" }}
            >
              {pending ? "Entrando…" : "Entrar no painel"}
            </button>
          </form>

          <div className="mt-7 flex items-center gap-2.5 border-t border-[rgba(28,38,33,0.08)] pt-5 text-[13.5px] leading-relaxed text-[#9AA6A0]">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#1E6848]" />
            <span>Conexão segura. Acesso restrito à equipe Fisiolife.</span>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-[#124D35] p-7 sm:p-11">
        <Image src="/images/hero/estudio-pilates-fisiolife.png" alt="Estúdio da Fisiolife" fill sizes="50vw" className="object-cover opacity-55" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(200deg, rgba(18,77,53,.55) 0%, rgba(18,77,53,.92) 78%)" }} />
        <div className="relative max-w-[480px] text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em]">Fisiolife · Ibiúna</span>
          <p className="mt-5 text-balance text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.32] tracking-[-0.025em]">
            Movimento, saúde e qualidade de vida — cuidados desde a <span style={serifItalic}>primeira</span> avaliação.
          </p>
          <div className="mt-7 flex flex-wrap gap-7">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-[25px] font-extrabold tracking-[-0.03em]">{stat.value}</div>
                <div className="mt-0.5 text-[13px] text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
