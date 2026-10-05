import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import necklace from "../../assets/images/necklace.jpg";
import Container from "../ui/Container";

const stats = [
  { number: "25+", label: "Years of Craftsmanship" },
  { number: "5,000+", label: "Satisfied Patrons" },
  { number: "100%", label: "BIS Hallmarked Purity" },
  { number: "Pan-India", label: "Insured Distribution" },
];

const pillars = [
  "Government BIS 916 laser hallmarking on all gold pieces",
  "100% natural, untreated Vedic gemstones with lab certificates",
  "Pure 925 silver jewellery across Bracelets, Chains, Rings, Kadha, and Payal",
  "Custom wholesale manufacturing and bespoke bridal orders",
];

export default function About() {
  return (
    <section className="bg-[#faf8f5] py-20 lg:py-28 overflow-hidden">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-900">
              <Sparkles size={12} className="text-amber-700" />
              <span>About Vini Enterprises</span>
            </div>

            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.18]">
              Crafting Generational Trust, Absolute Purity & Timeless Splendor.
            </h2>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-stone-600">
              Rooted in the timeless traditions of Indian goldsmithing and gemology,{" "}
              <strong className="text-stone-900 font-semibold">Vini Enterprises</strong> stands as a
              trusted destination for fine 22K & 18K gold jewellery, pure 925 silver jewellery, certified natural precious gemstones, and bespoke presentation packaging.
            </p>

            <div className="mt-6 space-y-3">
              {pillars.map((pillar) => (
                <div key={pillar} className="flex items-start gap-3 text-sm text-stone-700">
                  <CheckCircle2 size={18} className="text-amber-700 shrink-0 mt-0.5" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link to="/about">
                <button className="flex items-center gap-2 rounded-full bg-amber-800 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white hover:bg-amber-900 transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer">
                  <span>Our Brand Story</span>
                  <ArrowRight size={16} />
                </button>
              </Link>
              <Link
                to="/contact"
                className="text-sm font-semibold text-stone-700 hover:text-amber-800 transition-colors uppercase tracking-wider underline underline-offset-4"
              >
                Visit Our Workshop
              </Link>
            </div>
          </motion.div>

          {/* RIGHT IMAGE & STATS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl bg-stone-100 shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={necklace}
                alt="Vini Enterprises Fine Jewellery Craftsmanship"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white flex items-center gap-3">
                <ShieldCheck size={28} className="text-amber-400 shrink-0" />
                <p className="text-xs sm:text-sm font-light leading-snug">
                  Every gram of gold hallmarked. Every gemstone certified genuine.
                </p>
              </div>
            </div>

            {/* Stat Counters Grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-stone-200/80 bg-white p-5 text-center shadow-sm"
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-amber-800">
                    {stat.number}
                  </h3>
                  <p className="mt-1.5 text-xs font-medium text-stone-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}