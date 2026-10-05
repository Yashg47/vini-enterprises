import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  ImagePlus,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  createAdminProduct,
  deleteAdminProduct,
  getAdminProducts,
  getCurrentAdminSession,
  signInAdmin,
  signOutAdmin,
  updateAdminProduct,
  type AdminImage,
  type AdminProduct,
  type AdminProductInput,
} from "../lib/admin";
import { supabase } from "../lib/supabase";
import {
  createCatalogueCategory,
  deleteCatalogueCategory,
  getAllCatalogueCategories,
  type CatalogueCategory,
  updateCatalogueCategory,
} from "../lib/categories";

interface FormState extends AdminProductInput {}
interface EditableOption { id: string; type: string; label: string; value: string; available: boolean }

const EMPTY_FORM: FormState = {
  name: "",
  category: "",
  categoryId: "",
  subsection: "",
  price: null,
  priceOnRequest: true,
  description: "",
  material: "925 Sterling Silver",
  hallmark: "925 Hallmarked",
  gemstone: "",
  origin: "India",
  weightApprox: "",
  featured: false,
  availability: true,
  specifications: [],
};

function inputClass() {
  return "w-full rounded-xl border border-stone-200 bg-white px-3.5 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10";
}

function ProductForm({
  product,
  categories,
  onSaved,
  onCancel,
}: {
  product: AdminProduct | null;
  categories: CatalogueCategory[];
  onSaved: () => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [existingImages, setExistingImages] = useState<AdminImage[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<EditableOption[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!product) {
      const firstCategory = categories.find((category) => !category.parent_id);
      setForm({ ...EMPTY_FORM, category: firstCategory?.name ?? "", categoryId: firstCategory?.slug ?? "" });
      setExistingImages([]);
      setNewFiles([]);
      setOptions([]);
      return;
    }

    setForm({
      name: product.name,
      category: product.category,
      categoryId: product.category_id,
      subsection: product.subsection ?? "",
      price: product.price,
      priceOnRequest: product.price_on_request,
      description: product.description ?? "",
      material: product.material ?? "",
      hallmark: product.hallmark ?? "",
      gemstone: product.gemstone ?? "",
      origin: product.origin ?? "",
      weightApprox: product.weight_approx ?? "",
      featured: product.featured,
      availability: product.availability,
      specifications: product.specifications ?? [],
    });
    setExistingImages([...product.product_images].sort((a, b) => a.sort_order - b.sort_order));
    setNewFiles([]);
    setOptions(product.product_options.map((option) => ({
      id: option.id,
      type: option.option_type,
      label: option.option_label ?? "",
      value: option.option_value,
      available: option.available,
    })));
  }, [product, categories]);

  const totalImages = existingImages.length + newFiles.length;

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  function selectCategory(value: string) {
    const category = categories.find((item) => !item.parent_id && item.name === value);
    const children = category ? categories.filter((item) => item.parent_id === category.id) : [];
    setForm((current) => ({
      ...current,
      category: value,
      categoryId: category?.slug ?? "",
      subsection: children[0]?.name ?? "",
    }));
  }

  const selectedCategory = categories.find(
    (category) => !category.parent_id && category.slug === form.categoryId
  );
  const selectedSubcategories = selectedCategory
    ? categories.filter((category) => category.parent_id === selectedCategory.id)
    : [];

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const selected = Array.from(fileList);
    setError(null);
    setNewFiles((current) => [...current, ...selected]);
  }

  function removeNewFile(index: number) {
    setNewFiles((current) => current.filter((_, fileIndex) => fileIndex !== index));
  }

  function moveExisting(index: number, direction: -1 | 1) {
    setExistingImages((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function removeExisting(index: number) {
    setExistingImages((current) => current.filter((_, imageIndex) => imageIndex !== index));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    if (!form.name.trim()) {
      setError("Product name is required.");
      setSaving(false);
      return;
    }

    if (!totalImages) {
      setError("Please add at least one product image.");
      setSaving(false);
      return;
    }

    try {
      const normalizedOptions = options.map(({ type, label, value, available }) => ({ type, label, value, available }));
      if (product) {
        await updateAdminProduct(product.id, form, existingImages, newFiles, normalizedOptions);
        setMessage("Product updated successfully.");
      } else {
        await createAdminProduct(form, newFiles, normalizedOptions);
        setMessage("Product added successfully.");
        setForm(EMPTY_FORM);
        setExistingImages([]);
        setNewFiles([]);
        setOptions([]);
      }

      await onSaved();
      if (!product) window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unable to save product.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">{product ? "Edit product" : "New product"}</p>
          <h2 className="mt-1 font-serif text-3xl font-bold text-stone-900">{product ? product.name : "Add a product"}</h2>
        </div>
        <button type="button" onClick={onCancel} className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50">
          <X size={16} /> Cancel
        </button>
      </div>

      {error && <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"><AlertCircle size={18} className="mt-0.5 shrink-0" />{error}</div>}
      {message && <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700"><Check size={18} className="mt-0.5 shrink-0" />{message}</div>}

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h3 className="font-serif text-xl font-bold text-stone-900">Product information</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="md:col-span-2 text-sm font-medium text-stone-700">Product name<input className={`${inputClass()} mt-1.5`} value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="Silver CZ Halo Ladies Ring" /></label>
          <label className="text-sm font-medium text-stone-700">Category<select required className={`${inputClass()} mt-1.5`} value={form.category} onChange={(e) => selectCategory(e.target.value)}><option value="">Select category</option>{categories.filter((item) => !item.parent_id).map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select></label>
          <label className="text-sm font-medium text-stone-700">Subcategory<select className={`${inputClass()} mt-1.5`} value={form.subsection} onChange={(e) => setField("subsection", e.target.value)} disabled={!selectedSubcategories.length}><option value="">None</option>{selectedSubcategories.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select></label>
          <label className="text-sm font-medium text-stone-700">Price (₹)<input type="number" min="0" step="0.01" className={`${inputClass()} mt-1.5`} value={form.price ?? ""} disabled={form.priceOnRequest} onChange={(e) => setField("price", e.target.value ? Number(e.target.value) : null)} placeholder="Leave empty if on request" /></label>
          <label className="flex items-center gap-3 self-end rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-700"><input type="checkbox" className="h-4 w-4 accent-amber-700" checked={form.priceOnRequest} onChange={(e) => setField("priceOnRequest", e.target.checked)} /> Price on request</label>
          <label className="md:col-span-2 text-sm font-medium text-stone-700">Description<textarea rows={4} className={`${inputClass()} mt-1.5 resize-y`} value={form.description} onChange={(e) => setField("description", e.target.value)} placeholder="Describe the product, finish and intended use." /></label>
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h3 className="font-serif text-xl font-bold text-stone-900">Product details</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {(["material", "hallmark", "gemstone", "origin", "weightApprox"] as const).map((key) => <label key={key} className="text-sm font-medium text-stone-700">{key === "weightApprox" ? "Weight" : key[0].toUpperCase() + key.slice(1)}<input className={`${inputClass()} mt-1.5`} value={form[key]} onChange={(e) => setField(key, e.target.value)} /></label>)}
          <label className="flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-700"><input type="checkbox" className="h-4 w-4 accent-amber-700" checked={form.availability} onChange={(e) => setField("availability", e.target.checked)} /> Available for sale</label>
          <label className="flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-700"><input type="checkbox" className="h-4 w-4 accent-amber-700" checked={form.featured} onChange={(e) => setField("featured", e.target.checked)} /> Featured product</label>
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><h3 className="font-serif text-xl font-bold text-stone-900">Product images</h3><p className="mt-1 text-sm text-stone-500">Select all photos at once. The first image becomes the main photo.</p></div><label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-stone-900 px-4 py-2.5 text-sm font-semibold text-amber-100 hover:bg-stone-800"><Upload size={16} /> Add images<input type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} /></label></div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {existingImages.map((image, index) => <div key={image.id} className="group relative overflow-hidden rounded-xl border border-stone-200 bg-stone-50"><img src={image.image_url} alt="Existing product" className="aspect-square w-full object-cover" /><div className="absolute left-2 top-2 rounded-full bg-stone-900/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">{index === 0 ? "Main" : `#${index + 1}`}</div><div className="absolute inset-x-2 bottom-2 flex justify-between gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"><button type="button" disabled={index === 0} onClick={() => moveExisting(index, -1)} className="rounded-lg bg-white/95 p-2 shadow disabled:opacity-40" title="Move left"><ChevronUp size={15} /></button><button type="button" onClick={() => removeExisting(index)} className="rounded-lg bg-red-600 p-2 text-white shadow" title="Remove"><Trash2 size={15} /></button><button type="button" disabled={index === existingImages.length - 1} onClick={() => moveExisting(index, 1)} className="rounded-lg bg-white/95 p-2 shadow disabled:opacity-40" title="Move right"><ChevronDown size={15} /></button></div></div>)}
          {newFiles.map((file, index) => <div key={`${file.name}-${index}`} className="relative overflow-hidden rounded-xl border border-amber-300 bg-stone-50"><img src={URL.createObjectURL(file)} alt={file.name} className="aspect-square w-full object-cover" /><div className="absolute left-2 top-2 rounded-full bg-amber-700 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">New</div><button type="button" onClick={() => removeNewFile(index)} className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white shadow"><X size={15} /></button></div>)}
          {!totalImages && <label className="col-span-2 flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 text-center sm:col-span-4 sm:aspect-[4/1]"><ImagePlus size={28} className="text-amber-700" /><span className="mt-2 text-sm font-semibold text-stone-700">Choose product photos</span><span className="mt-1 text-xs text-stone-500">Front, side, back and close-up</span><input type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} /></label>}
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between"><div><h3 className="font-serif text-xl font-bold text-stone-900">Options</h3><p className="mt-1 text-sm text-stone-500">Use this for ring sizes, chain sizes or other variants.</p></div><button type="button" onClick={() => setOptions((current) => [...current, { id: crypto.randomUUID(), type: form.subsection.toLowerCase().includes("ring") ? "Ring Size" : form.subsection.toLowerCase().includes("chain") ? "Chain Size" : "Option", label: "", value: "", available: true }])} className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-3.5 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50"><Plus size={15} /> Add option</button></div>
        {options.length > 0 && <div className="mt-4 space-y-3">{options.map((option, index) => <div key={option.id} className="grid gap-2 rounded-xl border border-stone-200 p-3 sm:grid-cols-[1fr_1fr_1fr_auto_auto] sm:items-center"><input className={inputClass()} placeholder="Type e.g. Ring Size" value={option.type} onChange={(e) => setOptions((current) => current.map((item, i) => i === index ? { ...item, type: e.target.value } : item))} /><input className={inputClass()} placeholder="Label" value={option.label} onChange={(e) => setOptions((current) => current.map((item, i) => i === index ? { ...item, label: e.target.value } : item))} /><input className={inputClass()} placeholder="Value e.g. 16" value={option.value} onChange={(e) => setOptions((current) => current.map((item, i) => i === index ? { ...item, value: e.target.value } : item))} /><label className="flex items-center gap-2 text-xs text-stone-600"><input type="checkbox" className="accent-amber-700" checked={option.available} onChange={(e) => setOptions((current) => current.map((item, i) => i === index ? { ...item, available: e.target.checked } : item))} /> Available</label><button type="button" onClick={() => setOptions((current) => current.filter((_, i) => i !== index))} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button></div>)}</div>}
      </section>

      <button type="submit" disabled={saving} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-800 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-60">{saving ? <><Loader2 size={17} className="animate-spin" /> Saving product...</> : <><Save size={17} /> {product ? "Update product" : "Save product"}</>}</button>
    </form>
  );
}

function CategoryManager({
  categories,
  onChanged,
}: {
  categories: CatalogueCategory[];
  onChanged: () => Promise<void>;
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [parentId, setParentId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tagline, setTagline] = useState("");
  const [editing, setEditing] = useState<CatalogueCategory | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roots = categories.filter((category) => !category.parent_id);
  const childrenOf = (id: string) => categories.filter((category) => category.parent_id === id);

  function resetForm() {
    setShowAdd(false);
    setParentId(null);
    setName("");
    setDescription("");
    setTagline("");
    setEditing(null);
    setError(null);
  }

  function startAdd(parent: string | null) {
    setEditing(null);
    setParentId(parent);
    setName("");
    setDescription("");
    setTagline("");
    setError(null);
    setShowAdd(true);
  }

  function startEdit(category: CatalogueCategory) {
    setEditing(category);
    setParentId(category.parent_id);
    setName(category.name);
    setDescription(category.description ?? "");
    setTagline(category.tagline ?? "");
    setError(null);
    setShowAdd(true);
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      if (editing) {
        await updateCatalogueCategory(editing.id, { name, description, tagline });
      } else {
        await createCatalogueCategory({ name, parentId, description, tagline });
      }
      await onChanged();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save category.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(category: CatalogueCategory) {
    if (!window.confirm(`Delete "${category.name}"? This cannot be undone.`)) return;
    try {
      await deleteCatalogueCategory(category.id);
      await onChanged();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Unable to delete category.");
    }
  }

  return (
    <section className="mt-7 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Catalogue structure</p>
          <h2 className="mt-1 font-serif text-2xl font-bold">Categories & subcategories</h2>
          <p className="mt-1 text-sm text-stone-500">Create, rename and remove the categories that appear on your public catalogue.</p>
        </div>
        <button onClick={() => startAdd(null)} className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-4 py-2.5 text-sm font-semibold text-amber-100 hover:bg-stone-800">
          <Plus size={16} /> Add category
        </button>
      </div>

      {showAdd && (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm font-medium text-stone-700">{editing ? "Category name" : parentId ? "Subcategory name" : "Category name"}
              <input className={`${inputClass()} mt-1.5`} value={name} onChange={(e) => setName(e.target.value)} placeholder={parentId ? "e.g. Bracelets" : "e.g. Watches"} />
            </label>
            {!parentId && !editing && <div className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600">Top-level category</div>}
            {editing && <div className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600">{parentId ? "Subcategory" : "Top-level category"}</div>}
            <label className="text-sm font-medium text-stone-700">Short description
              <input className={`${inputClass()} mt-1.5`} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional catalogue description" />
            </label>
            <label className="text-sm font-medium text-stone-700">Tagline
              <input className={`${inputClass()} mt-1.5`} value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Optional short label" />
            </label>
          </div>
          {error && <div className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}
          <div className="mt-4 flex flex-wrap gap-2">
            <button disabled={saving} onClick={save} className="inline-flex items-center gap-2 rounded-full bg-amber-800 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"><Save size={15} /> {saving ? "Saving..." : editing ? "Save changes" : "Create"}</button>
            <button disabled={saving} onClick={resetForm} className="rounded-full border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700">Cancel</button>
          </div>
        </div>
      )}

      <div className="mt-5 space-y-3">
        {roots.length === 0 && <p className="rounded-xl bg-stone-50 p-5 text-sm text-stone-500">No categories yet. Create your first one.</p>}
        {roots.map((root) => (
          <div key={root.id} className="rounded-2xl border border-stone-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-stone-900">{root.name}</h3>
                <p className="text-xs text-stone-500">{childrenOf(root.id).length} subcategor{childrenOf(root.id).length === 1 ? "y" : "ies"}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => startAdd(root.id)} className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 px-3 py-2 text-xs font-semibold text-stone-700"><Plus size={14} /> Subcategory</button>
                <button onClick={() => startEdit(root)} className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 px-3 py-2 text-xs font-semibold text-stone-700"><Pencil size={14} /> Edit</button>
                <button onClick={() => remove(root)} className="rounded-full border border-red-200 p-2 text-red-600"><Trash2 size={14} /></button>
              </div>
            </div>
            {childrenOf(root.id).length > 0 && (
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {childrenOf(root.id).map((child) => (
                  <div key={child.id} className="flex items-center justify-between rounded-xl bg-stone-50 px-3 py-2.5">
                    <span className="text-sm text-stone-700">{child.name}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => startEdit(child)} className="rounded-lg p-1.5 text-stone-500 hover:bg-white"><Pencil size={14} /></button>
                      <button onClick={() => remove(child)} className="rounded-lg p-1.5 text-red-600 hover:bg-red-50"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInAdmin(email, password);
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-5"><div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-7 shadow-xl"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone-900 text-amber-200"><ShieldCheck size={26} /></div><h1 className="mt-5 text-center font-serif text-3xl font-bold text-stone-900">Vini Admin</h1><p className="mt-2 text-center text-sm text-stone-500">Sign in to manage your jewellery catalogue.</p>{error && <div className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}<form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-sm font-medium text-stone-700">Email<input type="email" required className={`${inputClass()} mt-1.5`} value={email} onChange={(e) => setEmail(e.target.value)} /></label><label className="block text-sm font-medium text-stone-700">Password<input type="password" required className={`${inputClass()} mt-1.5`} value={password} onChange={(e) => setPassword(e.target.value)} /></label><button disabled={loading} className="w-full rounded-full bg-stone-900 py-3 text-sm font-semibold uppercase tracking-wider text-amber-100 disabled:opacity-60">{loading ? "Signing in..." : "Sign in"}</button></form><Link to="/" className="mt-5 flex items-center justify-center gap-2 text-sm text-stone-500 hover:text-amber-800"><ArrowLeft size={15} /> Back to website</Link></div></div>;
}

export default function Admin() {
  const [sessionReady, setSessionReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<CatalogueCategory[]>([]);
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const [productData, categoryData] = await Promise.all([getAdminProducts(), getAllCatalogueCategories()]);
      setProducts(productData);
      setCategories(categoryData);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unable to load products.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCurrentAdminSession()
      .then((session) => setSignedIn(Boolean(session)))
      .catch((err) => console.error(err))
      .finally(() => setSessionReady(true));

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session));
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (signedIn) refresh();
  }, [signedIn]);

  const stats = useMemo(() => ({
    total: products.length,
    available: products.filter((product) => product.availability).length,
    unavailable: products.filter((product) => !product.availability).length,
    featured: products.filter((product) => product.featured).length,
  }), [products]);

  if (!sessionReady) return <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center"><Loader2 className="animate-spin text-amber-700" /></div>;
  if (!signedIn) return <Login onLogin={() => setSignedIn(true)} />;

  async function handleDelete(product: AdminProduct) {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      await deleteAdminProduct(product);
      await refresh();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Unable to delete product.");
    }
  }

  return <div className="min-h-screen bg-[#faf8f5] text-stone-900"><header className="sticky top-0 z-40 border-b border-stone-200 bg-[#faf8f5]/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"><div><p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-700">Vini Enterprises</p><h1 className="font-serif text-2xl font-bold">Admin Dashboard</h1></div><div className="flex items-center gap-2"><Link to="/" className="hidden rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-white sm:inline-flex">View website</Link><button onClick={() => signOutAdmin()} className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-white"><LogOut size={15} /> Sign out</button></div></div></header><main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">{error && <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"><AlertCircle size={18} />{error}</div>}{showForm ? <ProductForm product={editing} categories={categories} onSaved={async () => { await refresh(); setShowForm(false); setEditing(null); }} onCancel={() => { setShowForm(false); setEditing(null); }} /> : <><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm text-stone-500">Manage your catalogue in one place.</p><h2 className="mt-1 font-serif text-3xl font-bold">Products</h2></div><button onClick={() => { setEditing(null); setShowForm(true); }} className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-800 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-amber-900"><Plus size={17} /> Add product</button></div><CategoryManager categories={categories} onChanged={async () => { setCategories(await getAllCatalogueCategories()); }} /><div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4"><Stat label="Total" value={stats.total} /><Stat label="Available" value={stats.available} /><Stat label="Unavailable" value={stats.unavailable} /><Stat label="Featured" value={stats.featured} /></div><div className="mt-6 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">{loading ? <div className="flex items-center justify-center gap-2 p-12 text-sm text-stone-500"><Loader2 className="animate-spin" size={18} /> Loading products...</div> : products.length === 0 ? <div className="p-12 text-center"><ImagePlus className="mx-auto text-amber-700" /><p className="mt-3 font-semibold">No products yet</p><button onClick={() => setShowForm(true)} className="mt-4 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-amber-100">Add your first product</button></div> : <div className="divide-y divide-stone-100">{products.map((product) => <div key={product.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"><div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-100">{product.product_images[0] ? <img src={product.product_images[0].image_url} alt={product.name} className="h-full w-full object-cover" /> : null}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold text-stone-900">{product.name}</h3>{product.featured && <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800">Featured</span>}{!product.availability && <span className="rounded-full bg-stone-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-500">Unavailable</span>}</div><p className="mt-1 text-xs text-stone-500">{product.category}{product.subsection ? ` · ${product.subsection}` : ""} · {product.product_images.length} image{product.product_images.length === 1 ? "" : "s"}</p><p className="mt-1 text-sm font-medium text-stone-700">{product.price_on_request || product.price == null ? "Price on request" : `₹${Number(product.price).toLocaleString("en-IN")}`}</p></div><div className="flex items-center gap-2"><button onClick={() => { setEditing(product); setShowForm(true); }} className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-3.5 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50"><Pencil size={15} /> Edit</button><button onClick={() => handleDelete(product)} className="rounded-full border border-red-200 p-2.5 text-red-600 hover:bg-red-50" title="Delete"><Trash2 size={16} /></button></div></div>)}</div>}</div></>}</main></div>;
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wider text-stone-500">{label}</p><p className="mt-2 font-serif text-3xl font-bold text-stone-900">{value}</p></div>;
}
