import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { menuDocument } from "@/data/documents";
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
      "La carte doit désigner un PDF local sous public/, par exemple /carte/carte-thakyo.pdf.",
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

  return (
    <section
      id="carte"
      className="section-space border-y border-line bg-surface"
      aria-labelledby="menu-title"
    >
      <div className="container-shell grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="02 — NOTRE CARTE"
            title={
              <span id="menu-title">
                Notre carte,
                <br />
                <em className="text-gold">vos envies.</em>
              </span>
            }
          />
          <p className="mt-7 max-w-lg text-sm leading-7 text-muted">
            Sushis, makis, pad thaï et spécialités au wok : retrouvez le Japon
            et la Thaïlande à votre table, au cœur de Cornebarrieu.
          </p>
          <p className="mt-5 max-w-lg text-sm leading-7 text-muted">
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
        <div className="relative border border-gold/35 bg-background p-7 text-center sm:p-10">
          <FileText
            size={34}
            strokeWidth={1.2}
            className="mx-auto mb-6 text-gold"
            aria-hidden="true"
          />
          <p className="text-[10px] uppercase tracking-[.35em] text-gold">
            THAKYO · CORNEBARRIEU
          </p>
          <h3 className="mt-5 font-display text-3xl sm:text-4xl">
            À découvrir, à savourer.
          </h3>
          <p
            id="menu-document-status"
            className="mx-auto mt-5 max-w-sm text-sm leading-7 text-muted"
          >
            {pdfUrl
              ? "Toute notre carte dans un seul document, à consulter ou à garder pour votre prochaine visite."
              : "La carte PDF sera disponible prochainement. Notre équipe reste à votre disposition pour vous renseigner."}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:flex-col xl:flex-row">
            {pdfUrl ? (
              <>
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
                  Télécharger la carte <Download size={16} aria-hidden="true" />
                  <span className="sr-only"> (PDF)</span>
                </a>
              </>
            ) : (
              <>
                <button
                  type="button"
                  disabled
                  aria-describedby="menu-document-status"
                  className="button"
                >
                  Consulter la carte{" "}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  disabled
                  aria-describedby="menu-document-status"
                  className="button button-outline"
                >
                  Télécharger la carte <Download size={16} aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
