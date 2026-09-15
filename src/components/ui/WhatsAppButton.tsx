import { MessageCircle } from "lucide-react";
import Button from "./Button";
import { SITE } from "../../constants/site";

interface WhatsAppButtonProps {
  productName?: string;
  customMessage?: string;
  variant?: "primary" | "gold" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export default function WhatsAppButton({
  productName,
  customMessage,
  variant = "gold",
  size = "md",
  className,
  label,
}: WhatsAppButtonProps) {
  const phone = SITE.whatsapp;

  let text = customMessage;
  if (!text) {
    if (productName) {
      text = `Namaste Vini Enterprises,\n\nI am interested in acquiring/enquiring about: "${productName}".\n\nPlease share:\n• Best Price (Retail / Wholesale)\n• Availability & Purity Details\n• Additional Photos / Video clip\n\nThank you.`;
    } else {
      text = `Namaste Vini Enterprises,\n\nI would like to inquire about your jewellery and certified natural gemstone collections.\n\nPlease share your latest catalogue and wholesale details.\n\nThank you.`;
    }
  }

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block"
      title="Chat on WhatsApp"
    >
      <Button variant={variant} size={size} className={className}>
        <MessageCircle size={18} className="text-white fill-current" />
        <span>{label || (productName ? "Enquire on WhatsApp" : "Chat on WhatsApp")}</span>
      </Button>
    </a>
  );
}