import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { restaurant } from "@/data/restaurant";

export function SiteFooter() {
  return (
    <footer className="container-shell py-12">
      <div className="flex flex-col items-start justify-between gap-8 border-b border-line pb-9 sm:flex-row sm:items-center">
        <a href="#accueil" aria-label="THAKYO, retour à l’accueil">
          <Image
            src="/images/logo-thakyo.png"
            alt="THAKYO"
            width={80}
            height={80}
          />
        </a>
        <p className="font-display text-2xl italic text-muted">
          Le plaisir de se retrouver.
        </p>
        <a href="#accueil" className="text-link text-xs">
          Retour en haut <ArrowUp size={15} aria-hidden="true" />
        </a>
      </div>
      <div className="mt-6 flex flex-wrap items-start justify-between gap-6 text-[11px] text-muted">
        <p>
          © {new Date().getFullYear()} THAKYO · {restaurant.city}
        </p>
        <details className="max-w-xl text-left sm:text-right">
          <summary className="min-h-8 cursor-pointer underline underline-offset-4">
            Informations légales
          </summary>
          <p className="mt-4 text-left leading-6">
            Site en préparation. La raison sociale, les informations
            d’immatriculation, le responsable de publication et l’hébergeur
            doivent être renseignés avant publication. Contact du restaurant :{" "}
            {restaurant.phone}. Ce site ne comporte pas de formulaire ni d’outil
            de suivi.
          </p>
        </details>
      </div>
    </footer>
  );
}
