import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { CherryBranch } from "@/components/ui/cherry-branch";
import { restaurant } from "@/data/restaurant";
import { contactEmailHref } from "@/lib/contact";
import { publicAsset } from "@/lib/paths";

function OfficeIllustration() {
  return (
    <svg
      viewBox="0 0 420 350"
      fill="none"
      className="w-full text-background/70"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="255" cy="157" r="114" stroke="#c5a572" strokeOpacity="0.45" />
      <path
        d="M43 290h111c25 0 26-55 63-55h37"
        stroke="#a3793d"
        strokeWidth="1.8"
        strokeDasharray="5 7"
        strokeLinecap="round"
      />
      <path d="m245 228 9 7-9 7" stroke="#a3793d" strokeWidth="1.8" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M192 204V83l104-19v140M174 204h157M296 106l31 9v89" />
        <path d="M229 204v-35h31v35" />
        <path d="M209 103v10h13v-10h-13Zm32-6v10h13V97h-13Zm31-6v10h13V91h-13ZM209 135v10h13v-10h-13Zm32-6v10h13v-10h-13Zm31-6v10h13v-10h-13Z" />
        <path d="M307 131h8m-8 20h8m-8 20h8" />
        <rect x="59" y="222" width="52" height="37" rx="3" />
        <path d="M77 222v-9h17v9m-35 14 26 8 26-8m-26 8v7" />
        <path d="M159 204v-36m-6 26 6 6 7-14" />
        <path d="M159 153c-15 0-20 26-11 33 4 4 17 4 22-2 8-9 1-31-11-31Z" />
      </g>
      <circle cx="43" cy="290" r="4" fill="#a3793d" />
      <path d="M58 322h273" stroke="#c5a572" strokeOpacity="0.65" />
    </svg>
  );
}

export function Corporate() {
  const emailHref = contactEmailHref("Demande entreprise — Thakyo");

  return (
    <section
      id="entreprises"
      aria-labelledby="corporate-title"
      className="section-space relative isolate overflow-hidden bg-cream text-background"
    >
      <CherryBranch className="pointer-events-none absolute -right-12 -top-5 -z-10 w-64 opacity-60 sm:w-96 lg:w-[460px]" />
      <div className="container-shell grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <div>
          <p className="mb-6 text-[10px] font-medium uppercase tracking-[.2em] text-[#805d30]">
            05 — Thakyo dans votre entreprise
          </p>
          <h2
            id="corporate-title"
            className="max-w-2xl font-display text-[clamp(2rem,4.1vw,4.1rem)] leading-[1.17] tracking-[-.035em]"
          >
            ET SI THAKYO VENAIT
            <br />
            DANS VOTRE <span className="text-[#805d30]">ENTREPRISE ?</span>
          </h2>
          <p className="mt-7 max-w-lg text-base leading-8 text-background/80">
            Pour un déjeuner d’équipe ou un événement professionnel, échangeons
            sur vos envies et les possibilités d’intervention de Thakyo.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            {emailHref && (
              <a href={emailHref} className="button">
                <Mail size={16} aria-hidden="true" />
                Contacter Thakyo
              </a>
            )}
            <a
              href={restaurant.phoneHref}
              className="inline-flex min-h-12 items-center justify-center gap-4 border border-background/45 px-6 py-3.5 text-xs font-medium leading-5 text-background transition-colors hover:bg-background hover:text-cream"
            >
              <Phone size={16} aria-hidden="true" />
              Nous appeler
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[430px] px-4 pt-4 sm:px-8 lg:pt-8">
          <div className="mx-auto w-fit border-b border-[#c5a572]/65 px-6 pb-4">
            <Image
              src={publicAsset("/images/logo-thakyo.png")}
              alt="THAKYO"
              width={116}
              height={116}
              className="h-auto w-24 mix-blend-multiply sm:w-29"
            />
          </div>
          <OfficeIllustration />
        </div>
      </div>
    </section>
  );
}
