import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FloatingWhatsApp from "../components/ui/FloatingWhatsApp";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import ProductCard from "../components/ui/ProductCard";
import type { Product } from "../data/products";
import { getProducts } from "../lib/products";
import { getCatalogueCategories, type CatalogueCategoryTree } from "../lib/categories";
import { categories as fallbackCategories } from "../data/categories";

export default function Collections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [catalogueCategories, setCatalogueCategories] = useState<CatalogueCategoryTree[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";
  const selectedSub = searchParams.get("sub") || "all";
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "name-asc" | "name-desc">("featured");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [productData, categoryData] = await Promise.all([getProducts(), getCatalogueCategories()]);
        setProducts(productData);
        setCatalogueCategories(categoryData);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Unable to load catalogue.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const roots = catalogueCategories.length
    ? catalogueCategories
    : fallbackCategories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.id,
        parent_id: null,
        image_url: null,
        description: category.description,
        tagline: category.tagline,
        sort_order: 0,
        active: true,
        created_at: "",
        updated_at: "",
        children: (category.subcategories ?? []).map((name, index) => ({
          id: `${category.id}-${index}`,
          name,
          slug: `${category.id}-${index}`,
          parent_id: category.id,
          image_url: null,
          description: null,
          tagline: null,
          sort_order: index,
          active: true,
          created_at: "",
          updated_at: "",
        })),
      }));

  function handleCategoryChange(slug: string) {
    const next = new URLSearchParams(searchParams);
    if (slug === "all") {
      next.delete("category");
      next.delete("sub");
    } else {
      next.set("category", slug);
      next.delete("sub");
    }
    setSearchParams(next);
  }

  function handleSubsectionChange(slug: string, sub: string) {
    const next = new URLSearchParams(searchParams);
    next.set("category", slug);
    if (sub === "all") next.delete("sub");
    else next.set("sub", sub);
    setSearchParams(next);
  }

  const selectedRoot = roots.find((category) => category.slug === selectedCategory);
  const selectedChildren = selectedRoot?.children ?? [];

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.categoryId === selectedCategory;
    const matchesSubsection = selectedSub === "all" || product.subsection === selectedSub;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query) || product.subsection?.toLowerCase().includes(query) || product.gemstone.toLowerCase().includes(query) || product.material.toLowerCase().includes(query) || product.hallmark.toLowerCase().includes(query);
    return matchesCategory && matchesSubsection && matchesSearch;
  }).sort((a, b) => sortBy === "name-asc" ? a.name.localeCompare(b.name) : sortBy === "name-desc" ? b.name.localeCompare(a.name) : Number(b.featured) - Number(a.featured)), [products, selectedCategory, selectedSub, searchQuery, sortBy]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#faf8f5]"><p className="text-stone-600">Loading products...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-[#faf8f5]"><p className="max-w-xl px-5 text-center text-red-600">Unable to load catalogue: {error}</p></div>;

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navbar />
      <main className="flex-grow py-12 lg:py-20">
        <Container>
          <SectionHeading badge="The Vini Catalogue" title="Explore Our Fine Jewellery & Gemstones" subtitle="Browse your complete catalogue using the categories and subcategories you create in Admin." />
          <div className="mt-8 mb-6 flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button onClick={() => handleCategoryChange("all")} className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${selectedCategory === "all" ? "bg-amber-800 text-white shadow-md" : "bg-white text-stone-700 hover:bg-amber-50 border border-stone-200"}`}>All Collections ({products.length})</button>
              {roots.map((cat) => {
                const count = products.filter((p) => p.categoryId === cat.slug).length;
                return <button key={cat.id} onClick={() => handleCategoryChange(cat.slug)} className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${selectedCategory === cat.slug ? "bg-amber-800 text-white shadow-md" : "bg-white text-stone-700 hover:bg-amber-50 border border-stone-200"}`}>{cat.name} ({count})</button>;
              })}
            </div>

            {selectedRoot && selectedChildren.length > 0 && (
              <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white border border-amber-300/60 p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-stone-100"><span className="text-xs font-bold uppercase tracking-widest text-stone-900">{selectedRoot.name} subcategories</span><span className="text-[11px] text-stone-500">Managed from Admin</span></div>
                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => handleSubsectionChange(selectedRoot.slug, "all")} className={`rounded-xl px-4 py-2 text-xs font-medium ${selectedSub === "all" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700"}`}>All ({products.filter((p) => p.categoryId === selectedRoot.slug).length})</button>
                  {selectedChildren.map((child) => {
                    const count = products.filter((p) => p.categoryId === selectedRoot.slug && p.subsection === child.name).length;
                    return <button key={child.id} onClick={() => handleSubsectionChange(selectedRoot.slug, child.name)} className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-medium ${selectedSub === child.name ? "bg-amber-800 text-white" : "bg-amber-50 text-stone-800 border border-amber-200/50"}`}>{child.name}<span className="text-[10px]">{count}</span></button>;
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200/80">
              <div className="relative w-full sm:max-w-md"><Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" /><input type="text" placeholder="Search your catalogue..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-full border border-stone-300 bg-white py-2.5 pl-10 pr-10 text-sm" />{searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400"><X size={16} /></button>}</div>
              <div className="flex w-full sm:w-auto items-center justify-between gap-4"><span className="text-xs text-stone-500">Showing <strong className="text-stone-900">{filteredProducts.length}</strong> items</span><div className="flex items-center gap-2"><SlidersHorizontal size={15} className="text-stone-400" /><select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="rounded-lg border border-stone-300 bg-white py-1.5 px-3 text-xs"><option value="featured">Featured First</option><option value="name-asc">Name: A to Z</option><option value="name-desc">Name: Z to A</option></select></div></div>
            </div>
          </div>

          {filteredProducts.length > 0 ? <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="py-20 text-center rounded-3xl border border-dashed border-stone-300 bg-white p-12"><Sparkles size={36} className="mx-auto text-amber-700/50" /><h3 className="mt-4 font-serif text-2xl font-bold">No matching creations found</h3><p className="mt-2 text-sm text-stone-600">Try another category or reset your filters.</p><button onClick={() => { handleCategoryChange("all"); setSearchQuery(""); }} className="mt-6 rounded-full bg-amber-800 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white">Reset Filters</button></div>}
        </Container>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
