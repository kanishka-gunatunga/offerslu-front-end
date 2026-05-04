import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

import {
  HOME_CONNECT_WITH_US_ID,
  HOME_LATEST_PROMOTIONS_ID,
  HOME_OFFERS_BY_BANK_ID,
} from "@/lib/site/home-section-anchors";
import { SEARCH_RESULTS_SECTION_ID } from "@/lib/site/search-results-anchor";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const FOOTER_CATEGORIES = [
  "Food & Dining",
  "Fashion & Clothing",
  "Electronics",
  "Travel",
  "Health & Beauty",
  "Entertainment",
  "Other",
] as const;


const FOOTER_OFFER_TYPE_LINKS: {
  label: string;
  param: "offerTypes" | "paymentTypes";
  value: string;
}[] = [
  { label: "Card Offers", param: "paymentTypes", value: "Card" },
  { label: "Buy 1 Get 1", param: "offerTypes", value: "Buy 1 Get 1" },
  { label: "Flash Sales", param: "offerTypes", value: "Flash Sales" },
  { label: "Discount", param: "offerTypes", value: "Discount" },
  { label: "Flash Sale", param: "offerTypes", value: "Flash Sale" },
];

function searchFilterHref(
  key: "categories" | "offerTypes" | "paymentTypes",
  value: string,
): string {
  const params = new URLSearchParams({ [key]: value });
  return `/search-results?${params.toString()}#${SEARCH_RESULTS_SECTION_ID}`;
}

const footerLinkClass =
  "text-white transition hover:text-white/90 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function LandingFooter({ siteName }: { siteName: string }) {
  return (
    <footer className={`${inter.className} mt-2 bg-[#0666E8] text-white`}>
      <div className="mx-auto max-w-[1400px] px-4 pb-6 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.35fr_repeat(3,minmax(0,1fr))]">
          <div>
            <Image
              src="/footer-logo.svg"
              alt={`${siteName} footer logo`}
              width={168}
              height={40}
              className="h-auto w-auto"
            />
            <p className="mt-4 max-w-[28ch] text-[clamp(0.95rem,1.05vw,1rem)] font-normal leading-6 tracking-normal text-white">
              Your one-stop destination for the best offers in Sri Lanka.
            </p>
          </div>
          <div>
            <p className="text-[clamp(0.95rem,1.05vw,1rem)] font-bold leading-6 tracking-normal text-white">
              Categories
            </p>
            <ul className="mt-2.5 space-y-1.5 text-[clamp(0.95rem,1.05vw,1rem)] font-normal leading-6 tracking-normal text-white">
              {FOOTER_CATEGORIES.map((label) => (
                <li key={label}>
                  <Link href={searchFilterHref("categories", label)} className={footerLinkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[clamp(0.95rem,1.05vw,1rem)] font-bold leading-6 tracking-normal text-white">
              Offer Types
            </p>
            <ul className="mt-2.5 space-y-1.5 text-[clamp(0.95rem,1.05vw,1rem)] font-normal leading-6 tracking-normal text-white">
              {FOOTER_OFFER_TYPE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={searchFilterHref(item.param, item.value)}
                    className={footerLinkClass}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[clamp(0.95rem,1.05vw,1rem)] font-bold leading-6 tracking-normal text-white">
              Quick Links
            </p>
            <ul className="mt-2.5 space-y-1.5 text-[clamp(0.95rem,1.05vw,1rem)] font-normal leading-6 tracking-normal text-white">
              <li>
                <Link
                  href={`/#${HOME_LATEST_PROMOTIONS_ID}`}
                  className={footerLinkClass}
                >
                  Latest Promotions
                </Link>
              </li>
              <li>
                <Link
                  href={`/#${HOME_OFFERS_BY_BANK_ID}`}
                  className={footerLinkClass}
                >
                  Offers by Bank
                </Link>
              </li>
              <li>
                <Link
                  href={`/#${HOME_CONNECT_WITH_US_ID}`}
                  className={footerLinkClass}
                >
                  Connect with us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-5 text-center text-[clamp(0.86rem,1vw,0.95rem)] font-normal text-white/70">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
