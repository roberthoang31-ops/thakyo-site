/** Public files need an explicit prefix; Next.js applies basePath only to routes. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function publicAsset(path: string): string {
  return `${basePath}${path}`;
}
