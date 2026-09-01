"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function parseImages(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function createProduct(formData: FormData) {
  const supabase = createClient();

  const name = formData.get("name") as string;
  const { error } = await supabase.from("products").insert({
    name,
    slug: slugify(name),
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    category_id: (formData.get("category_id") as string) || null,
    stock_quantity: Number(formData.get("stock_quantity")),
    material: formData.get("material") as string,
    sku: (formData.get("sku") as string) || null,
    images: parseImages(formData.get("images") as string),
    is_active: formData.get("is_active") === "on",
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = createClient();

  const name = formData.get("name") as string;
  const { error } = await supabase
    .from("products")
    .update({
      name,
      slug: slugify(name),
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      category_id: (formData.get("category_id") as string) || null,
      stock_quantity: Number(formData.get("stock_quantity")),
      material: formData.get("material") as string,
      sku: (formData.get("sku") as string) || null,
      images: parseImages(formData.get("images") as string),
      is_active: formData.get("is_active") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  const supabase = createClient();
  const id = formData.get("id") as string;

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}
