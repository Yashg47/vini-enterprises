import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-amber-800 text-white hover:bg-amber-900 shadow-md hover:shadow-lg active:scale-[0.98]",
    gold:
      "bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white hover:brightness-110 shadow-lg hover:shadow-amber-900/20 active:scale-[0.98]",
    secondary:
      "bg-stone-900 text-white hover:bg-stone-800 shadow-md hover:shadow-lg active:scale-[0.98]",
    outline:
      "border border-stone-300 bg-transparent text-stone-800 hover:bg-stone-100/70 hover:border-stone-400 active:scale-[0.98]",
    ghost:
      "bg-transparent text-stone-700 hover:bg-stone-100 hover:text-amber-800",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs tracking-wider uppercase font-medium",
    md: "px-6 py-3 text-sm font-medium tracking-wide",
    lg: "px-8 py-4 text-base font-semibold tracking-wide",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}