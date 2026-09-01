import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex bg-ivory">
      <aside className="w-56 bg-ink text-ivory/90 flex flex-col shrink-0">
        <div className="px-6 py-6 font-display text-lg text-ivory">Bhavna Jewel</div>
        <nav className="flex flex-col gap-1 px-3 text-sm">
          <Link href="/admin" className="px-3 py-2 hover:bg-white/10 rounded">Dashboard</Link>
          <Link href="/admin/products" className="px-3 py-2 hover:bg-white/10 rounded">Products</Link>
          <Link href="/admin/categories" className="px-3 py-2 hover:bg-white/10 rounded">Categories</Link>
          <Link href="/admin/orders" className="px-3 py-2 hover:bg-white/10 rounded">Orders</Link>
          <Link href="/admin/customers" className="px-3 py-2 hover:bg-white/10 rounded">Customers (CRM)</Link>
        </nav>
        <div className="mt-auto px-6 py-6 text-xs text-ivory/60">
          <p className="mb-2">{user?.email}</p>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
