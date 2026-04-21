import Image from "next/image";

import type { AboutContent } from "@/lib/site/types";

export function AboutSection({ about }: { about: AboutContent }) {
  const [a, b, c, d] = about.collageImageUrls;
  return (
    <section className="border-t border-slate-100 bg-white py-16">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
        <div className="grid grid-cols-2 gap-3">
          {[a, b, c, d].map((src, i) => (
            <div
              key={`${i}-${src}`}
              className={`relative aspect-square overflow-hidden rounded-2xl bg-slate-100 shadow-sm ring-1 ring-slate-200/70 ${
                i === 0 ? "translate-y-2" : i === 3 ? "-translate-y-2" : ""
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {about.headline}
          </h2>
          <p className="mt-2 text-lg text-sky-700">{about.subheadline}</p>
          <div className="mt-6 space-y-4 text-slate-600">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {about.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-sky-50 px-4 py-5 text-center ring-1 ring-sky-100"
              >
                <p className="text-2xl font-bold text-sky-900">{s.value}</p>
                <p className="mt-1 text-xs font-medium text-sky-800 sm:text-sm">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
