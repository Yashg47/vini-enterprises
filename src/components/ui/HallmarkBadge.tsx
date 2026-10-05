import { cn } from "../../lib/utils";

interface HallmarkBadgeProps {
  label: string;
  tone?: "brass" | "emerald" | "neutral";
  className?: string;
}

const toneClasses = {
  brass: "text-amber-700 border-amber-700/50",
  emerald: "text-emerald-700 border-emerald-700/50",
  neutral: "text-gray-700 border-gray-500/40",
};

export function HallmarkBadge({
  label,
  tone = "neutral",
  className,
}: HallmarkBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-1 text-xs uppercase tracking-[0.18em] font-mono rounded-none",
        toneClasses[tone],
        className
      )}
    >
      {label}
    </span>
  );
}