export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { order?: string };
}) {
  return (
    <section className="mx-auto max-w-lg px-6 py-24 text-center">
      <h1 className="text-3xl mb-4">Thank you!</h1>
      <p className="text-charcoal/70 mb-2">Your order has been placed.</p>
      {searchParams.order && (
        <p className="text-sm text-charcoal/50 font-mono">
          Order #{searchParams.order.slice(0, 8)}
        </p>
      )}
    </section>
  );
}
