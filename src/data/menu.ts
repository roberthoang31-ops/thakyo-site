/** Restaurant menu transcribed from the printed menu provided by THAKYO. */
export type MenuItem = {
  name: string;
  price: number;
  description?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  portion?: string;
  items: MenuItem[];
};

export type SetMenu = {
  name: string;
  price: number;
  items: string[];
};

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}

export const lunchMenus: SetMenu[] = [
  {
    name: "Japon",
    price: 15.5,
    items: ["Assortiment sushi et maki", "Soupe miso", "Salade de chou"],
  },
  {
    name: "Thaï",
    price: 15.5,
    items: ["Pad thaï poulet", "Soupe miso", "Salade de chou"],
  },
];

export const kidsMenu: SetMenu & { ageLabel: string } = {
  name: "Menu enfant",
  ageLabel: "Moins de 8 ans",
  price: 13.5,
  items: [
    "Nems poulet — 2 pièces",
    "Nigiri saumon — 2 pièces",
    "Pad thaï poulet",
  ],
};

export const platters: MenuItem[] = [
  {
    name: "Assortiment maki",
    price: 23.5,
    description: "20 pièces · Soupe miso et salade de chou",
  },
  {
    name: "Assortiment sushi",
    price: 21.5,
    description: "12 pièces · Soupe miso et salade de chou",
  },
  {
    name: "Assortiment sashimi",
    price: 24.5,
    description: "18 pièces · Soupe miso et salade de chou",
  },
  {
    name: "Thakyo pour 2 personnes",
    price: 54.5,
    description:
      "38 pièces · Soupe miso, salade de chou et café ou assortiment de gâteaux mochi",
  },
];

