import { supabase } from "./supabase";
import type { Product } from "../data/products";

interface SupabaseImage {
  id: string;
  image_url: string;
  sort_order: number;
}

interface SupabaseOption {
  id: string;
  option_type: string;
  option_label: string | null;
  option_value: string;
  available: boolean;
  sort_order: number;
}

interface SupabaseProduct {
  id: string;
  name: string;
  slug: string;
  category: Product["category"];
  category_id: Product["categoryId"];
  subsection: Product["subsection"] | null;
  price: number | null;
  price_on_request: boolean;
  description: string | null;
  material: string | null;
  hallmark: string | null;
  gemstone: string | null;
  origin: string | null;
  weight_approx: string | null;
  specifications: Array<{
    label: string;
    value: string;
  }> | null;
  featured: boolean;
  availability: boolean;
  product_images: SupabaseImage[];
  product_options: SupabaseOption[];
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_images (
        id,
        image_url,
        sort_order
      ),
      product_options (
        id,
        option_type,
        option_label,
        option_value,
        available,
        sort_order
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading products:", error);
    throw error;
  }

  return (data as SupabaseProduct[]).map((product) => {
    const images = [...(product.product_images || [])]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((image) => image.image_url);

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      categoryId: product.category_id,
      subsection: product.subsection || undefined,

      image: images[0] || "",
      images,

      hallmark: product.hallmark || "",
      material: product.material || "",
      gemstone: product.gemstone || "",
      origin: product.origin || undefined,
      weightApprox: product.weight_approx || undefined,

      description: product.description || "",

      specifications: Array.isArray(product.specifications)
        ? product.specifications
        : [],

      featured: product.featured,
    };
  });
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_images (
        id,
        image_url,
        sort_order
      ),
      product_options (
        id,
        option_type,
        option_label,
        option_value,
        available,
        sort_order
      )
    `)
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    console.error("Error loading product:", error);
    throw error;
  }

  const product = data as SupabaseProduct;

  const images = [...(product.product_images || [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((image) => image.image_url);

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    categoryId: product.category_id,
    subsection: product.subsection || undefined,

    image: images[0] || "",
    images,

    hallmark: product.hallmark || "",
    material: product.material || "",
    gemstone: product.gemstone || "",
    origin: product.origin || undefined,
    weightApprox: product.weight_approx || undefined,

    description: product.description || "",

    specifications: Array.isArray(product.specifications)
      ? product.specifications
      : [],

    featured: product.featured,
  };
}