import "server-only";

import { getBackendOrigin, getPublicSiteContentServer } from "@/lib/api/backend";

import { defaultSiteContent } from "./default-content";
import type { SiteContent } from "./types";

export async function getSiteContent(): Promise<SiteContent> {
  const apiContent = await getPublicSiteContentServer();
  const backendOrigin = getBackendOrigin();
  const categories = (apiContent?.categories ?? [])
    .filter((c) => Boolean(c.id) && Boolean(c.name))
    .map((c) => ({
      id: c.id,
      name: c.name,
      imageUrl:
        c.bannerImageUrl && c.bannerImageUrl.trim().length > 0
          ? `${backendOrigin}${c.bannerImageUrl}`
          : "/hero-bg.png",
      offerCount: Number(c.offerCount ?? 0),
    }));
  const promotions = (apiContent?.promotions ?? [])
    .filter((p) => Boolean(p.id) && Boolean(p.title))
    .map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description?.trim() || "No description available.",
      bannerImageUrl:
        p.offerBannerImageUrl && p.offerBannerImageUrl.trim().length > 0
          ? `${backendOrigin}${p.offerBannerImageUrl}`
          : "/hero-bg.png",
      merchant: p.merchant?.trim() || "Unknown merchant",
      category: p.category?.trim() || "General",
      offerType: p.offerType?.trim() || "Promotion",
      startDate: p.startDate,
      endDate: p.endDate,
      daysLeft: p.daysLeft ?? null,
      detailHref: "#",
    }));
  const banks = (apiContent?.banks ?? [])
    .filter((b) => Boolean(b.id) && Boolean(b.name))
    .map((b) => ({
      id: b.id,
      name: b.name,
      logoUrl:
        b.logoUrl && b.logoUrl.trim().length > 0
          ? `${backendOrigin}${b.logoUrl}`
          : "/offerslu-logo.svg",
      offerCount: Number(b.offerCount ?? 0),
    }));

  return {
    ...defaultSiteContent,
    categories: apiContent ? categories : defaultSiteContent.categories,
    promotions: apiContent ? promotions : defaultSiteContent.promotions,
    banks: apiContent ? banks : defaultSiteContent.banks,
  };
}
