"use client";

import { useLayoutEffect } from "react";
import { useSearchParams } from "next/navigation";

import { SEARCH_RESULTS_SECTION_ID } from "@/lib/site/search-results-anchor";

export function SearchResultsHashScroll() {
  const searchParams = useSearchParams();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== `#${SEARCH_RESULTS_SECTION_ID}`) return;
    const el = document.getElementById(SEARCH_RESULTS_SECTION_ID);
    if (!el) return;
    el.scrollIntoView({ behavior: "auto", block: "start" });
  }, [searchParams]);

  return null;
}
