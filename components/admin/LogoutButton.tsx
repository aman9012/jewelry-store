"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton({ redirectTo = "/admin/login" }: { redirectTo?: string }) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className="underline hover:text-ivory">
      Sign out
    </button>
  );
}
