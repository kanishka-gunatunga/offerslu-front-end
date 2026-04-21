import Image from "next/image";
import Link from "next/link";

import type { Promotion } from "@/lib/site/types";

export function PromotionCard({ promotion }: { promotion: Promotion }) {
  return (
    <article className="flex w-[min(100vw-3rem,320px)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200/70 sm:w-[300px]">
      <div className="relative aspect-[16/10] w-full bg-slate-100">
        <Image
          src={promotion.bannerImageUrl}
          alt=""
          fill
          className="object-cover"
          sizes="320px"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
            <Image
              src={promotion.providerLogoUrl}
              alt=""
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <span className="text-sm font-medium text-slate-800">
            {promotion.providerName}
          </span>
        </div>
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900">
          {promotion.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
          {promotion.description}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-800 ring-1 ring-inset ring-sky-100">
            {promotion.categoryLabel}
          </span>
          <span className="rounded-full bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200">
            {promotion.offerTypeLabel}
          </span>
        </div>
        <p className="text-xs font-medium text-slate-500">
          {promotion.validUntilLabel}
        </p>
        <div className="mt-auto pt-1">
          <Link
            href={promotion.detailHref}
            className="text-sm font-semibold text-sky-600 hover:text-sky-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
