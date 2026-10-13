import type { MetadataRoute } from "next";

import { canIndexSite, siteOrigin } from "@/lib/seo";
import { publicAsset } from "@/lib/paths";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!canIndexSite || !siteOrigin) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteOrigin}${publicAsset("/sitemap.xml")}`,
    host: siteOrigin,
  };
}
