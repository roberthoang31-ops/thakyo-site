import Image from "next/image";
import { ArrowUpRight, CalendarDays, Phone, ShoppingBag } from "lucide-react";
import { restaurant } from "@/data/restaurant";

export function RestaurantServices() {
  return (
    <div className="container-shell section-space grid gap-6 lg:grid-cols-2">
      <section
        id="reservation"
        aria-labelledby="reservation-title"
        className="relative isolate overflow-hidden border border-line p-8 sm:p-12"
      >
        <Image
          src="/images/restaurant-detail.png"
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
        <p className="eyebrow">03 — RÉSERVATION</p>
        <h2
          id="reservation-title"
          className="font-display text-4xl leading-tight sm:text-5xl"
        >
          Votre prochain
          <br />
          <em className="text-gold">beau moment.</em>
        </h2>
        <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
          Un dîner à deux, une table entre amis ou un repas en famille.
          Appelez-nous pour réserver votre place chez THAKYO.
        </p>
        <a href={restaurant.phoneHref} className="button mt-8">
          <Phone size={16} aria-hidden="true" />
          {restaurant.phone}
        </a>
        <p className="mt-4 text-[11px] text-muted">
          Réservation par téléphone, auprès de notre équipe.
        </p>
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
        <p className="eyebrow">04 — À EMPORTER</p>
        <h2
          id="takeaway-title"
          className="font-display text-4xl leading-tight sm:text-5xl"
        >
          Un peu de THAKYO,
          <br />
          <em className="text-gold">chez vous.</em>
        </h2>
        <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
          Choisissez vos envies dans la carte, puis appelez le restaurant pour
          organiser votre commande à emporter et convenir du retrait.
        </p>
        <a href={restaurant.phoneHref} className="button button-outline mt-8">
          Commander par téléphone <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <p className="mt-4 text-[11px] text-muted">
          Disponibilité des plats et horaire à confirmer lors de l’appel.
        </p>
      </section>
    </div>
  );
}
