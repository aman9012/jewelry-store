type Category = { id: string; name: string };
type Product = {
  id?: string;
  name?: string;
  description?: string | null;
  price?: number;
  category_id?: string | null;
  stock_quantity?: number;
  material?: string | null;
  sku?: string | null;
  images?: string[] | null;
  is_active?: boolean;
};

export default function ProductForm({
  categories,
  product,
  action,
}: {
  categories: Category[];
  product?: Product;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="max-w-xl space-y-5">
      <div>
        <label className="block text-sm mb-1">Product name</label>
        <input
          name="name"
          required
          defaultValue={product?.name}
          className="w-full border border-blush px-3 py-2 bg-white"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Description</label>
        <textarea
          name="description"
          rows={4}
          defaultValue={product?.description ?? ""}
          className="w-full border border-blush px-3 py-2 bg-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Price (₹)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            required
            defaultValue={product?.price}
            className="w-full border border-blush px-3 py-2 bg-white"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Stock quantity</label>
          <input
            name="stock_quantity"
            type="number"
            required
            defaultValue={product?.stock_quantity ?? 0}
            className="w-full border border-blush px-3 py-2 bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Category</label>
        <select
          name="category_id"
          defaultValue={product?.category_id ?? ""}
          className="w-full border border-blush px-3 py-2 bg-white"
        >
          <option value="">— None —</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Material</label>
          <input
            name="material"
            defaultValue={product?.material ?? ""}
            className="w-full border border-blush px-3 py-2 bg-white"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">SKU</label>
          <input
            name="sku"
            defaultValue={product?.sku ?? ""}
            className="w-full border border-blush px-3 py-2 bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">
          Image URLs (one per line — first one is the main photo)
        </label>
        <textarea
          name="images"
          rows={3}
          defaultValue={product?.images?.join("\n") ?? ""}
          placeholder="/placeholders/necklace.svg"
          className="w-full border border-blush px-3 py-2 bg-white font-mono text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={product?.is_active ?? true}
        />
        Visible on the storefront
      </label>

      <button
        type="submit"
        className="bg-rosewood text-ivory px-8 py-3 text-sm uppercase tracking-wide hover:bg-ink transition-colors"
      >
        {product?.id ? "Save changes" : "Add product"}
      </button>
    </form>
  );
}
