import { resolvePromotionIds } from "@/lib/site/promotions";
import type { SiteContent } from "@/lib/site/types";

import { AboutSection } from "./about-section";
import { BanksSection } from "./banks-section";
import { CategoryRow } from "./category-row";
import { HeroSection } from "./hero-section";
import { LandingFooter } from "./landing-footer";
import { PromotionCarousel } from "./promotion-carousel";
import { SiteHeader } from "./site-header";
import { SocialSection } from "./social-section";
import { WatermarkBg } from "./watermark-bg";

export function LandingView({ content }: { content: SiteContent }) {
  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-white text-slate-900">
      <WatermarkBg />
      <SiteHeader siteName={content.siteName} />
      <main className="flex-1 pt-16">
        <HeroSection hero={content.hero} />
        <CategoryRow categories={content.categories} />
        {content.promotionSections.map((section) => (
          <PromotionCarousel
            key={section.id}
            title={section.title}
            subtitle={section.subtitle}
            items={resolvePromotionIds(content, section.promotionIds)}
          />
        ))}
        <BanksSection banks={content.banks} />
        <AboutSection about={content.about} />
        <SocialSection links={content.socialLinks} />
      </main>
      <LandingFooter siteName={content.siteName} />
    </div>
  );
}
