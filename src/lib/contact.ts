import { restaurant } from "@/data/restaurant";

/** No contact button is rendered until the restaurant confirms an email. */
export function contactEmailHref(subject: string): string | null {
  const email = restaurant.email?.trim();
  if (!email) return null;
  if (!/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email)) {
    throw new Error("L’adresse e-mail de src/data/restaurant.ts est invalide.");
  }
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
