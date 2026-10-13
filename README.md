# THAKYO — Next.js

Site responsive pour le restaurant japonais et thaï THAKYO à Cornebarrieu. Next.js App Router, React, TypeScript strict, Tailwind CSS 4 et Lucide React. Biome assure le lint et Prettier le formatage.

## Développement

Prérequis : Node.js 24 (`.nvmrc`) et npm. Le fichier `package-lock.json` verrouille les dépendances.

```sh
npm ci
npm run dev
```

Le serveur démarre sur le port 3000. Aucune variable ni clé secrète n'est nécessaire au développement. Dans les environnements où le cache npm du compte n'est pas accessible, utiliser `npm --cache /workspace/scratch/npm-cache ci`.

## Contrôles et serveur de production local

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

`npm run start` sert localement le résultat du build ; il ne déploie pas le site. `npm run format` formate les sources.

## Architecture

```text
src/
  app/                 Routes App Router, layout, styles, robots et sitemap
  components/
    layout/            Navigation et footer
    sections/          Accueil, concept, carte, réservation/emporter, contact
    ui/                Éléments de présentation communs
  data/                Carte, prix, coordonnées et horaires typés
  lib/seo.ts           Métadonnées et données structurées Restaurant
public/images/         Logo et photographies fournis par le restaurant
legacy/                Ancienne version statique, conservée comme référence
```

Pour modifier les plats et prix : `src/data/menu.ts`. Pour les coordonnées et horaires : `src/data/restaurant.ts`. Le JSON-LD des horaires se trouve dans `src/lib/seo.ts` : mettre à jour les deux emplacements en cas de changement d'horaires.

Les images d'accueil sont sélectionnées selon l'écran et optimisées par Next.js. Les catégories de carte utilisent le HTML natif et restent consultables sans JavaScript. Les polices système évitent tout téléchargement de polices lors du build.

## Contenu et fonctionnalités

- Identité noir, bois et doré ; logo et photographies du décor actuel.
- Carte : 80 plats, 11 catégories, 4 plateaux, formules midi et menu enfant.
- Réservation en ligne via [Google](https://www.google.com/maps/reserve/v/dine/c/q8CeveU3FLM?hl=fr).
- Commande à emporter via [Booqcloud](https://france.booqcloud.com/webshop/Order2POSThakyo/).
- Téléphone : 09 83 50 23 26, avec liens d'appel conservés.
- Adresse : 4 chemin de la Plane, 31700 Cornebarrieu.
- Lundi fermé ; mardi à samedi 12h–14h et 19h–22h ; dimanche 19h–22h.
- Terrasse, plats végétaliens et lien d'itinéraire.

Les boutons de réservation et de commande redirigent vers les services externes fournis par le restaurant. Le site n'intègre ni leur API ni un backend de réservation ou de paiement. Les URL sont centralisées dans `src/data/restaurant.ts`.

La vérification directe de ces deux services depuis l'environnement de développement est bloquée par son proxy (HTTP 403). Aucune réservation, commande ou transaction réelle n'a été effectuée ; le parcours externe reste à vérifier dans un navigateur disposant de l'accès.

## Référencement local

Titre, description et contenu ciblent « restaurant japonais Cornebarrieu », « sushi Cornebarrieu » et « restaurant thaï Cornebarrieu ». Les données structurées incluent l'adresse, le téléphone, les cuisines et les horaires réels.

Copier `.env.example` vers `.env.local` puis définir `NEXT_PUBLIC_SITE_URL` avec l'origine HTTPS définitive avant publication. Cette valeur active les URL canoniques, le sitemap et les images de partage absolues. Sans URL, ou dans une Preview Vercel, le site reste en `noindex` et le sitemap est vide. Aucun domaine de production n'est supposé.

## Publication

Voir [les instructions Vercel](docs/DEPLOYMENT.md). Aucune publication en production n'est autorisée par la mission actuelle. Les changements sont préparés sur la branche `feat/nextjs-thakyo` pour revue, sans fusion vers `main` ni déploiement en production.

Avant une mise en ligne publique, compléter les informations légales de l'exploitant et choisir le domaine. La configuration actuelle utilise le runtime Next.js natif de Vercel ; elle ne cible pas GitHub Pages.
