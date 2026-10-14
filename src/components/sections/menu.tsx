import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { menuDocument } from "@/data/documents";
import { galleryPhotos } from "@/data/gallery";
import { restaurant } from "@/data/restaurant";
import { publicAsset } from "@/lib/paths";

function getMenuPdfUrl(): string | null {
  if (!menuDocument.path) return null;
  const path = menuDocument.path;
  if (
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.includes("..") ||
    !path.endsWith(".pdf")
  ) {
    throw new Error(
      "La carte doit désigner un PDF local sous public/, par exemple /assets/menus/menu-thakyo.pdf.",
    );
  }
  const file = join(process.cwd(), "public", path);
  if (!existsSync(file) || !statSync(file).isFile()) {
    throw new Error(
      `Carte PDF introuvable : public${path}. Ajoutez le fichier ou remettez menuDocument.path à null.`,
    );
  }
  return publicAsset(path);
}

export function RestaurantMenu() {
  const pdfUrl = getMenuPdfUrl();
  const menuPhoto =
    galleryPhotos.find((photo) => photo.category === "plats") ??
    galleryPhotos[0];

  return (
    <section
      id="carte"
      className="section-space border-y border-line bg-surface"
      aria-labelledby="menu-title"
    >
      <div className="container-shell grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        {menuPhoto && (
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={publicAsset(menuPhoto.src)}
                alt={menuPhoto.alt}
                fill
                sizes="(max-width: 1023px) 90vw, 46vw"
                className="object-cover"
                style={{ objectPosition: menuPhoto.objectPosition }}
              />
            </div>
            <figcaption className="border-x border-b border-gold/30 px-6 py-5 text-xs tracking-wide text-gold">
              {menuPhoto.caption}
            </figcaption>
          </figure>
        )}
        <div>
          <SectionHeading
            eyebrow="02 — LA CARTE"
            title={
              <span id="menu-title">
                Deux inspirations,
                <br />
                <em className="text-gold">mille envies.</em>
              </span>
            }
          />
          <p className="mt-7 max-w-lg text-base leading-8 text-muted">
            Le Japon, la Thaïlande et le plaisir de choisir. Découvrez la carte
            de Thakyo, à consulter dès maintenant ou à garder pour votre
            prochaine visite.
          </p>
          {pdfUrl ? (
            <>
              <p className="mt-7 flex items-center gap-3 text-xs uppercase tracking-[.15em] text-gold">
                <FileText size={18} aria-hidden="true" /> La carte du restaurant
                · PDF
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  Consulter la carte{" "}
                  <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only"> (PDF, nouvel onglet)</span>
                </a>
                <a
                  href={pdfUrl}
                  download={menuDocument.downloadName}
                  className="button button-outline"
                >
                  Télécharger la carte PDF{" "}
                  <Download size={16} aria-hidden="true" />
                </a>
              </div>
            </>
          ) : (
            <p className="mt-7 text-sm leading-7 text-muted">
              Notre équipe est à votre disposition pour vous renseigner sur la
              carte.
            </p>
          )}
          <p className="mt-7 max-w-lg text-xs leading-6 text-muted">
            Une allergie ou une demande particulière ?{" "}
            <a
              href={restaurant.phoneHref}
              className="text-cream underline underline-offset-4"
            >
              Contactez notre équipe
            </a>{" "}
            avant de commander.
          </p>
        </div>
      </div>
    </section>
  );
}
