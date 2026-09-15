import { categories } from "../../data/categories";
import CategoryCard from "../ui/CategoryCard";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function Categories() {
  return (
    <section className="bg-white py-20 lg:py-28 border-b border-stone-200/60">
      <Container>
        <SectionHeading
          badge="Curated Collections"
          title="Masterpieces in Gold, Silver & Natural Gems"
          subtitle="Explore our certified hallmarked jewellery and natural astrological gemstones, each created with uncompromising devotion to purity."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}