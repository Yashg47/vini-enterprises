import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShieldCheck,
  Phone,
  ArrowLeft,
  Truck,
  Sparkles,
  Award,
  Clock,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FloatingWhatsApp from "../components/ui/FloatingWhatsApp";
import Container from "../components/ui/Container";
import ProductCard from "../components/ui/ProductCard";
import WhatsAppButton from "../components/ui/WhatsAppButton";

import type { Product } from "../data/products";
import { getProductBySlug, getProducts } from "../lib/products";
import { SITE } from "../constants/site";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Gallery state
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      if (!id) {
        setProduct(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const [productData, productsData] = await Promise.all([
          getProductBySlug(id),
          getProducts(),
        ]);

        setProduct(productData);
        setAllProducts(productsData);

        // Reset gallery whenever a different product is opened
        setActiveImage(null);
      } catch (err) {
        console.error("Failed to load product:", err);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  const displayImage = activeImage ?? product?.image ?? "";

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#faf8f5]">
        <Navbar />

        <main className="flex-grow flex items-center justify-center py-24">
          <p className="text-stone-600">Loading product...</p>
        </main>

        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-[#faf8f5]">
        <Navbar />

        <main className="flex-grow flex items-center justify-center py-24">
          <div className="text-center p-8 max-w-md bg-white rounded-3xl shadow-sm border border-stone-200">
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              Something went wrong
            </h2>

            <p className="mt-3 text-sm text-stone-600">
              {error}
            </p>

            <Link
              to="/collections"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-800 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-amber-900"
            >
              <ArrowLeft size={16} />
              <span>Back to Collections</span>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#faf8f5]">
        <Navbar />

        <main className="flex-grow flex items-center justify-center py-24">
          <div className="text-center p-8 max-w-md bg-white rounded-3xl shadow-sm border border-stone-200">
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              Product Not Found
            </h2>

            <p className="mt-3 text-sm text-stone-600">
              The creation you are searching for might have been updated or
              moved.
            </p>

            <Link
              to="/collections"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-800 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-amber-900"
            >
              <ArrowLeft size={16} />
              <span>Back to Collections</span>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Related products from same category
  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        p.categoryId === product.categoryId
    )
    .slice(0, 3);

  // If not enough in same category, pad with others
  const displayRelated =
    relatedProducts.length > 0
      ? relatedProducts
      : allProducts
          .filter((p) => p.id !== product.id)
          .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navbar />

      <main className="flex-grow py-10 lg:py-16">
        <Container>

          {/* Breadcrumb & Back Navigation */}
          <div className="mb-8 flex items-center gap-2 text-xs text-stone-500">
            <Link
              to="/"
              className="hover:text-amber-800 transition"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              to="/collections"
              className="hover:text-amber-800 transition"
            >
              Collections
            </Link>

            <span>/</span>

            <Link
              to={`/collections?category=${product.categoryId}`}
              className="hover:text-amber-800 transition"
            >
              {product.category}
            </Link>

            {product.subsection && (
              <>
                <span>/</span>

                <Link
                  to={`/collections?category=${product.categoryId}&sub=${encodeURIComponent(
                    product.subsection
                  )}`}
                  className="hover:text-amber-800 transition"
                >
                  {product.subsection}
                </Link>
              </>
            )}

            <span>/</span>

            <span className="text-stone-900 font-medium truncate max-w-xs">
              {product.name}
            </span>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">

            {/* LEFT: Image Gallery */}
            <div className="lg:col-span-6">

              {/* Main Image */}
              <div className="relative overflow-hidden rounded-3xl bg-white border border-stone-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.06)] aspect-[4/3] sm:aspect-square">
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-all duration-300"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-stone-400">
                    No image available
                  </div>
                )}

                {/* Floating Hallmark Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-900/90 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-amber-200 backdrop-blur border border-amber-500/30 shadow-md">
                    <ShieldCheck
                      size={14}
                      className="text-amber-400"
                    />
                    {product.hallmark}
                  </span>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {product.images && product.images.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none ${
                        displayImage === img
                          ? "border-amber-700 shadow-md scale-105"
                          : "border-stone-200 hover:border-amber-400 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Product Details */}
            <div className="lg:col-span-6">

              {/* Category & Origin */}
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-amber-800 font-semibold">
                <span>{product.category}</span>

                {product.subsection && (
                  <>
                    <span>•</span>

                    <span className="rounded bg-amber-100 px-2 py-0.5 font-bold text-amber-900">
                      {product.subsection}
                    </span>
                  </>
                )}

                {product.origin && (
                  <>
                    <span>•</span>
                    <span>{product.origin}</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-950">
                {product.name}
              </h1>

              {/* Description */}
              <p className="mt-5 text-base leading-relaxed text-stone-600">
                {product.description}
              </p>

              {/* Price Inquiry Banner */}
              <div className="mt-8 rounded-2xl bg-amber-50/70 border border-amber-200/70 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-amber-900 font-semibold">
                      Workshop Pricing
                    </span>

                    <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                      Price Available on Request
                    </h3>

                    <p className="text-xs text-stone-600 mt-1">
                      Calculated as per daily gold bullion rates & gemstone
                      carats.
                    </p>
                  </div>

                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-amber-100 text-amber-800">
                    <Sparkles size={20} />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <WhatsAppButton
                  productName={product.name}
                  variant="gold"
                  size="lg"
                  className="w-full justify-center"
                  label="Enquire on WhatsApp"
                />

                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-7 py-4 text-sm font-semibold uppercase tracking-wider text-stone-800 hover:bg-stone-50 transition-all shadow-sm active:scale-95"
                >
                  <Phone size={18} className="text-amber-800" />
                  <span>Call {SITE.phone}</span>
                </a>
              </div>

              {/* Specifications */}
              <div className="mt-10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 border-b border-stone-200 pb-3">
                  Product Specifications
                </h3>

                <dl className="divide-y divide-stone-100 text-sm">
                  {product.specifications &&
                  product.specifications.length > 0 ? (
                    product.specifications.map((spec) => (
                      <div
                        key={spec.label}
                        className="py-3 flex justify-between"
                      >
                        <dt className="text-stone-500 font-medium">
                          {spec.label}
                        </dt>

                        <dd className="text-stone-900 font-semibold text-right">
                          {spec.value}
                        </dd>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="py-3 flex justify-between">
                        <dt className="text-stone-500">
                          Material
                        </dt>

                        <dd className="text-stone-900 font-semibold">
                          {product.material}
                        </dd>
                      </div>

                      <div className="py-3 flex justify-between">
                        <dt className="text-stone-500">
                          Gemstone
                        </dt>

                        <dd className="text-stone-900 font-semibold">
                          {product.gemstone}
                        </dd>
                      </div>

                      <div className="py-3 flex justify-between">
                        <dt className="text-stone-500">
                          Hallmarking
                        </dt>

                        <dd className="text-stone-900 font-semibold">
                          {product.hallmark}
                        </dd>
                      </div>
                    </>
                  )}
                </dl>
              </div>

              {/* Trust Guarantees */}
              <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 grid grid-cols-1 sm:grid-cols-3 gap-5 text-center sm:text-left">

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Award
                    size={22}
                    className="text-amber-700 shrink-0"
                  />

                  <div>
                    <h5 className="text-xs font-bold text-stone-900">
                      100% Certified
                    </h5>

                    <p className="text-[11px] text-stone-500">
                      Govt. Verified Purity
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Truck
                    size={22}
                    className="text-amber-700 shrink-0"
                  />

                  <div>
                    <h5 className="text-xs font-bold text-stone-900">
                      Insured Transit
                    </h5>

                    <p className="text-[11px] text-stone-500">
                      Doorstep Pan-India
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Clock
                    size={22}
                    className="text-amber-700 shrink-0"
                  />

                  <div>
                    <h5 className="text-xs font-bold text-stone-900">
                      Instant Support
                    </h5>

                    <p className="text-[11px] text-stone-500">
                      WhatsApp Assistance
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Related Creations */}
          {displayRelated.length > 0 && (
            <div className="mt-24 pt-16 border-t border-stone-200">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
                    Complementary Pieces
                  </span>

                  <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-stone-900">
                    You May Also Appreciate
                  </h3>
                </div>

                <Link
                  to="/collections"
                  className="text-xs font-semibold uppercase tracking-wider text-amber-800 hover:underline"
                >
                  View All →
                </Link>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {displayRelated.map((relProduct) => (
                  <ProductCard
                    key={relProduct.id}
                    product={relProduct}
                  />
                ))}
              </div>
            </div>
          )}

        </Container>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}