import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/account", "/cart", "/checkout", "/api"],
    },
    sitemap: "https://bhavnajewel.com/sitemap.xml", // update once you have your real domain
  };
}
