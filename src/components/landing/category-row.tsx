import Image from "next/image";

import type { Category } from "@/lib/site/types";

export function CategoryRow({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto max-w-[88rem] px-4 py-14 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Browse by Category
        </h2>
        <p className="mt-2 text-slate-600">
          Jump into the kind of offer you are looking for today.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className="group flex flex-col items-center gap-3 text-center"
          >
            <span className="relative h-24 w-24 overflow-hidden rounded-2xl bg-slate-100 shadow-sm ring-1 ring-slate-200/80 transition group-hover:shadow-md group-hover:ring-sky-200 sm:h-28 sm:w-28">
              <Image
                src={c.imageUrl}
                alt=""
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 12vw"
              />
            </span>
            <span className="text-xs font-medium text-slate-800 sm:text-sm">
              {c.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
