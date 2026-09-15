import goldRing from "../assets/images/gold-ring.jpg";
import silverRing from "../assets/images/silver-ring.jpg";
import silverBand from "../assets/images/silver-band.jpg";
import necklace from "../assets/images/necklace.jpg";
import ruby from "../assets/images/ruby.jpg";
import blueSapphire from "../assets/images/blue-sapphire.jpg";
import yellowSapphire from "../assets/images/yellow-sapphire.jpg";
import amethyst from "../assets/images/amethyst.jpg";
import box from "../assets/images/box.jpg";
import topsBoxClosedFront from "../assets/images/tops-box-closed-front.jpg";
import topsBoxOpenFront from "../assets/images/tops-box-open-front.jpg";
import topsBoxSideOpen from "../assets/images/tops-box-side-open.jpg";
import diamondHaloRingFront from "../assets/images/diamond-halo-ring-front.jpg";
import diamondHaloRingSide from "../assets/images/diamond-halo-ring-side.jpg";
import diamondHaloRingBack from "../assets/images/diamond-halo-ring-back.jpg";

export type SilverSubsection = "Bracelets" | "Chains" | "Rings" | "Kadha" | "Payal";
export type BoxesSubsection =
  | "Necklace Set Box"
  | "Ring Box"
  | "Tops Box"
  | "Pendal Box"
  | "Chain / Payal Box";

export type ProductSubsection = SilverSubsection | BoxesSubsection;

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "Gold Jewellery" | "Silver Jewellery" | "Gemstones" | "Jewellery Boxes";
  categoryId: "gold" | "silver" | "gemstone" | "boxes";
  subsection?: ProductSubsection;
  image: string;
  images: string[];
  hallmark: string;
  material: string;
  gemstone: string;
  origin?: string;
  weightApprox?: string;
  description: string;
  specifications: { label: string; value: string }[];
  featured: boolean;
}

