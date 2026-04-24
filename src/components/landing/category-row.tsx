"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { Open_Sans } from "next/font/google";

import type { Category } from "@/lib/site/types";

const openSans = Open_Sans({
  weight: ["600", "700"],
  subsets: ["latin"],
});

export function CategoryRow({ categories }: { categories: Category[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [visibleSlots, setVisibleSlots] = useState(7);
  const showArrows = categories.length > visibleSlots;
  const hasCategories = categories.length > 0;

  useEffect(() => {
    const updateVisibleSlots = () => {
      if (window.innerWidth < 640) {
        setVisibleSlots(2);
        return;
      }
      if (window.innerWidth < 1024) {
        setVisibleSlots(4);
        return;
      }
      setVisibleSlots(7);
    };

    updateVisibleSlots();
    window.addEventListener("resize", updateVisibleSlots);
    return () => window.removeEventListener("resize", updateVisibleSlots);
  }, []);

  const scrollLeft = () => {
    scrollerRef.current?.scrollBy({ left: -560, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollerRef.current?.scrollBy({ left: 560, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-10 pt-7 sm:px-6 lg:px-8">
      <div className="mt-2">
        <h2
          className={`${openSans.className} text-[clamp(1.25rem,2.6vw,24px)] font-semibold leading-none tracking-normal text-black`}
        >
          Browse by Category
        </h2>
        <p
          className={`${openSans.className} mt-2 text-[clamp(0.95rem,2.2vw,19px)] font-semibold leading-[1.263] tracking-normal text-[#787878]`}
        >
          Find offers that match your interests
        </p>
      </div>
      <div className="relative mt-8">
        {!hasCategories ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
            <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
              <ImageOff className="h-5 w-5" aria-hidden />
            </span>
            <p
              className={`${openSans.className} mt-4 text-base font-semibold text-slate-700`}
            >
              Categories are being updated
            </p>
            <p className="mt-1 text-sm text-slate-500">
              No categories are available right now. Please check back in a bit.
            </p>
          </div>
        ) : null}

        {hasCategories ? (
          <>
        {showArrows ? (
          <>
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Scroll categories left"
              className="absolute top-1/2 left-1 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-md ring-1 ring-slate-200 transition hover:bg-white sm:h-11 sm:w-11"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Scroll categories right"
              className="absolute top-1/2 right-1 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-md ring-1 ring-slate-200 transition hover:bg-white sm:h-11 sm:w-11"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
            </button>
          </>
        ) : null}

        <div
          ref={scrollerRef}
          className={`grid gap-3 ${
            showArrows
              ? "auto-cols-[minmax(160px,173px)] grid-flow-col overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              : "grid-cols-2 sm:grid-cols-4 lg:grid-cols-7"
          }`}
        >
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`group relative w-full overflow-hidden rounded-2xl bg-[#d9d9d9] text-left shadow-sm ring-1 ring-slate-200/80 transition hover:shadow-md ${showArrows ? "snap-start" : ""}`}
            >
              <span className="relative block aspect-173/234 w-full min-h-[180px] sm:min-h-[210px]">
                <Image
                  src={c.imageUrl}
                  alt={c.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 173px"
                />
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/0 from-0% via-black/20 via-60% to-black/50 to-[73.67%]"
              />
              <span className="absolute inset-x-0 bottom-0 z-1 p-3 text-center sm:p-3.5">
                <span
                  className={`${openSans.className} block text-[clamp(0.85rem,1.6vw,15px)] font-bold leading-6 tracking-normal text-white`}
                >
                  {c.name}
                </span>
                <span
                  className={`${openSans.className} block text-[11px] font-semibold leading-none tracking-normal text-[#e5e5e5]`}
                >
                  {c.offerCount} offers
                </span>
              </span>
            </button>
          ))}
        </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
