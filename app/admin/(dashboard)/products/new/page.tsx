import { createClient } from "@/lib/supabase/server";
import { createProduct } from "@/lib/actions/products";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const supabase = createClient();
  const { data: categories } = await supabase.from("categories").select("id, name").order("name");

  return (
    <div>
      <h1 className="text-2xl mb-8">Add Product</h1>
      <ProductForm categories={categories ?? []} action={createProduct} />
    </div>
  );
}
