import {
  HOME_LATEST_PROMOTIONS_ID,
} from "@/lib/site/home-section-anchors";
import type { SiteContent } from "@/lib/site/types";
import type { SearchFilterOptions } from "./hero-section";

import { BanksSection } from "./banks-section";
import { CategoryRow } from "./category-row";
import { HeroSection } from "./hero-section";
import { LandingFooter } from "./landing-footer";
import { PromotionCornerDecor } from "./promotion-corner-decor";
import { PromotionCarousel } from "./promotion-carousel";
import { SiteHeader } from "./site-header";
import { SocialSection } from "./social-section";
import { WatermarkBg } from "./watermark-bg";

export function LandingView({
  content,
  searchFilters,
}: {
  content: SiteContent;
  searchFilters: SearchFilterOptions;
}) {
  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-[#fbfcff] text-slate-900">
      <SiteHeader siteName={content.siteName} />
      <WatermarkBg />
      <main className="flex-1">
        <HeroSection
          hero={content.hero}
          searchFilters={searchFilters}
        />
        <CategoryRow categories={content.categories} />
        <section
          id={HOME_LATEST_PROMOTIONS_ID}
          className="relative overflow-x-clip overflow-y-visible scroll-mt-24"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 left-1/2 z-0 w-full max-w-[1400px] -translate-x-1/2"
          >
            <div className="relative h-full min-h-px w-full">
              <div className="absolute top-[33px] left-[-64px] z-0 h-[235px] w-[78px] max-sm:top-[22px] max-sm:scale-[0.55] max-sm:origin-top-left sm:scale-100">
                <PromotionCornerDecor className="h-full w-full" />
              </div>
              <div className="absolute top-[-98px] left-[96.928571%] z-0 h-[235px] w-[78px] max-sm:top-[-56px] max-sm:scale-[0.55] max-sm:origin-top-right sm:scale-100">
                <PromotionCornerDecor className="h-full w-full" />
              </div>
            </div>
          </div>
          <div className="relative z-10">
            <PromotionCarousel
              title="Latest Promotions"
              subtitle="Check out the latest promotions just for you!"
              items={content.promotions}
            />
          </div>
        </section>
        <BanksSection banks={content.banks} />
        {content.clothingPromotions.length > 0 ? (
          <section className="relative overflow-x-clip">
            
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 left-1/2 z-0 w-full max-w-[1400px] -translate-x-1/2"
            >
              <div className="relative h-full min-h-px w-full">
                <div className="absolute top-[-31px] left-[93.142857%] z-0 h-[235px] w-[78px] max-sm:scale-[0.55] max-sm:origin-top-right sm:scale-100">
                  <PromotionCornerDecor className="h-full w-full" />
                </div>
                <div className="absolute top-[441px] left-[-11px] z-0 h-[235px] w-[78px] max-sm:top-[280px] max-sm:scale-[0.55] max-sm:origin-left sm:scale-100">
                  <PromotionCornerDecor className="h-full w-full" />
                </div>
                <div className="absolute top-[17px] left-[14.071429%] z-0 h-[117px] w-[39px] max-sm:left-[8%] max-sm:top-[10px] max-sm:scale-[0.6] max-sm:origin-top-left sm:scale-100">
                  <PromotionCornerDecor className="h-full w-full" />
                </div>
              </div>
            </div>
            <div className="relative z-10">
              <PromotionCarousel
                title="Clothing Promotions"
                subtitle="Explore personalized clothing deals just for you!"
                items={content.clothingPromotions}
              />
            </div>
          </section>
        ) : null}
        {content.foodPromotions.length > 0 ? (
          <section className="relative overflow-x-visible">
            
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 left-1/2 z-0 w-full max-w-[1400px] -translate-x-1/2"
            >
              <div className="relative h-full min-h-px w-full">
                <div className="absolute top-[292px] left-[-56px] z-0 h-[265px] w-[88px] max-sm:top-[220px] max-sm:scale-[0.62] max-sm:origin-left sm:scale-100">
                  <PromotionCornerDecor className="h-full w-full" />
                </div>
              </div>
            </div>
            <div className="relative z-10">
              <PromotionCarousel
                title="Foods Promotions"
                subtitle="Explore food restaurants exclusive offers for you!"
                items={content.foodPromotions}
              />
            </div>
          </section>
        ) : null}
        <SocialSection links={content.socialLinks} />
      </main>
      <LandingFooter siteName={content.siteName} />
    </div>
  );
}
