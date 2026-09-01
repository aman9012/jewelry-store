"use client";

import Link from "next/link";
import { useCart } from "@/lib/contexts/CartContext";

export default function CartLink() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <Link href="/cart" className="hover:text-rosewood transition-colors">
      Cart{count > 0 ? ` (${count})` : ""}
    </Link>
  );
}
