import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteProduct } from "@/lib/actions/products";

export default async function AdminProductsPage() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, price, stock_quantity, is_active")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-rosewood text-ivory px-5 py-2 text-sm uppercase tracking-wide hover:bg-ink transition-colors"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white border border-blush">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-blush">
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((p) => (
              <tr key={p.id} className="border-b border-blush/50">
                <td className="p-4">{p.name}</td>
                <td className="p-4">₹{p.price}</td>
                <td className="p-4">{p.stock_quantity}</td>
                <td className="p-4">
                  {p.is_active ? (
                    <span className="text-green-700">Visible</span>
                  ) : (
                    <span className="text-charcoal/50">Hidden</span>
                  )}
                </td>
                <td className="p-4 text-right space-x-3 whitespace-nowrap">
                  <Link href={`/admin/products/${p.id}/edit`} className="underline">
                    Edit
                  </Link>
                  <form action={deleteProduct} className="inline">
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" className="text-rosewood underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!products?.length && (
          <p className="p-6 text-charcoal/60 text-sm">No products yet.</p>
        )}
      </div>
    </div>
  );
}
