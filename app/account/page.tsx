import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AccountPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/account/login");

  const [{ data: profile }, { data: orders }] = await Promise.all([
    supabase.from("customers").select("full_name, phone").eq("id", user.id).single(),
    supabase
      .from("orders")
      .select("id, status, total_amount, created_at")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl">Hi, {profile?.full_name ?? "there"}</h1>
          <p className="text-charcoal/60 text-sm">{user.email}</p>
        </div>
        <LogoutButton redirectTo="/account/login" />
      </div>

      <h2 className="text-lg mb-4">Your orders</h2>
      <div className="bg-white border border-blush">
        {orders?.map((o) => (
          <div key={o.id} className="p-4 border-b border-blush/50 flex justify-between text-sm">
            <span>{new Date(o.created_at).toLocaleDateString()}</span>
            <span className="capitalize">{o.status}</span>
            <span>₹{o.total_amount}</span>
          </div>
        ))}
        {!orders?.length && <p className="p-4 text-sm text-charcoal/60">No orders yet.</p>}
      </div>
    </section>
  );
}
