import type { Metadata } from "next";

import { LandingView } from "@/components/landing/landing-view";
import { ServiceUnavailableScreen } from "@/components/site/service-unavailable-screen";
import { getPublicSearchFiltersServer } from "@/lib/api/backend";
import { getSiteContent } from "@/lib/site/store";

const defaultDescription =
  "Discover offers, bank promos, and seasonal deals across Sri Lanka — curated in one place.";

export async function generateMetadata(): Promise<Metadata> {
  const result = await getSiteContent();
  if (!result.ok) {
    return {
      title: "Offerslu.lk",
      description: defaultDescription,
    };
  }
  return {
    title: result.content.siteName,
    description: defaultDescription,
  };
}

export default async function Home() {
  const result = await getSiteContent();
  if (!result.ok) {
    return <ServiceUnavailableScreen />;
  }
  const content = result.content;
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
