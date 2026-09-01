export default function Footer() {
  return (
    <footer className="bg-ink text-ivory/80 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm">
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
          <a href="/privacy-policy" className="hover:text-ivory">Privacy Policy</a>
          <a href="/terms" className="hover:text-ivory">Terms & Conditions</a>
          <a href="/shipping-policy" className="hover:text-ivory">Shipping Policy</a>
          <a href="/refund-policy" className="hover:text-ivory">Refund Policy</a>
          <a href="/contact" className="hover:text-ivory">Contact Us</a>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Bhavna Jewel. All rights reserved.</p>
          <p>Made with care, one piece at a time.</p>
        </div>
      </div>
    </footer>
  );
}
