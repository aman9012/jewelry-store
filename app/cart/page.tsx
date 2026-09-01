"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/contexts/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl mb-4">Your cart is empty</h1>
        <Link href="/products" className="underline text-rosewood">
          Browse the collection
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl mb-10">Your Cart</h1>
      <div className="space-y-6 mb-10">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 border-b border-blush pb-6">
            <div className="relative w-20 h-20 bg-blush shrink-0">
              {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
            </div>
            <div className="flex-1">
              <p>{item.name}</p>
              <p className="text-sm text-rosewood">₹{item.price}</p>
            </div>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
              className="w-16 border border-blush px-2 py-1 text-center"
            />
            <button
              onClick={() => removeItem(item.productId)}
              className="text-sm text-rosewood underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-8">
        <span className="text-lg">Total</span>
        <span className="text-lg">₹{total}</span>
      </div>

      <Link
        href="/checkout"
        className="block text-center bg-rosewood text-ivory py-3 text-sm uppercase tracking-wide hover:bg-ink transition-colors"
      >
        Proceed to Checkout
      </Link>
    </section>
  );
}
