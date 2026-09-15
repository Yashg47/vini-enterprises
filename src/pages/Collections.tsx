import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Sparkles, X, Package } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FloatingWhatsApp from "../components/ui/FloatingWhatsApp";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import ProductCard from "../components/ui/ProductCard";
import {
  type Product,
  type SilverSubsection,
  type BoxesSubsection,
} from "../data/products";

import { getProducts } from "../lib/products";
import {
  categories,
  SILVER_SUBSECTIONS,
  BOXES_SUBSECTIONS,
} from "../data/categories";

export default function Collections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";
  const selectedSub = searchParams.get("sub") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "featured" | "name-asc" | "name-desc"
  >("featured");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);

        const data = await getProducts();

        setProducts(data);
      } catch (err: unknown) {
        console.error("Failed to load products:", err);

        // Show the real Supabase/runtime error so the Vercel deployment
        // problem can be diagnosed instead of hiding the actual message.
        let message = "Unknown error";

        if (err instanceof Error) {
          message = err.message;
        } else if (err && typeof err === "object") {
          const supabaseError = err as {
            message?: string;
            details?: string;
            hint?: string;
            code?: string;
          };

          const parts = [
            supabaseError.message,
            supabaseError.details,
            supabaseError.hint,
            supabaseError.code ? `Code: ${supabaseError.code}` : undefined,
          ].filter(Boolean);

          if (parts.length > 0) {
            message = parts.join(" | ");
          } else {
            try {
              message = JSON.stringify(err);
            } catch {
              message = "Unable to read the error details.";
            }
          }
        }

        setError(`Unable to load products: ${message}`);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const handleCategoryChange = (catId: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (catId === "all") {
      nextParams.delete("category");
      nextParams.delete("sub");
    } else {
      nextParams.set("category", catId);

      // Reset subcategory when switching main category
      // unless staying in category with subsections
      if (catId !== "silver" && catId !== "boxes") {
        nextParams.delete("sub");
      }
    }

    setSearchParams(nextParams);
  };

  const handleSubsectionChange = (catId: string, sub: string) => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set("category", catId);

    if (sub === "all") {
      nextParams.delete("sub");
    } else {
      nextParams.set("sub", sub);
    }

    setSearchParams(nextParams);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Main category match
        const matchesCategory =
          selectedCategory === "all" ||
          product.categoryId === selectedCategory;

        // Subsection match
        const matchesSubsection =
          selectedSub === "all" || product.subsection === selectedSub;

        // Search query match
        const query = searchQuery.toLowerCase().trim();

        const matchesSearch =
          !query ||
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          (product.subsection &&
            product.subsection.toLowerCase().includes(query)) ||
          product.gemstone.toLowerCase().includes(query) ||
          product.material.toLowerCase().includes(query) ||
          product.hallmark.toLowerCase().includes(query);

        return matchesCategory && matchesSubsection && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "name-asc") {
          return a.name.localeCompare(b.name);
        }

        if (sortBy === "name-desc") {
          return b.name.localeCompare(a.name);
        }

        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedSub, searchQuery, sortBy]);

  const isSilverActive = selectedCategory === "silver";
  const isBoxesActive = selectedCategory === "boxes";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f5]">
        <p className="text-stone-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f5]">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navbar />

      <main className="flex-grow py-12 lg:py-20">
        <Container>
          {/* Header */}
          <SectionHeading
            badge="The Vini Catalogue"
            title="Explore Our Fine Jewellery & Gemstones"
            subtitle="Browse 22K hallmarked gold, 925 silver jewellery, certified natural gemstones, and handcrafted jewellery presentation boxes."
          />

          {/* Main Category Filter Pills */}
          <div className="mt-8 mb-6 flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-amber-800 text-white shadow-md"
                    : "bg-white text-stone-700 hover:bg-amber-50 hover:text-amber-800 border border-stone-200"
                }`}
              >
                All Collections ({products.length})
              </button>

              {categories.map((cat) => {
                const count = products.filter(
                  (p) => p.categoryId === cat.id
                ).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-amber-800 text-white shadow-md"
                        : "bg-white text-stone-700 hover:bg-amber-50 hover:text-amber-800 border border-stone-200"
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* Silver Jewellery Subsections Banner */}
            {isSilverActive && (
              <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white border border-amber-300/60 p-4 sm:p-5 shadow-sm animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-amber-600" />

                    <span className="text-xs font-bold uppercase tracking-widest text-stone-900">
                      Silver Jewellery Subsections:
                    </span>
                  </div>

                  <span className="text-[11px] text-stone-500 font-medium">
                    Pure 925 Hallmarked Silver
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() =>
                      handleSubsectionChange("silver", "all")
                    }
                    className={`rounded-xl px-4 py-2 text-xs font-medium transition cursor-pointer ${
                      selectedSub === "all"
                        ? "bg-stone-900 text-white font-semibold shadow-sm"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    All Silver (
                    {products.filter(
                      (p) => p.categoryId === "silver"
                    ).length}
                    )
                  </button>

                  {SILVER_SUBSECTIONS.map(
                    (sub: SilverSubsection) => {
                      const count = products.filter(
                        (p) =>
                          p.categoryId === "silver" &&
                          p.subsection === sub
                      ).length;

                      return (
                        <button
                          key={sub}
                          onClick={() =>
                            handleSubsectionChange("silver", sub)
                          }
                          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-medium transition cursor-pointer ${
                            selectedSub === sub
                              ? "bg-amber-800 text-white font-semibold shadow-sm"
                              : "bg-amber-50/80 text-stone-800 hover:bg-amber-100/70 border border-amber-200/50"
                          }`}
                        >
                          <span>{sub}</span>

                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                              selectedSub === sub
                                ? "bg-amber-950/40 text-amber-200"
                                : "bg-amber-200/70 text-amber-900"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* Jewellery Boxes Subsections Banner */}
            {isBoxesActive && (
              <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white border border-amber-300/60 p-4 sm:p-5 shadow-sm animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <Package
                      size={14}
                      className="text-amber-700"
                    />

                    <span className="text-xs font-bold uppercase tracking-widest text-stone-900">
                      Jewellery Boxes Subsections:
                    </span>
                  </div>

                  <span className="text-[11px] text-stone-500 font-medium">
                    Handcrafted Velvet & Hardwood Presentation Boxes
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() =>
                      handleSubsectionChange("boxes", "all")
                    }
                    className={`rounded-xl px-4 py-2 text-xs font-medium transition cursor-pointer ${
                      selectedSub === "all"
                        ? "bg-stone-900 text-white font-semibold shadow-sm"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    All Boxes (
                    {products.filter(
                      (p) => p.categoryId === "boxes"
                    ).length}
                    )
                  </button>

                  {BOXES_SUBSECTIONS.map(
                    (sub: BoxesSubsection) => {
                      const count = products.filter(
                        (p) =>
                          p.categoryId === "boxes" &&
                          p.subsection === sub
                      ).length;

                      return (
                        <button
                          key={sub}
                          onClick={() =>
                            handleSubsectionChange("boxes", sub)
                          }
                          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-medium transition cursor-pointer ${
                            selectedSub === sub
                              ? "bg-amber-800 text-white font-semibold shadow-sm"
                              : "bg-amber-50/80 text-stone-800 hover:bg-amber-100/70 border border-amber-200/50"
                          }`}
                        >
                          <span>{sub}</span>

                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                              selectedSub === sub
                                ? "bg-amber-950/40 text-amber-200"
                                : "bg-amber-200/70 text-amber-900"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200/80">
              {/* Search Box */}
              <div className="relative w-full sm:max-w-md">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  type="text"
                  placeholder="Search jewellery, boxes, pendal, rings..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="w-full rounded-full border border-stone-300 bg-white py-2.5 pl-10 pr-10 text-sm text-stone-900 placeholder-stone-400 focus:border-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700 shadow-sm"
                />

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Sorting & Counter */}
              <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4">
                <span className="text-xs text-stone-500 font-medium whitespace-nowrap">
                  Showing{" "}
                  <strong className="text-stone-900">
                    {filteredProducts.length}
                  </strong>{" "}
                  items

                  {selectedSub !== "all" && (
                    <span className="text-amber-800 ml-1">
                      in {selectedSub}
                    </span>
                  )}
                </span>

                <div className="flex items-center gap-2">
                  <SlidersHorizontal
                    size={15}
                    className="text-stone-400"
                  />

                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as
                          | "featured"
                          | "name-asc"
                          | "name-desc"
                      )
                    }
                    className="rounded-lg border border-stone-300 bg-white py-1.5 px-3 text-xs font-medium text-stone-800 focus:border-amber-700 focus:outline-none shadow-sm cursor-pointer"
                  >
                    <option value="featured">
                      Featured First
                    </option>

                    <option value="name-asc">
                      Name: A to Z
                    </option>

                    <option value="name-desc">
                      Name: Z to A
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center rounded-3xl border border-dashed border-stone-300 bg-white p-12">
              <Sparkles
                size={36}
                className="mx-auto text-amber-700/50"
              />

              <h3 className="mt-4 font-serif text-2xl font-bold text-stone-900">
                No matching creations found
              </h3>

              <p className="mt-2 text-sm text-stone-600 max-w-md mx-auto">
                {selectedSub !== "all"
                  ? `No items found currently in the "${selectedSub}" subsection.`
                  : "We couldn't find items matching your criteria. Try adjusting your search query or reset the filter."}
              </p>

              <button
                onClick={() => {
                  handleCategoryChange("all");
                  setSearchQuery("");
                }}
                className="mt-6 rounded-full bg-amber-800 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-amber-900 cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </Container>
      </main>

      <Footer />

      <FloatingWhatsApp />
    </div>
  );
}