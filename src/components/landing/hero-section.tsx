import Image from "next/image";
import { Search } from "lucide-react";
import { Aboreto, Audiowide, Inter } from "next/font/google";

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
  return (
    <section className="relative isolate w-full overflow-hidden">
      <div className="relative h-screen min-h-svh w-full">
        <Image
          src={hero.backgroundImageUrl || "/hero-bg.png"}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/30 to-black/35" />

        <div className="absolute inset-0 flex items-center justify-center px-4 pb-28 text-center sm:pb-32">
          <div>
            <h1
              className={`${audiowide.className} text-[clamp(2rem,5.2vw,53px)] leading-[1.02] font-normal text-white`}
            >
              {hero.title}
            </h1>
            <p
              className={`${aboreto.className} mt-2 text-[clamp(1rem,2.2vw,23px)] leading-[1.46] font-normal text-white/90`}
            >
              {hero.subtitle}
            </p>
          </div>
        </div>

        <form
          className="absolute bottom-14 left-1/2 w-[min(92vw,1216px)] -translate-x-1/2 rounded-2xl bg-[#fffffff2] p-4 shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A] sm:bottom-16"
          action="/search-results"
          method="get"
          role="search"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="site-search" className="sr-only">
              Search offers
            </label>
            <div className="relative h-12 flex-1 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-[#f3f4f6]">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1A1D2980]"
                aria-hidden
              />
              <input
                id="site-search"
                name="q"
                type="search"
                placeholder={hero.searchPlaceholder}
                className={`${inter.className} h-full w-full border-0 bg-transparent pr-4 pl-12 text-base font-normal leading-none text-slate-900 outline-none placeholder:text-[#1A1D2980] focus:ring-0`}
              />
            </div>
            <button
              type="submit"
              className={`${inter.className} inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#0066FF] px-6 text-base font-medium leading-6 text-white transition duration-300 ease-out hover:bg-[#0057db]`}
            >
              <FilterIcon />
              Filters
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        <span className="h-1.5 w-5 rounded-full bg-slate-700/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
      </div>
    </section>
  );
}
