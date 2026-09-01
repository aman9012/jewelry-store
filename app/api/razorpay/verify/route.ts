import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ error: "Razorpay not configured" }, { status: 500 });
  }

  // Recompute the signature ourselves — never trust the one sent from the browser alone
  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: "Signature verification failed" }, { status: 400 });
  }

  const supabase = createClient();
  const { error } = await supabase.rpc("mark_order_paid", {
    p_order_id: orderId,
    p_rzp_order_id: razorpay_order_id,
    p_rzp_payment_id: razorpay_payment_id,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
