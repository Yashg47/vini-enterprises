export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    quote:
      "We have sourced 22K hallmarked gold bridal ornaments and natural gemstones from Vini Enterprises for over 4 years. Their purity, prompt BIS certification documentation, and wholesale pricing are unmatched in the trade.",
    author: "Rajesh K. Verma",
    role: "Proprietor, Verma Jewellers",
    location: "Jaipur, Rajasthan",
    rating: 5,
  },
  {
    id: "test-2",
    quote:
      "I ordered an astrologically recommended Ceylon Blue Sapphire with gold ring making. The stone came with complete lab certificates, gorgeous luster, and was delivered safely with tamper-proof security seals. Truly royal service.",
    author: "Sunita Agarwal",
    role: "Private Collector",
    location: "New Delhi",
    rating: 5,
  },
  {
    id: "test-3",
    quote:
      "Their jewellery presentation boxes have elevated our showroom significantly. The custom branding finish, velvet lining, and sturdy craftsmanship make every customer feel like royalty.",
    author: "Amit Singhania",
    role: "Director, Singhania Fine Jewels",
    location: "Mumbai, Maharashtra",
    rating: 5,
  },
  {
    id: "test-4",
    quote:
      "Transparent dealings, genuine unheated gemstones, and strict adherence to 925 sterling silver purity. Vini Enterprises has become our most dependable supplier.",
    author: "Manoj Chhabra",
    role: "Wholesale Retailer",
    location: "Chandigarh",
    rating: 5,
  },
];
