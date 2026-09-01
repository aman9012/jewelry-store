# Your Jewelry Store

A Next.js + Supabase e-commerce storefront.

## What's already working
- Homepage pulling live products from Supabase
- Full "Shop All" listing page
- Individual product detail pages
- Database already set up (products, orders, customers, CRM notes, etc.)

## Running this locally (optional — you can also skip straight to deploying)
1. Install [Node.js](https://nodejs.org) if you don't have it.
2. In this folder, run: `npm install`
3. Copy `.env.local.example` to a new file named `.env.local` (values are already filled in with your real Supabase project).
4. Run: `npm run dev`
5. Open `http://localhost:3000`

## Important: keep your keys private
This project includes a `.env.local` file with your **real** Supabase and Razorpay
test keys already filled in, so it works immediately on your machine. It's listed
in `.gitignore`, meaning it will NOT be uploaded when you push this project to
GitHub. When you deploy on Vercel, you'll add the same values manually in
Vercel's Project Settings > Environment Variables (steps below).

## Deploying (this is the main path — no local setup needed)
See the step-by-step deployment guide provided separately. In short:
1. Upload this project to a new GitHub repository.
2. Import that repository into Vercel.
3. Add the environment variables from `.env.local.example` in Vercel's project settings.
4. Deploy.

## Notes
- Product images: currently expects image URLs in the `images` column of the `products` table. We'll wire up the admin panel to upload these directly to Supabase Storage in a later step.
- Payments: powered by Razorpay. To activate:
  1. Sign up at https://razorpay.com (test mode needs no business documents).
  2. Go to Settings > API Keys, generate a **Test Mode** Key ID and Key Secret.
  3. Add them to `.env.local` (and to Vercel's environment variables once deployed).
  4. Use Razorpay's test card `4111 1111 1111 1111`, any future expiry, any CVV to simulate a successful payment.
  5. When ready for real customers, switch to **Live Mode** keys after Razorpay approves your KYC.
