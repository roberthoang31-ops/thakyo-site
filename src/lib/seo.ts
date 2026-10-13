import type { Metadata } from "next";

import { restaurant } from "@/data/restaurant";

function readSiteOrigin(): string | undefined {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) return undefined;

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(configuredUrl);
  } catch {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL doit être une URL HTTPS absolue, sans chemin (exemple : https://votre-projet.vercel.app).",
    );
  }

  const isLocalDevelopment =
    process.env.NODE_ENV === "development" &&
    parsedUrl.protocol === "http:" &&
    ["localhost", "127.0.0.1", "[::1]"].includes(parsedUrl.hostname);

  if (
    (parsedUrl.protocol !== "https:" && !isLocalDevelopment) ||
    parsedUrl.pathname !== "/" ||
    parsedUrl.search ||
    parsedUrl.hash ||
    parsedUrl.username ||
    parsedUrl.password
  ) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL doit contenir uniquement l’origine HTTPS du site, sans chemin, paramètres ni identifiants. HTTP localhost est accepté uniquement en développement.",
    );
  }

  return parsedUrl.origin;
}

export const siteOrigin = readSiteOrigin();
export const canIndexSite = Boolean(
  siteOrigin &&
  process.env.VERCEL_ENV !== "preview" &&
  process.env.NODE_ENV === "production",
);

const title = "THAKYO | Restaurant japonais et thaï à Cornebarrieu";
const description =
  "THAKYO, restaurant japonais et thaï à Cornebarrieu : sushis, makis et spécialités thaïes dans un cadre chaleureux. Sur place ou à emporter, 4 chemin de la Plane.";
const socialImage = siteOrigin
  ? {
      url: `${siteOrigin}/images/restaurant-bar.png`,
      alt: "Le bar du restaurant THAKYO à Cornebarrieu, entre bois, lumière dorée et fleurs de cerisier",
    }
  : undefined;

export const siteMetadata: Metadata = {
  title,
  description,
  applicationName: restaurant.name,
  category: "restaurant",
  ...(siteOrigin ? { metadataBase: new URL(siteOrigin) } : {}),
  ...(canIndexSite && siteOrigin
    ? { alternates: { canonical: `${siteOrigin}/` } }
    : {}),
  robots: {
    index: canIndexSite,
    follow: canIndexSite,
    googleBot: {
      index: canIndexSite,
      follow: canIndexSite,
      "max-image-preview": "large",
    },
  },
  icons: { icon: "/images/logo-thakyo.png", apple: "/images/logo-thakyo.png" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title,
    description,
    siteName: restaurant.name,
    ...(siteOrigin ? { url: `${siteOrigin}/` } : {}),
    ...(socialImage ? { images: [socialImage] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    ...(socialImage ? { images: [socialImage] } : {}),
  },
};

export const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: restaurant.name,
  description,
  telephone: restaurant.phoneInternational,
  acceptsReservations: restaurant.reservationUrl,
  servesCuisine: ["Japanese", "Thai"],
  address: {
    "@type": "PostalAddress",
    streetAddress: restaurant.address,
    addressLocality: restaurant.city,
    postalCode: restaurant.postalCode,
    addressCountry: "FR",
  },
  hasMap: restaurant.mapsHref,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "12:00",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "19:00",
      closes: "22:00",
    },
  ],
  ...(siteOrigin
    ? {
        "@id": `${siteOrigin}/#restaurant`,
        url: `${siteOrigin}/`,
        image: `${siteOrigin}/images/restaurant-bar.png`,
        logo: `${siteOrigin}/images/logo-thakyo.png`,
        hasMenu: `${siteOrigin}/#carte`,
      }
    : {}),
};
