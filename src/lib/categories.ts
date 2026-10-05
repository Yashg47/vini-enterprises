import { supabase } from "./supabase";

export interface CatalogueCategory {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  image_url: string | null;
  description: string | null;
  tagline: string | null;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CatalogueCategoryTree extends CatalogueCategory {
  children: CatalogueCategory[];
}

export function slugifyCategory(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getCatalogueCategories(): Promise<CatalogueCategoryTree[]> {
  const { data, error } = await supabase
    .from("catalogue_categories")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;

  const rows = (data ?? []) as CatalogueCategory[];
  const roots = rows.filter((row) => !row.parent_id);

  return roots.map((root) => ({
    ...root,
    children: rows.filter((row) => row.parent_id === root.id),
  }));
}

export async function getAllCatalogueCategories(): Promise<CatalogueCategory[]> {
  const { data, error } = await supabase
    .from("catalogue_categories")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;
  return (data ?? []) as CatalogueCategory[];
}

export async function createCatalogueCategory(input: {
  name: string;
  parentId?: string | null;
  description?: string;
  tagline?: string;
}) {
  const name = input.name.trim();
  if (!name) throw new Error("Category name is required.");

  const baseSlug = slugifyCategory(name);
  if (!baseSlug) throw new Error("Please enter a valid category name.");

  let slug = baseSlug;
  if (input.parentId) {
    const { data: parent, error: parentError } = await supabase
      .from("catalogue_categories")
      .select("slug")
      .eq("id", input.parentId)
      .single();
    if (parentError) throw parentError;
    slug = `${parent.slug}-${baseSlug}`;
  }

  const { data: existing, error: existingError } = await supabase
    .from("catalogue_categories")
    .select("id")
    .eq("slug", slug)
    .limit(1);

  if (existingError) throw existingError;
  if (existing?.length) throw new Error("A category with this name already exists.");

  const { data, error } = await supabase
    .from("catalogue_categories")
    .insert({
      name,
      slug,
      parent_id: input.parentId ?? null,
      description: input.description?.trim() || null,
      tagline: input.tagline?.trim() || null,
      active: true,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data as CatalogueCategory;
}

export async function updateCatalogueCategory(
  id: string,
  input: { name: string; description?: string; tagline?: string }
) {
  const name = input.name.trim();
  if (!name) throw new Error("Category name is required.");

  const { data: currentCategory, error: currentError } = await supabase
    .from("catalogue_categories")
    .select("name, slug, parent_id")
    .eq("id", id)
    .single();
  if (currentError) throw currentError;

  const baseSlug = slugifyCategory(name);
  let slug = baseSlug;
  if (currentCategory.parent_id) {
    const { data: parent, error: parentError } = await supabase
      .from("catalogue_categories")
      .select("slug")
      .eq("id", currentCategory.parent_id)
      .single();
    if (parentError) throw parentError;
    slug = `${parent.slug}-${baseSlug}`;
  }

  const { data: existing, error: existingError } = await supabase
    .from("catalogue_categories")
    .select("id")
    .eq("slug", slug)
    .neq("id", id)
    .limit(1);

  if (existingError) throw existingError;
  if (existing?.length) throw new Error("A category with this name already exists.");

  const { data, error } = await supabase
    .from("catalogue_categories")
    .update({
      name,
      slug,
      description: input.description?.trim() || null,
      tagline: input.tagline?.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  if (currentCategory.parent_id) {
    const { error: productUpdateError } = await supabase
      .from("products")
      .update({ subsection: name, updated_at: new Date().toISOString() })
      .eq("subsection", currentCategory.name);
    if (productUpdateError) throw productUpdateError;
  } else {
    const { error: productUpdateError } = await supabase
      .from("products")
      .update({ category: name, category_id: slug, updated_at: new Date().toISOString() })
      .eq("category_id", currentCategory.slug);
    if (productUpdateError) throw productUpdateError;
  }

  return data as CatalogueCategory;
}

export async function deleteCatalogueCategory(id: string) {
  const { data: category, error: categoryError } = await supabase
    .from("catalogue_categories")
    .select("slug")
    .eq("id", id)
    .single();

  if (categoryError) throw categoryError;

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id")
    .or(`category_id.eq.${id},category_id.eq.${category.slug}`);

  if (productsError) throw productsError;
  if (products?.length) {
    throw new Error("This category has products. Move or delete those products before deleting the category.");
  }

  const { data: children, error: childrenError } = await supabase
    .from("catalogue_categories")
    .select("id")
    .eq("parent_id", id);

  if (childrenError) throw childrenError;
  if (children?.length) {
    throw new Error("This category has subcategories. Delete the subcategories first.");
  }

  const { error } = await supabase.from("catalogue_categories").delete().eq("id", id);
  if (error) throw error;
}
