"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/contexts/CartContext";
import { createClient } from "@/lib/supabase/client";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/account/login?next=/checkout");
      } else {
        setCheckingAuth(false);
      }
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please log in again.");
      setSubmitting(false);
      return;
    }

    // 1. Save the shipping address
    const { data: address, error: addressError } = await supabase
      .from("addresses")
      .insert({ customer_id: user.id, address_line: addressLine, city, state, pincode })
      .select()
      .single();

    if (addressError || !address) {
      setError(addressError?.message ?? "Could not save address");
      setSubmitting(false);
      return;
    }

    // 2. Create the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_id: user.id,
        total_amount: total,
        shipping_address_id: address.id,
        status: "pending",
        payment_status: "unpaid",
      })
      .select()
      .single();

    if (orderError || !order) {
      setError(orderError?.message ?? "Could not create order");
      setSubmitting(false);
      return;
    }

    // 3. Add order items
    const { error: itemsError } = await supabase.from("order_items").insert(
      items.map((i) => ({
        order_id: order.id,
        product_id: i.productId,
        quantity: i.quantity,
        price_at_purchase: i.price,
      }))
    );

    if (itemsError) {
      setError(itemsError.message);
      setSubmitting(false);
      return;
    }

    // 4. Create a Razorpay order and open the payment window
    const razorpayRes = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order.id, amount: total }),
    });
    const razorpayData = await razorpayRes.json();

    if (!razorpayRes.ok) {
      setError(razorpayData.error ?? "Could not start payment. Your order is saved as pending — contact us to complete it.");
      setSubmitting(false);
      return;
    }

    await loadRazorpayScript();

    const rzp = new (window as any).Razorpay({
      key: razorpayData.keyId,
      amount: razorpayData.amount,
      currency: razorpayData.currency,
      order_id: razorpayData.razorpayOrderId,
      name: "Bhavna Jewel",
      prefill: { email: user.email },
      theme: { color: "#8B1E3F" },
      handler: async function (response: any) {
        const verifyRes = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: order.id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        if (verifyRes.ok) {
          clearCart();
          router.push(`/checkout/success?order=${order.id}`);
        } else {
          setError("Payment verification failed. Please contact support with your order ID.");
        }
      },
      modal: {
        ondismiss: function () {
          setSubmitting(false);
          setError("Payment was cancelled. Your order is saved — you can retry from your account page.");
        },
      },
    });

    rzp.open();
  }

  function loadRazorpayScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).Razorpay) return resolve();
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Could not load Razorpay"));
      document.body.appendChild(script);
    });
  }

  if (checkingAuth) return null;

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-lg px-6 py-24 text-center">
        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-lg px-6 py-16">
      <h1 className="text-2xl mb-2">Checkout</h1>
      <p className="text-sm text-charcoal/60 mb-8">
        You'll be asked to pay securely via Razorpay after placing your order.
      </p>

      {error && <p className="text-sm text-rosewood mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <div>
          <label className="block text-sm mb-1">Address</label>
          <input required value={addressLine} onChange={(e) => setAddressLine(e.target.value)} className="w-full border border-blush px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">City</label>
            <input required value={city} onChange={(e) => setCity(e.target.value)} className="w-full border border-blush px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">State</label>
            <input required value={state} onChange={(e) => setState(e.target.value)} className="w-full border border-blush px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Pincode</label>
          <input required value={pincode} onChange={(e) => setPincode(e.target.value)} className="w-full border border-blush px-3 py-2" />
        </div>

        <div className="flex justify-between items-center py-4 border-t border-blush">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button type="submit" disabled={submitting} className="w-full bg-rosewood text-ivory py-3 text-sm uppercase tracking-wide hover:bg-ink transition-colors disabled:opacity-50">
          {submitting ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </section>
  );
}
