import type { MetadataRoute } from "next";

import { canIndexSite, siteOrigin } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!canIndexSite || !siteOrigin) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: siteOrigin,
  };
}
