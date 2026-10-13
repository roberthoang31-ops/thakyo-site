import { getImageProps } from "next/image";
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { restaurant } from "@/data/restaurant";
import { publicAsset } from "@/lib/paths";

export function Hero() {
  const common = {
    alt: "Le comptoir THAKYO à Cornebarrieu, sous les cerisiers en fleurs et les lumières ambrées",
    sizes: "100vw",
    quality: 75,
  };
  const { props: desktop } = getImageProps({
    ...common,
    src: publicAsset("/images/restaurant-bar.png"),
    width: 1448,
    height: 1086,
  });
  const { props: mobile } = getImageProps({
    ...common,
    src: publicAsset("/images/restaurant-portrait.png"),
    width: 1086,
    height: 1448,
  });
  return (
    <section
      id="accueil"
      aria-labelledby="hero-title"
      className="hero relative isolate flex min-h-170 items-center overflow-hidden lg:min-h-190"
    >
      <picture className="absolute inset-0 -z-20">
        <source
          media="(max-width: 767px)"
          srcSet={mobile.srcSet ?? mobile.src}
          sizes="100vw"
        />
        {/* getImageProps generates the optimized responsive sources for this picture. */}
        <img
          {...desktop}
          alt={common.alt}
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />
      </picture>
      <div className="absolute inset-0 -z-10 bg-black/55" />
      <div className="container-shell pb-36 pt-24 lg:pb-40">
        <p className="eyebrow mb-7">JAPONAIS · THAÏ · CORNEBARRIEU</p>
        <h1
          id="hero-title"
          className="max-w-4xl font-display text-[clamp(2.8rem,6vw,5.8rem)] leading-[1.08] tracking-[-.04em]"
        >
          Le goût du voyage.
          <br />
          <em className="font-normal text-gold-light">
            Le plaisir d’être ensemble.
          </em>
        </h1>
        <p className="mt-7 max-w-md text-sm leading-7 text-cream/90 sm:text-base">
          Sushis, saveurs thaïes et moments partagés.
          <br />
          Bienvenue chez THAKYO, votre restaurant à Cornebarrieu.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={restaurant.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            Commander en ligne <ArrowUpRight size={17} aria-hidden="true" />
            <span className="sr-only"> sur Booqcloud (nouvel onglet)</span>
          </a>
          <a
            href={restaurant.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button border border-cream/50 bg-black/20 text-cream hover:bg-cream hover:text-background"
          >
            Réserver une table
            <span className="sr-only"> sur Google (nouvel onglet)</span>
          </a>
        </div>
        <a href="#carte" className="text-link mt-4 text-cream/90">
          Découvrir notre carte <ArrowDown size={15} aria-hidden="true" />
        </a>
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <div className="container-shell flex flex-wrap items-center justify-between gap-5 border-t border-cream/20 py-6 text-[10px] tracking-wide text-cream/85 sm:text-xs">
          <span className="flex items-center gap-2">
            <MapPin size={15} aria-hidden="true" />
            {restaurant.address}, Cornebarrieu
          </span>
          <span className="hidden items-center gap-2 sm:flex">
            <Sparkles size={15} aria-hidden="true" />
            Terrasse & atmosphère chaleureuse
          </span>
          <a href="#concept" className="flex min-h-8 items-center gap-3">
            La maison <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