export const products: Product[] = [
  // GOLD JEWELLERY
  {
    id: "gold-necklace-001",
    slug: "maharani-bridal-gold-necklace",
    name: "Maharani Bridal 22K Gold Necklace",
    category: "Gold Jewellery",
    categoryId: "gold",
    image: necklace,
    images: [necklace],
    hallmark: "BIS 916 Hallmarked",
    material: "22K Solid Yellow Gold",
    gemstone: "Natural Emerald & Ruby Accents",
    origin: "Bengal Craftsmanship",
    weightApprox: "42.50 grams",
    description:
      "A magnificent heirloom bridal necklace sculpted in pure 22 Karat gold with fine filigree work and authentic gemstone drop clusters. Designed for weddings and grand celebrations.",
    specifications: [
      { label: "Purity", value: "22 Karat (91.6% Pure Gold)" },
      { label: "Certification", value: "BIS Hallmark with HUID" },
      { label: "Gemstones", value: "Natural Emerald & Ruby Cabochons" },
      { label: "Approx. Weight", value: "42.50 gms" },
      { label: "Making", value: "Handcrafted Heritage Filigree" },
    ],
    featured: true,
  },
  {
    id: "gold-ring-001",
    slug: "royal-heritage-22k-gold-ring",
    name: "Royal Heritage 22K Gold Ring",
    category: "Gold Jewellery",
    categoryId: "gold",
    image: goldRing,
    images: [goldRing],
    hallmark: "BIS 916 Hallmarked",
    material: "22K Solid Gold",
    gemstone: "Natural Red Ruby",
    origin: "Handcrafted in India",
    weightApprox: "6.80 grams",
    description:
      "Classic artisanal 22K solid gold ring featuring delicate hand-carved detailing and a central authentic natural ruby. Engineered with comfort fit and timeless distinction.",
    specifications: [
      { label: "Gold Purity", value: "22K (916 BIS Hallmarked)" },
      { label: "Center Stone", value: "Natural Unheated Ruby" },
      { label: "Gross Weight", value: "6.80 gms" },
      { label: "Finish", value: "High Polish & Antique Matte" },
      { label: "Hallmark", value: "Govt. Hallmarked with Laser HUID" },
    ],
    featured: true,
  },

  // SILVER JEWELLERY SUBSECTIONS
  {
    id: "silver-bracelet-001",
    slug: "royal-byzantine-925-silver-bracelet",
    name: "Royal Byzantine 925 Silver Bracelet",
    category: "Silver Jewellery",
    categoryId: "silver",
    subsection: "Bracelets",
    image: silverBand,
    images: [silverBand],
    hallmark: "925 Pure Silver",
    material: "Solid 925 Sterling Silver",
    gemstone: "None",
    origin: "Artisanal Silversmithing",
    weightApprox: "24.50 grams",
    description:
      "Heavy-gauge solid 925 pure silver link bracelet with intricate woven Byzantine design and an engineered box clasp. Coated with anti-tarnish rhodium.",
    specifications: [
      { label: "Subsection", value: "Bracelets" },
      { label: "Silver Purity", value: "92.5% Fine Silver (925)" },
      { label: "Length", value: "8.25 inches" },
      { label: "Clasp", value: "Secure Double-Locking Box Clasp" },
      { label: "Coating", value: "High-Micron Anti-Tarnish Rhodium" },
    ],
    featured: true,
  },
  {
    id: "silver-chain-001",
    slug: "classic-curb-link-925-silver-chain",
    name: "Classic Curb Link 925 Silver Chain",
    category: "Silver Jewellery",
    categoryId: "silver",
    subsection: "Chains",
    image: silverBand,
    images: [silverBand],
    hallmark: "925 Pure Silver",
    material: "Solid 925 Sterling Silver",
    gemstone: "None",
    origin: "Precision Crafted",
    weightApprox: "32.00 grams",
    description:
      "Polished heavy 925 pure silver chain featuring bevel-cut curb links that reflect light brilliantly. Designed for daily comfort and timeless luxury.",
    specifications: [
      { label: "Subsection", value: "Chains" },
      { label: "Silver Purity", value: "925 Certified Silver" },
      { label: "Width", value: "5.5 mm" },
      { label: "Length", value: "22 inches" },
      { label: "Lock Type", value: "Heavy-Duty Lobster Clasp" },
    ],
    featured: true,
  },
  {
    id: "silver-ring-001",
    slug: "artisan-925-silver-ring",
    name: "Artisan 925 Silver Statement Ring",
    category: "Silver Jewellery",
    categoryId: "silver",
    subsection: "Rings",
    image: silverRing,
    images: [silverRing],
    hallmark: "925 Pure Silver",
    material: "Solid 925 Sterling Silver",
    gemstone: "Natural Amethyst Accent",
    origin: "Handmade in India",
    weightApprox: "7.20 grams",
    description:
      "Solid 925 silver artisan-carved ring finished with high-durability platinum-rhodium plating. Resists oxidation and provides enduring everyday luxury.",
    specifications: [
      { label: "Subsection", value: "Rings" },
      { label: "Silver Purity", value: "92.5% Pure Silver" },
      { label: "Stamp", value: "925 Hallmarked" },
      { label: "Plating", value: "Anti-Tarnish Rhodium Coat" },
      { label: "Gemstone", value: "Natural Amethyst" },
    ],
    featured: true,
  },
  {
    id: "silver-band-001",
    slug: "eternal-comfort-fit-silver-band",
    name: "Eternal Comfort-Fit 925 Silver Band",
    category: "Silver Jewellery",
    categoryId: "silver",
    subsection: "Rings",
    image: silverBand,
    images: [silverBand],
    hallmark: "925 Pure Silver",
    material: "Solid 925 Sterling Silver",
    gemstone: "None",
    origin: "India",
    weightApprox: "5.40 grams",
    description:
      "Sleek and polished 925 silver comfort-fit band. Precision-crafted for seamless daily wear, modern couples, and gifting.",
    specifications: [
      { label: "Subsection", value: "Rings" },
      { label: "Metal", value: "925 Fine Silver" },
      { label: "Band Width", value: "5.5 mm" },
      { label: "Fit Type", value: "Inner Comfort Curved Fit" },
      { label: "Finish", value: "Mirror Polish" },
    ],
    featured: false,
  },
  {
    id: "silver-ring-002",
    slug: "diamond-double-halo-925-silver-ring",
    name: "Diamond Double Halo 925 Silver Cluster Ring",
    category: "Silver Jewellery",
    categoryId: "silver",
    subsection: "Rings",
    image: diamondHaloRingFront,
    images: [diamondHaloRingFront, diamondHaloRingSide, diamondHaloRingBack],
    hallmark: "925 Pure Silver",
    material: "Solid 925 Sterling Silver with Rhodium Plating",
    gemstone: "AAA Cubic Zirconia (Diamond Simulant)",
    origin: "Handcrafted in India",
    weightApprox: "9.50 grams",
    description:
      "Stunning 925 silver double halo cluster ring featuring a triple-band split shank set with brilliantly faceted AAA cubic zirconia stones. The layered halo design with a diamond-shaped centre cluster radiates maximum sparkle, making it a showstopper for engagements, weddings, and festive occasions.",
    specifications: [
      { label: "Subsection", value: "Rings" },
      { label: "Silver Purity", value: "92.5% Pure Silver (925 Hallmarked)" },
      { label: "Plating", value: "Anti-Tarnish Rhodium Coat" },
      { label: "Stone", value: "AAA Cubic Zirconia — Round Brilliant Cut" },
      { label: "Band Style", value: "Triple Split-Shank" },
      { label: "Setting", value: "Pavé & Prong Double Halo" },
    ],
    featured: true,
  },
  {
    id: "silver-kadha-001",
    slug: "traditional-solid-silver-kadha",
    name: "Traditional Solid 925 Silver Kadha",
    category: "Silver Jewellery",
    categoryId: "silver",
    subsection: "Kadha",
    image: silverRing,
    images: [silverRing],
    hallmark: "925 Pure Silver",
    material: "Solid 925 Sterling Silver",
    gemstone: "None",
    origin: "Jaipur Artisanal Workshop",
    weightApprox: "58.00 grams",
    description:
      "Prestigious heavy solid 925 silver kadha handcrafted with auspicious floral filigree and royal lion terminal ends. Traditional, robust, and hallmarked.",
    specifications: [
      { label: "Subsection", value: "Kadha" },
      { label: "Purity", value: "925 Fine Silver (92.5%)" },
      { label: "Weight Approx.", value: "58.00 gms" },
      { label: "Diameter / Size", value: "2.6 / 2.8 / 3.0 Custom" },
      { label: "Style", value: "Bahubali Hand-Chiseled Kadha" },
    ],
    featured: true,
  },
  {
    id: "silver-payal-001",
    slug: "artisanal-ghungroo-silver-payal-pair",
    name: "Artisanal Ghungroo 925 Silver Payal (Pair)",
    category: "Silver Jewellery",
    categoryId: "silver",
    subsection: "Payal",
    image: silverBand,
    images: [silverBand],
    hallmark: "925 Pure Silver",
    material: "Solid 925 Sterling Silver",
    gemstone: "None",
    origin: "Traditional Indian Silversmiths",
    weightApprox: "64.00 grams (Pair)",
    description:
      "Glorious pair of traditional Indian bridal silver payals adorned with melodic ghungroo bells and hand-linked mesh. Crafted for auspicious weddings and festive grace.",
    specifications: [
      { label: "Subsection", value: "Payal" },
      { label: "Purity", value: "Authentic 925 Silver" },
      { label: "Set", value: "Complete Pair (2 Pieces)" },
      { label: "Weight Approx.", value: "64.00 gms" },
      { label: "Closure", value: "Traditional S-Hook with Security Wire" },
    ],
    featured: true,
  },

  // GEMSTONES
  {
    id: "ruby-001",
    slug: "burmese-natural-ruby-manikya",
    name: "Certified Burmese Natural Ruby (Manikya)",
    category: "Gemstones",
    categoryId: "gemstone",
    image: ruby,
    images: [ruby],
    hallmark: "Govt. Lab Certified",
    material: "Precious Corundum",
    gemstone: "Natural Untreated Ruby",
    origin: "Burma (Myanmar)",
    weightApprox: "4.25 Carats (Ratti)",
    description:
      "Deep pigeon blood red natural ruby of extraordinary clarity, natural silk luster, and fiery brilliance. 100% unheated and untreated, astrologically energized for Sun (Surya) benefits.",
    specifications: [
      { label: "Mineral", value: "Natural Corundum" },
      { label: "Color", value: "Vivid Pigeon Blood Red" },
      { label: "Carat Weight", value: "4.25 Carats" },
      { label: "Treatment", value: "100% Natural & Untreated" },
      { label: "Certification", value: "Govt. Recognized Gemological Lab" },
      { label: "Astrological Planet", value: "Surya (Sun) - Leadership & Vitality" },
    ],
    featured: true,
  },
  {
    id: "blue-sapphire-001",
    slug: "ceylon-royal-blue-sapphire-neelam",
    name: "Royal Ceylon Blue Sapphire (Neelam)",
    category: "Gemstones",
    categoryId: "gemstone",
    image: blueSapphire,
    images: [blueSapphire],
    hallmark: "Govt. Lab Certified",
    material: "Natural Corundum",
    gemstone: "Sri Lankan Blue Sapphire",
    origin: "Ceylon (Sri Lanka)",
    weightApprox: "5.10 Carats",
    description:
      "Captivating royal cornflower blue natural sapphire sourced from premier mines in Sri Lanka. Exceptional transparency with sharp facet luster, certified for astrological potency under Saturn (Shani).",
    specifications: [
      { label: "Variety", value: "Natural Blue Sapphire" },
      { label: "Origin", value: "Ratnapura, Sri Lanka (Ceylon)" },
      { label: "Weight", value: "5.10 Carats" },
      { label: "Cut", value: "Cushion Brilliant Mixed Cut" },
      { label: "Lab Certificate", value: "Authorized Gemological Laboratory" },
      { label: "Astrological Planet", value: "Shani (Saturn) - Focus & Success" },
    ],
    featured: true,
  },
  {
    id: "yellow-sapphire-001",
    slug: "vedic-natural-yellow-sapphire-pukhraj",
    name: "Vedic Natural Yellow Sapphire (Pukhraj)",
    category: "Gemstones",
    categoryId: "gemstone",
    image: yellowSapphire,
    images: [yellowSapphire],
    hallmark: "Govt. Lab Certified",
    material: "Natural Corundum",
    gemstone: "Yellow Sapphire (Pukhraj)",
    origin: "Ceylon (Sri Lanka)",
    weightApprox: "4.85 Carats",
    description:
      "Auspicious golden canary yellow sapphire with supreme crystalline purity. Unheated and completely natural, ideal for Jupiter (Guru) astrological wear to invite wisdom, prosperity, and good fortune.",
    specifications: [
      { label: "Species", value: "Natural Corundum" },
      { label: "Color Tone", value: "Canary Golden Yellow" },
      { label: "Carat Weight", value: "4.85 Carats" },
      { label: "Enhancement", value: "None (Unheated / Natural)" },
      { label: "Planet Association", value: "Guru / Brihaspati (Jupiter)" },
    ],
    featured: true,
  },
  {
    id: "amethyst-001",
    slug: "royal-deep-purple-amethyst-jamunia",
    name: "Imperial Deep Purple Amethyst (Jamunia)",
    category: "Gemstones",
    categoryId: "gemstone",
    image: amethyst,
    images: [amethyst],
    hallmark: "Govt. Lab Certified",
    material: "Natural Quartz",
    gemstone: "Natural Amethyst",
    origin: "Brazil / Africa",
    weightApprox: "7.60 Carats",
    description:
      "Rich velvet royal purple natural amethyst exhibiting exceptional violet saturation. Celebrated in both luxury jewellery making and metaphysical healing for clarity and composure.",
    specifications: [
      { label: "Mineral Variety", value: "Natural Macro-Crystalline Quartz" },
      { label: "Color", value: "Imperial Deep Violet Purple" },
      { label: "Weight", value: "7.60 Carats" },
      { label: "Clarity", value: "Eye-Clean Premium Grade" },
      { label: "Recommended Use", value: "Astrology (Shani Upratna) & Rings" },
    ],
    featured: false,
  },

  // JEWELLERY BOXES SUBSECTIONS
  {
    id: "box-necklace-001",
    slug: "royal-velvet-necklace-set-box",
    name: "Royal Velvet Necklace Set Box",
    category: "Jewellery Boxes",
    categoryId: "boxes",
    subsection: "Necklace Set Box",
    image: box,
    images: [box],
    hallmark: "Master Handcrafted",
    material: "Solid Hardwood & Crimson Velvet",
    gemstone: "None",
    origin: "Artisanal Workshop",
    weightApprox: "650 grams",
    description:
      "Deluxe large-format plush velvet box tailored for complete bridal necklace sets, matching earring tops, and maang tikka. Engineered with reinforced hardwood and antique brass hinges.",
    specifications: [
      { label: "Subsection", value: "Necklace Set Box" },
      { label: "Capacity", value: "Bridal Necklace + Earrings + Maang Tikka" },
      { label: "Interior Lining", value: "Tarnish-Resistant Soft Suede" },
      { label: "Hardware", value: "Antique Brass Clasp & Hinges" },
      { label: "Wholesale Customization", value: "Logo Embossing Available" },
    ],
    featured: true,
  },
  {
    id: "box-ring-001",
    slug: "classic-velvet-ring-box",
    name: "Classic Velvet Single & Couple Ring Box",
    category: "Jewellery Boxes",
    categoryId: "boxes",
    subsection: "Ring Box",
    image: box,
    images: [box],
    hallmark: "Master Handcrafted",
    material: "Deep Royal Velvet & Molded Shell",
    gemstone: "None",
    origin: "Artisanal Workshop",
    weightApprox: "95 grams",
    description:
      "Refined velvet ring presentation box with custom contoured slot for gold, silver, and gemstone rings. Fitted with a smooth spring-tension hinge lid.",
    specifications: [
      { label: "Subsection", value: "Ring Box" },
      { label: "Capacity", value: "Single Ring or Couple Rings" },
      { label: "Dimensions", value: "6.0 x 6.0 x 5.0 cm" },
      { label: "Interior", value: "Deep Velvet Ring Cushion" },
      { label: "Wholesale", value: "Custom Foil Printing on Inner Silk" },
    ],
    featured: true,
  },
  {
    id: "box-tops-001",
    slug: "deluxe-earring-tops-presentation-box",
    name: "Deluxe Earring Tops Presentation Box",
    category: "Jewellery Boxes",
    categoryId: "boxes",
    subsection: "Tops Box",
    image: topsBoxClosedFront,
    images: [topsBoxClosedFront, topsBoxOpenFront, topsBoxSideOpen],
    hallmark: "Master Handcrafted",
    material: "Plush Velvet with Dual Prong Inserts",
    gemstone: "None",
    origin: "Artisanal Workshop",
    weightApprox: "110 grams",
    description:
      "Dedicated display and storage box for gold and gemstone earring tops and studs. Features precision pierced holes for secure post and screw-back earrings.",
    specifications: [
      { label: "Subsection", value: "Tops Box" },
      { label: "Box Type", value: "Light Box" },
      { label: "Capacity", value: "1 Pair of Tops / Studs / Small Jhumkis" },
      { label: "Interior Foam", value: "High-Density Padded Velvet" },
      { label: "Closure", value: "Concealed Magnetic Snap" },
      { label: "B2B Options", value: "Bulk Pack of 50 / 100 Available" },
    ],
    featured: true,
  },
  {
    id: "box-pendal-001",
    slug: "heritage-velvet-pendal-locket-box",
    name: "Heritage Velvet Pendal & Locket Box",
    category: "Jewellery Boxes",
    categoryId: "boxes",
    subsection: "Pendal Box",
    image: box,
    images: [box],
    hallmark: "Master Handcrafted",
    material: "Velvet Exterior & Angled Cushion",
    gemstone: "None",
    origin: "Artisanal Workshop",
    weightApprox: "125 grams",
    description:
      "Elegantly crafted jewellery box designed specifically for gold and natural gemstone pendals (pendants). Incorporates an angled velvet bed with upper security tab.",
    specifications: [
      { label: "Subsection", value: "Pendal Box" },
      { label: "Capacity", value: "Single Large / Medium Pendal & Chain" },
      { label: "Layout", value: "Slanted Velvet Display Bed" },
      { label: "Color Options", value: "Royal Red, Emerald Green, Navy" },
      { label: "Wholesale", value: "Direct Manufacturer Supply" },
    ],
    featured: false,
  },
  {
    id: "box-chain-payal-001",
    slug: "elongated-velvet-chain-payal-box",
    name: "Elongated Velvet Chain & Payal Box",
    category: "Jewellery Boxes",
    categoryId: "boxes",
    subsection: "Chain / Payal Box",
    image: box,
    images: [box],
    hallmark: "Master Handcrafted",
    material: "Elongated Hardwood Frame & Velvet",
    gemstone: "None",
    origin: "Artisanal Workshop",
    weightApprox: "240 grams",
    description:
      "Slimline elongated presentation box configured to hold gold chains, mangalsutras, and silver payal pairs flat without folding or scratching.",
    specifications: [
      { label: "Subsection", value: "Chain / Payal Box" },
      { label: "Capacity", value: "Long Chains, Mangalsutra, or Payal Pair" },
      { label: "Length", value: "10.5 inches (26.5 cm)" },
      { label: "Security", value: "Dual Elastic Retention Straps" },
      { label: "Lining", value: "Non-Oxidizing Protective Suede" },
    ],
    featured: true,
  },
];