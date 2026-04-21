export type Id = string;

export interface Category {
  id: Id;
  name: string;
  imageUrl: string;
}

export interface Bank {
  id: Id;
  name: string;
  /** Square logo URL; can be initials service or uploaded asset later */
  logoUrl: string;
}

export interface Promotion {
  id: Id;
  title: string;
  description: string;
  bannerImageUrl: string;
  providerName: string;
  providerLogoUrl: string;
  categoryLabel: string;
  offerTypeLabel: string;
  validUntilLabel: string;
  detailHref: string;
}

export interface PromotionSection {
  id: Id;
  title: string;
  subtitle?: string;
  promotionIds: Id[];
}

export interface SocialLink {
  id: Id;
  platform: string;
  icon: "facebook" | "instagram" | "x" | "youtube" | "linkedin";
  url: string;
}

export interface StatBadge {
  value: string;
  label: string;
}

export interface AboutContent {
  headline: string;
  subheadline: string;
  paragraphs: string[];
  collageImageUrls: [string, string, string, string];
  stats: [StatBadge, StatBadge, StatBadge];
}

export interface HeroContent {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  searchPlaceholder: string;
}

export interface SiteContent {
  siteName: string;
  hero: HeroContent;
  categories: Category[];
  promotionSections: PromotionSection[];
  promotions: Promotion[];
  banks: Bank[];
  about: AboutContent;
  socialLinks: SocialLink[];
}
