import Image from "next/image";

import type { Category } from "@/lib/site/types";

export function CategoryRow({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-10 pt-7 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Browse by Category
        </h2>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Jump into the kind of offer you are looking for today.
        </p>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className="group flex flex-col items-center gap-2 text-center"
          >
            <span className="relative h-20 w-full overflow-hidden rounded-xl bg-slate-100 shadow-sm ring-1 ring-slate-200/80 transition group-hover:shadow-md group-hover:ring-sky-200 sm:h-24">
              <Image
                src={c.imageUrl}
                alt=""
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 13vw"
              />
            </span>
            <span className="text-[11px] font-medium text-slate-800 sm:text-xs">
              {c.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
