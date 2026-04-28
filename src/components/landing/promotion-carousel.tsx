"use client";

import { useEffect, useRef, useState } from "react";
import { Open_Sans } from "next/font/google";

import type { Promotion } from "@/lib/site/types";

import { PromotionCard } from "./promotion-card";

const openSans = Open_Sans({
  weight: ["600"],
  subsets: ["latin"],
});

function RightArrowIcon() {
  return (
    <svg
      width="12"
      height="24"
      viewBox="0 0 12 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0773 12.6112L4.46468 18.2239L3.06177 16.821L7.97294 11.9098L3.06177 6.99861L4.46468 5.5957L10.0773 11.2083C10.2633 11.3944 10.3678 11.6467 10.3678 11.9098C10.3678 12.1729 10.2633 12.4252 10.0773 12.6112Z"
        fill="black"
      />
    </svg>
  );
}

export function PromotionCarousel({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: Promotion[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const updateOverflowState = () => {
      const el = scrollerRef.current;
      if (!el) return;
      setShowArrows(el.scrollWidth > el.clientWidth + 1);
    };

    updateOverflowState();
    window.addEventListener("resize", updateOverflowState);

    const observer = new ResizeObserver(updateOverflowState);
    if (scrollerRef.current) observer.observe(scrollerRef.current);

    return () => {
      window.removeEventListener("resize", updateOverflowState);
      observer.disconnect();
    };
  }, [items.length]);

  const scrollPrev = () => {
    scrollerRef.current?.scrollBy({ left: -420, behavior: "smooth" });
  };

  const scrollNext = () => {
    scrollerRef.current?.scrollBy({ left: 420, behavior: "smooth" });
  };

  return (
    <section className="py-8 sm:py-10">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            className={`${openSans.className} text-[clamp(1.35rem,3vw,30px)] font-semibold leading-6 tracking-normal text-black`}
          >
            {title}
          </h2>
          <p
            className={`${openSans.className} mt-3 text-[clamp(0.95rem,2.1vw,19px)] font-semibold leading-6 tracking-normal text-[#787878]`}
          >
            {subtitle}
          </p>
        </div>
        <div className="relative mt-12 overflow-visible">
          {showArrows ? (
            <>
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous promotions"
                className="absolute top-1/2 -left-2 z-10 inline-flex h-10 w-10 shrink-0 -translate-y-1/2 items-center justify-center rounded-full bg-[#EEEEEE]/70 backdrop-blur-[1px] sm:-left-3 sm:h-11 sm:w-11 md:-left-6 md:h-[64px] md:w-[64px] md:bg-[#EEEEEE]"
              >
                <span className="rotate-180">
                  <RightArrowIcon />
                </span>
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next promotions"
                className="absolute top-1/2 -right-2 z-10 inline-flex h-10 w-10 shrink-0 -translate-y-1/2 items-center justify-center rounded-full bg-[#EEEEEE]/70 backdrop-blur-[1px] sm:-right-3 sm:h-11 sm:w-11 md:-right-6 md:h-[64px] md:w-[64px] md:bg-[#EEEEEE]"
              >
                <RightArrowIcon />
              </button>
            </>
          ) : null}

          <div
            ref={scrollerRef}
            className={`flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden ${
              showArrows ? "justify-start" : "justify-center"
            }`}
          >
            {items.map((p) => (
              <PromotionCard key={p.id} promotion={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
