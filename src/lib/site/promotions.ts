import type { Id, Promotion, SiteContent } from "./types";

export function promotionMapFrom(content: SiteContent): Map<Id, Promotion> {
  return new Map(content.promotions.map((p) => [p.id, p]));
}

export function resolvePromotionIds(
  content: SiteContent,
  ids: Id[],
): Promotion[] {
  const map = promotionMapFrom(content);
  return ids.map((id) => map.get(id)).filter(Boolean) as Promotion[];
}
