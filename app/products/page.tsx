import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Shop All",
};

export default async function ProductsPage() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, slug, name, price, images")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl mb-10">Shop All</h1>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-charcoal/60">No products listed yet.</p>
      )}
    </section>
  );
}
