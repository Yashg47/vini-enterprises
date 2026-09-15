import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react";
import type { Product } from "../../data/products";
import WhatsAppButton from "./WhatsAppButton";
import Button from "./Button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(197,155,39,0.12)] hover:border-amber-400/40 transition-all duration-500"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hallmark badge tag */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold tracking-wider text-amber-900 shadow-sm backdrop-blur">
            <ShieldCheck size={13} className="text-amber-700" />
            {product.hallmark}
          </span>
        </div>

        {/* Quick view button overlay */}
        <Link
          to={`/product/${product.slug}`}
          className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-stone-900 shadow-md backdrop-blur opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-amber-800 hover:text-white"
          title="View Details"
        >
          <ArrowUpRight size={18} />
        </Link>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-stone-500">
            <span>
              {product.category}
              {product.subsection && (
                <strong className="text-amber-800 ml-1 font-semibold">
                  • {product.subsection}
                </strong>
              )}
            </span>
            {product.origin && <span>{product.origin}</span>}
          </div>

          <Link to={`/product/${product.slug}`} className="block group-hover:text-amber-800 transition-colors">
            <h3 className="mt-2.5 text-xl font-bold tracking-tight text-stone-900 line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="mt-2 text-xs leading-relaxed text-stone-600 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2.5 py-1 text-[11px] font-medium text-stone-700">
              <Sparkles size={11} className="text-amber-700" />
              {product.gemstone !== "None" ? product.gemstone : product.material}
            </span>
            {product.weightApprox && (
              <span className="rounded-md bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-800 border border-amber-200/50">
                {product.weightApprox}
              </span>
            )}
          </div>
        </div>

        {/* Pricing tag & Actions */}
        <div className="mt-6 pt-4 border-t border-stone-100">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-stone-500">Price Inquiry</span>
            <span className="text-xs font-semibold text-amber-800">Direct Workshop Rates</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <WhatsAppButton
              productName={product.name}
              size="sm"
              variant="gold"
              className="w-full text-xs"
              label="WhatsApp"
            />
            <Link to={`/product/${product.slug}`} className="w-full">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}