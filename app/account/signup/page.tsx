"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
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
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from("customers")
        .insert({ id: data.user.id, full_name: fullName, phone });

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 shadow-sm border border-blush">
        <h1 className="text-2xl mb-6 font-display text-ink">Create Account</h1>

        {error && <p className="text-sm text-rosewood mb-4">{error}</p>}

        <label className="block text-sm mb-1">Full name</label>
        <input required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border border-blush px-3 py-2 mb-4" />

        <label className="block text-sm mb-1">Phone</label>
        <input required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-blush px-3 py-2 mb-4" />

        <label className="block text-sm mb-1">Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-blush px-3 py-2 mb-4" />

        <label className="block text-sm mb-1">Password</label>
        <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-blush px-3 py-2 mb-6" />

        <button type="submit" disabled={loading} className="w-full bg-rosewood text-ivory py-3 text-sm uppercase tracking-wide hover:bg-ink transition-colors disabled:opacity-50">
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-sm text-center mt-4 text-charcoal/60">
          Already have an account? <Link href="/account/login" className="underline">Log in</Link>
        </p>
      </form>
    </div>
  );
}
