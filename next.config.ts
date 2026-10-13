import type { NextConfig } from "next";

const staticExport = process.env.GITHUB_PAGES === "true";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (staticExport ? "/thakyo-site" : "");

if (basePath && !/^\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/.test(basePath)) {
  throw new Error(
    "NEXT_PUBLIC_BASE_PATH doit être vide ou un chemin tel que /thakyo-site, sans slash final.",
  );
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(staticExport ? { output: "export", trailingSlash: true } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: staticExport,
  },
};
export default nextConfig;
