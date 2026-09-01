import { createClient } from "@/lib/supabase/server";
import { updateProduct } from "@/lib/actions/products";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").eq("id", params.id).single(),
    supabase.from("categories").select("id, name").order("name"),
  ]);

  if (!product) return notFound();

  const updateWithId = updateProduct.bind(null, params.id);

  return (
    <div>
      <h1 className="text-2xl mb-8">Edit Product</h1>
      <ProductForm categories={categories ?? []} product={product} action={updateWithId} />
    </div>
  );
}
