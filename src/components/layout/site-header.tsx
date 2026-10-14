"use client";

import Image from "next/image";
import { ArrowUpRight, Menu } from "lucide-react";
import { useRef } from "react";
import { restaurant } from "@/data/restaurant";
import { publicAsset } from "@/lib/paths";

const links = [
  ["Accueil", "#accueil"],
  ["La carte", "#carte"],
  ["Galerie", "#galerie"],
  ["Privatisation", "#privatisation"],
  ["Entreprises", "#entreprises"],
  ["Contact", "#contact"],
] as const;

function HeaderActions() {
  return (
    <>
      <a
        href={restaurant.orderUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="button gap-2 px-3 text-center text-[11px] md:px-4"
      >
        Commander en ligne
        <span className="sr-only"> sur Booqcloud (nouvel onglet)</span>
      </a>
      <a
        href={restaurant.reservationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="button button-outline gap-2 px-3 text-center text-[11px] md:px-4"
      >
        Réserver une table
        <span className="sr-only"> sur Google (nouvel onglet)</span>
      </a>
    </>
  );
}

export function SiteHeader() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  function closeMenu() {
    if (menuRef.current) menuRef.current.open = false;
  }
  return (
    <header className="site-header border-b border-line bg-background">
      <div className="container-shell flex min-h-25 items-center justify-between gap-4 py-4">
        <a
          href="#accueil"
          aria-label="THAKYO, accueil"
          className="flex shrink-0 items-center gap-4"
        >
          <Image
            src={publicAsset("/images/logo-thakyo.png")}
            alt="THAKYO"
            width={70}
            height={70}
            priority
            className="h-16 w-16 sm:h-17 sm:w-17"
          />
          <span className="hidden text-[9px] leading-5 tracking-[.2em] text-muted sm:block md:hidden 2xl:block">
            RESTAURANT JAPONAIS & THAÏ
            <br />
            CORNEBARRIEU
          </span>
        </a>
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-5 text-[11px] xl:flex"
        >
          {links.map(([label, href]) => (
            <a key={href} href={href} className="nav-link">
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden shrink-0 items-center gap-2 md:flex xl:ml-0">
          <HeaderActions />
        </div>
        <details
          ref={menuRef}
          className="mobile-menu xl:hidden"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              closeMenu();
              menuRef.current?.querySelector("summary")?.focus();
            }
          }}
        >
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 border border-line px-4 text-xs text-gold">
            Menu <Menu size={18} aria-hidden="true" />
          </summary>
          <nav aria-label="Navigation mobile" className="mobile-menu-panel">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className="block border-b border-line px-6 py-4 text-sm"
              >
                {label}
              </a>
            ))}
            <a
              href={restaurant.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="m-5 flex items-center justify-between bg-gold px-5 py-4 text-sm text-background"
            >
              Commander en ligne <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only"> sur Booqcloud (nouvel onglet)</span>
            </a>
            <a
              href={restaurant.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="m-5 flex items-center justify-between border border-gold px-5 py-4 text-sm text-gold"
            >
              Réserver une table <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only"> sur Google (nouvel onglet)</span>
            </a>
          </nav>
        </details>
      </div>
      <div className="container-shell grid grid-cols-2 gap-2 pb-4 md:hidden">
        <HeaderActions />
      </div>
    </header>
  );
}
