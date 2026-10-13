import type { MetadataRoute } from "next";

import { canIndexSite, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!canIndexSite || !siteUrl) return [];

  return [{ url: siteUrl }];
}
