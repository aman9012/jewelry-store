import { createClient } from "@/lib/supabase/server";

export default async function AdminHomePage() {
  const supabase = createClient();

  const [{ count: productCount }, { count: orderCount }, { count: customerCount }, { data: lowStock }] =
    await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*", { count: "exact", head: true }),
      supabase.from("customers").select("*", { count: "exact", head: true }),
      supabase.from("products").select("name, stock_quantity").lt("stock_quantity", 5).order("stock_quantity"),
    ]);

  return (
    <div>
      <h1 className="text-2xl mb-8">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 border border-blush">
          <p className="text-sm text-charcoal/60">Products</p>
          <p className="text-3xl font-display">{productCount ?? 0}</p>
        </div>
        <div className="bg-white p-6 border border-blush">
          <p className="text-sm text-charcoal/60">Orders</p>
          <p className="text-3xl font-display">{orderCount ?? 0}</p>
        </div>
        <div className="bg-white p-6 border border-blush">
          <p className="text-sm text-charcoal/60">Customers</p>
          <p className="text-3xl font-display">{customerCount ?? 0}</p>
        </div>
      </div>

      <div className="bg-white p-6 border border-blush">
        <h2 className="text-lg mb-4">Low stock (under 5)</h2>
        {lowStock && lowStock.length > 0 ? (
          <ul className="text-sm space-y-2">
            {lowStock.map((p) => (
              <li key={p.name} className="flex justify-between">
                <span>{p.name}</span>
                <span className="text-rosewood">{p.stock_quantity} left</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-charcoal/60">Nothing low on stock right now.</p>
        )}
      </div>
    </div>
  );
}
