import raw from '../data/data.json' with { type: 'json' };
import type { CatListing } from './cat';

// ── Derived types ────────────────────────────────────────────────────────────

type RawData = typeof raw;

export type CtaItem = RawData['home']['hero']['cta'][number];
export type ServiceItem = RawData['home']['services']['items'][number];
export type ProcessStep = RawData['adopt']['processSteps']['steps'][number];
export type FaqGroup = RawData['adopt']['faq']['groups'][number];
export type FaqItem = FaqGroup['items'][number];

export type HomeData = {
  featuredCats: CatListing[];
  hero: RawData['home']['hero'];
  about: RawData['home']['about'];
  services: RawData['home']['services'];
  adoptTeaser: RawData['home']['adoptTeaser'];
  finalCta: RawData['home']['finalCta'];
};

export type AdoptData = {
  cats: CatListing[];
  pageHeader: RawData['adopt']['pageHeader'];
  processSteps: RawData['adopt']['processSteps'];
  faq: RawData['adopt']['faq'];
  footerCta: RawData['adopt']['footerCta'];
};

export type NotFoundData = RawData['notFound'];

// ── Exports ──────────────────────────────────────────────────────────────────

export const homeData: HomeData = {
  featuredCats: raw.featuredCats as CatListing[],
  hero: raw.home.hero,
  about: raw.home.about,
  services: raw.home.services,
  adoptTeaser: raw.home.adoptTeaser,
  finalCta: raw.home.finalCta,
};

export const adoptData: AdoptData = {
  cats: raw.cats as CatListing[],
  pageHeader: raw.adopt.pageHeader,
  processSteps: raw.adopt.processSteps,
  faq: raw.adopt.faq,
  footerCta: raw.adopt.footerCta,
};

export const notFoundData: NotFoundData = raw.notFound;