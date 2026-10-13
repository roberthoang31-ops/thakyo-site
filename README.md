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
    layout/            Navigation, footer et barre d’actions mobile
    sections/          Accueil, concept, galerie, carte PDF, réservation/emporter, contact
    ui/                Éléments de présentation communs
  data/                Photos, document PDF, coordonnées et horaires typés
  lib/                 Chemins publics, métadonnées et données structurées Restaurant
public/images/         Logo et photographies fournis par le restaurant
scripts/build-pages.mjs Export statique pour GitHub Pages
legacy/                Ancienne version statique, conservée comme référence
```

## Remplacer les photos, la carte et les liens

| Élément                                 | Fichiers à modifier                                                                                                                                                                                                 |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Galerie                                 | Placer les vraies photos dans `public/images/`, puis modifier `src/data/gallery.ts` : chemin `src`, texte alternatif `alt`, légende `caption`, largeur et hauteur réelles.                                          |
| Photos d’accueil et des autres sections | Les fichiers actuels se trouvent dans `public/images/`. Conserver leurs noms pour remplacer un visuel partout, ou modifier les chemins utilisés dans les composants concernés.                                      |
| Carte PDF                               | Ajouter le vrai fichier dans `public/carte/carte-thakyo.pdf`, puis définir `menuDocument.path` à `"/carte/carte-thakyo.pdf"` dans `src/data/documents.ts`. `downloadName` définit le nom proposé au téléchargement. |
| Commande en ligne                       | Modifier `restaurant.orderUrl` dans `src/data/restaurant.ts`.                                                                                                                                                       |
| Réservation en ligne                    | Modifier `restaurant.reservationUrl` dans `src/data/restaurant.ts`.                                                                                                                                                 |
| Coordonnées et horaires                 | Modifier `src/data/restaurant.ts`. En cas de changement d’horaires, actualiser aussi les données structurées dans `src/lib/seo.ts`.                                                                                 |

Ne pas ajouter `public/` ou `/thakyo-site/` aux chemins de fichiers dans les données : utiliser, par exemple, `/images/mon-plat.jpg` et `/carte/carte-thakyo.pdf`. Le préfixe d’hébergement est appliqué automatiquement. Vérifier les majuscules, minuscules et extensions exactes des fichiers.

**Aucun PDF ni photo de plat n’a encore été fourni dans le projet.** La galerie présente uniquement les vraies photos du décor actuel. Le chemin PDF reste à `null` et les boutons « Consulter la carte » et « Télécharger la carte » sont désactivés avec un message explicite. Un chemin PDF configuré vers un fichier absent fait échouer la compilation pour éviter de publier un lien cassé. Les anciens plats et prix de `src/data/menu.ts` sont conservés comme référence et ne sont plus affichés sur la page.

Après un remplacement, relancer les contrôles et le build. Les images sont optimisées par Next.js sur Vercel ; l’export GitHub Pages utilise directement les fichiers publics. Les polices système évitent tout téléchargement de polices lors du build.

## Contenu et fonctionnalités

- Identité noir, bois et doré ; logo et photographies du décor actuel.
- Galerie responsive avec agrandissement des photos, navigation entre les images et fermeture au clavier.
- Section « Notre carte » prête à recevoir le PDF du restaurant.
- Réservation en ligne via [Google](https://www.google.com/maps/reserve/v/dine/c/q8CeveU3FLM?hl=fr).
- Commande à emporter via [Booqcloud](https://france.booqcloud.com/webshop/Order2POSThakyo/).
- Téléphone : 09 83 50 23 26, avec liens d'appel conservés.
- Adresse : 4 chemin de la Plane, 31700 Cornebarrieu.
- Lundi fermé ; mardi à samedi 12h–14h et 19h–22h ; dimanche 19h–22h.
- Terrasse, plats végétaliens et lien d'itinéraire.

Les boutons de réservation et de commande redirigent vers les services externes fournis par le restaurant. Le site n'intègre ni leur API ni un backend de réservation ou de paiement. Les URL sont centralisées dans `src/data/restaurant.ts`.

Les deux actions figurent dans l’en-tête, l’accueil et les sections dédiées. Sur mobile, une barre fixe les garde accessibles ; un espace en bas de page préserve l’accès au contenu et tient compte de la zone de sécurité du téléphone.

La vérification directe de ces deux services depuis l'environnement de développement est bloquée par son proxy (HTTP 403). Aucune réservation, commande ou transaction réelle n'a été effectuée ; le parcours externe reste à vérifier dans un navigateur disposant de l'accès.

## Référencement local

Titre, description et contenu ciblent « restaurant japonais Cornebarrieu », « sushi Cornebarrieu » et « restaurant thaï Cornebarrieu ». Les données structurées incluent l'adresse, le téléphone, les cuisines et les horaires réels.

Copier `.env.example` vers `.env.local` puis définir `NEXT_PUBLIC_SITE_URL` avec l’origine HTTPS définitive, sans chemin, avant publication. Le préfixe `NEXT_PUBLIC_BASE_PATH` est ajouté automatiquement aux URL canoniques, au sitemap et aux images de partage. Sans URL, ou dans une Preview Vercel, le site reste en `noindex` et le sitemap est vide. Aucun domaine personnalisé n’est supposé.

## Export GitHub Pages

```sh
NEXT_PUBLIC_SITE_URL=https://roberthoang31-ops.github.io npm run build:pages
```

Cette commande compile le site statique dans `out/`, avec le préfixe `/thakyo-site/` par défaut et un fichier `.nojekyll`. Elle ne publie rien. Pour GitHub Pages, publier le contenu généré de `out/` après accord, et non les sources Next.js. L’adresse attendue après publication est `https://roberthoang31-ops.github.io/thakyo-site/` ; cette préparation ne confirme pas sa mise en ligne.

Pour Vercel, utiliser `npm run build` avec `GITHUB_PAGES` absent et `NEXT_PUBLIC_BASE_PATH` absent ou vide. `npm run start` concerne ce build Next.js ; il ne sert pas l’export statique `out/`.

## Publication

Voir [les instructions GitHub Pages et Vercel](docs/DEPLOYMENT.md). Aucune publication en production n'est autorisée par la mission actuelle. Les changements sont préparés sur la branche `feat/nextjs-thakyo` pour revue, sans fusion vers `main` ni déploiement en production.

Avant une mise en ligne publique, compléter les informations légales de l’exploitant et confirmer l’adresse retenue. Les deux modes d’hébergement sont préparés : export statique GitHub Pages ou runtime Next.js natif Vercel.
