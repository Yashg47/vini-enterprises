import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Category } from "../../data/categories";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-stone-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(197,155,39,0.15)] hover:border-amber-400/40 transition-all duration-500"
    >
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
          <img
            src={category.image}
            alt={category.name}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Tagline floating badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-900/80 px-3 py-1 text-[11px] font-medium tracking-wider text-amber-300 backdrop-blur border border-amber-500/20">
              <Sparkles size={11} className="text-amber-400" />
              {category.tagline}
            </span>
          </div>

          {/* Item count bottom tag */}
          <div className="absolute bottom-4 left-4 z-10 text-white">
            <span className="text-xs font-light text-amber-200/90 tracking-widest uppercase">
              {category.itemCount}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-7">
          <h3 className="text-2xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
            {category.name}
          </h3>

          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-stone-600">
            {category.description}
          </p>

          {/* Subcategories list if present (e.g. Bracelets, Chains, Rings, Kadha, Payal) */}
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="mt-4 pt-3 border-t border-stone-100">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block mb-2">
                Subsections:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub}
                    to={`/collections?category=${category.id}&sub=${encodeURIComponent(sub)}`}
                    className="inline-block rounded-md bg-stone-100 px-2 py-1 text-[11px] font-medium text-stone-700 hover:bg-amber-100 hover:text-amber-800 transition-colors"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2">
        <Link
          to={`/collections?category=${category.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-amber-800 hover:text-amber-900 transition-colors group/link"
        >
          <span>Explore Collection</span>
          <ArrowRight
            size={16}
            className="transform transition-transform duration-300 group-hover/link:translate-x-1.5"
          />
        </Link>
      </div>
    </motion.div>
  );
}