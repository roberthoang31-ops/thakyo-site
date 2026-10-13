"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { galleryPhotos } from "@/data/gallery";
import { publicAsset } from "@/lib/paths";

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLAnchorElement | null>(null);
  const previousOverflow = useRef<string | null>(null);
  const activePhoto = galleryPhotos[activeIndex];

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
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    requestAnimationFrame(() => closeRef.current?.focus());
  }

  function restorePage() {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
    triggerRef.current?.focus({ preventScroll: true });
  }

  function changePhoto(direction: number) {
    setActiveIndex(
      (index) =>
        (index + direction + galleryPhotos.length) % galleryPhotos.length,
    );
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
            description="Bois, lumières ambrées et cerisiers en fleurs. Découvrez le décor de notre restaurant à Cornebarrieu."
          />
          <p className="flex items-center gap-3 text-xs text-muted">
            <Expand size={16} aria-hidden="true" />
            Cliquez sur une photo pour l’agrandir
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {galleryPhotos.map((photo, index) => (
            <figure key={photo.src}>
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
        <figure>
          <Image
            src={publicAsset(activePhoto.src)}
            alt={activePhoto.alt}
            width={activePhoto.width}
            height={activePhoto.height}
            sizes="(max-width: 1023px) 90vw, 976px"
            className="mx-auto max-h-[calc(100dvh-15rem)] w-full object-contain"
          />
          <figcaption className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              aria-label="Photo précédente"
              onClick={() => changePhoto(-1)}
              className="flex size-11 shrink-0 items-center justify-center border border-line text-gold transition-colors hover:border-gold"
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <div className="text-center" aria-live="polite" aria-atomic="true">
              <p className="text-xs leading-5 sm:text-sm">
                {activePhoto.caption}
              </p>
              <p className="mt-1 text-[10px] tracking-widest text-gold">
                {activeIndex + 1} / {galleryPhotos.length}
              </p>
            </div>
            <button
              type="button"
              aria-label="Photo suivante"
              onClick={() => changePhoto(1)}
              className="flex size-11 shrink-0 items-center justify-center border border-line text-gold transition-colors hover:border-gold"
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </figcaption>
        </figure>
      </dialog>
    </section>
  );
}
