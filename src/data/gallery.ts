import photos from "./galerie.json";

export type GalleryCategory = "plats" | "restaurant";

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  width: number;
  height: number;
  objectPosition?: string;
};

function readGalleryPhotos(value: unknown): GalleryPhoto[] {
  if (!Array.isArray(value)) {
    throw new Error("galerie.json : la liste des photos doit être un tableau.");
  }

  const paths = new Set<string>();

  return value.map((entry: unknown, index: number) => {
    const error = (message: string): never => {
      throw new Error(`galerie.json, photo ${index + 1} : ${message}`);
    };

    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      return error("chaque photo doit être un objet.");
    }

    const photo = entry as Record<string, unknown>;
    const text = (key: string): string => {
      const content = photo[key];
      if (typeof content !== "string" || !content.trim()) {
        return error(`le champ « ${key} » doit contenir du texte.`);
      }
      return content;
    };
    const dimension = (key: "width" | "height"): number => {
      const size = photo[key];
      if (typeof size !== "number" || !Number.isInteger(size) || size <= 0) {
        return error(`le champ « ${key} » doit être un entier positif.`);
      }
      return size;
    };

    const src = text("src");
    if (
      !src.startsWith("/") ||
      src.startsWith("//") ||
      src.includes("\\") ||
      src.split("/").includes("..") ||
      /[?#\s]/.test(src)
    ) {
      return error(
        "« src » doit être un chemin local sans espace, par exemple /assets/galerie/photo.jpg.",
      );
    }
    if (paths.has(src))
      return error(`le chemin « ${src} » est présent deux fois.`);
    paths.add(src);

    const category = photo.category;
    if (category !== "plats" && category !== "restaurant") {
      return error("« category » doit être « plats » ou « restaurant ».");
    }

    return {
      src,
      alt: text("alt"),
      caption: text("caption"),
      category,
      width: dimension("width"),
      height: dimension("height"),
      ...(photo.objectPosition === undefined
        ? {}
        : { objectPosition: text("objectPosition") }),
    };
  });
}

// Add your photographs in public/assets/galerie/ and list them in galerie.json.
// A malformed entry stops the build with a readable message instead of guessing.
export const galleryPhotos = readGalleryPhotos(photos);
