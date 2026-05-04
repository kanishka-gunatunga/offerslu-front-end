import "server-only";

import {
  getBackendOrigin,
  getPublicPromotionsByCategoryServer,
  getPublicSiteContentServer,
} from "@/lib/api/backend";

import { defaultSiteContent } from "./default-content";
import type { SiteContent } from "./types";

export type GetSiteContentResult =
  | { ok: true; content: SiteContent }
  | { ok: false };

export async function getSiteContent(): Promise<GetSiteContentResult> {
  const [apiContent, clothingRaw, foodRaw] = await Promise.all([
    getPublicSiteContentServer(),
    getPublicPromotionsByCategoryServer("Fashion & Clothing"),
    getPublicPromotionsByCategoryServer("Food & Dining"),
  ]);

  if (!apiContent) {
    return { ok: false };
  }

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
  const mapPromotion = (p: {
    id: string;
    title: string;
    description: string | null;
    offerBannerImageUrl: string | null;
    merchant: string | null;
    category: string | null;
    offerType: string | null;
    startDate: string;
    endDate: string;
    daysLeft: number | null;
  }) => ({
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
    detailHref: `/promotions/${p.id}`,
  });

  const allLatestPromotions = (apiContent?.promotions ?? [])
    .filter((p) => Boolean(p.id) && Boolean(p.title))
    .map(mapPromotion);
  const clothingPromotions = (clothingRaw ?? [])
    .filter((p) => Boolean(p.id) && Boolean(p.title))
    .map(mapPromotion);
  const foodPromotions = (foodRaw ?? [])
    .filter((p) => Boolean(p.id) && Boolean(p.title))
    .map(mapPromotion);
  const categoryPromotionIds = new Set([
    ...clothingPromotions.map((p) => p.id),
    ...foodPromotions.map((p) => p.id),
  ]);
  const dedupedLatestPromotions = allLatestPromotions.filter((p) => !categoryPromotionIds.has(p.id));
  // Prefer variety across sections; if dedupe leaves too few cards, keep latest unfiltered.
  const promotions = dedupedLatestPromotions.length >= 3 ? dedupedLatestPromotions : allLatestPromotions;
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
    ok: true,
    content: {
      ...defaultSiteContent,
      categories,
      promotions,
      clothingPromotions: clothingRaw ? clothingPromotions : defaultSiteContent.clothingPromotions,
      foodPromotions: foodRaw ? foodPromotions : defaultSiteContent.foodPromotions,
      banks,
    },
  };
}
