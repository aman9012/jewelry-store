import { createClient } from "@/lib/supabase/server";
import { createCategory, deleteCategory } from "@/lib/actions/categories";

export default async function AdminCategoriesPage() {
  const supabase = createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, description")
    .order("name");

  return (
    <div>
      <h1 className="text-2xl mb-8">Categories</h1>

      <form action={createCategory} className="bg-white border border-blush p-6 mb-8 max-w-lg space-y-4">
        <h2 className="text-lg mb-2">Add a category</h2>
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input name="name" required className="w-full border border-blush px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Description</label>
          <input name="description" className="w-full border border-blush px-3 py-2" />
        </div>
        <button
          type="submit"
          className="bg-rosewood text-ivory px-6 py-2 text-sm uppercase tracking-wide hover:bg-ink transition-colors"
        >
          Add
        </button>
      </form>

      <div className="bg-white border border-blush">
        {categories?.map((c) => (
          <div key={c.id} className="flex items-center justify-between p-4 border-b border-blush/50">
            <div>
              <p>{c.name}</p>
              <p className="text-xs text-charcoal/50">{c.description}</p>
            </div>
            <form action={deleteCategory}>
              <input type="hidden" name="id" value={c.id} />
              <button type="submit" className="text-rosewood text-sm underline">
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
