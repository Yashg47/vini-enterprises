import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Gem,
  Truck,
  Clock,
  MessageCircle,
} from "lucide-react";
import { SITE } from "../../constants/site";
import { FOOTER_COLLECTIONS, QUICK_LINKS } from "../../data/navigation";

export default function Footer() {
  return (
    <footer className="bg-[#0b1410] text-stone-300 border-t border-amber-900/30">
      {/* Trust Highlights Strip */}
      <div className="border-b border-stone-800 bg-[#080f0c] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-400">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">BIS 916 Hallmarked</h4>
                <p className="text-xs text-stone-400">100% Certified Purity</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-400">
                <Gem size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Natural Gemstones</h4>
                <p className="text-xs text-stone-400">Lab Tested & Untreated</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-400">
                <Truck size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Pan-India Transit</h4>
                <p className="text-xs text-stone-400">Fully Insured Doorstep Delivery</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-400">
                <MessageCircle size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Wholesale & Retail</h4>
                <p className="text-xs text-stone-400">Dedicated B2B Jeweller Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-600 to-amber-900 text-amber-100 font-serif font-bold text-xl border border-amber-500/40">
                V
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                {SITE.name}
              </span>
            </Link>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-amber-300/80 font-medium">
              {SITE.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-stone-400 max-w-md">
              {SITE.description}
            </p>

            <div className="mt-6">
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                  "Namaste Vini Enterprises, I want to inquire about wholesale partnership."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-700/80 hover:bg-emerald-700 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white border border-emerald-500/40 transition-all shadow-md"
              >
                <MessageCircle size={15} />
                <span>B2B Wholesale Chat</span>
              </a>
            </div>
          </div>

          {/* Collections Col */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-amber-300 font-sans">
              Our Collections
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {FOOTER_COLLECTIONS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-stone-400 hover:text-amber-200 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-amber-300 font-sans">
              Client Service
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-stone-400 hover:text-amber-200 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-amber-300 font-sans">
              Get in Touch
            </h4>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-2.5 text-stone-300 hover:text-amber-300 transition-colors"
                >
                  <Phone size={15} className="text-amber-400 shrink-0" />
                  <span>{SITE.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2.5 text-stone-300 hover:text-amber-300 transition-colors"
                >
                  <Mail size={15} className="text-amber-400 shrink-0" />
                  <span>{SITE.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-stone-400">
                <MapPin size={15} className="text-amber-400 shrink-0 mt-0.5" />
                <span>Pan-India Distribution & Wholesale Showroom</span>
              </li>
              <li className="flex items-start gap-2.5 text-stone-400">
                <Clock size={15} className="text-amber-400 shrink-0 mt-0.5" />
                <span>{SITE.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Strip */}
      <div className="border-t border-stone-800/80 bg-[#070d0a] py-6 text-xs text-stone-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All Rights Reserved. Pure Gold & Natural Gemstones.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400">Hallmark Guaranteed</span>
            <span>•</span>
            <span className="hover:text-stone-400">100% Certified Stones</span>
            <span>•</span>
            <span className="hover:text-stone-400">Ethical Sourcing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}