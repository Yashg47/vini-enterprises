import { Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

interface Props {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "mb-14",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-900 border border-amber-300/40",
          align === "center" ? "mx-auto" : ""
        )}
      >
        <Sparkles size={12} className="text-amber-700" />
        <span>{badge}</span>
      </div>

      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900">
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed text-stone-600 font-light",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
          )}
        >
          {subtitle}
        </p>
      )}

      <div
        className={cn(
          "mt-5 h-0.5 w-16 bg-gradient-to-r from-amber-600 to-amber-300 rounded-full",
          align === "center" ? "mx-auto" : ""
        )}
      />
    </div>
  );
}