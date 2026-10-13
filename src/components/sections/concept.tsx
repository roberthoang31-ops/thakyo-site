import Image from "next/image";
import { ArrowUpRight, Leaf, Sun } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { publicAsset } from "@/lib/paths";

export function Concept() {
  return (
    <section
      id="concept"
      className="section-space"
      aria-labelledby="concept-title"
    >
      <div className="container-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <div className="relative">
          <div className="relative aspect-[4/4.4] overflow-hidden">
            <Image
              src={publicAsset("/images/restaurant-portrait.png")}
              alt="Le décor actuel du restaurant THAKYO : cerisier fleuri, lanternes et boiseries"
              fill
              sizes="(max-width: 1023px) 90vw, 42vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-6 left-6 right-6 border border-gold/40 bg-background/90 p-5 sm:p-7">
            <p className="font-display text-2xl text-cream">
              Une parenthèse à Cornebarrieu.
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[.2em] text-gold">
              L’univers THAKYO
            </p>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="01 — NOTRE CONCEPT"
            title={
              <span id="concept-title">
                Une table,
                <br />
                <em className="text-gold">deux horizons.</em>
              </span>
            }
          />
          <p className="mt-7 text-lg leading-8 text-cream/90">
            L’esprit du Japon. La chaleur de la Thaïlande. Et le plaisir de vous
            accueillir.
          </p>
          <p className="mt-5 text-sm leading-7 text-muted">
            Chez THAKYO, restaurant japonais et thaï à Cornebarrieu, les sushis
            côtoient les plats au wok, les pad thaï et les soupes parfumées.
            Deux inspirations à découvrir au fil de notre carte.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted">
            Sous les cerisiers en fleurs, le bois sombre et les lumières ambrées
            composent un cadre pour prendre le temps. À deux, entre amis ou en
            famille, installez-vous.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-xs text-gold">
            <span className="service-tag">
              <Sun size={15} aria-hidden="true" />
              Terrasse
            </span>
            <span className="service-tag">
              <Leaf size={15} aria-hidden="true" />
              Plats végétaliens
            </span>
          </div>
          <a href="#carte" className="text-link mt-9">
            Explorer nos saveurs <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
