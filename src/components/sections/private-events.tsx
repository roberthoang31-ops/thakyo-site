import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { restaurant } from "@/data/restaurant";
import { contactEmailHref } from "@/lib/contact";
import { publicAsset } from "@/lib/paths";

export function PrivateEvents() {
  const emailHref = contactEmailHref("Demande de privatisation — Thakyo");

  return (
    <section
      id="privatisation"
      aria-labelledby="private-events-title"
      className="section-space border-y border-line bg-surface"
    >
      <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <p className="eyebrow">04 — PRIVATISATION</p>
          <h2 id="private-events-title" className="section-title max-w-xl">
            Votre événement <em className="text-gold">chez Thakyo</em>
          </h2>
          <div className="my-7 h-px w-16 bg-gold/60" aria-hidden="true" />
          <p className="max-w-xl text-base leading-8 text-cream/85">
            Anniversaire, repas de groupe, soirée entre collègues ou événement
            privé : réunissez vos invités autour des saveurs japonaises et
            thaïes de Thakyo. Contactez-nous pour discuter de votre projet et
            des possibilités d’accueil.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a href={restaurant.phoneHref} className="button">
              <Phone size={16} aria-hidden="true" />
              Nous appeler
            </a>
            {emailHref && (
              <a href={emailHref} className="button button-outline">
                <Mail size={16} aria-hidden="true" />
                Parler de mon événement
              </a>
            )}
          </div>
          <p className="mt-5 text-sm tracking-wide text-muted">
            {restaurant.phone}
          </p>
        </div>
        <figure className="relative">
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
            <Image
              src={publicAsset("/images/restaurant-portrait-alternative.png")}
              alt="Le cerisier japonais et les boiseries lumineuses du restaurant THAKYO"
              fill
              sizes="(max-width: 1023px) 90vw, 42vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="border-x border-b border-gold/30 px-6 py-5 text-xs uppercase tracking-[.18em] text-gold">
            Le plaisir de se retrouver
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
