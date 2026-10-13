# Validation — galerie, carte PDF et accès aux services

## Version préparée

La page d’accueil conserve le style sombre et doré et les sections concept, réservation, commande à emporter et contact. Elle contient désormais une galerie de quatre photographies réelles du restaurant, les deux actions dans l’en-tête et le hero, une barre fixe sur mobile et une section « Notre carte » pour le PDF. Les entrées « Galerie » et « Carte PDF » sont dans la navigation.

Aucun PDF ni aucune photo de plat n’est disponible dans le projet. Les deux boutons PDF sont donc désactivés, avec une explication visible. Leur activation et le téléchargement du document réel restent à vérifier après réception du fichier. La galerie présente uniquement le décor fourni par le restaurant. Aucun lien fictif n’a été ajouté.

## Contrôles exécutés

- `npm run lint` : 22 fichiers contrôlés, aucune erreur ni avertissement.
- `npm run typecheck` : génération des types et contrôle TypeScript réussis.
- `npm run build` : build Next.js natif réussi.
- `NEXT_PUBLIC_SITE_URL=https://roberthoang31-ops.github.io npm run build:pages` : export statique réussi, avec préfixe `/thakyo-site` et `out/.nojekyll`.
- Aucun ajout ni changement de dépendance ; le fichier de verrouillage reste inchangé.
- `git diff --check` : réussi.

## Vérifications navigateur

Chromium via Playwright sur le serveur Next.js et sur un serveur statique servant réellement l’export sous `/thakyo-site/`. Largeurs contrôlées : 1440, 768, 390 et 320 px, hauteur 900 px.

- Accueil HTTP 200 et toutes les sections conservées.
- Photos chargées, aucun débordement horizontal ni erreur JavaScript ou requête en échec sur les parcours finaux.
- Commande et réservation visibles dans l’en-tête et l’accueil, avec les destinations fournies par THAKYO et les attributs d’ouverture externe attendus.
- Navigation mobile : ouverture, déplacement jusqu’à `#galerie`, fermeture après clic, Échap et retour du focus.
- Galerie : quatre photos, agrandissement, précédent/suivant, flèches clavier et passage de la dernière à la première image ; fermeture par bouton, Échap et arrière-plan ; retour du focus à la vignette ; défilement de page restauré.
- Barre d’actions visible seulement sous 768 px ; hauteur inférieure à l’espace réservé ; pied de page entièrement accessible au-dessus de la barre en fin de défilement.
- Carte interactive retirée ; deux boutons PDF désactivés et aucun lien vers un PDF inexistant.
- Sans JavaScript : menu mobile natif et ouverture des originaux depuis les vignettes fonctionnels.
- Données structurées Restaurant valides et lien de réservation confirmé.
- À la racine sans origine configurée : `noindex`, robots bloquants et sitemap vide.
- Pour Pages avec origine configurée : images, canonique, données structurées, robots et sitemap utilisent `/thakyo-site/`.

Le contrôle de l’export a révélé que le composant de routage utilisé pour les ancres mobiles pouvait déclencher une requête inutile et empêcher le déplacement à la section. Ces liens sont maintenant des ancres HTML natives. Le parcours a été vérifié à nouveau après correction.

## Captures et résultats

Fichiers locaux dans `/workspace/thakyo-gallery-review/` :

- `root-results.json` et `pages-results.json` : résultats par largeur.
- `root-1440-accueil.png`, `root-390-accueil.png` et leurs variantes `pages-…` : accueil ordinateur et mobile.
- `pages-carte-desktop.png`, `pages-galerie-desktop.png` : nouvelles sections.
- `root-…-full.png`, `pages-…-full.png` : captures intégrales aux quatre largeurs.
- `root-…-lightbox.png`, `pages-…-lightbox.png` : agrandissement ordinateur et mobile.

Les captures de l’accueil, de la carte, de la galerie et de l’agrandissement ont été inspectées visuellement.

## Limites et publication

Safari et Firefox n’ont pas été testés. Le fonctionnement des parcours externes Google et Booqcloud n’est pas confirmé depuis cet environnement, dont le proxy a refusé ces destinations ; les destinations des liens locaux ont été vérifiées, sans réservation, commande ou paiement réel.

Le PDF et les photos de plats restent à fournir. Le remplacement des fichiers et liens est décrit dans le README. Les informations légales restent celles du site en préparation.

Aucune fusion dans `main`, aucun déploiement en production et aucun changement de domaine ou de DNS n’ont été effectués. Les instructions GitHub Pages et Vercel figurent dans `docs/DEPLOYMENT.md`.
