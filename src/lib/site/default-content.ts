import type { SiteContent } from "./types";

const u = (photoId: string, w = 800, h = 500) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const defaultSiteContent: SiteContent = {
  siteName: "Offerslu.lk",
  hero: {
    title: "Fashion Week Sale",
    subtitle: "Biggest Discounts of the Season",
    backgroundImageUrl: "/hero-bg.png",
    searchPlaceholder: "Search offers, brands, categories...",
  },
  categories: [],
  promotions: [],
  promotionSections: [],
  banks: [],
  about: {
    headline: "About Offerlu.lk",
    subheadline: "Sri Lanka’s offers, in one calm place.",
    paragraphs: [
      "Offerlu.lk brings together bank-backed deals, merchant promos, and seasonal campaigns so shoppers can compare what matters—without noisy threads or expired screenshots.",
      "We partner with banks and retailers to keep highlights accurate and easy to scan. Whether you are planning travel, a wardrobe refresh, or a weekend grocery run, start here.",
    ],
    collageImageUrls: [
      u("photo-1526170375885-4d8ecf77b99f", 600, 600),
      u("photo-1472851294608-062f824d29cc", 600, 600),
      u("photo-1517248135467-4c7edcad34c4", 600, 600),
      u("photo-1556742502-ec7c0e9f34b1", 600, 600),
    ],
    stats: [
      { value: "600+", label: "Active Offers" },
      { value: "100+", label: "Categories" },
      { value: "40+", label: "Partner Banks" },
    ],
  },
  socialLinks: [
    { id: "s1", platform: "Facebook", icon: "facebook", url: "https://facebook.com" },
    { id: "s2", platform: "Instagram", icon: "instagram", url: "https://instagram.com" },
    { id: "s3", platform: "X", icon: "x", url: "https://x.com" },
    { id: "s4", platform: "YouTube", icon: "youtube", url: "https://youtube.com" },
    { id: "s5", platform: "LinkedIn", icon: "linkedin", url: "https://linkedin.com" },
  ],
};
