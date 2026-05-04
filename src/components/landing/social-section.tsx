import { HOME_CONNECT_WITH_US_ID } from "@/lib/site/home-section-anchors";
import type { SocialLink } from "@/lib/site/types";
import { Inter, Open_Sans } from "next/font/google";

import { PromotionCornerDecor } from "./promotion-corner-decor";

const openSans = Open_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
});

const inter = Inter({
  weight: ["600"],
  subsets: ["latin"],
});

function SocialGlyph({ icon }: { icon: SocialLink["icon"] }) {
  switch (icon) {
    case "facebook":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <path
            d="M21 2.3335H17.5C15.9529 2.3335 14.4692 2.94808 13.3752 4.04204C12.2813 5.136 11.6667 6.61973 11.6667 8.16683V11.6668H8.16669V16.3335H11.6667V25.6668H16.3334V16.3335H19.8334L21 11.6668H16.3334V8.16683C16.3334 7.85741 16.4563 7.56066 16.6751 7.34187C16.8939 7.12308 17.1906 7.00016 17.5 7.00016H21V2.3335Z"
            stroke="#0066FF"
            strokeWidth="2.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <path
            d="M19.8333 2.3335H8.16668C4.94502 2.3335 2.33334 4.94517 2.33334 8.16683V19.8335C2.33334 23.0552 4.94502 25.6668 8.16668 25.6668H19.8333C23.055 25.6668 25.6667 23.0552 25.6667 19.8335V8.16683C25.6667 4.94517 23.055 2.3335 19.8333 2.3335Z"
            stroke="#EC4899"
            strokeWidth="2.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.6667 13.2649C18.8107 14.2358 18.6448 15.2274 18.1927 16.0987C17.7407 16.97 17.0254 17.6765 16.1486 18.1178C15.2718 18.5591 14.2782 18.7127 13.3091 18.5568C12.34 18.4008 11.4447 17.9433 10.7507 17.2492C10.0566 16.5551 9.59904 15.6599 9.44309 14.6908C9.28715 13.7217 9.44076 12.7281 9.88206 11.8513C10.3234 10.9745 11.0299 10.2592 11.9012 9.80715C12.7724 9.35506 13.7641 9.18922 14.735 9.3332C15.7254 9.48006 16.6423 9.94157 17.3503 10.6496C18.0583 11.3575 18.5198 12.2745 18.6667 13.2649Z"
            stroke="#EC4899"
            strokeWidth="2.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.4167 7.5835H20.4283"
            stroke="#EC4899"
            strokeWidth="2.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <path
            d="M2.91667 19.8333C2.10166 15.9871 2.10166 12.0129 2.91667 8.16667C3.02375 7.77608 3.23066 7.42009 3.51704 7.13371C3.80342 6.84733 4.15941 6.64042 4.55 6.53333C10.8074 5.4967 17.1926 5.4967 23.45 6.53333C23.8406 6.64042 24.1966 6.84733 24.483 7.13371C24.7693 7.42009 24.9762 7.77608 25.0833 8.16667C25.8983 12.0129 25.8983 15.9871 25.0833 19.8333C24.9762 20.2239 24.7693 20.5799 24.483 20.8663C24.1966 21.1527 23.8406 21.3596 23.45 21.4667C17.1927 22.5035 10.8073 22.5035 4.55 21.4667C4.15941 21.3596 3.80342 21.1527 3.51704 20.8663C3.23066 20.5799 3.02375 20.2239 2.91667 19.8333Z"
            stroke="#EF4444"
            strokeWidth="2.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.6667 17.5L17.5 14L11.6667 10.5V17.5Z"
            stroke="#EF4444"
            strokeWidth="2.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <path
            d="M18.6667 9.3335C20.5232 9.3335 22.3036 10.071 23.6164 11.3837C24.9292 12.6965 25.6667 14.477 25.6667 16.3335V24.5002H21V16.3335C21 15.7147 20.7542 15.1212 20.3166 14.6836C19.879 14.246 19.2855 14.0002 18.6667 14.0002C18.0478 14.0002 17.4543 14.246 17.0167 14.6836C16.5792 15.1212 16.3333 15.7147 16.3333 16.3335V24.5002H11.6667V16.3335C11.6667 14.477 12.4042 12.6965 13.7169 11.3837C15.0297 10.071 16.8101 9.3335 18.6667 9.3335Z"
            stroke="#0066FF"
            strokeWidth="2.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.00001 10.5H2.33334V24.5H7.00001V10.5Z"
            stroke="#0066FF"
            strokeWidth="2.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.66668 7.00016C5.95534 7.00016 7.00001 5.95549 7.00001 4.66683C7.00001 3.37816 5.95534 2.3335 4.66668 2.3335C3.37801 2.3335 2.33334 3.37816 2.33334 4.66683C2.33334 5.95549 3.37801 7.00016 4.66668 7.00016Z"
            stroke="#0066FF"
            strokeWidth="2.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "x":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M13.941 10.392L21.5355 1.5H19.7355L13.143 9.2205L7.875 1.5H1.8L9.76501 13.176L1.8 22.5H3.6L10.563 14.346L16.1265 22.5H22.2015L13.941 10.392ZM11.4765 13.278L10.6695 12.1155L4.248 2.865H7.0125L12.1935 10.3305L13.0005 11.493L19.737 21.198H16.9725L11.4765 13.278Z"
            fill="black"
          />
        </svg>
      );
    default:
      return null;
  }
}

