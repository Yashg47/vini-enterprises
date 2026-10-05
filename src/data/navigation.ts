export interface NavItem {
  label: string;
  path: string;
  badge?: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Collections", path: "/collections" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
];

export const FOOTER_COLLECTIONS = [
  { label: "22K BIS Gold Jewellery", path: "/collections?category=gold" },
  { label: "Silver Jewellery (Bracelets, Chains, Rings, Kadha, Payal)", path: "/collections?category=silver" },
  { label: "Certified Natural Gemstones", path: "/collections?category=gemstone" },
  { label: "Jewellery Boxes (Necklace Set, Ring, Tops, Pendal, Chain / Payal)", path: "/collections?category=boxes" },
];

export const QUICK_LINKS = [
  { label: "Our Heritage & Story", path: "/about" },
  { label: "Explore Catalogue", path: "/collections" },
  { label: "B2B Wholesale Inquiry", path: "/contact?type=wholesale" },
  { label: "Customer Concierge", path: "/contact" },
];
