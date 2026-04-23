import Image from "next/image";

import type { Bank } from "@/lib/site/types";

export function BanksSection({ banks }: { banks: Bank[] }) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Offers by Rank
        </h2>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Explore promotions linked to your card issuer.
        </p>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {banks.map((b) => (
          <div
            key={b.id}
            className="flex flex-col items-center gap-2"
          >
            <div className="relative h-14 w-full overflow-hidden rounded-lg border border-slate-200 bg-white">
              <Image
                src={b.logoUrl}
                alt=""
                fill
                className="object-contain p-1.5"
                sizes="160px"
              />
            </div>
            <p className="text-center text-[11px] font-medium leading-snug text-slate-700 sm:text-xs">
              {b.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
