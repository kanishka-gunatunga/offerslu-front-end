import Image from "next/image";
import Link from "next/link";

import type { Promotion } from "@/lib/site/types";

export function PromotionCard({ promotion }: { promotion: Promotion }) {
  return (
    <article className="flex w-[min(100vw-2.5rem,350px)] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:w-[345px]">
      <div className="relative aspect-16/10 w-full bg-slate-100">
        <Image
          src={promotion.bannerImageUrl}
          alt=""
          fill
          className="object-cover"
          sizes="320px"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-3.5">
        <div className="flex items-center gap-2.5">
          <div className="relative h-7 w-7 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
            <Image
              src={promotion.providerLogoUrl}
              alt=""
              fill
              className="object-cover"
              sizes="28px"
            />
          </div>
          <span className="text-xs font-medium text-slate-800">
            {promotion.providerName}
          </span>
        </div>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900">
          {promotion.title}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
          {promotion.description}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          <span>{promotion.categoryLabel}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>{promotion.offerTypeLabel}</span>
        </div>
        <p className="text-[11px] text-slate-500">
          {promotion.validUntilLabel}
        </p>
        <div className="mt-auto border-t border-slate-100 pt-2">
          <Link
            href={promotion.detailHref}
            className="text-xs font-semibold text-[#ff3f57] hover:text-[#e32f47]"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
