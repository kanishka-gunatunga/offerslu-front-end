import Image from "next/image";
import { Search } from "lucide-react";

import type { HeroContent } from "@/lib/site/types";

export function HeroSection({ hero }: { hero: HeroContent }) {
  return (
    <section className="relative isolate min-h-[420px] w-full overflow-hidden sm:min-h-[480px]">
      <Image
        src={hero.backgroundImageUrl}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/45 to-slate-900/25" />
      <div className="relative mx-auto flex max-w-[88rem] flex-col items-center px-4 pb-16 pt-20 text-center sm:px-6 lg:px-8 lg:pb-20 lg:pt-24">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl">
          {hero.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-white/90 sm:text-xl">
          {hero.subtitle}
        </p>
        <form
          className="mt-10 flex w-full max-w-2xl items-center gap-2 rounded-full bg-white p-2 pl-5 shadow-lg shadow-slate-900/10 ring-1 ring-slate-200/60"
          action="/"
          method="get"
          role="search"
        >
          <label htmlFor="site-search" className="sr-only">
            Search offers
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            placeholder={hero.searchPlaceholder}
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0"
          />
          <button
            type="submit"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            <Search className="h-4 w-4" aria-hidden />
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
