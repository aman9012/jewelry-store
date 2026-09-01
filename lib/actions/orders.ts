"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(formData: FormData) {
  const supabase = createClient();
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  const { error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/orders");
}
