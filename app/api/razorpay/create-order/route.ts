import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const { orderId, amount } = await req.json();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Razorpay keys are not configured yet." },
      { status: 500 }
    );
  }

  // Amount must be in paise (smallest currency unit) for Razorpay
  const razorpayRes = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: orderId,
    }),
  });

  const razorpayOrder = await razorpayRes.json();

  if (!razorpayRes.ok) {
    return NextResponse.json({ error: razorpayOrder.error?.description ?? "Razorpay error" }, { status: 500 });
  }

  // Attach the Razorpay order id to our own order record
  await supabase.rpc("set_razorpay_order", {
    p_order_id: orderId,
    p_rzp_order_id: razorpayOrder.id,
  });

  return NextResponse.json({
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    keyId,
  });
}
