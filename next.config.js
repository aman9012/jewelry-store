/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wzapratablqulugzpskk.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
