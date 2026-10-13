import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import { restaurant } from "@/data/restaurant";
import { SectionHeading } from "@/components/ui/section-heading";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section-space border-t border-line bg-surface"
    >
      <div className="container-shell grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <div>
          <SectionHeading
            eyebrow="06 — NOUS RETROUVER"
            title={
              <span id="contact-title">
                À bientôt,
                <br />
                <em className="text-gold">à Cornebarrieu.</em>
              </span>
            }
            description="Votre restaurant japonais et thaï vous accueille au 4 chemin de la Plane. Nous sommes à votre écoute pour préparer votre visite."
          />
          <a
            href={restaurant.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-outline mt-8"
          >
            Voir l’itinéraire <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
        </div>
        <div>
          <div className="contact-row">
            <MapPin size={20} className="mt-1 text-gold" aria-hidden="true" />
            <div>
              <h3 className="eyebrow mb-3">L’ADRESSE</h3>
              <address className="text-sm not-italic leading-7">
                {restaurant.address}
                <br />
                {restaurant.postalCode} {restaurant.city}, {restaurant.country}
              </address>
            </div>
          </div>
          <div className="contact-row">
            <Phone size={20} className="mt-1 text-gold" aria-hidden="true" />
            <div>
              <h3 className="eyebrow mb-1">LE TÉLÉPHONE</h3>
              <a
                href={restaurant.phoneHref}
                className="inline-flex min-h-11 items-center font-display text-2xl hover:text-gold"
              >
                {restaurant.phone}
              </a>
            </div>
          </div>
          <div className="contact-row border-b-0">
            <Clock3 size={20} className="mt-1 text-gold" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <h3 id="hours-title" className="eyebrow mb-4">
                LES HORAIRES
              </h3>
              <table
                aria-labelledby="hours-title"
                className="w-full text-left text-xs sm:text-sm"
              >
                <tbody>
                  {restaurant.openingHours.map((row) => (
                    <tr key={row.days}>
                      <th
                        scope="row"
                        className="py-2 pr-4 align-top font-normal text-muted"
                      >
                        {row.days}
                      </th>
                      <td className="py-2 text-right">
                        {row.hours.map((time) => (
                          <span
                            key={time}
                            className="ml-3 inline-block whitespace-nowrap"
                          >
                            {time}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
