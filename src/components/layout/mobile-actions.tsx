import { CalendarDays, ShoppingBag } from "lucide-react";
import { restaurant } from "@/data/restaurant";

/** Keep the matching safe-area space in globals.css when changing this bar. */
export function MobileActions() {
  return (
    <nav
      aria-label="Commander ou réserver"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background/95 px-3 pt-3 pb-[calc(12px+env(safe-area-inset-bottom,0px))] backdrop-blur-md md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <a
          href={restaurant.orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button min-h-14 gap-2 px-2 py-2 text-center text-[11px] leading-4"
        >
          <ShoppingBag size={17} className="shrink-0" aria-hidden="true" />
          <span>
            Commander en ligne
            <span className="sr-only"> sur Booqcloud (nouvel onglet)</span>
          </span>
        </a>
        <a
          href={restaurant.reservationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-outline min-h-14 gap-2 px-2 py-2 text-center text-[11px] leading-4"
        >
          <CalendarDays size={17} className="shrink-0" aria-hidden="true" />
          <span>
            Réserver une table
            <span className="sr-only"> sur Google (nouvel onglet)</span>
          </span>
        </a>
      </div>
    </nav>
  );
}
