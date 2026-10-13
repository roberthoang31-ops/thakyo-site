export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  objectPosition?: string;
};

// Place replacement photographs in public/images/, then update this list.
// These photographs show the restaurant's current décor, supplied by THAKYO.
export const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/images/restaurant-bar.png",
    alt: "Comptoir en bois éclairé de lumière ambrée sous les branches d’un cerisier rose",
    caption: "Sous les cerisiers",
    width: 1448,
    height: 1086,
  },
  {
    src: "/images/restaurant-portrait.png",
    alt: "Tables et fauteuils près du comptoir THAKYO, avec lanternes japonaises et cerisier fleuri",
    caption: "Une table, une parenthèse",
    width: 1086,
    height: 1448,
    objectPosition: "center 40%",
  },
  {
    src: "/images/restaurant-salle.png",
    alt: "Trois vues de la salle THAKYO : tables dressées, cuisine ouverte et mur végétal",
    caption: "L’atmosphère de la salle",
    width: 1448,
    height: 1086,
  },
  {
    src: "/images/restaurant-detail.png",
    alt: "Détail du bar avec bouteilles de saké, bonsaï et enseigne lumineuse THAKYO",
    caption: "L’attention aux détails",
    width: 1448,
    height: 1086,
  },
];
