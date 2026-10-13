export type OpeningHours = {
  days: string;
  hours: string[];
};

/** Confirmed contact details and opening hours provided by the restaurant. */
export const restaurant = {
  name: "THAKYO",
  city: "Cornebarrieu",
  address: "4 chemin de la Plane",
  postalCode: "31700",
  country: "France",
  phone: "09 83 50 23 26",
  phoneInternational: "+33983502326",
  phoneHref: "tel:+33983502326",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=THAKYO%204%20Chemin%20de%20la%20Plane%2031700%20Cornebarrieu",
  openingHours: [
    { days: "Lundi", hours: ["Fermé"] },
    { days: "Mardi au samedi", hours: ["12h–14h", "19h–22h"] },
    { days: "Dimanche", hours: ["19h–22h"] },
  ] satisfies OpeningHours[],
  services: ["Terrasse", "Plats végétaliens"],
};