function socialMeta(icon: SocialLink["icon"]) {
  switch (icon) {
    case "facebook":
      return { handle: "@offerslu", stat: "25K Followers", iconBg: "bg-[#EFF6FF]" };
    case "instagram":
      return { handle: "@offerslu", stat: "18K Followers", iconBg: "bg-[#FDF2F8]" };
    case "youtube":
      return { handle: "@offerslu", stat: "8K Subscribers", iconBg: "bg-[#FEF2F2]" };
    case "linkedin":
      return { handle: "Offerslu", stat: "5K Followers", iconBg: "bg-[#EFF6FF]" };
    case "x":
    default:
      return { handle: "@offerslu", stat: "12K Followers", iconBg: "bg-[#E5E5E5]" };
  }
}

export function SocialSection({ links }: { links: SocialLink[] }) {
  return (
    <section
      id={HOME_CONNECT_WITH_US_ID}
      className="relative scroll-mt-24 overflow-x-clip overflow-y-visible py-10 sm:py-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 left-1/2 z-0 w-full max-w-[1400px] -translate-x-1/2"
      >
        <div className="relative h-full min-h-px w-full">
          <div className="absolute top-[81px] left-[5.571429%] z-0 h-[147px] w-[49px] max-sm:top-[64px] max-sm:scale-[0.62] max-sm:origin-top-left sm:scale-100">
            <PromotionCornerDecor className="h-full w-full" />
          </div>
          <div className="absolute top-[-18px] left-[94.642857%] z-0 h-[213px] w-[70px] max-sm:top-[-12px] max-sm:scale-[0.62] max-sm:origin-top-right sm:scale-100">
            <PromotionCornerDecor className="h-full w-full" />
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            className={`${openSans.className} text-[clamp(1.35rem,3vw,30px)] font-semibold leading-6 tracking-normal text-black`}
          >
            Connect with us
          </h2>
          <p
            className={`${openSans.className} mx-auto mt-3 max-w-[663px] text-[clamp(0.95rem,2.1vw,19px)] font-semibold leading-6 tracking-normal text-[#787878]`}
          >
            Follow us on social media for daily deals, exclusive offers, and the latest
            updates. Join our community and never miss a great deal!
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {links.map((l) => {
            const meta = socialMeta(l.icon);
            return (
              <a
                key={l.id}
                href={l.url}
                className="mx-auto flex w-full max-w-[236px] min-h-[206px] flex-col rounded-[15px] border border-[#DDDDDD] bg-white p-5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl px-[14px] ${meta.iconBg}`}
                >
                  <SocialGlyph icon={l.icon} />
                </span>
                <span className="mt-4 flex flex-col">
                  <span
                    className={`${openSans.className} text-[clamp(0.95rem,1.7vw,1rem)] font-semibold leading-6 tracking-normal text-[#1A1D29]`}
                  >
                    {l.platform}
                  </span>
                  <span
                    className={`${openSans.className} mt-0.5 text-[clamp(0.95rem,1.7vw,1rem)] font-normal leading-6 tracking-normal text-[#6B7280]`}
                  >
                    {meta.handle}
                  </span>
                  <span
                    className={`${inter.className} mt-2 text-[clamp(0.95rem,1.7vw,1rem)] font-semibold leading-6 tracking-normal text-[#10B981]`}
                  >
                    {meta.stat}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
