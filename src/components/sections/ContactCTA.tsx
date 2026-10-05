import { Link } from "react-router-dom";
import { MessageCircle, PhoneCall, Sparkles } from "lucide-react";
import { SITE } from "../../constants/site";
import Container from "../ui/Container";

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0c1612] py-20 lg:py-24 text-white">
      {/* Subtle radial glow */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />

      <Container className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
          <Sparkles size={12} className="text-amber-400" />
          <span>Bespoke Orders & Wholesale Supply</span>
        </div>

        <h2 className="mx-auto mt-6 max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          Commission Custom Jewellery or Receive Our Wholesale Catalogue
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-stone-300 font-light">
          Whether you require customized 22K gold bridal ornaments, certified rare gemstones for astrology, or high-volume jewellery boxes, our team is at your service.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
              "Namaste Vini Enterprises, I want to discuss a custom order or wholesale requirement."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-xl hover:brightness-110 active:scale-95 transition-all"
          >
            <MessageCircle size={18} className="fill-white" />
            <span>Chat on WhatsApp ({SITE.phone})</span>
          </a>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 rounded-full border border-stone-600 bg-stone-900/80 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-stone-200 hover:bg-stone-800 hover:text-white transition-all active:scale-95"
          >
            <PhoneCall size={18} className="text-amber-400" />
            <span>Showroom Contact Form</span>
          </Link>
        </div>

        <p className="mt-8 text-xs text-stone-400 tracking-wider uppercase">
          Guaranteed response within 30 minutes during business hours (10:30 AM - 8:00 PM IST)
        </p>
      </Container>
    </section>
  );
}
