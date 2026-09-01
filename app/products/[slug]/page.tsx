import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: product } = await supabase
    .from("products")
    .select("name, description")
    .eq("slug", params.slug)
    .single();

  if (!product) return {};

  return {
    title: product.name,
    description: product.description?.slice(0, 155),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_active", true)
    .single();

  if (!product) return notFound();

  const image = product.images?.[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: image ? [image] : undefined,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability:
        product.stock_quantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mx-auto max-w-5xl px-6 py-16 grid sm:grid-cols-2 gap-12">
      <div className="jewel-frame relative aspect-square bg-blush">
        {image && (
          <Image src={image} alt={product.name} fill className="object-cover" />
        )}
      </div>
      <div>
        <h1 className="text-3xl mb-3">{product.name}</h1>
        <p className="text-xl text-rosewood mb-6">₹{product.price}</p>
        <p className="text-charcoal/80 mb-8">{product.description}</p>
        <AddToCartButton
          productId={product.id}
          name={product.name}
          price={product.price}
          image={image ?? null}
        />
        <p className="mt-6 text-sm text-charcoal/60">
          {product.stock_quantity > 0
            ? `${product.stock_quantity} in stock`
            : "Currently out of stock"}
        </p>
      </div>
      </section>
    </>
  );
}
