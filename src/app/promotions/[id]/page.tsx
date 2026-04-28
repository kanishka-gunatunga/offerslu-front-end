import Image from "next/image";
import Link from "next/link";
import { Inter, Open_Sans } from "next/font/google";
import { notFound } from "next/navigation";

import { LandingFooter } from "@/components/landing/landing-footer";
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

export default async function PromotionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const promotion = await getPublicPromotionByIdServer(id);
  if (!promotion) notFound();

  const backendOrigin = getBackendOrigin();
  const bannerImageUrl =
    promotion.offerBannerImageUrl && promotion.offerBannerImageUrl.trim().length > 0
      ? `${backendOrigin}${promotion.offerBannerImageUrl}`
      : "/hero-bg.png";
  const categoryTags = (promotion.category ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const offerTypeTags = (promotion.offerType ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const relatedTags = [...categoryTags, ...offerTypeTags];
  const detailText = promotion.offerDetails?.trim() || promotion.description || "No description available.";

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
          className={`${openSans.className} mt-2 text-[clamp(1.1rem,2.7vw,1.5625rem)] font-normal leading-none tracking-normal text-[#0066FF] capitalize underline`}
        >
          {promotion.merchant}
        </p>

        <div className="relative mt-4 aspect-345/474 w-full overflow-hidden border border-slate-300 bg-white sm:aspect-730/660">
          <Image src={bannerImageUrl} alt={promotion.title} fill className="object-cover object-top" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <DetailBadge label="Category" value={promotion.category || "General"} />
          <DetailBadge label="Offer Type" value={promotion.offerType || "Promotion"} />
          <DetailBadge label="Start Date" value={formatDateLabel(promotion.startDate)} />
          <DetailBadge
            label={promotion.daysLeft === null ? "Status" : "End Date"}
            value={promotion.daysLeft === null ? "Upcoming" : formatDateLabel(promotion.endDate)}
            accent={promotion.daysLeft !== null && promotion.daysLeft <= 0}
          />
        </div>

        <section className="mt-5">
          <h2 className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#1A1D29]">
            <span aria-hidden className="text-[11px] text-slate-500">
              ◌
            </span>
            Related Tags
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {relatedTags.length > 0 ? (
              relatedTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-slate-300 bg-[#f8fafc] px-2 py-1 text-[11px] leading-none text-slate-600"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500">No tags available.</span>
            )}
          </div>
        </section>

        <section className="mt-4">
          <h2 className="text-[12px] font-semibold uppercase tracking-wide text-[#1A1D29]">
            Promotion Details
          </h2>
          <div className="mt-2 space-y-3 text-[11px] leading-5 text-slate-700">
            <p className="whitespace-pre-wrap">{detailText}</p>
            <p>
              Category: {promotion.category || "General"} | Offer Type: {promotion.offerType || "Promotion"}
            </p>
            <p>Status: {daysLeftLabel(promotion.daysLeft)}</p>
          </div>
        </section>

        <section className="mt-7">
          <h2 className="text-center text-[clamp(1rem,2vw,1.5rem)] font-semibold text-[#1A1D29]">
            Share this promotion
          </h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
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

function DetailBadge({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-center">
      <p className="text-[10px] font-normal text-slate-400">{label}</p>
      <p className={`mt-1 text-[13px] font-normal ${accent ? "text-[#DC2626]" : "text-slate-600"}`}>{value}</p>
    </div>
  );
}

function ShareCard({ label, icon }: { label: string; icon: "facebook" | "whatsapp" | "x" }) {
  return (
    <button
      type="button"
      className="rounded-lg border border-slate-200 bg-[#EEF2F7] py-3 text-center transition hover:brightness-95"
    >
      <span className="mx-auto block h-5 w-5">
        {icon === "facebook" ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
              stroke="#0066FF"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
        {icon === "whatsapp" ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M20.52 3.48A11.8 11.8 0 0 0 1.8 17.4L1 23l5.76-1.76a11.8 11.8 0 0 0 5.64 1.44h.01A11.8 11.8 0 0 0 20.52 3.48Z"
              stroke="#22C55E"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 8.5c.3-.6.7-.6 1-.6.2 0 .4 0 .6.4.2.5.8 1.9.9 2 .1.1.1.3 0 .4-.1.2-.2.3-.4.5-.1.1-.2.2-.3.4-.1.1-.2.3 0 .5.2.4.9 1.4 1.9 2.3 1.3 1.1 2.3 1.4 2.7 1.5.3.1.5.1.7-.2.2-.3.8-.9 1-.1.2.8.2 1.5.1 1.7-.1.2-.7.4-1.4.4-.8 0-1.8-.2-3-.8-2-1-3.4-2.9-3.7-3.4-.3-.5-1-1.4-1-2.6 0-1.3.7-1.9 1-2.2Z"
              fill="#22C55E"
            />
          </svg>
        ) : null}
        {icon === "x" ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M13.941 10.392L21.5355 1.5H19.7355L13.143 9.2205L7.875 1.5H1.8L9.76501 13.176L1.8 22.5H3.6L10.563 14.346L16.1265 22.5H22.2015L13.941 10.392ZM11.4765 13.278L10.6695 12.1155L4.248 2.865H7.0125L12.1935 10.3305L13.0005 11.493L19.737 21.198H16.9725L11.4765 13.278Z"
              fill="#111827"
            />
          </svg>
        ) : null}
      </span>
      <span className="mt-1 block text-[10px] leading-4 text-slate-600">{label}</span>
    </button>
  );
}
