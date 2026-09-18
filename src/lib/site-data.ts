import "server-only";
import { cache } from "react";
import { getRedis } from "./redis";
import { siteConfig } from "./site-config";
import { services as defaultServices, testimonials as defaultTestimonials, gallery as defaultGallery, type Service, type Testimonial, type GalleryPhoto } from "./content";

export type { GalleryPhoto };

const CONTENT_DRAFT_KEY = "site:content:draft";
const CONTENT_PUBLISHED_KEY = "site:content:published";
const TAGS_DRAFT_KEY = "site:tags:draft";
const TAGS_PUBLISHED_KEY = "site:tags:published";
const META_KEY = "site:meta";

export interface HeroContent {
  eyebrow: string;
  titlePrefix: string;
  titleEmphasis: string;
  subtitle: string;
  posterImage: string;
  videoUrl: string;
}

export interface ContactContent {
  phone: string;
  phoneDisplay: string;
  whatsappMessage: string;
  email: string;
  address: string;
  addressDetail: string;
  city: string;
  hoursWeekdays: string;
  hoursSaturday: string;
  hoursSunday: string;
  instagram: string;
}

export interface SiteContentData {
  contact: ContactContent;
  hero: HeroContent;
  services: Service[];
  testimonials: Testimonial[];
  gallery: GalleryPhoto[];
}

export interface TagsConfig {
  ga4Id: string;
  ga4Enabled: boolean;
  gtmId: string;
  gtmEnabled: boolean;
  metaPixelId: string;
  metaPixelEnabled: boolean;
  consentBannerEnabled: boolean;
}

export interface SiteMeta {
  publishedAt: number | null;
}

const defaultContact: ContactContent = {
  phone: siteConfig.phone,
  phoneDisplay: siteConfig.phoneDisplay,
  whatsappMessage: siteConfig.whatsappMessage,
  email: siteConfig.email,
  address: siteConfig.address,
  addressDetail: siteConfig.addressDetail,
  city: siteConfig.city,
  hoursWeekdays: siteConfig.hours.weekdays,
  hoursSaturday: siteConfig.hours.saturday,
  hoursSunday: "Fechado",
  instagram: siteConfig.instagram,
};

const defaultHero: HeroContent = {
  eyebrow: "Fisioterapia & Pilates em Ibiúna",
  titlePrefix: "Movimento, saúde e qualidade de vida ",
  titleEmphasis: "começam aqui.",
  subtitle: "A Fisiolife reúne fisioterapia, Pilates, quiropraxia e terapias alternativas em um atendimento individualizado, com avaliação personalizada e uma equipe que acompanha cada etapa da sua recuperação.",
  posterImage: "/images/hero/estudio-pilates-fisiolife.png",
  videoUrl: "/videos/hero-tour-fisiolife.mp4",
};

const defaultTags: TagsConfig = {
  ga4Id: "",
  ga4Enabled: false,
  gtmId: "",
  gtmEnabled: false,
  metaPixelId: "",
  metaPixelEnabled: false,
  consentBannerEnabled: false,
};

function defaultContentDoc(): SiteContentData {
  return {
    contact: defaultContact,
    hero: defaultHero,
    services: defaultServices,
    testimonials: defaultTestimonials,
    gallery: defaultGallery,
  };
}

function mergeContent(base: SiteContentData, stored: Partial<SiteContentData> | null): SiteContentData {
  if (!stored) return base;
  return {
    contact: { ...base.contact, ...stored.contact },
    hero: { ...base.hero, ...stored.hero },
    services: stored.services?.length ? stored.services : base.services,
    testimonials: stored.testimonials?.length ? stored.testimonials : base.testimonials,
    gallery: stored.gallery?.length ? stored.gallery : base.gallery,
  };
}

async function getDoc<T>(key: string, fallback: T): Promise<T> {
  const redis = getRedis();
  if (!redis) return fallback;
  try {
    const stored = await redis.get<T>(key);
    return stored ?? fallback;
  } catch (error) {
    logIfUnexpected(error, `Falha ao ler ${key} do Redis, usando valores padrão.`);
    return fallback;
  }
}

function logIfUnexpected(error: unknown, message: string) {
  const digest = (error as { digest?: string } | null)?.digest;
  if (digest === "DYNAMIC_SERVER_USAGE") return;
  console.error(message, error);
}

function requireRedis() {
  const redis = getRedis();
  if (!redis) throw new Error("Redis não configurado. Defina KV_REST_API_URL e KV_REST_API_TOKEN.");
  return redis;
}

