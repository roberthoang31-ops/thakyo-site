/**
 * Déposer Menu_Thakyo_Impression.pdf sous public/assets/menus/menu-thakyo.pdf,
 * puis définir path à "/assets/menus/menu-thakyo.pdf".
 * Ne pas inclure public/ ou /thakyo-site/ dans ce chemin.
 * null masque les liens PDF tant que le vrai document n’est pas disponible.
 */
export const menuDocument: { path: string | null; downloadName: string } = {
  path: "/assets/menus/menu-thakyo.pdf",
  downloadName: "Menu_Thakyo_Impression.pdf",
};
