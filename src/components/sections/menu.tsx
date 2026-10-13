import { ChevronDown, Utensils } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  formatPrice,
  kidsMenu,
  lunchMenus,
  menuCategories,
  platters,
} from "@/data/menu";
import { restaurant } from "@/data/restaurant";

export function RestaurantMenu() {
  return (
    <section
      id="carte"
      className="section-space border-y border-line bg-surface"
      aria-labelledby="menu-title"
    >
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="02 — LA CARTE"
            title={
              <span id="menu-title">
                À chaque envie,
                <br />
                <em className="text-gold">son voyage.</em>
              </span>
            }
          />
          <p className="max-w-sm text-sm leading-7 text-muted">
            Sushis à Cornebarrieu, pad thaï, plats au wok et douceurs : composez
            votre repas au fil des saveurs.
          </p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <article className="menu-feature">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="eyebrow mb-3">LA PAUSE DÉJEUNER</p>
                <h3 className="font-display text-3xl">Formule midi</h3>
              </div>
              <p className="font-display text-3xl text-gold">
                {formatPrice(lunchMenus[0].price)}
              </p>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-6">
              {lunchMenus.map((menu) => (
                <div key={menu.name}>
                  <h4 className="mb-3 font-display text-xl text-gold">
                    {menu.name}
                  </h4>
                  <ul className="space-y-1 text-xs leading-6 text-muted sm:text-sm">
                    {menu.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
          <article className="menu-feature">
            <div className="flex flex-wrap justify-between gap-5">
              <div>
                <p className="eyebrow mb-3">
                  {kidsMenu.ageLabel.toUpperCase()}
                </p>
                <h3 className="font-display text-3xl">Menu enfant</h3>
              </div>
              <p className="font-display text-3xl text-gold">
                {formatPrice(kidsMenu.price)}
              </p>
            </div>
            <ul className="mt-7 space-y-1 text-sm leading-6 text-muted">
              {kidsMenu.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        <div className="mt-12">
          <div className="mb-5 flex items-center gap-3">
            <Utensils size={19} className="text-gold" aria-hidden="true" />
            <h3 className="font-display text-3xl">À partager… ou pas.</h3>
          </div>
          <dl className="grid gap-x-12 md:grid-cols-2">
            {platters.map((item) => (
              <div
                key={item.name}
                className="flex justify-between gap-6 border-b border-line py-5"
              >
                <dt className="text-sm">
                  {item.name}
                  <span className="mt-1 block text-xs leading-6 text-muted">
                    {item.description}
                  </span>
                </dt>
                <dd className="shrink-0 text-sm text-gold tabular-nums">
                  {formatPrice(item.price)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-14">
          <p className="mb-5 text-xs text-muted">
            Ouvrez une catégorie pour découvrir tous nos plats.
          </p>
          <div className="border-t border-line">
            {menuCategories.map((category, index) => (
              <details
                key={category.id}
                className="menu-category group border-b border-line"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 sm:py-6">
                  <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-2xl sm:text-3xl">
                      {category.name}
                    </span>
                    {category.portion && (
                      <span className="text-[11px] text-muted">
                        {category.portion}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-gold transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <dl className="grid gap-x-12 pb-7 md:grid-cols-2">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex justify-between gap-5 border-b border-line/60 py-3 text-sm"
                    >
                      <dt>{item.name}</dt>
                      <dd className="shrink-0 text-gold tabular-nums">
                        {formatPrice(item.price)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </details>
            ))}
          </div>
          <p className="mt-6 text-xs leading-6 text-muted">
            Une allergie ou une demande particulière ?{" "}
            <a
              href={restaurant.phoneHref}
              className="underline underline-offset-4"
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