// --- Lido pelo site público (sempre a versão publicada) ---

export const getSiteContent = cache(async (): Promise<SiteContentData> => {
  const base = defaultContentDoc();
  const stored = await getDoc<Partial<SiteContentData> | null>(CONTENT_PUBLISHED_KEY, null);
  return mergeContent(base, stored);
});

export const getTagsConfig = cache(async (): Promise<TagsConfig> => {
  const stored = await getDoc<Partial<TagsConfig> | null>(TAGS_PUBLISHED_KEY, null);
  return { ...defaultTags, ...stored };
});

// --- Lido só dentro do /admin (sempre o rascunho) ---

export const getDraftContent = cache(async (): Promise<SiteContentData> => {
  const base = defaultContentDoc();
  const stored = await getDoc<Partial<SiteContentData> | null>(CONTENT_DRAFT_KEY, null);
  return mergeContent(base, stored);
});

export const getDraftTags = cache(async (): Promise<TagsConfig> => {
  const stored = await getDoc<Partial<TagsConfig> | null>(TAGS_DRAFT_KEY, null);
  return { ...defaultTags, ...stored };
});

export const getSiteMeta = cache(async (): Promise<SiteMeta> => {
  return getDoc<SiteMeta>(META_KEY, { publishedAt: null });
});

export const isDirty = cache(async (): Promise<boolean> => {
  const [draftContent, publishedContent, draftTags, publishedTags] = await Promise.all([
    getDoc<Partial<SiteContentData> | null>(CONTENT_DRAFT_KEY, null),
    getDoc<Partial<SiteContentData> | null>(CONTENT_PUBLISHED_KEY, null),
    getDoc<Partial<TagsConfig> | null>(TAGS_DRAFT_KEY, null),
    getDoc<Partial<TagsConfig> | null>(TAGS_PUBLISHED_KEY, null),
  ]);
  if (!draftContent && !draftTags) return false;
  return JSON.stringify(draftContent) !== JSON.stringify(publishedContent) || JSON.stringify(draftTags) !== JSON.stringify(publishedTags);
});

// --- Escrita: sempre no rascunho ---

async function saveDraftContent(partial: Partial<SiteContentData>) {
  const redis = requireRedis();
  const current = (await redis.get<Partial<SiteContentData>>(CONTENT_DRAFT_KEY)) ?? {};
  await redis.set(CONTENT_DRAFT_KEY, { ...current, ...partial });
}

export async function saveContactContent(partial: Partial<ContactContent>) {
  const redis = requireRedis();
  const current = (await redis.get<Partial<SiteContentData>>(CONTENT_DRAFT_KEY)) ?? {};
  await redis.set(CONTENT_DRAFT_KEY, { ...current, contact: { ...current.contact, ...partial } });
}

export async function saveHeroContent(partial: Partial<HeroContent>) {
  const redis = requireRedis();
  const current = (await redis.get<Partial<SiteContentData>>(CONTENT_DRAFT_KEY)) ?? {};
  await redis.set(CONTENT_DRAFT_KEY, { ...current, hero: { ...current.hero, ...partial } });
}

export async function saveServices(services: Service[]) {
  await saveDraftContent({ services });
}

export async function saveTestimonials(testimonials: Testimonial[]) {
  await saveDraftContent({ testimonials });
}

export async function saveGallery(gallery: GalleryPhoto[]) {
  await saveDraftContent({ gallery });
}

export async function saveTagsConfig(partial: Partial<TagsConfig>) {
  const redis = requireRedis();
  const current = (await redis.get<Partial<TagsConfig>>(TAGS_DRAFT_KEY)) ?? {};
  await redis.set(TAGS_DRAFT_KEY, { ...current, ...partial });
}

export async function publishAllChanges() {
  const redis = requireRedis();
  const [draftContent, draftTags] = await Promise.all([
    redis.get<Partial<SiteContentData>>(CONTENT_DRAFT_KEY),
    redis.get<Partial<TagsConfig>>(TAGS_DRAFT_KEY),
  ]);
  await Promise.all([
    redis.set(CONTENT_PUBLISHED_KEY, draftContent ?? {}),
    redis.set(TAGS_PUBLISHED_KEY, draftTags ?? {}),
    redis.set(META_KEY, { publishedAt: Date.now() } satisfies SiteMeta),
  ]);
}

export function whatsappUrlFor(contact: ContactContent, message: string = contact.whatsappMessage) {
  return `https://wa.me/${contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
