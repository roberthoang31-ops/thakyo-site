"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { galleryPhotos, type GalleryCategory } from "@/data/gallery";
import { publicAsset } from "@/lib/paths";

const categoryLabels: Record<GalleryCategory, string> = {
  plats: "Les plats",
  restaurant: "Le restaurant",
};
const availableCategories = (
  Object.keys(categoryLabels) as GalleryCategory[]
).filter((category) =>
  galleryPhotos.some((photo) => photo.category === category),
);

export function Gallery() {
  const [category, setCategory] = useState<GalleryCategory | "all">("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLAnchorElement | null>(null);
  const previousOverflow = useRef<string | null>(null);
  const visiblePhotos = galleryPhotos.filter(
    (photo) => category === "all" || photo.category === category,
  );
  const activePhoto = visiblePhotos[activeIndex];

  useEffect(() => {
    return () => {
      if (previousOverflow.current !== null) {
        document.body.style.overflow = previousOverflow.current;
      }
    };
  }, []);

  function openPhoto(event: MouseEvent<HTMLAnchorElement>, index: number) {
    // Preserve opening the original photograph in a new tab with modifier keys.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    const dialog = dialogRef.current;
    if (!dialog || typeof dialog.showModal !== "function") return;
    event.preventDefault();
    triggerRef.current = event.currentTarget;
    setActiveIndex(index);
    setLightboxOpen(true);
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    requestAnimationFrame(() => closeRef.current?.focus());
  }

  function restorePage() {
    setLightboxOpen(false);
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
    triggerRef.current?.focus({ preventScroll: true });
  }

  function changePhoto(direction: number) {
    if (visiblePhotos.length < 2) return;
    setActiveIndex(
      (index) =>
        (index + direction + visiblePhotos.length) % visiblePhotos.length,
    );
  }

  function selectCategory(nextCategory: GalleryCategory | "all") {
    setCategory(nextCategory);
    setActiveIndex(0);
  }

  function handleKeys(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      changePhoto(event.key === "ArrowRight" ? 1 : -1);
    }
  }

  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) {
      dialogRef.current?.close();
    }
  }

  return (
    <section
      id="galerie"
      className="section-space border-y border-line bg-surface/50"
      aria-labelledby="gallery-title"
    >
      <div className="container-shell">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="03 — GALERIE"
            title={
              <span id="gallery-title">
                Entrez dans <em className="text-gold">notre univers.</em>
              </span>
            }
            description={
              availableCategories.includes("plats")
                ? "Des saveurs à l’atmosphère, découvrez THAKYO en images. Une invitation à nous retrouver à Cornebarrieu."
                : "Bois, lumières ambrées et cerisiers en fleurs. Découvrez le décor de notre restaurant à Cornebarrieu."
            }
          />
          {galleryPhotos.length > 0 && (
            <p className="flex items-center gap-3 text-xs text-muted">
              <Expand size={16} aria-hidden="true" />
              Cliquez sur une photo pour l’agrandir
            </p>
          )}
        </div>

        {availableCategories.length > 1 ? (
          <fieldset className="mb-8 flex min-w-0 flex-wrap gap-3">
            <legend className="sr-only">Catégories de la galerie</legend>
            {(["all", ...availableCategories] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={category === value}
                aria-controls="gallery-grid"
                onClick={() => selectCategory(value)}
                className={`min-h-11 border px-5 py-3 text-xs transition-colors ${category === value ? "border-gold bg-gold text-background" : "border-line text-cream hover:border-gold"}`}
              >
                {value === "all" ? "Toutes" : categoryLabels[value]}
              </button>
            ))}
          </fieldset>
        ) : availableCategories.length === 1 ? (
          <p className="mb-8 text-xs uppercase tracking-[0.2em] text-gold">
            {categoryLabels[availableCategories[0]]}
          </p>
        ) : null}

        <div id="gallery-grid" className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {visiblePhotos.map((photo, index) => (
            <figure key={photo.src} data-gallery-category={photo.category}>
              <a
                href={publicAsset(photo.src)}
                onClick={(event) => openPhoto(event, index)}
                className="group relative block aspect-[4/3] overflow-hidden bg-background"
                aria-label={`Agrandir la photo : ${photo.caption}`}
                aria-haspopup="dialog"
                aria-controls="gallery-lightbox"
              >
                <Image
                  src={publicAsset(photo.src)}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 639px) 90vw, (max-width: 1439px) 44vw, 624px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025] group-focus-visible:scale-[1.025]"
                  style={{ objectPosition: photo.objectPosition }}
                />
                <span className="absolute bottom-4 right-4 flex size-11 items-center justify-center border border-gold/60 bg-background/85 text-gold transition-colors group-hover:bg-gold group-hover:text-background">
                  <Expand size={18} aria-hidden="true" />
                </span>
              </a>
              <figcaption className="mt-4 flex items-center gap-4 text-sm text-cream">
                <span className="text-[10px] tracking-widest text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {activePhoto && (
        <dialog
          id="gallery-lightbox"
          ref={dialogRef}
          aria-labelledby="gallery-lightbox-title"
          className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto border border-line bg-background p-4 text-cream shadow-2xl backdrop:bg-black/90 sm:p-6"
          onClose={restorePage}
          onClick={closeOnBackdrop}
          onKeyDown={handleKeys}
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3
              id="gallery-lightbox-title"
              className="font-display text-xl sm:text-2xl"
            >
              Galerie THAKYO
            </h3>
            <button
              ref={closeRef}
              type="button"
              aria-label="Fermer la photo agrandie"
              onClick={() => dialogRef.current?.close()}
              className="flex size-11 shrink-0 items-center justify-center border border-line text-gold transition-colors hover:border-gold"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          {lightboxOpen && (
            <figure>
              <Image
                src={publicAsset(activePhoto.src)}
                alt={activePhoto.alt}
                width={activePhoto.width}
                height={activePhoto.height}
                sizes="(max-width: 1023px) 90vw, 976px"
                loading="lazy"
                className="mx-auto max-h-[calc(100dvh-15rem)] w-full object-contain"
              />
              <figcaption className="mt-5 flex items-center justify-between gap-3">
                {visiblePhotos.length > 1 && (
                  <button
                    type="button"
                    aria-label="Photo précédente"
                    onClick={() => changePhoto(-1)}
                    className="flex size-11 shrink-0 items-center justify-center border border-line text-gold transition-colors hover:border-gold"
                  >
                    <ChevronLeft size={22} aria-hidden="true" />
                  </button>
                )}
                <div
                  className="flex-1 text-center"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <p className="text-xs leading-5 sm:text-sm">
                    {activePhoto.caption}
                  </p>
                  <p className="mt-1 text-[10px] tracking-widest text-gold">
                    {activeIndex + 1} / {visiblePhotos.length}
                  </p>
                </div>
                {visiblePhotos.length > 1 && (
                  <button
                    type="button"
                    aria-label="Photo suivante"
                    onClick={() => changePhoto(1)}
                    className="flex size-11 shrink-0 items-center justify-center border border-line text-gold transition-colors hover:border-gold"
                  >
                    <ChevronRight size={22} aria-hidden="true" />
                  </button>
                )}
              </figcaption>
            </figure>
          )}
        </dialog>
      )}
    </section>
  );
}
