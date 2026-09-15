import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "../../data/products";
import ProductCard from "../ui/ProductCard";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="bg-[#fbf9f5] py-20 lg:py-28">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <SectionHeading
              badge="Handcrafted Showcase"
              title="Featured Fine Jewellery & Precious Stones"
              subtitle="Every creation is accompanied by official hallmarking or gemstone laboratory certification."
              align="left"
              className="mb-0"
            />
          </div>

          <div className="mt-6 md:mt-0">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-800 hover:text-amber-900 border-b border-amber-800 pb-1 group transition-colors"
            >
              <span>View All Collections</span>
              <ArrowRight
                size={16}
                className="transform transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}