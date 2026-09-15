import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { SITE } from "../../constants/site";
import { NAV_LINKS } from "../../data/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#0f1713] text-stone-300 text-xs py-2 px-4 border-b border-amber-600/20">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 tracking-widest text-[11px] uppercase text-amber-200/90 font-medium">
            <ShieldCheck size={13} className="text-amber-400 shrink-0" />
            <span>BIS Hallmarked 22K/18K Gold • 925 Silver Jewellery • Certified Natural Gemstones</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-stone-300">
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Phone size={12} className="text-amber-400" />
              <span>{SITE.phone}</span>
            </a>
            <span className="hidden sm:inline text-stone-600">|</span>
            <span className="hidden sm:inline text-amber-100/70">Pan-India Insured Delivery</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#faf8f5]/95 backdrop-blur-md shadow-md border-b border-stone-200 py-3.5"
            : "bg-[#faf8f5] border-b border-stone-200/80 py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 text-amber-100 shadow-md border border-amber-500/40 group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif text-2xl font-bold tracking-tight">V</span>
            </div>
            <div>
              <span className="block font-serif text-2xl sm:text-3xl font-bold tracking-wider text-stone-900 group-hover:text-amber-800 transition-colors">
                {SITE.name}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.28em] text-stone-500 font-medium -mt-0.5">
                Fine Jewellery & Natural Gemstones
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider uppercase">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`relative py-1 transition-colors ${
                      isActive
                        ? "text-amber-800 font-semibold"
                        : "text-stone-700 hover:text-amber-800"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700 rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Action: WhatsApp Concierge */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                "Namaste Vini Enterprises, I would like to inquire about your jewellery and gemstone collection."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-200 hover:bg-stone-800 border border-amber-600/30 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
            >
              <MessageCircle size={15} className="text-amber-400" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-800 hover:bg-stone-100 transition"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#faf8f5] border-b border-stone-200 px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
            <ul className="flex flex-col gap-4 text-base font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={`block py-2 border-b border-stone-100 ${
                      location.pathname === link.path
                        ? "text-amber-800 font-bold"
                        : "text-stone-800 hover:text-amber-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-stone-200 space-y-3">
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                  "Namaste Vini Enterprises, I would like to inquire about your collection."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-800 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-md"
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${SITE.phone}`}
                onClick={closeMobileMenu}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 py-3 text-sm font-semibold text-stone-800"
              >
                <Phone size={18} className="text-amber-700" />
                <span>Call {SITE.phone}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}