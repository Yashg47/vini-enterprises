import {
  ShieldCheck,
  Gem,
  Truck,
  Handshake,
  Award,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const features = [
  {
    icon: ShieldCheck,
    title: "100% BIS Hallmarked",
    description:
      "Every piece of 22K and 18K gold jewellery carries government-certified BIS Hallmarking with unique HUID laser verification.",
  },
  {
    icon: Gem,
    title: "Lab-Certified Gemstones",
    description:
      "All precious rubies, sapphires, and astrologically recommended stones are 100% natural, untreated, and certified by reputed gemological labs.",
  },
  {
    icon: Award,
    title: "925 Silver Jewellery",
    description:
      "Curated subsections of 92.5% pure silver: handcrafted Bracelets, Chains, Rings, Kadha, and Payal with anti-tarnish rhodium.",
  },
  {
    icon: Truck,
    title: "Pan-India Insured Transit",
    description:
      "Every parcel is sealed in tamper-proof security cases and dispatched through high-value insured transit for absolute peace of mind.",
  },
  {
    icon: Handshake,
    title: "B2B Wholesale & Retail",
    description:
      "We partner directly with jewellers, retail chains, and astrology consultants across India, delivering dependable workshop pricing.",
  },
  {
    icon: Sparkles,
    title: "Bespoke Customization",
    description:
      "From custom ring settings to private-label jewellery boxes with foil embossing, we bring your bespoke specifications to life.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20 lg:py-28 border-y border-stone-200/60">
      <Container>
        <SectionHeading
          badge="The Vini Standard"
          title="The Hallmarks of Uncompromising Trust"
          subtitle="Why esteemed retail customers and wholesale jewellery houses across India choose Vini Enterprises."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="group relative rounded-2xl border border-stone-200/80 bg-[#faf8f5] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/50 hover:bg-white hover:shadow-[0_12px_30px_rgba(197,155,39,0.1)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100/80 text-amber-800 border border-amber-300/40 group-hover:bg-stone-900 group-hover:text-amber-300 transition-colors duration-300">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-stone-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}