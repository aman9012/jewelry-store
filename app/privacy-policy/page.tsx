export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16 prose">
      <h1 className="text-3xl mb-6">Privacy Policy</h1>
      <p className="text-charcoal/70 mb-4">
        [Replace this with your actual policy before going live. This is a starting template only.]
      </p>
      <p className="mb-4">
        Bhavna Jewel ("we", "us") collects personal information such as your name, email,
        phone number, and shipping address when you create an account or place an order.
        This information is used solely to process orders, provide customer support, and
        improve our services. We do not sell your personal information to third parties.
      </p>
      <p className="mb-4">
        Payment processing is handled securely by Razorpay; we do not store your card or
        payment details on our servers.
      </p>
      <p>
        For questions about this policy, contact us at [your business email].
      </p>
    </section>
  );
}
