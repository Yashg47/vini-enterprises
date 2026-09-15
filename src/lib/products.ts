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

  product_images: SupabaseImage[];
  product_options: SupabaseOption[];
}

export async function getProducts(): Promise<Product[]> {
  console.log("Supabase configuration:", {
    url: supabaseConfig.url,
    hasPublishableKey: supabaseConfig.hasKey,
  });

  if (!supabaseConfig.hasKey) {
    throw new Error(
      "Supabase publishable key is missing. Check Vercel Environment Variables."
    );
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
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

    return (data as SupabaseProduct[]).map((product) => {
      const images = [...(product.product_images || [])].sort(
        (a, b) => a.sort_order - b.sort_order
      );

      const options = [...(product.product_options || [])].sort(
        (a, b) => a.sort_order - b.sort_order
      );

      return {
        id: product.id,
        slug: product.slug,
        name: product.name,

        category: product.category,
        categoryId: product.category_id,

        subsection: product.subsection ?? undefined,

        image: images[0]?.image_url || "",
        images: images.map((image) => image.image_url),

        hallmark: product.hallmark || "",
        material: product.material || "",
        gemstone: product.gemstone || "",
        origin: product.origin || "",

        weightApprox: product.weight_approx || "",

        description: product.description || "",

        specifications:
          product.specifications || [],

        featured: product.featured,
        availability: product.availability,

        options: options.map((option) => ({
          id: option.id,
          type: option.option_type,
          label: option.option_label || undefined,
          value: option.option_value,
          available: option.available,
        })),

        price: product.price ?? undefined,
        priceOnRequest: product.price_on_request,
      } as Product;
    });
  } catch (error) {
    console.error("Failed to fetch products from Supabase:", error);

    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(
        "Could not connect to Supabase. Check the Vercel Supabase URL, publishable key, or network connection."
      );
    }

    throw error;
  }
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

  const product = data as SupabaseProduct;

  const images = [...(product.product_images || [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  const options = [...(product.product_options || [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,

    category: product.category,
    categoryId: product.category_id,

    subsection: product.subsection ?? undefined,

    image: images[0]?.image_url || "",
    images: images.map((image) => image.image_url),

    hallmark: product.hallmark || "",
    material: product.material || "",
    gemstone: product.gemstone || "",
    origin: product.origin || "",

    weightApprox: product.weight_approx || "",

    description: product.description || "",

    specifications: product.specifications || [],

    featured: product.featured,
    availability: product.availability,

    options: options.map((option) => ({
      id: option.id,
      type: option.option_type,
      label: option.option_label || undefined,
      value: option.option_value,
      available: option.available,
    })),

    price: product.price ?? undefined,
    priceOnRequest: product.price_on_request,
  } as Product;
}