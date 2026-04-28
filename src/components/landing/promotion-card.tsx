import Image from "next/image";
import Link from "next/link";
import { Open_Sans } from "next/font/google";

import type { Promotion } from "@/lib/site/types";

const openSans = Open_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

function formatDateLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function daysLeftLabel(daysLeft: number | null) {
  if (daysLeft === null) return "Upcoming";
  if (daysLeft <= 0) return "Expired";
  return `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left`;
}

function CategoryIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <g clipPath="url(#category-icon-clip)">
        <path
          d="M6.293 1.293C6.10551 1.10545 5.85119 1.00006 5.586 1H2C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2V5.586C1.00006 5.85119 1.10545 6.10551 1.293 6.293L5.645 10.645C5.87226 10.8708 6.17962 10.9976 6.5 10.9976C6.82038 10.9976 7.12774 10.8708 7.355 10.645L10.645 7.355C10.8708 7.12774 10.9976 6.82038 10.9976 6.5C10.9976 6.17962 10.8708 5.87226 10.645 5.645L6.293 1.293Z"
          stroke="#1A1D29"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.75 4C3.88807 4 4 3.88807 4 3.75C4 3.61193 3.88807 3.5 3.75 3.5C3.61193 3.5 3.5 3.61193 3.5 3.75C3.5 3.88807 3.61193 4 3.75 4Z"
          fill="#1A1D29"
          stroke="#1A1D29"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="category-icon-clip">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function OfferTypeIcon() {
  return (
    <Image
      src="/circum_discount-1.svg"
      alt=""
      width={19}
      height={19}
      className="h-[19px] w-[19px]"
    />
  );
}

function DateIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M5.33331 1.33337V4.00004" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.6667 1.33337V4.00004" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.6667 2.66663H3.33333C2.59695 2.66663 2 3.26358 2 3.99996V13.3333C2 14.0697 2.59695 14.6666 3.33333 14.6666H12.6667C13.403 14.6666 14 14.0697 14 13.3333V3.99996C14 3.26358 13.403 2.66663 12.6667 2.66663Z" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 6.66663H14" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <g clipPath="url(#status-icon-clip)">
        <path d="M7.99998 14.6667C11.6819 14.6667 14.6666 11.6819 14.6666 8.00004C14.6666 4.31814 11.6819 1.33337 7.99998 1.33337C4.31808 1.33337 1.33331 4.31814 1.33331 8.00004C1.33331 11.6819 4.31808 14.6667 7.99998 14.6667Z" stroke="#F41414" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 4V8L10.6667 9.33333" stroke="#F41414" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="status-icon-clip">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function PromotionCard({ promotion }: { promotion: Promotion }) {
  return (
    <Link href={promotion.detailHref} className="block shrink-0 snap-start focus:outline-none">
      <article className="flex w-[min(100vw-1.5rem,320px)] flex-col overflow-hidden rounded-2xl border border-t border-[#E5E7EB] bg-white shadow-[0px_0px_4px_0px_#00000026] transition duration-300 ease-out hover:-translate-y-0.5 sm:w-[340px] md:w-[360px] lg:w-[390px] xl:w-[405px]">
        <div className="relative aspect-403/192 w-full bg-slate-100">
          <Image
            src={promotion.bannerImageUrl}
            alt={promotion.title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) calc(100vw - 1.5rem), 403px"
          />
        </div>
        <div className={`flex flex-1 flex-col gap-2 p-4 ${openSans.className}`}>
          <h3 className="line-clamp-2 text-[clamp(1rem,2.1vw,18px)] font-bold leading-normal text-[#1A1D29]">
            {promotion.title}
          </h3>
          <p className="text-[clamp(0.9rem,1.9vw,16px)] font-semibold leading-normal text-[#6B7280]">
            {promotion.merchant}
          </p>
          <p className="mt-3 line-clamp-2 text-[clamp(0.9rem,1.9vw,16px)] font-normal leading-normal text-[#1A1D29]">
            {promotion.description}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-slate-200 pb-4">
            <span className="inline-flex items-center gap-1.5">
              <CategoryIcon />
              <span className="text-[clamp(0.9rem,1.9vw,16px)] font-normal leading-normal text-[#1A1D29]">
                {promotion.category}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <OfferTypeIcon />
              <span className="text-[clamp(0.9rem,1.9vw,16px)] font-normal leading-normal text-[#1A1D29]">
                {promotion.offerType}
              </span>
            </span>
          </div>
          <p className="mt-1 inline-flex items-center gap-2">
            <DateIcon />
            <span className="text-[clamp(0.9rem,1.9vw,16px)] font-normal leading-normal text-[#6B7280]">
              {formatDateLabel(promotion.startDate)} - {formatDateLabel(promotion.endDate)}
            </span>
          </p>
          <p className="inline-flex items-center gap-2">
            <StatusIcon />
            <span className="text-[clamp(0.9rem,1.9vw,16px)] font-normal leading-normal text-[#F41414]">
              {daysLeftLabel(promotion.daysLeft)}
            </span>
          </p>
        </div>
      </article>
    </Link>
  );
}
