-- Vini Enterprises admin policies
-- Run this in Supabase SQL Editor AFTER creating your admin user in
-- Authentication > Users.
--
-- These policies allow authenticated users to manage catalogue data.
-- Keep the admin account private. Do NOT expose a service-role key in Vite.

drop policy if exists "Authenticated users can insert products" on public.products;

create policy "Authenticated users can insert products"
on public.products
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update products" on public.products;

create policy "Authenticated users can update products"
on public.products
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can delete products" on public.products;

create policy "Authenticated users can delete products"
on public.products
for delete
to authenticated
using (true);

drop policy if exists "Authenticated users can insert product images" on public.product_images;

create policy "Authenticated users can insert product images"
on public.product_images
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update product images" on public.product_images;

create policy "Authenticated users can update product images"
on public.product_images
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can delete product images" on public.product_images;

create policy "Authenticated users can delete product images"
on public.product_images
for delete
to authenticated
using (true);

drop policy if exists "Authenticated users can insert product options" on public.product_options;

create policy "Authenticated users can insert product options"
on public.product_options
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update product options" on public.product_options;

create policy "Authenticated users can update product options"
on public.product_options
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can delete product options" on public.product_options;

create policy "Authenticated users can delete product options"
on public.product_options
for delete
to authenticated
using (true);

-- Storage policies for the existing PUBLIC bucket: product-images.
drop policy if exists "Authenticated users can upload product images" on storage.objects;

create policy "Authenticated users can upload product images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'product-images');

drop policy if exists "Authenticated users can update product images in bucket" on storage.objects;

create policy "Authenticated users can update product images in bucket"
on storage.objects
for update
to authenticated
using (bucket_id = 'product-images')
with check (bucket_id = 'product-images');

drop policy if exists "Authenticated users can delete product images in bucket" on storage.objects;

create policy "Authenticated users can delete product images in bucket"
on storage.objects
for delete
to authenticated
using (bucket_id = 'product-images');

-- ================================================================
-- Dynamic catalogue categories
-- ================================================================
create table if not exists public.catalogue_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  parent_id uuid references public.catalogue_categories(id) on delete restrict,
  image_url text,
  description text,
  tagline text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists catalogue_categories_parent_id_idx
  on public.catalogue_categories(parent_id);

alter table public.catalogue_categories enable row level security;

drop policy if exists "Public can view active catalogue categories" on public.catalogue_categories;
create policy "Public can view active catalogue categories"
on public.catalogue_categories
for select
to anon, authenticated
using (active = true);

drop policy if exists "Authenticated users can manage catalogue categories" on public.catalogue_categories;
create policy "Authenticated users can manage catalogue categories"
on public.catalogue_categories
for all
to authenticated
using (true)
with check (true);

-- Seed the categories already used by the current Vini catalogue.
insert into public.catalogue_categories (name, slug, parent_id, description, tagline, sort_order)
values
  ('Gold Jewellery', 'gold', null, 'Handcrafted 22K & 18K BIS Hallmarked jewellery designed with timeless Indian artistry.', 'BIS 916 Hallmarked', 10),
  ('Silver Jewellery', 'silver', null, 'Authentic 925 Silver Jewellery across curated subsections.', '925 Pure Silver', 20),
  ('Natural Gemstones', 'gemstone', null, 'Untreated, laboratory-certified precious and astrological gemstones.', 'Lab Certified & Vedic', 30),
  ('Jewellery Boxes', 'boxes', null, 'Handcrafted presentation boxes for jewellery and gifting.', 'Premium Craftsmanship', 40)
on conflict (slug) do update set
  name = excluded.name,
  description = coalesce(public.catalogue_categories.description, excluded.description),
  tagline = coalesce(public.catalogue_categories.tagline, excluded.tagline);

insert into public.catalogue_categories (name, slug, parent_id, sort_order)
select child.name, child.slug, parent.id, child.sort_order
from (
  values
    ('Bracelets', 'silver-bracelets', 'silver', 10),
    ('Chains', 'silver-chains', 'silver', 20),
    ('Rings', 'silver-rings', 'silver', 30),
    ('Kadha', 'silver-kadha', 'silver', 40),
    ('Payal', 'silver-payal', 'silver', 50),
    ('Necklace Set Box', 'boxes-necklace-set-box', 'boxes', 10),
    ('Ring Box', 'boxes-ring-box', 'boxes', 20),
    ('Tops Box', 'boxes-tops-box', 'boxes', 30),
    ('Pendal Box', 'boxes-pendal-box', 'boxes', 40),
    ('Chain / Payal Box', 'boxes-chain-payal-box', 'boxes', 50)
) as child(name, slug, parent_slug, sort_order)
join public.catalogue_categories parent on parent.slug = child.parent_slug
on conflict (slug) do nothing;

-- Allow the existing product rows to continue using their current category IDs,
-- while new admin-created products use the category row's slug.