export const menuCategories: MenuCategory[] = [
  {
    id: "nigiris",
    name: "Nigiris",
    portion: "4 pièces",
    items: [
      {
        name: "Saumon",
        price: 9.5,
      },
      {
        name: "Thon",
        price: 10.5,
      },
      {
        name: "Daurade",
        price: 9.5,
      },
      {
        name: "Unagi",
        price: 9.5,
      },
      {
        name: "Poulpe",
        price: 9.5,
      },
      {
        name: "Ebi",
        price: 10.5,
      },
      {
        name: "Ikura",
        price: 11.5,
      },
      {
        name: "Signature Thakyo",
        price: 12.5,
      },
    ],
  },
  {
    id: "makis",
    name: "Makis",
    portion: "4 pièces",
    items: [
      {
        name: "Saumon",
        price: 6.5,
      },
      {
        name: "Thon",
        price: 7.5,
      },
      {
        name: "Ebi",
        price: 7.5,
      },
      {
        name: "Concombre",
        price: 5.5,
      },
      {
        name: "Avocat",
        price: 6.5,
      },
      {
        name: "Fromage frais",
        price: 5.5,
      },
      {
        name: "Ebi Fry",
        price: 9.5,
      },
    ],
  },
  {
    id: "californias",
    name: "Californias",
    portion: "8 pièces",
    items: [
      {
        name: "Saumon avocat",
        price: 7.9,
      },
      {
        name: "Saumon fromage",
        price: 8.9,
      },
      {
        name: "Thon avocat",
        price: 9.5,
      },
      {
        name: "Surimi avocat",
        price: 7.9,
      },
      {
        name: "Dragon",
        price: 10.9,
      },
      {
        name: "Rainbow",
        price: 10.9,
      },
      {
        name: "Poulet avocat",
        price: 7.9,
      },
      {
        name: "Poulet crispy",
        price: 8.9,
      },
      {
        name: "Foie gras",
        price: 10.9,
      },
      {
        name: "Foie gras et mangue",
        price: 11.9,
      },
      {
        name: "Signature Thakyo",
        price: 13.9,
      },
    ],
  },
  {
    id: "sashimis",
    name: "Sashimis",
    portion: "10 pièces",
    items: [
      {
        name: "Saumon",
        price: 13.5,
      },
      {
        name: "Thon",
        price: 13.5,
      },
      {
        name: "Saumon / thon",
        price: 15.5,
      },
      {
        name: "Daurade",
        price: 13.5,
      },
      {
        name: "Poulpe",
        price: 13.5,
      },
      {
        name: "Mixte",
        price: 14.5,
      },
    ],
  },
  {
    id: "entrees",
    name: "Entrées",
    items: [
      {
        name: "Rouleaux de printemps",
        price: 4.5,
      },
      {
        name: "Raviolis frits",
        price: 6.5,
      },
      {
        name: "Nems porc",
        price: 6.0,
      },
      {
        name: "Nems poulet",
        price: 6.0,
      },
      {
        name: "Nems crevettes",
        price: 6.5,
      },
      {
        name: "Nems au chèvre et miel",
        price: 7.5,
      },
    ],
  },
  {
    id: "salades",
    name: "Salades",
    items: [
      {
        name: "Salade de chou",
        price: 4.9,
      },
      {
        name: "Salade wakame",
        price: 5.9,
      },
      {
        name: "Yum fruits de mer",
        price: 7.9,
      },
      {
        name: "Salade papaye",
        price: 12.9,
      },
      {
        name: "Salade Bo Bun — nem poulet",
        price: 12.9,
      },
    ],
  },
  {
    id: "soupes",
    name: "Soupes",
    items: [
      {
        name: "Tom Yum poulet ou crevettes",
        price: 14.9,
      },
      {
        name: "Tom Ka poulet",
        price: 14.9,
      },
      {
        name: "Soupe pho bœuf boulettes",
        price: 14.9,
      },
      {
        name: "Soupe ravioli porc laqué",
        price: 14.9,
      },
      {
        name: "Soupe udon lao poulet",
        price: 14.9,
      },
    ],
  },
  {
    id: "nouilles",
    name: "Nouilles",
    items: [
      {
        name: "Nouilles veggie",
        price: 12.5,
      },
      {
        name: "Nouilles poulet",
        price: 14.5,
      },
      {
        name: "Nouilles crevettes",
        price: 15.5,
      },
      {
        name: "Pad thaï poulet",
        price: 14.5,
      },
      {
        name: "Pad thaï crevettes",
        price: 15.5,
      },
      {
        name: "Pad thaï veggie",
        price: 12.5,
      },
    ],
  },
  {
    id: "bol-et-poke",
    name: "Bol et poké",
    items: [
      {
        name: "Tartare saumon",
        price: 14.5,
      },
      {
        name: "Tartare thon",
        price: 16.5,
      },
      {
        name: "Chirashi saumon",
        price: 14.5,
      },
      {
        name: "Chirashi saumon / thon",
        price: 16.5,
      },
      {
        name: "Poké saumon",
        price: 14.5,
      },
      {
        name: "Poké saumon / thon",
        price: 16.5,
      },
      {
        name: "Poké poulet",
        price: 14.5,
      },
      {
        name: "Poké veggie",
        price: 12.5,
      },
    ],
  },
  {
    id: "wok-shop",
    name: "Wok Shop",
    items: [
      {
        name: "Riz poulet crispy",
        price: 14.9,
      },
      {
        name: "Riz poulet vapeur",
        price: 14.9,
      },
      {
        name: "Riz porc crispy",
        price: 15.9,
      },
      {
        name: "Riz porc laqué",
        price: 14.9,
      },
      {
        name: "Laab bœuf",
        price: 15.9,
      },
      {
        name: "Laab poulet",
        price: 14.9,
      },
      {
        name: "Bœuf basilic",
        price: 15.9,
      },
      {
        name: "Poulet basilic",
        price: 14.9,
      },
      {
        name: "Riz sauté poulet basilic",
        price: 14.9,
      },
      {
        name: "Porc basilic",
        price: 14.9,
      },
      {
        name: "Crevettes basilic",
        price: 16.9,
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      {
        name: "Assortiment de gâteaux mochi",
        price: 5.5,
      },
      {
        name: "Perles de coco — 2 pièces",
        price: 5.5,
      },
      {
        name: "Ananas frais",
        price: 5.5,
      },
      {
        name: "Mangue fraîche",
        price: 6.5,
      },
      {
        name: "Café gourmand",
        price: 5.5,
      },
      {
        name: "Thé gourmand",
        price: 6.5,
      },
      {
        name: "Riz gluant mangue",
        price: 7.5,
      },
    ],
  },
];
