export interface FlatOption {
  id: string;
  name: string;
}

export interface HierarchyOption {
  id: string;
  name: string;
  children?: FlatOption[];
}

export const offerTypeOptions: HierarchyOption[] = [
  {
    id: "ot-bogo",
    name: "Buy One Get One Free",
    children: [
      { id: "ot-bogo-same", name: "Same Item Free" },
      { id: "ot-bogo-second-half", name: "Second Item 50% Off" },
    ],
  },
  {
    id: "ot-cashback",
    name: "Cash Back",
    children: [
      { id: "ot-cashback-flat", name: "Flat Cashback" },
      { id: "ot-cashback-tiered", name: "Tiered Cashback" },
    ],
  },
  {
    id: "ot-discount",
    name: "Percentage Discount",
    children: [
      { id: "ot-discount-flat", name: "Flat Percentage" },
      { id: "ot-discount-slab", name: "Slab Based" },
    ],
  },
  {
    id: "ot-bundle",
    name: "Bundle Offer",
    children: [
      { id: "ot-bundle-combo", name: "Combo Pack" },
      { id: "ot-bundle-mix", name: "Mix & Match" },
    ],
  },
];

export const categoryOptions: HierarchyOption[] = [
  {
    id: "cat-electronics",
    name: "Electronics",
    children: [
      { id: "cat-electronics-tv", name: "TV" },
      { id: "cat-electronics-mobile", name: "Mobile Phones" },
      { id: "cat-electronics-audio", name: "Audio Systems" },
    ],
  },
  {
    id: "cat-food",
    name: "Food & Dining",
    children: [
      { id: "cat-food-fastfood", name: "Fast Food" },
      { id: "cat-food-cafe", name: "Cafe" },
      { id: "cat-food-grocery", name: "Grocery" },
    ],
  },
  {
    id: "cat-fashion",
    name: "Fashion",
    children: [
      { id: "cat-fashion-men", name: "Men" },
      { id: "cat-fashion-women", name: "Women" },
      { id: "cat-fashion-kids", name: "Kids" },
    ],
  },
];

export const merchantOptions: HierarchyOption[] = [
  {
    id: "mer-food",
    name: "Food Chains",
    children: [
      { id: "mer-kfc", name: "KFC" },
      { id: "mer-pizzahut", name: "Pizza Hut" },
      { id: "mer-burgerking", name: "Burger King" },
    ],
  },
  {
    id: "mer-retail",
    name: "Retail Stores",
    children: [
      { id: "mer-keells", name: "Keells" },
      { id: "mer-arpico", name: "Arpico" },
      { id: "mer-laugfs", name: "Laugfs Super" },
    ],
  },
];

export const paymentOptions: HierarchyOption[] = [
  {
    id: "pay-cash",
    name: "Cash",
  },
  {
    id: "pay-card",
    name: "Card",
    children: [
      { id: "pay-card-visa", name: "Visa" },
      { id: "pay-card-mastercard", name: "Mastercard" },
      { id: "pay-card-amex", name: "Amex" },
    ],
  },
  {
    id: "pay-voucher",
    name: "Vouchers",
    children: [
      { id: "pay-voucher-gift", name: "Gift Voucher" },
      { id: "pay-voucher-evoucher", name: "E-Voucher" },
    ],
  },
  {
    id: "pay-loyalty",
    name: "Loyalty",
    children: [
      { id: "pay-loyalty-nexus", name: "Nexus" },
      { id: "pay-loyalty-star", name: "Star Loyalty" },
      { id: "pay-loyalty-plus", name: "Loyalty Plus" },
    ],
  },
];

export const bankOptions: FlatOption[] = [
  { id: "bank-hnb", name: "HNB" },
  { id: "bank-boc", name: "Bank of Ceylon" },
  { id: "bank-combank", name: "Commercial Bank" },
  { id: "bank-sampath", name: "Sampath Bank" },
];

export const locationOptions: FlatOption[] = [
  { id: "loc-colombo", name: "Colombo" },
  { id: "loc-kandy", name: "Kandy" },
  { id: "loc-galle", name: "Galle" },
  { id: "loc-jaffna", name: "Jaffna" },
];
