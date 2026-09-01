"use client";

import { useState } from "react";
import { useCart } from "@/lib/contexts/CartContext";

export default function AddToCartButton({
  productId,
  name,
  price,
  image,
}: {
  productId: string;
  name: string;
  price: number;
  image: string | null;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem({ productId, name, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleClick}
      className="bg-rosewood text-ivory px-8 py-3 text-sm uppercase tracking-wide hover:bg-ink transition-colors"
    >
      {added ? "Added ✓" : "Add to Cart"}
    </button>
  );
}
