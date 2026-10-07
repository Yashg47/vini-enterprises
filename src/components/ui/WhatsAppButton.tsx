import { MessageCircle } from "lucide-react";
import Button from "./Button";
import { SITE } from "../../constants/site";

interface WhatsAppProduct {
  name: string;
  category?: string;
  subsection?: string;
  gemstone?: string;
  material?: string;
  hallmark?: string;
  description?: string;
  image?: string;
  slug?: string;
  specifications?: {
    label: string;
    value: string;
  }[];
}

interface WhatsAppButtonProps {
  product?: WhatsAppProduct;
  productName?: string;
  customMessage?: string;
  variant?: "primary" | "gold" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export default function WhatsAppButton({
  product,
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
    if (product) {
      const productUrl = product.slug
        ? `https://vinienterprises.co.in/product/${product.slug}`
        : "";

      const specifications =
        product.specifications && product.specifications.length > 0
          ? product.specifications
              .map((spec) => `• ${spec.label}: ${spec.value}`)
              .join("\n")
          : "";

      text = `Namaste Vini Enterprises, 👋

I am interested in this product:

🛍️ Product: ${product.name}
📂 Category: ${product.category || "N/A"}${
        product.subsection ? `\n📌 Subsection: ${product.subsection}` : ""
      }${
        product.material ? `\n💎 Material: ${product.material}` : ""
      }${
        product.gemstone ? `\n✨ Gemstone: ${product.gemstone}` : ""
      }${
        product.hallmark ? `\n✔️ Hallmark: ${product.hallmark}` : ""
      }${
        specifications ? `\n\n📋 Specifications:\n${specifications}` : ""
      }

Please share:
• Current Price
• Availability
• Any additional details

🔗 Product Link:
${productUrl}

Thank you.`;
    } else if (productName) {
      text = `Namaste Vini Enterprises, 👋

I am interested in this product:

🛍️ Product: ${productName}

Please share:
• Current Price
• Availability
• Additional details

Thank you.`;
    } else {
      text = `Namaste Vini Enterprises, 👋

I would like to inquire about your jewellery and certified natural gemstone collections.

Please share your latest catalogue and wholesale details.

Thank you.`;
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
        <span>
          {label ||
            (product || productName
              ? "Enquire on WhatsApp"
              : "Chat on WhatsApp")}
        </span>
      </Button>
    </a>
  );
}