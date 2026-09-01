import Link from "next/link";
import Image from "next/image";
import CartLink from "@/components/CartLink";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-ivory/90 backdrop-blur border-b border-blush">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.svg" alt="Bhavna Jewel" width={160} height={70} priority />
        </Link>
        <nav className="hidden sm:flex items-center gap-8 text-sm tracking-wide uppercase text-charcoal">
          <Link href="/products" className="hover:text-rosewood transition-colors">
            Shop All
          </Link>
          <Link href="/account" className="hover:text-rosewood transition-colors">
            Account
          </Link>
          <CartLink />
        </nav>
      </div>
    </header>
  );
}
