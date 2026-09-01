import Link from "next/link";
import Image from "next/image";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  images: string[] | null;
};

export default function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0];

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="jewel-frame relative aspect-square bg-blush overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-rosewood/50 text-sm">
            No image yet
          </div>
        )}
      </div>
      <div className="mt-3">
        <h3 className="text-base text-ink">{product.name}</h3>
        <p className="text-sm text-rosewood mt-1">₹{product.price}</p>
      </div>
    </Link>
  );
}
