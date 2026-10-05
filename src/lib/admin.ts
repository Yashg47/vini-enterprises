import { supabase } from "./supabase";

export interface AdminImage {
  id: string;
  image_url: string;
  sort_order: number;
}

export interface AdminOption {
  id: string;
  option_type: string;
  option_label: string | null;
  option_value: string;
  available: boolean;
  sort_order: number;
}

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  category_id: string;
  subsection: string | null;
  price: number | null;
  price_on_request: boolean;
  description: string | null;
  material: string | null;
  hallmark: string | null;
  gemstone: string | null;
  origin: string | null;
  weight_approx: string | null;
  specifications: Array<{ label: string; value: string }> | null;
  featured: boolean;
  availability: boolean;
  created_at: string;
  updated_at: string;
  product_images: AdminImage[];
  product_options: AdminOption[];
}

export interface AdminProductInput {
  name: string;
  category: string;
  categoryId: string;
  subsection: string;
  price: number | null;
  priceOnRequest: boolean;
  description: string;
  material: string;
  hallmark: string;
  gemstone: string;
  origin: string;
  weightApprox: string;
  featured: boolean;
  availability: boolean;
  specifications: Array<{ label: string; value: string }>;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uniqueSlug(name: string, currentId?: string) {
  const base = slugify(name) || `product-${Date.now()}`;
  let slug = base;
  let counter = 2;

  while (true) {
    const query = supabase.from("products").select("id").eq("slug", slug).limit(1);
    if (currentId) query.neq("id", currentId);
    const { data, error } = await query;
    if (error) throw error;
    if (!data?.length) return slug;
    slug = `${base}-${counter++}`;
  }
}

async function uploadProductImages(files: File[], slug: string) {
  const uploadedUrls: string[] = [];
  const uploadedPaths: string[] = [];

  try {
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      if (!file.type.startsWith("image/")) {
        throw new Error(`${file.name} is not an image file.`);
      }
      if (file.size > 12 * 1024 * 1024) {
        throw new Error(`${file.name} is larger than 12 MB.`);
      }

      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `products/${slug}/${Date.now()}-${index}-${crypto.randomUUID()}.${extension}`;

      const { error } = await supabase.storage
        .from("product-images")
        .upload(path, file, {
          cacheControl: "31536000",
          upsert: false,
          contentType: file.type,
        });

      if (error) throw error;

      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      uploadedPaths.push(path);
      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  } catch (error) {
    if (uploadedPaths.length) {
      await supabase.storage.from("product-images").remove(uploadedPaths).catch(() => undefined);
    }
    throw error;
  }
}

function publicUrlToStoragePath(url: string) {
  const marker = "/storage/v1/object/public/product-images/";
  const index = url.indexOf(marker);
  return index >= 0 ? decodeURIComponent(url.slice(index + marker.length)) : null;
}

async function removeImageUrls(urls: string[]) {
  const paths = urls.map(publicUrlToStoragePath).filter(Boolean) as string[];
  if (paths.length) {
    await supabase.storage.from("product-images").remove(paths);
  }
}

export async function getCurrentAdminSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function signInAdmin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.session;
}

export async function signOutAdmin() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getAdminProducts(): Promise<AdminProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_images (id, image_url, sort_order),
      product_options (id, option_type, option_label, option_value, available, sort_order)
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as AdminProduct[];
}

