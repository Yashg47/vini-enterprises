import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppButton from "../ui/WhatsAppButton";

import goldRing from "../../assets/images/gold-ring.jpg";
import necklace from "../../assets/images/necklace.jpg";
import ruby from "../../assets/images/ruby.jpg";
import blueSapphire from "../../assets/images/blue-sapphire.jpg";
import yellowSapphire from "../../assets/images/yellow-sapphire.jpg";
import silverRing from "../../assets/images/silver-ring.jpg";
import box from "../../assets/images/box.jpg";

interface HeroSlide {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  categoryLink: string;
}

const heroSlides: HeroSlide[] = [
  {
    image: necklace,
    badge: "22K BIS 916 Hallmarked Gold",
    title: "Heritage of Purity & Royal Splendor",
    subtitle: "Bridal & Festive Masterpieces",
    description:
      "Intricately sculpted in 22 Karat solid gold by generational master artisans. Every piece authenticated with government BIS Hallmarking.",
    categoryLink: "/collections?category=gold",
  },
  {
    image: ruby,
    badge: "Certified Natural Gemstone",
    title: "Burmese Pigeon Blood Red Ruby",
    subtitle: "Untreated & Astrologically Energized",
    description:
      "Rare, unheated natural ruby of hypnotic crimson fire. Complete with recognized gemological laboratory testing for astrological potency and investment.",
    categoryLink: "/collections?category=gemstone",
  },
  {
    image: blueSapphire,
    badge: "Rare Ceylon Corundum",
    title: "Royal Ceylon Blue Sapphire",
    subtitle: "Exceptional Clarity & Brilliance",
    description:
      "Ethically sourced royal blue sapphires from the legendary mines of Ratnapura, Sri Lanka. Sourced directly for jewellers and connoisseurs.",
    categoryLink: "/collections?category=gemstone",
  },
  {
    image: goldRing,
    badge: "Artisanal Craftsmanship",
    title: "Royal Heritage 22K Rings",
    subtitle: "Fine Details, Everyday Distinction",
    description:
      "Handcrafted 22K yellow gold rings paired with natural gemstone accents. Built for longevity, comfort, and enduring elegance.",
    categoryLink: "/collections?category=gold",
  },
  {
    image: yellowSapphire,
    badge: "Vedic Pukhraj Gemstone",
    title: "Auspicious Natural Yellow Sapphire",
    subtitle: "Supreme Clarity & Solar Radiance",
    description:
      "Natural unheated golden-yellow sapphires representing wisdom, abundance, and prosperity under Vedic astrological traditions.",
    categoryLink: "/collections?category=gemstone",
  },
  {
    image: silverRing,
    badge: "925 Hallmarked Silver Jewellery",
    title: "Artisanal Silver Jewellery",
    subtitle: "Bracelets • Chains • Rings • Kadha • Payal",
    description:
      "Handcrafted pure 925 silver creations across curated subsections: designer bracelets, heavy chains, rings, traditional kadhas, and bridal payals.",
    categoryLink: "/collections?category=silver",
  },
  {
    image: box,
    badge: "Handcrafted Jewellery Boxes",
    title: "Master Jewellery Boxes",
    subtitle: "Necklace Set • Ring • Tops • Pendal • Chain / Payal Box",
    description:
      "Handcrafted presentation boxes in rich velvet and hardwood frames tailored for necklace sets, rings, tops, pendals, chains, and payal.",
    categoryLink: "/collections?category=boxes",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-[#f9f6f0] border-b border-amber-900/10">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[580px]">
          {/* LEFT CONTENT (7 cols) */}
          <div className="lg:col-span-7 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-100/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-900 shadow-sm">
                  <Sparkles size={13} className="text-amber-700" />
                  <span>{slide.badge}</span>
                </div>

                {/* Subtitle */}
                <p className="mt-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
                  {slide.subtitle}
                </p>

                {/* Heading */}
                <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-950 leading-[1.12]">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="mt-6 text-base sm:text-lg leading-relaxed text-stone-600 max-w-xl">
                  {slide.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTA Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to={slide.categoryLink}>
                <button className="flex items-center gap-2 rounded-full bg-stone-900 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-amber-100 hover:bg-stone-800 transition-all shadow-md hover:shadow-xl active:scale-95 cursor-pointer">
                  <span>Explore Catalogue</span>
                  <ArrowRight size={16} className="text-amber-400" />
                </button>
              </Link>

              <WhatsAppButton
                variant="outline"
                size="md"
                label="WhatsApp Concierge"
              />
            </div>

            {/* Trust highlights */}
            <div className="mt-12 pt-8 border-t border-stone-200/80 flex flex-wrap items-center gap-6 text-xs text-stone-600 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-amber-700" />
                <span>BIS 916 Hallmark Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-amber-700" />
                <span>Govt. Lab Certified Gemstones</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                <span>Direct Workshop Wholesale Rates</span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE SLIDER (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Image Frame with luxury gold trim */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-stone-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={slide.image}
                    alt={slide.title}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.7 }}
                    className="h-full w-full object-cover object-center"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/10" />

                {/* Floating Card inside Image */}
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-md border border-amber-200/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-amber-800 font-bold">
                        Vini Highlight
                      </span>
                      <h3 className="text-base font-bold text-stone-900 truncate">
                        {slide.title}
                      </h3>
                    </div>
                    <Link
                      to={slide.categoryLink}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-800 text-white hover:bg-amber-900 transition-colors shrink-0 ml-2"
                      title="View Category"
                    >
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows & Indicator Dots */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 hover:text-amber-800 transition shadow-sm cursor-pointer"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next Slide"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 hover:text-amber-800 transition shadow-sm cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                        currentSlide === index
                          ? "w-8 bg-amber-800"
                          : "w-2 bg-stone-300 hover:bg-stone-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}