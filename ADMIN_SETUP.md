# Vini Enterprises Admin Setup

## 1. Local environment

Create `.env.local` in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

Never commit `.env.local`.

## 2. Create your admin user

In Supabase:

Authentication → Users → Add user

Create the email/password you will use for `/admin`.

## 3. Run the SQL

Open Supabase → SQL Editor and run **all** of `supabase-admin-policies.sql`.

This file also creates the dynamic `catalogue_categories` table and seeds the current categories:

- Gold Jewellery
- Silver Jewellery
- Natural Gemstones
- Jewellery Boxes

It also seeds the existing Silver Jewellery and Jewellery Boxes subcategories.

## 4. Admin workflow

Open:

`http://localhost:5173/admin`

or on Vercel:

`https://your-site.vercel.app/admin`

Sign in, then you can:

- Add categories
- Rename categories
- Delete empty categories
- Add subcategories
- Rename subcategories
- Delete empty subcategories
- Add products
- Upload multiple product images at once
- Reorder images
- Edit products
- Delete products
- Manage product options such as Ring Size or Chain Size

## 5. Dynamic categories

The public Collections page and the home-page collection cards read categories from Supabase.

When you create a new category such as `Watches`, it automatically becomes available in the product form and public Collections filters.

When you create subcategories such as `Men's Watches` or `Women's Watches`, they automatically appear under that category on the public Collections page and in the navigation menu.

## Important

Do not put a Supabase service-role key in the frontend. Use only the publishable key.
