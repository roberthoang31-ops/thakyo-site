import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/hero";
import { Concept } from "@/components/sections/concept";
import { RestaurantMenu } from "@/components/sections/menu";
import { RestaurantServices } from "@/components/sections/services";
import { Contact } from "@/components/sections/contact";
import { Gallery } from "@/components/sections/gallery";
import { MobileActions } from "@/components/layout/mobile-actions";
import { restaurantJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(restaurantJsonLd).replace(/</g, "\\u003c")}
      </script>
      <SiteHeader />
      <main id="contenu">
        <Hero />
        <Concept />
        <RestaurantMenu />
        <Gallery />
        <RestaurantServices />
        <Contact />
      </main>
      <SiteFooter />
      <MobileActions />
    </>
  );
}
