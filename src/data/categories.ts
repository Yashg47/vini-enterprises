import goldRing from "../assets/images/gold-ring.jpg";
import silverRing from "../assets/images/silver-ring.jpg";
import ruby from "../assets/images/ruby.jpg";
import box from "../assets/images/box.jpg";

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  tagline: string;
  itemCount: string;
  subcategories?: string[];
}

export const SILVER_SUBSECTIONS = [
  "Bracelets",
  "Chains",
  "Rings",
  "Kadha",
  "Payal",
] as const;

export type SilverSubsection = (typeof SILVER_SUBSECTIONS)[number];

export const BOXES_SUBSECTIONS = [
  "Necklace Set Box",
  "Ring Box",
  "Tops Box",
  "Pendal Box",
  "Chain / Payal Box",
] as const;

export type BoxesSubsection = (typeof BOXES_SUBSECTIONS)[number];

export const categories: Category[] = [
  {
    id: "gold",
    name: "Gold Jewellery",
    image: goldRing,
    description: "Handcrafted 22K & 18K BIS Hallmarked jewellery designed with timeless Indian artistry.",
    tagline: "BIS 916 Hallmarked",
    itemCount: "40+ Designs",
  },
  {
    id: "silver",
    name: "Silver Jewellery",
    image: silverRing,
    description: "Authentic 925 Silver Jewellery across curated subsections: Bracelets, Chains, Rings, Kadha, and Payal.",
    tagline: "925 Pure Silver",
    itemCount: "5 Subsections",
    subcategories: ["Bracelets", "Chains", "Rings", "Kadha", "Payal"],
  },
  {
    id: "gemstone",
    name: "Natural Gemstones",
    image: ruby,
    description: "Untreated, laboratory-certified precious rubies, sapphires, emeralds, and astrological stones.",
    tagline: "Lab Certified & Vedic",
    itemCount: "50+ Rare Stones",
  },
  {
    id: "boxes",
    name: "Jewellery Boxes",
    image: box,
    description: "Handcrafted presentation boxes across dedicated subsections: Necklace Set Box, Ring Box, Tops Box, Pendal Box, and Chain / Payal Box.",
    tagline: "Premium Craftsmanship",
    itemCount: "5 Subsections",
    subcategories: [
      "Necklace Set Box",
      "Ring Box",
      "Tops Box",
      "Pendal Box",
      "Chain / Payal Box",
    ],
  },
];