export async function createAdminProduct(input: AdminProductInput, files: File[], options: Array<{ type: string; label: string; value: string; available: boolean }>) {
  const slug = await uniqueSlug(input.name);
  let imageUrls: string[] = [];

  try {
    if (!files.length) throw new Error("Please upload at least one product image.");

    const { data: product, error: productError } = await supabase
      .from("products")
      .insert({
        name: input.name,
        slug,
        category: input.category,
        category_id: input.categoryId,
        subsection: input.subsection || null,
        price: input.price,
        price_on_request: input.priceOnRequest,
        description: input.description || null,
        material: input.material || null,
        hallmark: input.hallmark || null,
        gemstone: input.gemstone || null,
        origin: input.origin || null,
        weight_approx: input.weightApprox || null,
        specifications: input.specifications,
        featured: input.featured,
        availability: input.availability,
      })
      .select("id")
      .single();

    if (productError) throw productError;

    imageUrls = await uploadProductImages(files, slug);

    const { error: imageError } = await supabase.from("product_images").insert(
      imageUrls.map((image_url, sort_order) => ({ product_id: product.id, image_url, sort_order }))
    );
    if (imageError) throw imageError;

    const cleanOptions = options.filter((option) => option.value.trim());
    if (cleanOptions.length) {
      const { error: optionError } = await supabase.from("product_options").insert(
        cleanOptions.map((option, sort_order) => ({
          product_id: product.id,
          option_type: option.type || "Other",
          option_label: option.label || null,
          option_value: option.value.trim(),
          available: option.available,
          sort_order,
        }))
      );
      if (optionError) throw optionError;
    }

    return product.id as string;
  } catch (error) {
    if (imageUrls.length) await removeImageUrls(imageUrls).catch(() => undefined);
    // If product creation succeeded, remove it so a failed upload never leaves a half-created product.
    try { await supabase.from("products").delete().eq("slug", slug); } catch { /* best effort cleanup */ }
    throw error;
  }
}

export async function updateAdminProduct(
  id: string,
  input: AdminProductInput,
  existingImages: AdminImage[],
  newFiles: File[],
  options: Array<{ type: string; label: string; value: string; available: boolean }>
) {
  const slug = await uniqueSlug(input.name, id);
  const newImageUrls = newFiles.length ? await uploadProductImages(newFiles, slug) : [];

  try {
    const { error } = await supabase
      .from("products")
      .update({
        name: input.name,
        slug,
        category: input.category,
        category_id: input.categoryId,
        subsection: input.subsection || null,
        price: input.price,
        price_on_request: input.priceOnRequest,
        description: input.description || null,
        material: input.material || null,
        hallmark: input.hallmark || null,
        gemstone: input.gemstone || null,
        origin: input.origin || null,
        weight_approx: input.weightApprox || null,
        specifications: input.specifications,
        featured: input.featured,
        availability: input.availability,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) throw error;

    const { error: deleteImagesError } = await supabase.from("product_images").delete().eq("product_id", id);
    if (deleteImagesError) throw deleteImagesError;

    const allImages = [
      ...existingImages.sort((a, b) => a.sort_order - b.sort_order).map((image) => image.image_url),
      ...newImageUrls,
    ];

    if (!allImages.length) throw new Error("A product must have at least one image.");

    const { error: imageError } = await supabase.from("product_images").insert(
      allImages.map((image_url, sort_order) => ({ product_id: id, image_url, sort_order }))
    );
    if (imageError) throw imageError;

    await supabase.from("product_options").delete().eq("product_id", id);
    const cleanOptions = options.filter((option) => option.value.trim());
    if (cleanOptions.length) {
      const { error: optionError } = await supabase.from("product_options").insert(
        cleanOptions.map((option, sort_order) => ({
          product_id: id,
          option_type: option.type || "Other",
          option_label: option.label || null,
          option_value: option.value.trim(),
          available: option.available,
          sort_order,
        }))
      );
      if (optionError) throw optionError;
    }

    // Remove old Storage files that are no longer referenced by the product.
    const kept = new Set(allImages);
    const removed = existingImages.map((image) => image.image_url).filter((url) => !kept.has(url));
    if (removed.length) await removeImageUrls(removed);
  } catch (error) {
    if (newImageUrls.length) await removeImageUrls(newImageUrls).catch(() => undefined);
    throw error;
  }
}

export async function deleteAdminProduct(product: AdminProduct) {
  const imageUrls = product.product_images.map((image) => image.image_url);
  const { error } = await supabase.from("products").delete().eq("id", product.id);
  if (error) throw error;
  if (imageUrls.length) await removeImageUrls(imageUrls).catch(() => undefined);
}
