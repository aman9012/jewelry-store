"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
}

export async function createCategory(formData: FormData) {
  const supabase = createClient();
  const name = formData.get("name") as string;

  const { error } = await supabase.from("categories").insert({
    name,
    slug: slugify(name),
    description: formData.get("description") as string,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
  revalidatePath("/");
}

export async function deleteCategory(formData: FormData) {
  const supabase = createClient();
  const id = formData.get("id") as string;

  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
}
