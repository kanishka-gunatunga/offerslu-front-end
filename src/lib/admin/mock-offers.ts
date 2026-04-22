import type { AdminOffer, OfferDashboardStats, OfferStatus } from "./types";

export const adminMockOffers: AdminOffer[] = [
  {
    id: "ofr-001",
    title: "HNB Credit Card Offer - Flash Sale",
    companyName: "Laugfs Super",
    companyLogoUrl: "/offerslu-logo.svg",
    heroImageUrl:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&h=700&q=80",
    description:
      "Limited time flash sale on luxury handbags. Stock limited, hurry now!",
    category: "Food & Dining",
    offerType: "Flash Sale",
    startDate: "2026-04-20",
    endDate: "2026-04-22",
    offerTypeIds: ["ot-discount", "ot-discount-flat"],
    categoryIds: ["cat-food", "cat-food-fastfood"],
    merchantIds: ["mer-retail", "mer-laugfs"],
    paymentIds: ["pay-card", "pay-card-visa"],
    bankIds: ["bank-hnb"],
    locationIds: ["loc-colombo"],
  },
  {
    id: "ofr-002",
    title: "Keells Weekend Grocery Saver",
    companyName: "Keells",
    companyLogoUrl: "/offerslu-logo.svg",
    heroImageUrl:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&h=700&q=80",
    description:
      "Save more on daily essentials with card partner discounts and combo packs.",
    category: "Groceries",
    offerType: "Card Partner",
    startDate: "2026-04-18",
    endDate: "2026-05-05",
    offerTypeIds: ["ot-cashback", "ot-cashback-tiered"],
    categoryIds: ["cat-food", "cat-food-grocery"],
    merchantIds: ["mer-retail", "mer-keells"],
    paymentIds: ["pay-card", "pay-card-mastercard"],
    bankIds: ["bank-combank"],
    locationIds: ["loc-colombo", "loc-kandy"],
  },
  {
    id: "ofr-003",
    title: "Tech World New Year Offer",
    companyName: "Tech World",
    companyLogoUrl: "/offerslu-logo.svg",
    heroImageUrl:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&h=700&q=80",
    description:
      "Special prices on selected accessories and gadgets for a limited period.",
    category: "Electronics",
    offerType: "Seasonal",
    startDate: "2026-03-15",
    endDate: "2026-04-10",
    offerTypeIds: ["ot-bundle", "ot-bundle-combo"],
    categoryIds: ["cat-electronics", "cat-electronics-tv"],
    merchantIds: ["mer-retail", "mer-arpico"],
    paymentIds: ["pay-voucher", "pay-voucher-gift"],
    bankIds: ["bank-sampath"],
    locationIds: ["loc-galle"],
  },
  {
    id: "ofr-004",
    title: "Salon Care Midweek Discount",
    companyName: "Salon Care",
    companyLogoUrl: "/offerslu-logo.svg",
    heroImageUrl:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&h=700&q=80",
    description:
      "Hair and skincare service discount available every Wednesday and Thursday.",
    category: "Health & Beauty",
    offerType: "Limited Time",
    startDate: "2026-05-01",
    endDate: "2026-05-31",
    offerTypeIds: ["ot-bogo", "ot-bogo-same"],
    categoryIds: ["cat-fashion", "cat-fashion-women"],
    merchantIds: ["mer-retail", "mer-laugfs"],
    paymentIds: ["pay-loyalty", "pay-loyalty-star"],
    bankIds: ["bank-boc"],
    locationIds: ["loc-colombo", "loc-jaffna"],
  },
];

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function getOfferStatus(offer: AdminOffer, now = new Date()): OfferStatus {
  if (offer.isInactive) return "inactive";
  const start = new Date(offer.startDate);
  const end = new Date(offer.endDate);
  if (now < start) return "upcoming";
  if (now > end) return "expired";
  return "active";
}

export function getDaysLeft(offer: AdminOffer, now = new Date()): number {
  const end = new Date(offer.endDate);
  return Math.max(0, Math.ceil((end.getTime() - now.getTime()) / ONE_DAY_MS));
}

export function getOfferDashboardStats(
  offers: AdminOffer[],
  now = new Date(),
): OfferDashboardStats {
  const activeOffers = offers.filter((offer) => getOfferStatus(offer, now) === "active");
  const expiredOffers = offers.filter((offer) => getOfferStatus(offer, now) === "expired");
  const expiringSoon = activeOffers.filter((offer) => getDaysLeft(offer, now) <= 7);
  return {
    totalOffers: offers.length,
    activeOffers: activeOffers.length,
    expiredOffers: expiredOffers.length,
    expiringSoon: expiringSoon.length,
  };
}
