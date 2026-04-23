"use client";

import { useRef } from "react";
import { ChevronRight } from "lucide-react";

import type { Promotion } from "@/lib/site/types";

import { PromotionCard } from "./promotion-card";

export function PromotionCarousel({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: Promotion[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    scrollerRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  return (
    <section className="py-8 sm:py-10">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="text-center">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">{subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 shrink-0 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
            aria-label="Scroll promotions"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <div
          ref={scrollerRef}
          className="mt-5 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        >
          {items.map((p) => (
            <PromotionCard key={p.id} promotion={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
