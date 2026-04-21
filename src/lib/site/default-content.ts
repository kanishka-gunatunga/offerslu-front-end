import type { SiteContent } from "./types";

const u = (photoId: string, w = 800, h = 500) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const defaultSiteContent: SiteContent = {
  siteName: "Offerlu.lk",
  hero: {
    title: "Fashion Week Sale",
    subtitle: "Biggest Discounts of the Season",
    backgroundImageUrl: u("photo-1441986300917-64674bd600d8", 2000, 1200),
    searchPlaceholder: "Search offers, brands, categories...",
  },
  categories: [
    {
      id: "cat-food",
      name: "Food & Dining",
      imageUrl: u("photo-1504674900247-0877df9cc836", 400, 400),
    },
    {
      id: "cat-fashion",
      name: "Fashion & Apparel",
      imageUrl: u("photo-1523381210434-271e8be1f52b", 400, 400),
    },
    {
      id: "cat-electronics",
      name: "Electronics",
      imageUrl: u("photo-1498049794561-7780e7231661", 400, 400),
    },
    {
      id: "cat-travel",
      name: "Travel",
      imageUrl: u("photo-1488646953014-85cb44e25828", 400, 400),
    },
    {
      id: "cat-health",
      name: "Health & Beauty",
      imageUrl: u("photo-1515377905703-c4788e51af15", 400, 400),
    },
    {
      id: "cat-events",
      name: "Events & Leisure",
      imageUrl: u("photo-1540575467063-178a50c2df87", 400, 400),
    },
    {
      id: "cat-other",
      name: "Other",
      imageUrl: u("photo-1556742049-0cfed4f6a45d", 400, 400),
    },
  ],
  promotions: [
    {
      id: "p1",
      title: "HNB Credit Card Offer — Flash Sale",
      description:
        "Up to 40% off at partner merchants this weekend. Tap in with your HNB card and stack rewards on dining and fashion.",
      bannerImageUrl: u("photo-1607082348824-0a96f2a4b9da", 800, 480),
      providerName: "HNB",
      providerLogoUrl:
        "https://ui-avatars.com/api/?name=HNB&background=0ea5e9&color=fff&size=128&rounded=true",
      categoryLabel: "Food & Dining",
      offerTypeLabel: "Flash Sale",
      validUntilLabel: "Valid until 31st March",
      detailHref: "#",
    },
    {
      id: "p2",
      title: "Nilai — Seasonal Wardrobe Drop",
      description:
        "Curated looks with limited-time markdowns on selected lines. Members get early access before public launch.",
      bannerImageUrl: u("photo-1469334031218-e382a71b716b", 800, 480),
      providerName: "Nilai",
      providerLogoUrl:
        "https://ui-avatars.com/api/?name=Nilai&background=6366f1&color=fff&size=128&rounded=true",
      categoryLabel: "Fashion & Apparel",
      offerTypeLabel: "Seasonal",
      validUntilLabel: "Valid until 15th April",
      detailHref: "#",
    },
    {
      id: "p3",
      title: "Food City — Weekend Groceries",
      description:
        "Bundle savings on fresh produce and pantry staples when you shop in-store or online with selected cards.",
      bannerImageUrl: u("photo-1542838132-92c53300491e", 800, 480),
      providerName: "Food City",
      providerLogoUrl:
        "https://ui-avatars.com/api/?name=Food+City&background=22c55e&color=fff&size=128&rounded=true",
      categoryLabel: "Food & Dining",
      offerTypeLabel: "Bundle",
      validUntilLabel: "Valid until 28th February",
      detailHref: "#",
    },
    {
      id: "p4",
      title: "Commercial Bank — Travel Perks",
      description:
        "Complimentary lounge passes and forex cashback on eligible travel spends booked with ComBank cards.",
      bannerImageUrl: u("photo-1436491865332-7a61a109cc05", 800, 480),
      providerName: "Commercial Bank",
      providerLogoUrl:
        "https://ui-avatars.com/api/?name=ComBank&background=f97316&color=fff&size=128&rounded=true",
      categoryLabel: "Travel",
      offerTypeLabel: "Travel",
      validUntilLabel: "Valid until 30th June",
      detailHref: "#",
    },
  ],
  promotionSections: [
    {
      id: "sec-latest",
      title: "Latest Promotions",
      subtitle: "Fresh picks updated for you",
      promotionIds: ["p1", "p2", "p3", "p4"],
    },
    {
      id: "sec-clothing",
      title: "Clothing Promotions",
      subtitle: "Deals on apparel and accessories",
      promotionIds: ["p2", "p4", "p1"],
    },
    {
      id: "sec-foods",
      title: "Foods Promotions",
      subtitle: "Dining and grocery highlights",
      promotionIds: ["p3", "p1", "p2"],
    },
  ],
  banks: [
    { id: "b1", name: "Hatton National Bank", logoUrl: "https://ui-avatars.com/api/?name=HNB&background=e2e8f0&color=0f172a&size=128&rounded=true" },
    { id: "b2", name: "Bank of Ceylon", logoUrl: "https://ui-avatars.com/api/?name=BOC&background=e2e8f0&color=0f172a&size=128&rounded=true" },
    { id: "b3", name: "Commercial Bank", logoUrl: "https://ui-avatars.com/api/?name=COM&background=e2e8f0&color=0f172a&size=128&rounded=true" },
    { id: "b4", name: "Sampath Bank", logoUrl: "https://ui-avatars.com/api/?name=SMP&background=e2e8f0&color=0f172a&size=128&rounded=true" },
    { id: "b5", name: "People's Bank", logoUrl: "https://ui-avatars.com/api/?name=PPL&background=e2e8f0&color=0f172a&size=128&rounded=true" },
    { id: "b6", name: "Nations Trust Bank", logoUrl: "https://ui-avatars.com/api/?name=NTB&background=e2e8f0&color=0f172a&size=128&rounded=true" },
    { id: "b7", name: "DFCC Bank", logoUrl: "https://ui-avatars.com/api/?name=DFC&background=e2e8f0&color=0f172a&size=128&rounded=true" },
    { id: "b8", name: "Seylan Bank", logoUrl: "https://ui-avatars.com/api/?name=SEY&background=e2e8f0&color=0f172a&size=128&rounded=true" },
    { id: "b9", name: "Pan Asia Bank", logoUrl: "https://ui-avatars.com/api/?name=PAB&background=e2e8f0&color=0f172a&size=128&rounded=true" },
    { id: "b10", name: "Union Bank", logoUrl: "https://ui-avatars.com/api/?name=UNI&background=e2e8f0&color=0f172a&size=128&rounded=true" },
    { id: "b11", name: "Cargills Bank", logoUrl: "https://ui-avatars.com/api/?name=CAR&background=e2e8f0&color=0f172a&size=128&rounded=true" },
    { id: "b12", name: "HSBC", logoUrl: "https://ui-avatars.com/api/?name=HSB&background=e2e8f0&color=0f172a&size=128&rounded=true" },
  ],
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
