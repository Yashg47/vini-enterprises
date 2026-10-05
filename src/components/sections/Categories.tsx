import { useEffect, useState } from "react";
import { categories as fallbackCategories, type Category } from "../../data/categories";
import CategoryCard from "../ui/CategoryCard";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { getCatalogueCategories } from "../../lib/categories";
import { getProducts } from "../../lib/products";

export default function Categories() {
  const [items, setItems] = useState<Category[]>(fallbackCategories);

  useEffect(() => {
    async function load() {
      try {
        const [catalogue, products] = await Promise.all([getCatalogueCategories(), getProducts()]);
        if (!catalogue.length) return;
        setItems(catalogue.map((category) => {
          const firstProductImage = products.find((product) => product.categoryId === category.slug)?.image;
          return {
            id: category.slug,
            name: category.name,
            image: category.image_url || firstProductImage || fallbackCategories[0].image,
            description: category.description || `Explore our ${category.name} collection.`,
            tagline: category.tagline || "Vini Enterprises",
            itemCount: `${products.filter((product) => product.categoryId === category.slug).length} Products`,
            subcategories: category.children.map((child) => child.name),
          };
        }));
      } catch (error) {
        console.error("Unable to load dynamic categories:", error);
      }
    }
    load();
  }, []);

  return (
    <section className="bg-white py-20 lg:py-28 border-b border-stone-200/60">
      <Container>
        <SectionHeading badge="Curated Collections" title="Masterpieces in Gold, Silver & Natural Gems" subtitle="Explore the categories and subcategories you manage from the Vini admin panel." />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((category) => <CategoryCard key={category.id} category={category} />)}
        </div>
      </Container>
    </section>
  );
}
