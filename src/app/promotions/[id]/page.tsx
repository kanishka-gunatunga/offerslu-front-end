import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter, Open_Sans } from "next/font/google";
import { notFound } from "next/navigation";

import { LandingFooter } from "@/components/landing/landing-footer";
import { ServiceUnavailableScreen } from "@/components/site/service-unavailable-screen";
import { getBackendOrigin, getPublicPromotionByIdServer } from "@/lib/api/backend";
import { defaultSiteContent } from "@/lib/site/default-content";

const inter = Inter({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const openSans = Open_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
});

function formatDateLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function daysLeftLabel(daysLeft: number | null) {
  if (daysLeft === null) return "Upcoming";
  if (daysLeft <= 0) return "Expired";
  return `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left`;
}

function normalizeRelatedTags(tags: string[] | null | undefined): string[] {
  return [...new Set((tags ?? []).map((tag) => tag.trim()).filter(Boolean))];
}

export default async function PromotionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const load = await getPublicPromotionByIdServer(id);
  if (load.kind === "not_found") notFound();
  if (load.kind === "unavailable") {
    return (
      <div className={`${inter.className} min-h-screen bg-white text-[#111827]`}>
        <header className="border-b border-[#DDDDDD] bg-white">
          <div className="mx-auto flex h-[62px] w-full max-w-[1400px] items-center px-4 sm:px-6 lg:px-8">
            <Link href="/">
              <Image
                src="/logo-blue.png"
                alt="Offerslu.lk"
                width={175}
                height={80}
                priority
                className="h-8 w-auto"
              />
            </Link>
          </div>
        </header>
        <ServiceUnavailableScreen variant="embedded" />
        <LandingFooter siteName={defaultSiteContent.siteName} />
      </div>
    );
  }
  const promotion = load.promotion;

  const backendOrigin = getBackendOrigin();
  const bannerImageUrl =
    promotion.offerBannerImageUrl && promotion.offerBannerImageUrl.trim().length > 0
      ? `${backendOrigin}${promotion.offerBannerImageUrl}`
      : "/hero-bg.png";
  const relatedTags = normalizeRelatedTags(promotion.relatedTags);
  const detailText = promotion.offerDetails?.trim() || promotion.description?.trim() || "";
  const hasDetailText = detailText.length > 0;

  return (
    <div className={`${inter.className} min-h-screen bg-white text-[#111827]`}>
      <header className="border-b border-[#DDDDDD] bg-white">
        <div className="mx-auto flex h-[62px] w-full max-w-[1400px] items-center px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Image
              src="/logo-blue.png"
              alt="Offerslu.lk"
              width={175}
              height={80}
              priority
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1400px] px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <h1
          className={`${openSans.className} text-[clamp(1.8rem,4.2vw,2.5rem)] font-semibold leading-[1.225] tracking-normal text-black capitalize`}
        >
          {promotion.title}
        </h1>
        <p
          className={`${openSans.className} mt-3 text-[clamp(1.1rem,2.7vw,1.5625rem)] font-normal leading-none tracking-normal text-[#0066FF] capitalize underline`}
        >
          {promotion.merchant}
        </p>

        <div className="mt-8 w-full border border-slate-300 bg-white">
          <Image
            src={bannerImageUrl}
            alt={promotion.title}
            width={1277}
            height={1596}
            className="h-auto w-full max-w-full"
            sizes="(max-width: 1400px) calc(100vw - 2rem), min(100vw - 2rem, 1277px)"
            quality={92}
            priority
          />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-[clamp(0.5rem,1.5vw,0.75rem)] sm:grid-cols-4">
          <DetailBadge
            label="Category"
            value={promotion.category || "General"}
            valueClassName="text-[#000000]"
          />
          <DetailBadge
            label="Offer Type"
            value={promotion.offerType || "Promotion"}
            valueClassName="text-[#000000]"
          />
          <DetailBadge
            label="Start Date"
            value={formatDateLabel(promotion.startDate)}
            valueClassName="text-[#0066FF]"
          />
          <DetailBadge
            label="End Date"
            value={formatDateLabel(promotion.endDate)}
            valueClassName="text-[#F82828]"
          />
        </div>

        <section className="mt-9">
          <h2
            className={`${openSans.className} inline-flex items-center gap-3 text-[clamp(1.1rem,2.4vw,1.5rem)] font-semibold leading-6 tracking-normal text-black`}
          >
            <RelatedTagsHeadingIcon aria-hidden />
            Related Tags
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {relatedTags.length > 0 ? (
              relatedTags.map((tag) => (
                <span
                  key={tag}
                  className={`${openSans.className} inline-flex items-center justify-center rounded-[15px] bg-[#DDDDDD] px-5 py-[7px] text-[clamp(0.92rem,1.5vw,1rem)] font-normal leading-6 tracking-normal text-black`}
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500">No tags available.</span>
            )}
          </div>
        </section>

        <section className="mt-8">
          <h2
            className={`${openSans.className} text-[clamp(0.95rem,1.3vw,1rem)] font-bold capitalize leading-none tracking-normal text-black`}
          >
            Promotion Details
          </h2>
          <div
            className={`${openSans.className} mt-4 space-y-3 text-[clamp(0.95rem,1.3vw,1rem)] font-normal leading-none tracking-normal text-black`}
          >
            {hasDetailText ? <p className="whitespace-pre-wrap leading-relaxed">{detailText}</p> : null}
            {!hasDetailText ? (
              <>
                <p>
                  Category: {promotion.category || "General"} | Offer Type: {promotion.offerType || "Promotion"}
                </p>
                <p>Status: {daysLeftLabel(promotion.daysLeft)}</p>
              </>
            ) : null}
          </div>
        </section>

        <section className="mt-10">
          <h2
            className={`${openSans.className} text-center text-[clamp(1.35rem,3vw,1.875rem)] font-semibold leading-6 tracking-normal text-black`}
          >
            Share this promotion
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ShareCard label="Facebook" icon="facebook" />
            <ShareCard label="WhatsApp" icon="whatsapp" />
            <ShareCard label="Twitter" icon="x" />
          </div>
        </section>
      </main>

      <LandingFooter siteName={defaultSiteContent.siteName} />
    </div>
  );
}

