import { useState, type FormEvent } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Sparkles,
  Send,
  HelpCircle,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FloatingWhatsApp from "../components/ui/FloatingWhatsApp";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import { SITE } from "../constants/site";

const faqs = [
  {
    q: "Are all your gold jewellery creations BIS Hallmarked?",
    a: "Yes, 100%. Every piece of 22K and 18K gold jewellery crafted or supplied by Vini Enterprises is BIS Hallmarked with an official unique HUID (Hallmark Unique Identification) laser code, guaranteeing purity.",
  },
  {
    q: "Do your natural gemstones come with lab certification?",
    a: "Absolutely. All our precious gemstones (such as Ruby, Ceylon Blue Sapphire, Yellow Sapphire, and Emerald) are 100% natural, unheated, and accompanied by authentic gemological laboratory test certificates.",
  },
  {
    q: "Do you supply wholesale orders to other jewellers across India?",
    a: "Yes. We have established wholesale partnerships with jewellers, retail showrooms, and astrology practitioners across India. Contact us on WhatsApp with your firm details for wholesale rate sheets.",
  },
  {
    q: "How are high-value parcels delivered safely?",
    a: "All dispatches are packaged in tamper-evident, sealed cases and transported via specialized high-value insured transit services with end-to-end tracking to your doorstep.",
  },
  {
    q: "Can I order custom designs or branded jewellery boxes?",
    a: "Yes. Our master artisans can manufacture custom jewellery based on your references. We also manufacture custom-branded luxury velvet and wooden packaging boxes with logo foil embossing.",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    inquiryType: "Retail / Private Order",
    category: "Gold Jewellery",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Format message for WhatsApp
    const waText = `*New Inquiry from Website*\n\n• *Name:* ${formData.name}\n• *Phone:* ${formData.phone}\n• *Type:* ${formData.inquiryType}\n• *Category:* ${formData.category}\n• *Requirements:*\n${formData.message || "Please share catalogue and pricing."}`;

    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(waText)}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navbar />

      <main className="flex-grow">
        {/* Header Banner */}
        <section className="relative overflow-hidden bg-[#0c1612] py-20 text-white">
          <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />
          <Container className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
              <Sparkles size={12} className="text-amber-400" />
              <span>Direct Concierge & Showroom</span>
            </div>

            <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Connect with Vini Enterprises
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base text-stone-300 font-light">
              Speak directly with our master jeweller for custom bridal orders, Vedic gemstone consultations, or B2B wholesale pricing.
            </p>
          </Container>
        </section>

        {/* Contact Info & Form Section */}
        <section className="py-16 lg:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              {/* LEFT: Direct Contact Channels (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                    Get in Direct Touch
                  </h2>
                  <p className="mt-2 text-sm text-stone-600">
                    We respond promptly to all private and wholesale inquiries.
                  </p>
                </div>

                {/* WhatsApp Priority Card */}
                <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950 to-[#0c1e15] p-6 text-white shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-700/60 text-white">
                      <MessageCircle size={22} className="fill-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-amber-200">
                        Priority WhatsApp Desk
                      </h4>
                      <p className="text-xs text-stone-300">
                        Fastest response for photos & price quotes
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-stone-300 leading-relaxed">
                    Chat directly with our team to check live gold rates, gemstone availability, or discuss custom measurements.
                  </p>

                  <a
                    href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                      "Namaste Vini Enterprises, I would like to inquire about your fine jewellery & gemstone collection."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition shadow"
                  >
                    <span>Start WhatsApp Chat</span>
                  </a>
                </div>

                {/* Other Details */}
                <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-5 shadow-sm">
                  <div className="flex items-start gap-3.5">
                    <Phone size={18} className="text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
                        Telephone
                      </span>
                      <a
                        href={`tel:${SITE.phone}`}
                        className="text-sm font-bold text-stone-900 hover:text-amber-800 transition"
                      >
                        {SITE.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-4 border-t border-stone-100">
                    <Mail size={18} className="text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${SITE.email}`}
                        className="text-sm font-bold text-stone-900 hover:text-amber-800 transition"
                      >
                        {SITE.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-4 border-t border-stone-100">
                    <Clock size={18} className="text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
                        Business Hours
                      </span>
                      <span className="text-sm text-stone-700 block">
                        {SITE.workingHours}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-4 border-t border-stone-100">
                    <MapPin size={18} className="text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
                        Distribution & Workshop
                      </span>
                      <span className="text-sm text-stone-700 block">
                        Pan-India Insured Dispatch • Wholesale Workshops in Delhi & Jaipur
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Inquiry Form (7 cols) */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    Send an Inquiry
                  </h3>
                  <p className="mt-1 text-sm text-stone-600">
                    Fill in your details to receive our catalogue, quotes, or schedule a consultation.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {/* Inquiry Type */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                        I am inquiring as:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, inquiryType: "Retail / Private Order" })
                          }
                          className={`rounded-xl py-2.5 px-4 text-xs font-semibold border transition cursor-pointer ${
                            formData.inquiryType === "Retail / Private Order"
                              ? "bg-amber-800 text-white border-amber-800"
                              : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                          }`}
                        >
                          Private / Retail Customer
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              inquiryType: "Wholesale / Jeweller Partnership",
                            })
                          }
                          className={`rounded-xl py-2.5 px-4 text-xs font-semibold border transition cursor-pointer ${
                            formData.inquiryType === "Wholesale / Jeweller Partnership"
                              ? "bg-amber-800 text-white border-amber-800"
                              : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                          }`}
                        >
                          Wholesale Jeweller (B2B)
                        </button>
                      </div>
                    </div>

                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="e.g. Rajesh Sharma"
                          className="w-full rounded-xl border border-stone-300 bg-stone-50/60 p-3 text-sm text-stone-900 focus:border-amber-800 focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+91 98765 43210"
                          className="w-full rounded-xl border border-stone-300 bg-stone-50/60 p-3 text-sm text-stone-900 focus:border-amber-800 focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Category Selection */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                        Interested Collection
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full rounded-xl border border-stone-300 bg-stone-50/60 p-3 text-sm text-stone-900 focus:border-amber-800 focus:bg-white focus:outline-none cursor-pointer"
                      >
                        <option value="Gold Jewellery">22K BIS Hallmarked Gold Jewellery</option>
                        <option value="Certified Natural Gemstones">
                          Certified Natural Gemstones (Ruby, Sapphire, etc.)
                        </option>
                        <option value="Silver Jewellery">
                          Silver Jewellery (Bracelets, Chains, Rings, Kadha, Payal)
                        </option>
                        <option value="Jewellery Boxes">
                          Jewellery Boxes (Necklace Set Box, Ring Box, Tops Box, Pendal Box, Chain / Payal Box)
                        </option>
                        <option value="Bespoke Custom Order">Bespoke Custom Manufacture</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                        Specific Requirements or Questions
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Please mention piece names, approximate weight, budget or astrology recommendations..."
                        className="w-full rounded-xl border border-stone-300 bg-stone-50/60 p-3 text-sm text-stone-900 focus:border-amber-800 focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg hover:brightness-110 active:scale-[0.99] transition cursor-pointer"
                    >
                      <Send size={16} />
                      <span>Submit & Chat on WhatsApp</span>
                    </button>

                    {submitted && (
                      <p className="text-center text-xs font-medium text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                        ✓ Your inquiry has been generated and redirected to WhatsApp for instant connection!
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQs Accordion Section */}
        <section className="py-16 bg-white border-t border-stone-200/60">
          <Container className="max-w-4xl">
            <SectionHeading
              badge="Frequently Answered"
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about our hallmarking, certification, delivery, and trade terms."
            />

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 bg-[#faf8f5] p-6 transition"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle size={18} className="text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif text-lg font-bold text-stone-900">
                        {faq.q}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-stone-600">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}