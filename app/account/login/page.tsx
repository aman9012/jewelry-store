"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 shadow-sm border border-blush">
        <h1 className="text-2xl mb-6 font-display text-ink">Log In</h1>

        {error && <p className="text-sm text-rosewood mb-4">{error}</p>}

        <label className="block text-sm mb-1">Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-blush px-3 py-2 mb-4" />

        <label className="block text-sm mb-1">Password</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-blush px-3 py-2 mb-6" />

        <button type="submit" disabled={loading} className="w-full bg-rosewood text-ivory py-3 text-sm uppercase tracking-wide hover:bg-ink transition-colors disabled:opacity-50">
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="text-sm text-center mt-4 text-charcoal/60">
          New here? <Link href="/account/signup" className="underline">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
