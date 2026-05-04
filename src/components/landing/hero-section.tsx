"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Aboreto, Audiowide, Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";

import { SEARCH_RESULTS_SECTION_ID } from "@/lib/site/search-results-anchor";
import type { HeroContent } from "@/lib/site/types";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

const aboreto = Aboreto({
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
});

function FilterIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M17.5 3.33331H11.6667"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33333 3.33331H2.5"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 10H10"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66667 10H2.5"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 16.6667H13.3333"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 16.6667H2.5"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6667 1.66669V5.00002"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66666 8.33331V11.6666"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 15V18.3333"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface SearchFilterOptions {
  categories: string[];
  offerTypes: string[];
  paymentTypes: string[];
  banks: string[];
}

interface InitialSearchFilters {
  categories?: string[];
  offerTypes?: string[];
  paymentTypes?: string[];
  banks?: string[];
}

export function HeroSection({
  hero,
  searchFilters,
  submitPath = "/search-results",
  initialQuery = "",
  initialSelectedFilters,
}: {
  hero: HeroContent;
  searchFilters: SearchFilterOptions;
  submitPath?: string;
  initialQuery?: string;
  initialSelectedFilters?: InitialSearchFilters;
}) {
  const router = useRouter();
  const heroSlides = [
    hero.backgroundImageUrl || "/hero-bg.png",
    "/hero-bg2.png",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=2200&h=1300&q=80",
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialSelectedFilters?.categories ?? [],
  );
  const [selectedOfferTypes, setSelectedOfferTypes] = useState<string[]>(
    initialSelectedFilters?.offerTypes ?? [],
  );
  const [selectedPaymentTypes, setSelectedPaymentTypes] = useState<string[]>(
    initialSelectedFilters?.paymentTypes ?? [],
  );
  const [selectedBanks, setSelectedBanks] = useState<string[]>(initialSelectedFilters?.banks ?? []);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    if (!isFilterOpen) return;
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!searchPanelRef.current) return;
      const target = event.target as Node;
      if (!searchPanelRef.current.contains(target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isFilterOpen]);

  const navigateToSearch = ({
    nextQuery = query,
    nextCategories = selectedCategories,
    nextOfferTypes = selectedOfferTypes,
    nextPaymentTypes = selectedPaymentTypes,
    nextBanks = selectedBanks,
    closeFilters = false,
  }: {
    nextQuery?: string;
    nextCategories?: string[];
    nextOfferTypes?: string[];
    nextPaymentTypes?: string[];
    nextBanks?: string[];
    closeFilters?: boolean;
  } = {}) => {
    const params = new URLSearchParams();
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    if (nextCategories.length > 0) params.set("categories", nextCategories.join(","));
    if (nextOfferTypes.length > 0) params.set("offerTypes", nextOfferTypes.join(","));
    if (nextPaymentTypes.length > 0) params.set("paymentTypes", nextPaymentTypes.join(","));
    if (nextBanks.length > 0) params.set("banks", nextBanks.join(","));
    const qs = params.toString() ? `?${params.toString()}` : "";
    router.push(`${submitPath}${qs}#${SEARCH_RESULTS_SECTION_ID}`);
    if (closeFilters) setIsFilterOpen(false);
  };

  return (
    <section className="relative isolate z-120 w-full overflow-visible">
      <div className="relative h-screen min-h-svh w-full overflow-visible">
        {heroSlides.map((slide, index) => (
          <Image
            key={slide}
            src={slide}
            alt=""
            fill
            priority={index === 0}
            className={`object-cover transition-opacity duration-700 ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
            sizes="100vw"
          />
        ))}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/30 to-black/35" />

        <div className="absolute inset-0 flex items-center justify-center px-4 pb-20 text-center sm:pb-24">
          <div>
            <h1
              className={`${audiowide.className} text-[clamp(2rem,5.2vw,53px)] leading-[1.02] font-normal text-white`}
            >
              {hero.title}
            </h1>
            <p
              className={`${aboreto.className} mt-4 text-[clamp(1rem,2.2vw,23px)] leading-[1.46] font-normal text-white/90`}
            >
              {hero.subtitle}
            </p>
          </div>
        </div>

        <div
          ref={searchPanelRef}
          className="absolute bottom-18 left-1/2 z-130 w-[min(94vw,1216px)] -translate-x-1/2 sm:bottom-20"
        >
          <form
            className="rounded-2xl bg-[#fffffff2] p-3 shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A] sm:p-4"
            onSubmit={(event) => {
              event.preventDefault();
              navigateToSearch({ closeFilters: true });
            }}
            role="search"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="site-search" className="sr-only">
                Search offers
              </label>
              <div className="relative h-14 min-h-14 flex-1 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-[#f3f4f6] sm:h-12 sm:min-h-12">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1A1D2980] sm:left-4"
                  aria-hidden
                />
                <input
                  id="site-search"
                  type="search"
                  placeholder={hero.searchPlaceholder}
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                  onFocus={() => setIsFilterOpen(true)}
                  className={`${inter.className} h-14 w-full border-0 bg-transparent pr-12 pl-11 text-[15px] font-normal leading-normal text-slate-900 outline-none placeholder:text-[13px] placeholder:text-[#1A1D2980] focus:ring-0 sm:h-12 sm:pr-12 sm:pl-12 sm:text-base sm:placeholder:text-base max-[420px]:placeholder:text-[12px]`}
                />
                {query.trim().length > 0 ? (
                  <button
                    type="submit"
                    aria-label="Search"
                    className="absolute top-1/2 right-2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-[#0066FF] text-white transition hover:bg-[#0057db]"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (isFilterOpen) {
                    setIsFilterOpen(false);
                    return;
                  }
                  setIsFilterOpen(true);
                }}
                className={`${inter.className} inline-flex h-14 min-h-14 shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#0066FF] px-6 text-[15px] font-medium leading-6 text-white transition duration-300 ease-out hover:bg-[#0057db] sm:h-12 sm:min-h-12 sm:text-base`}
              >
                {isFilterOpen ? <span className="text-lg leading-none">×</span> : <FilterIcon />}
                {isFilterOpen ? "Close" : "Filters"}
              </button>
            </div>
          </form>

          {isFilterOpen ? (
            <div className="absolute top-full right-0 left-0 z-140 mt-2 flex flex-col gap-4 rounded-2xl border border-[#DDDDDD] bg-[#FFFFFFF2] p-4 shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A]">
              <FilterRow
                title="Category"
                options={searchFilters.categories}
                selected={selectedCategories}
                onToggle={(value) => {
                  const nextValues =
                    value === "__ALL__"
                      ? []
                      : selectedCategories.includes(value)
                        ? selectedCategories.filter((item) => item !== value)
                        : [...selectedCategories, value];
                  setSelectedCategories(nextValues);
                  navigateToSearch({ nextCategories: nextValues });
                }}
              />
              <FilterRow
                title="Offer Type"
                options={searchFilters.offerTypes}
                selected={selectedOfferTypes}
                onToggle={(value) => {
                  const nextValues =
                    value === "__ALL__"
                      ? []
                      : selectedOfferTypes.includes(value)
                        ? selectedOfferTypes.filter((item) => item !== value)
                        : [...selectedOfferTypes, value];
                  setSelectedOfferTypes(nextValues);
                  navigateToSearch({ nextOfferTypes: nextValues });
                }}
              />
              <FilterRow
                title="Payment Type"
                options={searchFilters.paymentTypes}
                selected={selectedPaymentTypes}
                onToggle={(value) => {
                  const nextValues =
                    value === "__ALL__"
                      ? []
                      : selectedPaymentTypes.includes(value)
                        ? selectedPaymentTypes.filter((item) => item !== value)
                        : [...selectedPaymentTypes, value];
                  setSelectedPaymentTypes(nextValues);
                  navigateToSearch({ nextPaymentTypes: nextValues });
                }}
              />
              <FilterRow
                title="Bank Wise"
                options={searchFilters.banks}
                selected={selectedBanks}
                onToggle={(value) => {
                  const nextValues =
                    value === "__ALL__"
                      ? []
                      : selectedBanks.includes(value)
                        ? selectedBanks.filter((item) => item !== value)
                        : [...selectedBanks, value];
                  setSelectedBanks(nextValues);
                  navigateToSearch({ nextBanks: nextValues });
                }}
              />
            </div>
          ) : null}
        </div>
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 justify-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to hero slide ${index + 1}`}
              onClick={() => setActiveSlide(index)}
              className={`h-[14px] rounded-[6px] transition-all duration-300 ${
                activeSlide === index
                  ? "w-[29px] bg-white opacity-100"
                  : "w-[14px] bg-[#f9f9f9] opacity-60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterRow({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p
        className={`${inter.className} text-[clamp(0.95rem,1.3vw,1rem)] font-medium leading-6 tracking-normal text-[#1A1D29]`}
      >
        {title}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <FilterChip label="All" active={selected.length === 0} onClick={() => onToggle("__ALL__")} />
        {options.map((option) => (
          <FilterChip
            key={option}
            label={option}
            active={selected.includes(option)}
            onClick={() => onToggle(option)}
          />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${inter.className} inline-flex min-h-10 items-center justify-center rounded-xl px-[clamp(0.9rem,2vw,1.25rem)] py-2 text-[clamp(0.9rem,1.3vw,1rem)] font-medium leading-6 tracking-normal text-center transition ${
        active ? "bg-[#0066FF] text-white" : "bg-[#E5E7EB] text-[#1A1D29]"
      }`}
    >
      {label}
    </button>
  );
}