function RelatedTagsHeadingIcon(props: SVGProps<SVGSVGElement>) {
  const clipId = "related-tags-heading-clip";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M10.4884 2.15508C10.1759 1.8425 9.75201 1.66684 9.31002 1.66675H3.33335C2.89133 1.66675 2.4674 1.84234 2.15484 2.1549C1.84228 2.46746 1.66669 2.89139 1.66669 3.33341V9.31008C1.66678 9.75207 1.84244 10.1759 2.15502 10.4884L9.40835 17.7417C9.78711 18.1181 10.2994 18.3294 10.8334 18.3294C11.3673 18.3294 11.8796 18.1181 12.2584 17.7417L17.7417 12.2584C18.1181 11.8797 18.3293 11.3674 18.3293 10.8334C18.3293 10.2995 18.1181 9.78718 17.7417 9.40841L10.4884 2.15508Z"
          stroke="#0066FF"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.24998 6.66659C6.4801 6.66659 6.66665 6.48004 6.66665 6.24992C6.66665 6.0198 6.4801 5.83325 6.24998 5.83325C6.01986 5.83325 5.83331 6.0198 5.83331 6.24992C5.83331 6.48004 6.01986 6.66659 6.24998 6.66659Z"
          fill="#0066FF"
          stroke="#0066FF"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function DetailBadge({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName: string;
}) {
  return (
    <div
      className={`${openSans.className} flex min-h-[clamp(5.5rem,18vw,7.5rem)] w-full min-w-0 flex-col items-center justify-center rounded-md border border-[#DDDDDD] bg-white px-[clamp(0.5rem,2.5vw,0.875rem)] py-[clamp(0.625rem,2.5vw,1rem)] text-center`}
    >
      <p className="text-[clamp(0.875rem,1.5vw,1.1875rem)] font-semibold capitalize leading-none tracking-normal text-[#BCBCBC]">
        {label}
      </p>
      <p
        className={`mt-[clamp(0.5rem,2vw,0.875rem)] text-[clamp(1rem,2.2vw,1.75rem)] font-normal capitalize leading-none ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}

function ShareCard({ label, icon }: { label: string; icon: "facebook" | "whatsapp" | "x" }) {
  const bgClass =
    icon === "facebook" ? "bg-[#EFF6FF]" : icon === "whatsapp" ? "bg-[#EFFFF0]" : "bg-[#F2F2F2]";
  return (
    <button
      type="button"
      className={`${openSans.className} flex min-h-[clamp(6.2rem,13vw,9.125rem)] w-full min-w-0 flex-col items-center justify-center rounded-[15px] border border-[#DDDDDD] px-3 py-[clamp(0.8rem,2vw,1.2rem)] text-center transition hover:brightness-95 ${bgClass}`}
    >
      <span className="mx-auto block h-[clamp(1.8rem,4vw,2.5rem)] w-[clamp(1.8rem,4vw,2.5rem)]">
        {icon === "facebook" ? (
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden>
            <path
              d="M28.4999 3.1665H23.7499C21.6503 3.1665 19.6367 4.00058 18.152 5.48524C16.6673 6.9699 15.8333 8.98354 15.8333 11.0832V15.8332H11.0833V22.1665H15.8333V34.8332H22.1666V22.1665H26.9166L28.4999 15.8332H22.1666V11.0832C22.1666 10.6632 22.3334 10.2605 22.6303 9.96358C22.9273 9.66665 23.33 9.49984 23.7499 9.49984H28.4999V3.1665Z"
              stroke="#0066FF"
              strokeWidth="3.16667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
        {icon === "whatsapp" ? (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
            <path
              d="M31.75 8.18334C30.2217 6.64018 28.4017 5.41662 26.3958 4.58395C24.39 3.75127 22.2384 3.32615 20.0666 3.33334C10.9666 3.33334 3.54996 10.75 3.54996 19.85C3.54996 22.7667 4.31663 25.6 5.74996 28.1L3.41663 36.6667L12.1666 34.3667C14.5833 35.6833 17.3 36.3833 20.0666 36.3833C29.1666 36.3833 36.5833 28.9667 36.5833 19.8667C36.5833 15.45 34.8666 11.3 31.75 8.18334ZM20.0666 33.5833C17.6 33.5833 15.1833 32.9167 13.0666 31.6667L12.5666 31.3667L7.36663 32.7333L8.74996 27.6667L8.41663 27.15C7.04587 24.9618 6.31817 22.4321 6.31663 19.85C6.31663 12.2833 12.4833 6.11667 20.05 6.11667C23.7166 6.11667 27.1666 7.55001 29.75 10.15C31.0293 11.4231 32.0432 12.9376 32.7327 14.6056C33.4222 16.2735 33.7736 18.0618 33.7666 19.8667C33.8 27.4333 27.6333 33.5833 20.0666 33.5833ZM27.6 23.3167C27.1833 23.1167 25.15 22.1167 24.7833 21.9667C24.4 21.8333 24.1333 21.7667 23.85 22.1667C23.5666 22.5833 22.7833 23.5167 22.55 23.7833C22.3166 24.0667 22.0666 24.1 21.65 23.8833C21.2333 23.6833 19.9 23.2333 18.3333 21.8333C17.1 20.7333 16.2833 19.3833 16.0333 18.9667C15.8 18.55 16 18.3333 16.2166 18.1167C16.4 17.9333 16.6333 17.6333 16.8333 17.4C17.0333 17.1667 17.1166 16.9833 17.25 16.7167C17.3833 16.4333 17.3166 16.2 17.2166 16C17.1166 15.8 16.2833 13.7667 15.95 12.9333C15.6166 12.1333 15.2666 12.2333 15.0166 12.2167H14.2166C13.9333 12.2167 13.5 12.3167 13.1166 12.7333C12.75 13.15 11.6833 14.15 11.6833 16.1833C11.6833 18.2167 13.1666 20.1833 13.3666 20.45C13.5666 20.7333 16.2833 24.9 20.4166 26.6833C21.4 27.1167 22.1666 27.3667 22.7666 27.55C23.75 27.8667 24.65 27.8167 25.3666 27.7167C26.1666 27.6 27.8166 26.7167 28.15 25.75C28.5 24.7833 28.5 23.9667 28.3833 23.7833C28.2666 23.6 28.0166 23.5167 27.6 23.3167Z"
              fill="#19A658"
            />
          </svg>
        ) : null}
        {icon === "x" ? (
          <svg width="31" height="31" viewBox="0 0 31 31" fill="none" aria-hidden>
            <path
              d="M18.0071 13.423L27.8167 1.9375H25.4916L16.9763 11.9098L10.1718 1.9375H2.32495L12.6131 17.019L2.32495 29.0625H4.64995L13.6438 18.5303L20.83 29.0625H28.6769L18.0071 13.423ZM14.8238 17.1508L13.7814 15.6492L5.48695 3.70062H9.05777L15.7499 13.3436L16.7923 14.8451L25.4936 27.3808H21.9228L14.8238 17.1508Z"
              fill="black"
            />
          </svg>
        ) : null}
      </span>
      <span className="mt-3 block text-[clamp(1rem,1.8vw,1.125rem)] font-semibold leading-6 tracking-normal text-[#1A1D29]">
        {label}
      </span>
    </button>
  );
}
