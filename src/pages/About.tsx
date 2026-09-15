import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Gem,
  Award,
  CheckCircle2,
  Sparkles,
  HeartHandshake,
  PackageCheck,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FloatingWhatsApp from "../components/ui/FloatingWhatsApp";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import WhatsAppButton from "../components/ui/WhatsAppButton";
import necklace from "../assets/images/necklace.jpg";
import ruby from "../assets/images/ruby.jpg";

const values = [
  {
    icon: ShieldCheck,
    title: "100% BIS Hallmarked Purity",
    description:
      "We believe trust is non-negotiable. Every gram of 22K and 18K gold crafted by Vini Enterprises bears the Bureau of Indian Standards (BIS) Hallmark with mandatory laser-etched HUID codes.",
  },
  {
    icon: Gem,
    title: "Natural & Vedic Gemstones",
    description:
      "We strictly deal in 100% natural, unheated, and untreated gemstones. Each stone is accompanied by a laboratory certificate specifying cut, origin, and mineral authenticity.",
  },
  {
    icon: Award,
    title: "925 Silver Jewellery Subsections",
    description:
      "Our pure 925 silver catalogue features dedicated subsections: Bracelets, Chains, Rings, traditional Kadha, and bridal Payal.",
  },
  {
    icon: HeartHandshake,
    title: "Transparent Trade Ethics",
    description:
      "Whether supplying bridal jewellery to private families or wholesale lots to retail showrooms across India, we pride ourselves on crystal-clear pricing and reliable craftsmanship.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#0c1612] py-20 lg:py-28 text-white">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />

          <Container className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
              <Sparkles size={12} className="text-amber-400" />
              <span>Our Heritage & Philosophy</span>
            </div>

            <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              A Legacy of Pure Gold, Sacred Gemstones & Masterful Indian Artistry.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-stone-300 font-light">
              For over two decades, Vini Enterprises has been synonymous with uncompromised gold purity, authentic Vedic gemstones, and reliable wholesale distribution across India.
            </p>
          </Container>
        </section>

        {/* Narrative & Image Section */}
        <section className="py-20 lg:py-28 bg-white border-b border-stone-200/60">
          <Container>
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div>
                <SectionHeading
                  badge="The Vini Story"
                  title="Preserving the Sacred Art of Goldsmithing"
                  align="left"
                  className="mb-6"
                />

                <p className="text-base leading-relaxed text-stone-600">
                  Established with a commitment to pure materials and authentic craftsmanship,{" "}
                  <strong className="text-stone-900 font-semibold">Vini Enterprises</strong> was
                  conceived as an antidote to commercial dilution. We believe that fine jewellery and natural gemstones are not mere commodities—they are sacred heirlooms, astrological powerhouses, and personal milestones.
                </p>

                <p className="mt-4 text-base leading-relaxed text-stone-600">
                  Our artisans specialize in traditional Indian filigree, nakshi, and bridal goldsmithing, alongside precision-cut natural gemstones including Burmese Rubies, Ceylon Blue Sapphires, and Vedic Yellow Sapphires (Pukhraj).
                </p>

                <div className="mt-8 space-y-3.5">
                  <div className="flex items-start gap-3 text-sm text-stone-800">
                    <CheckCircle2 size={18} className="text-amber-700 shrink-0 mt-0.5" />
                    <span>Government BIS 916 certification on all 22K/18K gold jewellery</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-stone-800">
                    <CheckCircle2 size={18} className="text-amber-700 shrink-0 mt-0.5" />
                    <span>Independent gemological laboratory certificates with every precious gemstone</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-stone-800">
                    <CheckCircle2 size={18} className="text-amber-700 shrink-0 mt-0.5" />
                    <span>Direct wholesale partnerships with jewellery showrooms nationwide</span>
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <Link to="/collections">
                    <button className="rounded-full bg-stone-900 px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-amber-100 hover:bg-stone-800 transition shadow cursor-pointer">
                      Explore Our Works
                    </button>
                  </Link>
                  <WhatsAppButton label="Speak with Founder" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-3xl shadow-lg border border-stone-200">
                  <img
                    src={necklace}
                    alt="Handcrafted Gold Necklace"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-3xl shadow-lg border border-stone-200 mt-8">
                  <img
                    src={ruby}
                    alt="Natural Certified Gemstone"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Values Grid */}
        <section className="py-20 lg:py-28 bg-[#faf8f5]">
          <Container>
            <SectionHeading
              badge="Our Guiding Values"
              title="Built on Integrity, Verified by Science"
              subtitle="The four foundational principles that define every interaction with Vini Enterprises."
            />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="rounded-2xl border border-stone-200 bg-white p-7 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-stone-900">
                      {val.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-stone-600">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Quality Assurance Strip */}
        <section className="py-16 bg-stone-900 text-stone-200">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <PackageCheck size={36} className="text-amber-400 shrink-0" />
                <div>
                  <h4 className="text-base font-bold text-white">Insured Pan-India Transit</h4>
                  <p className="text-xs text-stone-400 mt-1">Tamper-evident packaging with real-time tracking.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <ShieldCheck size={36} className="text-amber-400 shrink-0" />
                <div>
                  <h4 className="text-base font-bold text-white">Authenticity Seal</h4>
                  <p className="text-xs text-stone-400 mt-1">Official certificate documentation provided with every stone.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <HeartHandshake size={36} className="text-amber-400 shrink-0" />
                <div>
                  <h4 className="text-base font-bold text-white">B2B Wholesale Support</h4>
                  <p className="text-xs text-stone-400 mt-1">Competitive pricing tiers for jewellers and distributors.</p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}