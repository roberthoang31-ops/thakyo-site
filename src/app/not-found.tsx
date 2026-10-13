import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() {
  return (
    <main
      id="contenu"
      className="container-shell flex min-h-screen flex-col items-start justify-center py-20"
    >
      <p className="eyebrow">THAKYO · 404</p>
      <h1 className="section-title">Cette page a quitté la carte.</h1>
      <p className="mt-6 text-muted">
        Retrouvez notre restaurant et toutes les informations sur l’accueil.
      </p>
      <Link href="/" className="button mt-8">
        <ArrowLeft size={16} aria-hidden="true" />
        Retour à l’accueil
      </Link>
    </main>
  );
}
