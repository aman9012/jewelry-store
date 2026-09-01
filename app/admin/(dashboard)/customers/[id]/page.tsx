import { createClient } from "@/lib/supabase/server";
import { addCustomerNote } from "@/lib/actions/customers";
import { notFound } from "next/navigation";

export default async function CustomerDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const [{ data: customer }, { data: orders }, { data: notes }] = await Promise.all([
    supabase.from("customers").select("*").eq("id", params.id).single(),
    supabase
      .from("orders")
      .select("id, status, total_amount, created_at")
      .eq("customer_id", params.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("customer_notes")
      .select("id, note, created_at")
      .eq("customer_id", params.id)
      .order("created_at", { ascending: false }),
  ]);

  if (!customer) return notFound();

  const lifetimeValue = orders?.reduce((sum, o) => sum + Number(o.total_amount), 0) ?? 0;

  return (
    <div>
      <h1 className="text-2xl mb-1">{customer.full_name ?? "Unnamed customer"}</h1>
      <p className="text-charcoal/60 mb-8">{customer.phone}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-6 border border-blush">
          <p className="text-sm text-charcoal/60">Orders placed</p>
          <p className="text-2xl font-display">{orders?.length ?? 0}</p>
        </div>
        <div className="bg-white p-6 border border-blush">
          <p className="text-sm text-charcoal/60">Lifetime value</p>
          <p className="text-2xl font-display">₹{lifetimeValue}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg mb-3">Order history</h2>
          <div className="bg-white border border-blush">
            {orders?.map((o) => (
              <div key={o.id} className="p-4 border-b border-blush/50 flex justify-between text-sm">
                <span>{new Date(o.created_at).toLocaleDateString()}</span>
                <span>{o.status}</span>
                <span>₹{o.total_amount}</span>
              </div>
            ))}
            {!orders?.length && <p className="p-4 text-sm text-charcoal/60">No orders yet.</p>}
          </div>
        </div>

        <div>
          <h2 className="text-lg mb-3">Notes (private, for your team)</h2>
          <form action={addCustomerNote} className="mb-4">
            <input type="hidden" name="customer_id" value={customer.id} />
            <textarea
              name="note"
              rows={2}
              required
              placeholder="e.g. Prefers gold-tone, birthday in March"
              className="w-full border border-blush px-3 py-2 mb-2 bg-white text-sm"
            />
            <button type="submit" className="bg-rosewood text-ivory px-4 py-2 text-xs uppercase tracking-wide">
              Add note
            </button>
          </form>
          <div className="bg-white border border-blush">
            {notes?.map((n) => (
              <div key={n.id} className="p-4 border-b border-blush/50 text-sm">
                <p>{n.note}</p>
                <p className="text-xs text-charcoal/40 mt-1">
                  {new Date(n.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
            {!notes?.length && <p className="p-4 text-sm text-charcoal/60">No notes yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
