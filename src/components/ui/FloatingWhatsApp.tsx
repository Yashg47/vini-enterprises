import { MessageCircle } from "lucide-react";
import { SITE } from "../../constants/site";

export default function FloatingWhatsApp() {
  const message = `Namaste Vini Enterprises, I am browsing your online collection and would like personal assistance.`;
  const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-6 z-50 flex items-center group">
      <span className="mr-3 hidden md:inline-block rounded-full bg-stone-900/90 text-amber-200 text-xs tracking-wider px-4 py-2 shadow-xl backdrop-blur border border-amber-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-x-2 group-hover:translate-x-0">
        Chat with our Jeweller
      </span>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Concierge"
        className="relative flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white shadow-2xl hover:scale-110 hover:shadow-emerald-900/40 transition-all duration-300"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
        </span>
        <MessageCircle size={28} className="fill-white" />
      </a>
    </aside>
  );
}
