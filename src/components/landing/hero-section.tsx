"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { Aboreto, Audiowide, Inter } from "next/font/google";
import { useEffect, useState } from "react";

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

export function HeroSection({ hero }: { hero: HeroContent }) {
  const heroSlides = [
    hero.backgroundImageUrl || "/hero-bg.png",
    "/hero-bg2.png",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=2200&h=1300&q=80",
  ];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section className="relative isolate w-full overflow-hidden">
      <div className="relative h-screen min-h-svh w-full">
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

        <form
          className="absolute bottom-18 left-1/2 w-[min(94vw,1216px)] -translate-x-1/2 rounded-2xl bg-[#fffffff2] p-3 shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A] sm:bottom-20 sm:p-4"
          action="/search-results"
          method="get"
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
                name="q"
                type="search"
                placeholder={hero.searchPlaceholder}
                className={`${inter.className} h-14 w-full border-0 bg-transparent pr-2.5 pl-11 text-[15px] font-normal leading-normal text-slate-900 outline-none placeholder:text-[13px] placeholder:text-[#1A1D2980] focus:ring-0 sm:h-12 sm:pr-4 sm:pl-12 sm:text-base sm:placeholder:text-base max-[420px]:placeholder:text-[12px]`}
              />
            </div>
            <button
              type="submit"
              className={`${inter.className} inline-flex h-14 min-h-14 shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#0066FF] px-6 text-[15px] font-medium leading-6 text-white transition duration-300 ease-out hover:bg-[#0057db] sm:h-12 sm:min-h-12 sm:text-base`}
            >
              <FilterIcon />
              Filters
            </button>
          </div>
        </form>
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
