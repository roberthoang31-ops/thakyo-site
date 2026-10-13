/**
 * Add the restaurant's actual PDF to public/carte/, then set path below to
 * "/carte/carte-thakyo.pdf". Do not include public/ or /thakyo-site/ here.
 * null keeps both PDF controls disabled while the document is unavailable.
 */
export const menuDocument: { path: string | null; downloadName: string } = {
  path: null,
  downloadName: "carte-thakyo.pdf",
};
