import raw from '../data/data.json' with { type: 'json' };
import type { CatListing } from './cat';

// ── Derived types ────────────────────────────────────────────────────────────

type RawData = typeof raw;

export type CtaItem = RawData['home']['hero']['cta'][number];
export type ServiceItem = RawData['home']['services']['items'][number];
export type ProcessStep = RawData['adopt']['processSteps']['steps'][number];
export type FaqGroup = RawData['adopt']['faq']['groups'][number];
export type FaqItem = FaqGroup['items'][number];

export type DonateOption = RawData['donate']['amounts']['options'][number];
export type OtherWayItem = RawData['donate']['otherWays']['items'][number];

export type ContactField = RawData['contact']['form']['fields'][number];
export type ContactInfoItem = RawData['contact']['info']['items'][number];
export type ContactFaqItem = RawData['contact']['faq']['items'][number];

export type BoardMember = RawData['about']['board']['members'][number];

export type FosterWhatYouProvideItem = RawData['foster']['whatYouProvide']['items'][number];
export type FosterWhatWeProvideItem = RawData['foster']['whatWeProvide']['items'][number];

export type CatFilters = RawData['catFilters'];

export type HomeData = {
  featuredCats: CatListing[];
  hero: RawData['home']['hero'];
  about: RawData['home']['about'];
  services: RawData['home']['services'];
  adoptTeaser: RawData['home']['adoptTeaser'];
  footerCta: RawData['home']['footerCta'];
};

export type AdoptData = {
  cats: CatListing[];
  catFilters: CatFilters;
  pageHeader: RawData['adopt']['pageHeader'];
  processSteps: RawData['adopt']['processSteps'];
  faq: RawData['adopt']['faq'];
  footerCta: RawData['adopt']['footerCta'];
};

export type CatDetailData = {
  cats: CatListing[];
  footerCta: RawData['catDetail']['footerCta'];
};

export type DonateData = RawData['donate'];

export type ContactData = RawData['contact'];

export type AboutData = RawData['about'];

export type FosterData = RawData['foster'];

export type FooterData = RawData['footer'];

export type NotFoundData = RawData['notFound'];

export type PrivacyData = RawData['privacy'];

// ── Helpers ──────────────────────────────────────────────────────────────────

const allCats = raw.cats as CatListing[];

// The seed data includes a blank placeholder record (id "0000") used to pad
// early development. Filter it out once, here, so no page has to guard
// against an empty cat downstream.
const realCats = allCats.filter((cat) => cat.name !== '');

const findCatById = (id: string): CatListing | undefined =>
  realCats.find((cat) => cat.id === id);

const featuredCats: CatListing[] = raw.featuredCats
  .map(({ id }) => findCatById(id))
  .filter((cat): cat is CatListing => Boolean(cat));

// ── Exports ──────────────────────────────────────────────────────────────────

export const homeData: HomeData = {
  featuredCats,
  hero: raw.home.hero,
  about: raw.home.about,
  services: raw.home.services,
  adoptTeaser: raw.home.adoptTeaser,
  footerCta: raw.home.footerCta,
};

export const adoptData: AdoptData = {
  cats: realCats,
  catFilters: raw.catFilters,
  pageHeader: raw.adopt.pageHeader,
  processSteps: raw.adopt.processSteps,
  faq: raw.adopt.faq,
  footerCta: raw.adopt.footerCta,
};

// Reuses realCats rather than re-deriving anything — the individual cat
// page just needs the full list to find one record by :id at render time.
export const catDetailData: CatDetailData = {
  cats: realCats,
  footerCta: raw.catDetail.footerCta,
};

export const donateData: DonateData = raw.donate;

export const contactData: ContactData = raw.contact;

export const aboutData: AboutData = raw.about;

export const fosterData: FosterData = raw.foster;

export const footerData: FooterData = raw.footer;

export const notFoundData: NotFoundData = raw.notFound;

export const privacyData: PrivacyData = raw.privacy;