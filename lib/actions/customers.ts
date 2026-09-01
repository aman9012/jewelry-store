"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addCustomerNote(formData: FormData) {
  const supabase = createClient();
  const customerId = formData.get("customer_id") as string;
  const note = formData.get("note") as string;

  const { error } = await supabase.from("customer_notes").insert({
    customer_id: customerId,
    note,
  });

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/customers/${customerId}`);
}
