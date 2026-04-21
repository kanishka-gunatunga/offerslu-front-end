import Image from "next/image";

import type { Bank } from "@/lib/site/types";

export function BanksSection({ banks }: { banks: Bank[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Offers by Bank
        </h2>
        <p className="mt-2 text-slate-600">
          Explore promotions linked to your card issuer.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {banks.map((b) => (
          <div
            key={b.id}
            className="flex flex-col items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70"
          >
            <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-slate-50">
              <Image
                src={b.logoUrl}
                alt=""
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <p className="text-center text-xs font-medium leading-snug text-slate-800 sm:text-sm">
              {b.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
