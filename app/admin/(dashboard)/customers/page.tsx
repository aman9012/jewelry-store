import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminCustomersPage() {
  const supabase = createClient();
  const { data: customers } = await supabase
    .from("customers")
    .select("id, full_name, phone, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl mb-8">Customers (CRM)</h1>
      <div className="bg-white border border-blush">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-blush">
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Joined</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((c) => (
              <tr key={c.id} className="border-b border-blush/50">
                <td className="p-4">{c.full_name ?? "—"}</td>
                <td className="p-4">{c.phone ?? "—"}</td>
                <td className="p-4">{new Date(c.created_at).toLocaleDateString()}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/customers/${c.id}`} className="underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!customers?.length && (
          <p className="p-6 text-charcoal/60 text-sm">
            No customers yet — they'll appear here once people create accounts on the storefront.
          </p>
        )}
      </div>
    </div>
  );
}
