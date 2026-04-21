export type OfferStatus = "active" | "expired" | "upcoming";

export interface AdminOffer {
  id: string;
  title: string;
  companyName: string;
  companyLogoUrl: string;
  heroImageUrl: string;
  description: string;
  category: string;
  offerType: string;
  startDate: string;
  endDate: string;
  offerTypeIds: string[];
  categoryIds: string[];
  merchantIds: string[];
  paymentIds: string[];
  bankIds: string[];
  locationIds: string[];
}

export interface OfferDashboardStats {
  totalOffers: number;
  activeOffers: number;
  expiredOffers: number;
  expiringSoon: number;
}
