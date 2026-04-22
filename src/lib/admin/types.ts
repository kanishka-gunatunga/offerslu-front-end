export type OfferStatus = "active" | "expired" | "upcoming" | "inactive";

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
  isInactive?: boolean;
}

export interface OfferDashboardStats {
  totalOffers: number;
  activeOffers: number;
  expiredOffers: number;
  expiringSoon: number;
}
