import type { Metadata } from "next";
import Link from "next/link";
import { Open_Sans } from "next/font/google";
import { Suspense } from "react";

import { HeroSection } from "@/components/landing/hero-section";
import { SearchResultsHashScroll } from "@/components/landing/search-results-hash-scroll";
import { SEARCH_RESULTS_SECTION_ID } from "@/lib/site/search-results-anchor";
import { LandingFooter } from "@/components/landing/landing-footer";
import { PromotionCard } from "@/components/landing/promotion-card";
import { SiteHeader } from "@/components/landing/site-header";
import {
  getBackendOrigin,
  getPublicSearchFiltersServer,
  searchPublicPromotionsServer,
  type PublicSitePromotionResponse,
} from "@/lib/api/backend";
import { ServiceUnavailableScreen } from "@/components/site/service-unavailable-screen";
import { getSiteContent } from "@/lib/site/store";
import type { Promotion } from "@/lib/site/types";

const openSans = Open_Sans({
  weight: ["600"],
  subsets: ["latin"],
});

interface SearchParams {
  q?: string;
  categories?: string;
  offerTypes?: string;
  paymentTypes?: string;
  banks?: string;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;
  const q = params.q?.trim();
  const headingTerm = q || buildFilterLabel({
    categories: splitCsvParam(params.categories),
    offerTypes: splitCsvParam(params.offerTypes),
    paymentTypes: splitCsvParam(params.paymentTypes),
    banks: splitCsvParam(params.banks),
  });
  return {
    title: headingTerm ? `Search Results "${headingTerm}"` : "Search Results",
  };
}

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const site = await getSiteContent();
  if (!site.ok) {
    return <ServiceUnavailableScreen />;
  }
  const content = site.content;

  const q = params.q?.trim() ?? "";
  const categories = splitCsvParam(params.categories);
  const offerTypes = splitCsvParam(params.offerTypes);
  const paymentTypes = splitCsvParam(params.paymentTypes);
  const banks = splitCsvParam(params.banks);
  const headingTerm = q || buildFilterLabel({ categories, offerTypes, paymentTypes, banks });
  const hasActiveFilters =
    q.length > 0 || categories.length > 0 || offerTypes.length > 0 || paymentTypes.length > 0 || banks.length > 0;

  const backendResults = await searchPublicPromotionsServer({
    q,
    categories,
    offerTypes,
    paymentTypes,
    banks,
  });

  const uiResults = (backendResults ?? []).map(mapPublicPromotionToUi);
  const usedSearchFallback = backendResults === null;
  const results = backendResults ? uiResults : filterLocally(content.promotions, q, categories, offerTypes);

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
  const searchFilterOptions = apiFilters ?? fallbackFilters;

  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-white text-slate-900">
      <SiteHeader siteName={content.siteName} />
      <main className="flex-1">
        <Suspense fallback={null}>
          <SearchResultsHashScroll />
        </Suspense>
        <HeroSection
          key={`search-hero-${q}-${categories.join("|")}-${offerTypes.join("|")}-${paymentTypes.join("|")}-${banks.join("|")}`}
          hero={content.hero}
          searchFilters={searchFilterOptions}
          initialQuery={q}
          initialSelectedFilters={{ categories, offerTypes, paymentTypes, banks }}
          submitPath="/search-results"
        />
        <section
          id={SEARCH_RESULTS_SECTION_ID}
          className="scroll-mt-20 py-10 sm:scroll-mt-24"
        >
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2
                className={`${openSans.className} text-[clamp(1rem,2.2vw,1.5rem)] font-semibold leading-6 tracking-normal text-black`}
              >
                Search Results{headingTerm ? ` “${headingTerm}”` : ""}
              </h2>
              {hasActiveFilters ? (
                <Link
                  href={`/search-results#${SEARCH_RESULTS_SECTION_ID}`}
                  className={`${openSans.className} inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50`}
                >
                  Clear filters
                </Link>
              ) : null}
            </div>
            <p
              className={`${openSans.className} mt-2 text-[clamp(0.95rem,2.1vw,1.1875rem)] font-semibold leading-6 tracking-normal text-[#787878]`}
            >
              Find offers that match your interests
            </p>

            {usedSearchFallback ? (
              <p
                className={`${openSans.className} mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm font-medium text-amber-950`}
                role="status"
              >
                Live search is temporarily unavailable. Results below use highlights from the site until the
                connection is restored.
              </p>
            ) : null}

            {results.length > 0 ? (
              <div className="mt-10 flex flex-wrap justify-start gap-4">
                {results.map((promotion) => (
                  <PromotionCard key={promotion.id} promotion={promotion} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
                No offers found for your current search.
              </div>
            )}
          </div>
        </section>
      </main>
      <LandingFooter siteName={content.siteName} />
    </div>
  );
}

function splitCsvParam(value?: string): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildFilterLabel(filters: {
  categories: string[];
  offerTypes: string[];
  paymentTypes: string[];
  banks: string[];
}): string {
  const merged = [
    ...filters.categories,
    ...filters.offerTypes,
    ...filters.paymentTypes,
    ...filters.banks,
  ];
  const unique = Array.from(new Set(merged.map((item) => item.trim()).filter(Boolean)));
  if (unique.length === 0) return "";
  return unique.join(", ");
}

function mapPublicPromotionToUi(p: PublicSitePromotionResponse): Promotion {
  const backendOrigin = getBackendOrigin();
  return {
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
  };
}

function filterLocally(
  promotions: Promotion[],
  q: string,
  categories: string[],
  offerTypes: string[],
): Promotion[] {
  return promotions.filter((promotion) => {
    const qMatch =
      q.length === 0 ||
      `${promotion.title} ${promotion.description} ${promotion.merchant} ${promotion.category} ${promotion.offerType}`
        .toLowerCase()
        .includes(q.toLowerCase());

    const categoryMatch =
      categories.length === 0 ||
      categories.some((category) =>
        promotion.category.toLowerCase().includes(category.toLowerCase()),
      );
    const offerTypeMatch =
      offerTypes.length === 0 ||
      offerTypes.some((offerType) =>
        promotion.offerType.toLowerCase().includes(offerType.toLowerCase()),
      );
    return qMatch && categoryMatch && offerTypeMatch;
  });
}
