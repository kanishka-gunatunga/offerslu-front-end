import type { Metadata } from "next";

import { LandingView } from "@/components/landing/landing-view";
import { getPublicSearchFiltersServer } from "@/lib/api/backend";
import { getSiteContent } from "@/lib/site/store";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: content.siteName,
    description:
      "Discover offers, bank promos, and seasonal deals across Sri Lanka — curated in one place.",
  };
}

export default async function Home() {
  const content = await getSiteContent();
  const apiFilters = await getPublicSearchFiltersServer();
  const fallbackFilters = {
    categories: content.categories.map((category) => category.name),
    offerTypes: Array.from(
      new Set(
        content.promotions
          .flatMap((promotion) => promotion.offerType.split(","))
          .map((item) => item.trim())
          .filter(Boolean),
      ),
    ),
    paymentTypes: ["Cash", "Card", "Nexus", "Vouchers"],
    banks: content.banks.map((bank) => bank.name),
  };
  return <LandingView content={content} searchFilters={apiFilters ?? fallbackFilters} />;
}
