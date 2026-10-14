# Validation — carte PDF, galerie et événements

## Livraison vérifiée

La page conserve le logo, le décor actuel, l’identité sombre et dorée, le concept, la réservation, la commande et les coordonnées existantes. Elle présente désormais :

- la carte PDF fournie, avec une photographie de plat et les boutons de consultation et de téléchargement ;
- une galerie de six visuels avec filtres « Les plats » et « Le restaurant », agrandissement et commandes clavier ;
- les sections Privatisation et Entreprises, reprenant les textes demandés ;
- la navigation Accueil, La carte, Galerie, Privatisation, Entreprises et Contact.

L’adresse e-mail n’est pas encore confirmée. `restaurant.email` reste `null` : aucun bouton e-mail inactif ni adresse inventée n’est affiché. Les deux sections proposent le téléphone confirmé. Les liens `mailto:` avec les objets demandés sont préparés, mais leur destination réelle ne peut pas être vérifiée avant réception de l’adresse.

## Carte et photographies fournies

`Menu_Thakyo_Impression.pdf` a été copié dans `public/assets/menus/menu-thakyo.pdf` sans modification : deux pages A4, 2 553 017 octets. Le PDF original, le fichier du projet et les téléchargements navigateur ont la même empreinte SHA-256 :

```text
4fac820d35272f15f82ebe66d61cb6be2d49798c85500ccd8ed61600c8634861
```

Les plats et leurs prix ne sont pas retranscrits dans la page. Les deux photographies JPEG de soupe thaïe et de pad thaï sont extraites sans modification des images incorporées au PDF fourni. Elles complètent les quatre photos du restaurant dans `src/data/galerie.json`.

## Contrôles de compilation

- `npm run lint` : 27 fichiers contrôlés, aucune erreur ni avertissement.
- `npm run typecheck` : types des routes et TypeScript validés.
- `npm run build` : build Next.js natif réussi.
- `NEXT_PUBLIC_SITE_URL=https://roberthoang31-ops.github.io npm run build:pages` : export statique réussi sous `/thakyo-site/`.
- Aucun ajout ni changement de dépendance ; fichier de verrouillage inchangé.
- `git diff --check` : réussi.

## Contrôles dans le navigateur

Chromium via Playwright : 1440, 768, 390 et 320 px de large, sur le serveur Next.js à la racine puis sur le véritable export statique servi sous `/thakyo-site/`.

- Accueil HTTP 200, neuf sections attendues présentes, aucun débordement horizontal.
- Quatorze images visibles chargées ; texte principal Entreprises conservé en HTML, fond ivoire vérifié.
- Six libellés de navigation conformes ; chaque ancre rejoint sa section, fermeture du menu mobile après clic et par Échap.
- Téléphones : toutes les destinations correspondent à `tel:+33983502326`. Aucun appel réel lancé.
- Réservation Google et commande Booqcloud : destinations et attributs de sécurité vérifiés, accès dans le header et le hero conservés.
- Galerie : six visuels au total, deux pour « Les plats », quatre pour « Le restaurant ». Filtres, état sélectionné, agrandissement, flèches clavier, navigation limitée à la catégorie, fermeture par Échap et bouton, et restitution du focus vérifiés.
- L’image agrandie est montée seulement lorsque la visionneuse est ouverte, pour éviter de charger les originaux au changement de catégorie lorsqu’elle est fermée.
- Aucun bouton désactivé ni lien e-mail fictif.
- PDF : ouverture dans un nouvel onglet sur le bon chemin, réponse `application/pdf`, téléchargement nommé `Menu_Thakyo_Impression.pdf`, intégrité binaire contrôlée pour les quatre largeurs et les deux modes d’hébergement.
- Barre mobile : espace réservé suffisant et pied de page accessible, sans chevauchement en fin de défilement.
- Sans JavaScript : navigation mobile native, six visuels présents et accès direct aux images d’origine.
- Données structurées Restaurant conservées et canonique `/thakyo-site/` correcte pour l’export Pages.
- Aucun message d’erreur JavaScript ni ressource indisponible sur les parcours finaux. Les annulations normales de requêtes d’images lors des changements de visuel ne sont pas assimilées à des ressources cassées ; le chargement du visuel affiché est vérifié explicitement.

Les captures des sections carte, privatisation et entreprises ont été inspectées sur ordinateur et téléphone.

## Preuves locales

Dossier `/workspace/thakyo-events-review/` :

- `root-results.json`, `pages-results.json` : résultats pour les quatre largeurs.
- `pages-1440-full.png`, `pages-390-full.png` : aperçus complets ordinateur et mobile.
- `pages-1440-carte.png`, `pages-1440-privatisation.png`, `pages-1440-entreprises.png` et variantes `390` : nouvelles sections.
- `pages-1440-lightbox.png`, `pages-390-lightbox.png` : agrandissement d’une photo de plat.
- `root-…-download.pdf` et `pages-…-download.pdf` : fichiers téléchargés pour comparaison avec l’original.

## Limites et publication

L’adresse e-mail reste à fournir. Safari et Firefox n’ont pas été testés. Les requêtes directes vers Google et Booqcloud sont toujours refusées par le proxy de développement (`CONNECT 403`) : les liens locaux sont corrects, mais leurs parcours externes ne sont pas validés ici. Aucune réservation, commande, transaction, émission d’e-mail ou appel réel n’a été effectué.

Aucune fusion dans `main`, aucun déploiement en production et aucun changement DNS n’ont été effectués. Les modifications sont sur la branche de travail. Le guide français des remplacements se trouve dans `docs/GUIDE-CONTENU.md` ; les instructions de publication restent dans `docs/DEPLOYMENT.md`.
