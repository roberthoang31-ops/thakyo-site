import Image from "next/image";
import { ArrowUpRight, CalendarDays, Phone, ShoppingBag } from "lucide-react";
import { restaurant } from "@/data/restaurant";
import { publicAsset } from "@/lib/paths";

export function RestaurantServices() {
  return (
    <div className="container-shell section-space grid gap-6 lg:grid-cols-2">
      <section
        id="reservation"
        aria-labelledby="reservation-title"
        className="relative isolate overflow-hidden border border-line p-8 sm:p-12"
      >
        <Image
          src={publicAsset("/images/restaurant-detail.png")}
          alt=""
          fill
          sizes="(max-width: 1023px) 90vw, 45vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-background/85" />
        <CalendarDays
          size={27}
          className="mb-7 text-gold"
          strokeWidth={1.3}
          aria-hidden="true"
        />
        <p className="eyebrow">06 — RÉSERVATION</p>
        <h2
          id="reservation-title"
          className="font-display text-4xl leading-tight sm:text-5xl"
        >
          Votre prochain
          <br />
          <em className="text-gold">beau moment.</em>
        </h2>
        <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
          Un dîner à deux, une table entre amis ou un repas en famille. Réservez
          votre place chez THAKYO en ligne avec Google.
        </p>
        <a
          href={restaurant.reservationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button mt-8"
        >
          Réserver en ligne <ArrowUpRight size={16} aria-hidden="true" />
          <span className="sr-only"> sur Google (nouvel onglet)</span>
        </a>
        <p className="mt-5 text-xs text-muted">Vous préférez nous appeler ?</p>
        <a href={restaurant.phoneHref} className="text-link mt-1 text-sm">
          <Phone size={15} aria-hidden="true" />
          {restaurant.phone}
        </a>
      </section>
      <section
        id="emporter"
        aria-labelledby="takeaway-title"
        className="border border-line bg-surface p-8 sm:p-12"
      >
        <ShoppingBag
          size={27}
          className="mb-7 text-gold"
          strokeWidth={1.3}
          aria-hidden="true"
        />
        <p className="eyebrow">07 — À EMPORTER</p>
        <h2
          id="takeaway-title"
          className="font-display text-4xl leading-tight sm:text-5xl"
        >
          Un peu de THAKYO,
          <br />
          <em className="text-gold">chez vous.</em>
        </h2>
        <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
          Retrouvez notre carte sur Booqcloud et passez votre commande en ligne
          pour profiter des saveurs de THAKYO chez vous.
        </p>
        <a
          href={restaurant.orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-outline mt-8"
        >
          Commander en ligne <ArrowUpRight size={16} aria-hidden="true" />
          <span className="sr-only"> sur Booqcloud (nouvel onglet)</span>
        </a>
        <p className="mt-5 text-xs text-muted">
          Une question sur votre commande ?
        </p>
        <a href={restaurant.phoneHref} className="text-link mt-1 text-sm">
          <Phone size={15} aria-hidden="true" />
          {restaurant.phone}
        </a>
      </section>
    </div>
  );
}
