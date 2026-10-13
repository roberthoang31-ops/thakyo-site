import type { MetadataRoute } from "next";

import { canIndexSite, siteOrigin } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!canIndexSite || !siteOrigin) return [];

  return [{ url: `${siteOrigin}/` }];
}
