import type { SiteContent } from "@/lib/site/types";

import { BanksSection } from "./banks-section";
import { CategoryRow } from "./category-row";
import { HeroSection } from "./hero-section";
import { LandingFooter } from "./landing-footer";
import { PromotionCornerDecor } from "./promotion-corner-decor";
import { PromotionCarousel } from "./promotion-carousel";
import { SiteHeader } from "./site-header";
import { SocialSection } from "./social-section";
import { WatermarkBg } from "./watermark-bg";

export function LandingView({ content }: { content: SiteContent }) {
  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-[#fbfcff] text-slate-900">
      <SiteHeader siteName={content.siteName} />
      <WatermarkBg />
      <main className="flex-1">
        <HeroSection hero={content.hero} />
        <CategoryRow categories={content.categories} />
        <section className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute top-20 left-0 z-0"
          >
            <PromotionCornerDecor />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 z-0"
          >
            <PromotionCornerDecor />
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
          <PromotionCarousel
            title="Clothing Promotions"
            subtitle="Explore personalized clothing deals just for you!"
            items={content.clothingPromotions}
          />
        ) : null}
        {content.foodPromotions.length > 0 ? (
          <PromotionCarousel
            title="Foods Promotions"
            subtitle="Explore food restaurants exclusive offers for you!"
            items={content.foodPromotions}
          />
        ) : null}
        <SocialSection links={content.socialLinks} />
      </main>
      <LandingFooter siteName={content.siteName} />
    </div>
  );
}
