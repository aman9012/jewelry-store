import { createClient } from "@/lib/supabase/server";
import { updateOrderStatus } from "@/lib/actions/orders";

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default async function AdminOrdersPage() {
  const supabase = createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("id, status, total_amount, payment_status, created_at, customers(full_name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl mb-8">Orders</h1>
      <div className="bg-white border border-blush">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-blush">
              <th className="p-4">Order</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((o: any) => (
              <tr key={o.id} className="border-b border-blush/50">
                <td className="p-4 font-mono text-xs">{o.id.slice(0, 8)}</td>
                <td className="p-4">{o.customers?.full_name ?? "—"}</td>
                <td className="p-4">₹{o.total_amount}</td>
                <td className="p-4">{o.payment_status}</td>
                <td className="p-4">
                  <form action={updateOrderStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={o.id} />
                    <select
                      name="status"
                      defaultValue={o.status}
                      className="border border-blush px-2 py-1 text-xs"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="text-xs underline">
                      Update
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!orders?.length && <p className="p-6 text-charcoal/60 text-sm">No orders yet.</p>}
      </div>
    </div>
  );
}
