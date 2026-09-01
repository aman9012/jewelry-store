import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, slug, name, price, images")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(8);

  return (
    <>
      {/* Hero */}
      <section className="bg-blush">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="uppercase tracking-[0.2em] text-xs text-rosewood mb-4">
            New arrivals, every week
          </p>
          <h1 className="text-4xl sm:text-5xl leading-tight mb-6">
            Everyday shine,
            <br />
            without the price tag.
          </h1>
          <p className="max-w-md mx-auto text-charcoal/80 mb-8">
            Handpicked fashion jewelry — earrings, necklaces, and more —
            for every occasion.
          </p>
          <Link
            href="/products"
            className="inline-block bg-rosewood text-ivory px-8 py-3 text-sm uppercase tracking-wide hover:bg-ink transition-colors"
          >
            Shop the collection
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-2xl mb-10">Fresh in the case</h2>
        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-charcoal/60">
            No products yet — add your first one from the admin panel once
            it's built, and it'll show up here automatically.
          </p>
        )}
      </section>
    </>
  );
}
