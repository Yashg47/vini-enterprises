import { supabase, supabaseConfig } from "./supabase";
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

  specifications:
    | Array<{
        label: string;
        value: string;
      }>
    | null;

  featured: boolean;
  availability: boolean;

  product_images?: SupabaseImage[];
  product_options?: SupabaseOption[];
}

/**
 * Convert a Supabase product row into the Product format
 * used by the React application.
 */
function mapSupabaseProduct(product: SupabaseProduct): Product {
  const images = [...(product.product_images ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  const options = [...(product.product_options ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,

    category: product.category,
    categoryId: product.category_id,

    subsection: product.subsection ?? undefined,

    // First image is used as the main product image
    image: images[0]?.image_url ?? "",

    // All Supabase images are available for the gallery
    images: images.map((image) => image.image_url),

    hallmark: product.hallmark ?? "",
    material: product.material ?? "",
    gemstone: product.gemstone ?? "",
    origin: product.origin ?? "",

    weightApprox: product.weight_approx ?? "",

    description: product.description ?? "",

    specifications: product.specifications ?? [],

    featured: product.featured ?? false,
    availability: product.availability ?? true,

    options: options.map((option) => ({
      id: option.id,
      type: option.option_type,
      label: option.option_label ?? undefined,
      value: option.option_value,
      available: option.available,
    })),

    price: product.price ?? undefined,
    priceOnRequest: product.price_on_request ?? true,
  } as Product;
}

/**
 * Get all products from Supabase.
 */
export async function getProducts(): Promise<Product[]> {
  console.log("Supabase configuration:", {
    url: supabaseConfig.url,
    hasPublishableKey: supabaseConfig.hasKey,
  });

  if (!supabaseConfig.hasKey) {
    throw new Error(
      "Supabase publishable key is missing. Check your environment variables."
    );
  }

  try {
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
      console.error("Supabase database error:", error);

      throw new Error(
        [
          error.message,
          error.details,
          error.hint,
          error.code ? `Code: ${error.code}` : "",
        ]
          .filter(Boolean)
          .join(" | ")
      );
    }

    if (!data) {
      throw new Error("Supabase returned no product data.");
    }

    console.log(
      "Mapped product images:",
      data.map(mapSupabaseProduct).map((p) => ({
        name: p.name,
        image: p.image,
        images: p.images,
      }))
    );
    console.log("Number of products:", data.length);

    return (data as SupabaseProduct[]).map(mapSupabaseProduct);
  } catch (error) {
    console.error("Failed to fetch products from Supabase:", error);

    if (
      error instanceof TypeError &&
      error.message === "Failed to fetch"
    ) {
      throw new Error(
        "Could not connect to Supabase. Check your Supabase URL, publishable key, or network connection."
      );
    }

    throw error;
  }
}

/**
 * Get one product by its slug.
 */
export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  try {
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
      .maybeSingle();

    if (error) {
      console.error("Error loading product:", error);

      throw new Error(
        [
          error.message,
          error.details,
          error.hint,
          error.code ? `Code: ${error.code}` : "",
        ]
          .filter(Boolean)
          .join(" | ")
      );
    }

    if (!data) {
      return null;
    }

    return mapSupabaseProduct(data as SupabaseProduct);
  } catch (error) {
    console.error("Failed to load product:", error);
    throw error;
  }
}