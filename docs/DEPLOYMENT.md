# Publier THAKYO sur GitHub Pages ou Vercel

Le site utilise Next.js, TypeScript, Tailwind CSS et l’App Router. Deux builds sont disponibles : un export statique pour GitHub Pages et un build Next.js natif pour Vercel. Aucun déploiement ni changement de domaine n’est effectué par ces commandes. Toute mise en production doit recevoir l’accord du propriétaire.

## 1. Vérifier la version à publier

Depuis la racine du dépôt `roberthoang31-ops/thakyo-site`, avec Node.js **24.x** :

```sh
git switch feat/nextjs-thakyo
npm ci
npm run lint
npm run typecheck
npm run build
npm run start
```

Ouvrir `http://localhost:3000`, puis vérifier les six liens de navigation, le menu mobile, les filtres de la galerie, son agrandissement et sa fermeture au clavier, l’ouverture et le téléchargement de la carte PDF, les images, les horaires, les liens d’appel et les redirections de réservation et de commande. Vérifier les sections privatisation et entreprises ; leurs liens e-mail apparaissent uniquement lorsqu’une adresse confirmée est renseignée. Sur téléphone, vérifier les deux boutons fixes et l’accès au pied de page. Le serveur lancé par `npm run start` permet de contrôler le build Next.js natif.

Conserver les modifications sur une branche dédiée pour la revue. Le succès du build local ne confirme ni une publication ni le fonctionnement d’un futur domaine.

## 2. GitHub Pages : compiler sous `/thakyo-site/`

Depuis la racine du projet, dans un shell Bash :

```sh
NEXT_PUBLIC_SITE_URL=https://roberthoang31-ops.github.io npm run build:pages
```

Le script `scripts/build-pages.mjs` active l’export statique, applique `/thakyo-site` comme `NEXT_PUBLIC_BASE_PATH` par défaut et crée `out/.nojekyll`. Les images, le PDF et les ressources Next.js utilisent ce préfixe. Le fichier `public/assets/menus/menu-thakyo.pdf` est ainsi accessible sous `/thakyo-site/assets/menus/menu-thakyo.pdf`. Les liens vers Google et Booqcloud restent inchangés. `NEXT_PUBLIC_SITE_URL` contient seulement l’origine HTTPS : ne pas y ajouter `/thakyo-site/`.

Le dossier `out/` contient le site publiable ; les sources du dépôt ne sont pas directement exécutables par GitHub Pages. L’export utilise les images publiques sans serveur d’optimisation Next.js. Ne pas utiliser `npm run start` pour servir cet export.

Pour vérifier localement le vrai sous-chemin, un serveur statique doit servir le contenu de `out/` à l’adresse `/thakyo-site/`. Exemple sous Linux/macOS avec Python 3, depuis la racine du projet :

```sh
preview_dir=$(mktemp -d)
mkdir "$preview_dir/thakyo-site"
cp -R out/. "$preview_dir/thakyo-site/"
python3 -m http.server 4173 --directory "$preview_dir"
```

Ouvrir `http://localhost:4173/thakyo-site/`. Contrôler les images, la galerie, les ancres, l’ouverture du PDF dans un nouvel onglet et son téléchargement, `/thakyo-site/robots.txt` et `/thakyo-site/sitemap.xml`. Un build à la racine ne suffit pas à vérifier ces chemins.

**Après accord de publication**, dans **Settings → Pages**, configurer une publication de l’artefact `out/` via GitHub Actions, ou placer son contenu sur la branche de publication dédiée et sélectionner cette branche. Conserver `.nojekyll`, les fichiers cachés et le dossier `_next`. Aucun workflow de déploiement automatique n’est ajouté par cette préparation. Vérifier le succès du déploiement Pages avant d’annoncer que le site est en ligne.

L’adresse attendue pour ce dépôt, sans domaine personnalisé, est `https://roberthoang31-ops.github.io/thakyo-site/`. Elle n’est pas une preuve que cette version est publiée.

### Domaine personnalisé sur GitHub Pages

Un domaine personnalisé permet de conserver le compte GitHub tout en affichant le nom du restaurant dans le navigateur. Sa disponibilité et son achat restent à confirmer. Si le domaine choisi héberge le site à sa racine :

1. Définir `NEXT_PUBLIC_SITE_URL` avec l’origine HTTPS réelle du domaine.
2. Recompiler avec `NEXT_PUBLIC_BASE_PATH='' npm run build:pages` pour retirer `/thakyo-site/` de tous les chemins.
3. Après accord, configurer **Settings → Pages → Custom domain** et les DNS indiqués par GitHub chez le fournisseur du domaine. Préserver les enregistrements de messagerie existants.
4. Publier le nouvel export et activer **Enforce HTTPS** dès que GitHub le permet. La validation DNS et le certificat peuvent demander un délai.

Un simple changement de DNS ne corrige pas les chemins d’un ancien build : recompiler avec le bon préfixe est nécessaire. Voir [les domaines personnalisés GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages) et [leur configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## 3. Vercel : préparer une prévisualisation

Une prévisualisation Vercel permet de valider le résultat sur ordinateur et téléphone avant de publier. L’import d’un dépôt depuis le tableau de bord Vercel peut déclencher une première production au clic sur **Deploy** : attendre l’accord du propriétaire avant cette action.

Pour un nouveau projet, une prévisualisation peut être créée avec la CLI, sans connecter d’abord le déploiement automatique Git :

```sh
npx vercel login
npx vercel link
npx vercel
```

Pendant la liaison, sélectionner le bon compte Vercel et créer ou choisir le projet THAKYO. Exécuter ces commandes à la racine du dépôt et garder les réglages Next.js proposés. La dernière commande produit par défaut un déploiement **Preview** ; ne pas ajouter `--prod` avant autorisation.

La prévisualisation possède sa propre URL : la communiquer au propriétaire pour validation. Vérifier le comportement des éventuelles protections d’accès Vercel avant de la partager.

## 4. Configuration Vercel

Dans Vercel, importer ou connecter le dépôt **`roberthoang31-ops/thakyo-site`** avec les réglages suivants :

| Réglage           | Valeur                                      |
| ----------------- | ------------------------------------------- |
| Framework Preset  | Next.js                                     |
| Root Directory    | Racine du dépôt, `.`                        |
| Node.js Version   | 24.x                                        |
| Install Command   | `npm ci`                                    |
| Build Command     | `npm run build`                             |
| Output Directory  | Valeur par défaut de Next.js, sans override |
| Production Branch | `main`                                      |

Ne pas sélectionner `public` comme dossier racine ou sortie. Il n’y a pas d’export statique à configurer pour Vercel.

Laisser `GITHUB_PAGES` absent et `NEXT_PUBLIC_BASE_PATH` absent ou vide pour un site Vercel à la racine. Utiliser `npm run build`, et non `npm run build:pages` : l’optimisation des images Next.js reste alors active.

Après connexion Git, les branches dédiées servent aux déploiements Preview ; une fusion ou un push sur la branche de production `main` peut déclencher automatiquement une publication. Obtenir l’accord avant de fusionner, pousser sur `main`, cliquer sur **Deploy** pour une production ou promouvoir une preview.

## 5. URL publique et référencement local

Ajouter dans **Project Settings → Environment Variables** :

| Variable               | Valeur                                                                                                                 | Usage                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `NEXT_PUBLIC_SITE_URL` | L’URL HTTPS publique finale, par exemple l’adresse Vercel attribuée au projet ou le domaine choisi par le propriétaire | URL canonique et sitemap |

Cette variable est facultative pour développer et compiler localement ; elle doit être définie avant la publication. Utiliser l’origine HTTPS réelle du site, sans chemin supplémentaire ni paramètre. Le préfixe `NEXT_PUBLIC_BASE_PATH` est ajouté automatiquement par le code aux URL publiques. Aucun nom de domaine personnalisé n’est présumé.

L’URL canonique et le sitemap sont ajoutés pour la production lorsque cette adresse est configurée. Les déploiements Preview Vercel et les versions sans URL publique configurée sont exclus de l’indexation ; leur sitemap reste vide. Ces consignes d’indexation ne remplacent pas une protection d’accès.

Après un changement de variable, refaire le build et le déploiement concernés : une variable `NEXT_PUBLIC_` est intégrée lors de la compilation. Cette variable est publique et ne doit contenir aucun secret.

Vérifier après publication :

- Les titres et descriptions pour « restaurant japonais Cornebarrieu », « sushi Cornebarrieu » et « restaurant thaï Cornebarrieu ».
- Les coordonnées, horaires et données structurées du restaurant.
- L’URL canonique, `/robots.txt` et `/sitemap.xml` sur l’adresse retenue.
- La cohérence du lien de site sur la fiche Google du restaurant.

Une fois l’adresse définitive disponible, le propriétaire peut vérifier son domaine dans Google Search Console et soumettre le sitemap. L’indexation dépend des moteurs de recherche.

## 6. Contenus et informations à valider avant production

- **Coordonnées** : 4 chemin de la Plane, 31700 Cornebarrieu ; 09 83 50 23 26. L’e-mail n’est pas encore confirmé : renseigner `restaurant.email` dans `src/data/restaurant.ts` pour afficher les liens de contact des sections privatisation et entreprises. Tant que sa valeur est `null`, seuls les liens d’appel sont proposés ; aucun bouton e-mail inactif n’est affiché.
- **Horaires** : lundi fermé ; mardi à samedi, 12 h–14 h et 19 h–22 h ; dimanche, 19 h–22 h.
- **Carte PDF** : le document fourni `Menu_Thakyo_Impression.pdf` est intégré sans modification dans `public/assets/menus/menu-thakyo.pdf`. Pour une mise à jour, remplacer simplement ce fichier, puis recompiler. `src/data/documents.ts` centralise le chemin `/assets/menus/menu-thakyo.pdf` et le nom de téléchargement `Menu_Thakyo_Impression.pdf`. Ne pas inclure `public/` ni `/thakyo-site/` dans ce chemin. Un fichier configuré mais absent fait échouer le build ; un chemin `null` masque les liens PDF. Vérifier l’ouverture et le téléchargement depuis le site compilé. Les données de `src/data/menu.ts` sont conservées comme référence et ne sont plus affichées.
- **Réservation et vente à emporter** : les boutons redirigent vers [la réservation Google](https://www.google.com/maps/reserve/v/dine/c/q8CeveU3FLM?hl=fr) et [la commande Booqcloud](https://france.booqcloud.com/webshop/Order2POSThakyo/), aux adresses fournies par le restaurant. Le téléphone reste disponible. Vérifier que chaque service affiche bien THAKYO et propose le parcours attendu avant publication ; aucune réservation ni commande réelle n'a été effectuée pendant cette préparation.
- **Mentions légales** : compléter l’identité juridique de l’éditeur, ses coordonnées légales, l’immatriculation, le responsable de publication et les coordonnées de l’hébergeur. Ajouter les informations applicables à l’entreprise, dont TVA et médiation de la consommation, si nécessaires.
- **Photos et logo** : les photos du décor et le logo se trouvent dans `public/images/`. Deux photographies de plats extraites du PDF fourni sont dans `public/assets/galerie/`, également prévu pour les futures photos. La liste modifiable est `src/data/galerie.json` avec chemin, légende, texte alternatif, catégorie et dimensions. `src/data/gallery.ts` vérifie cette liste. Consulter le [guide de contenu](GUIDE-CONTENU.md) pour ajouter un visuel ; valider le rendu et l’autorisation de publication des photos.
- **Privatisation et entreprises** : les textes invitent à discuter du projet avec le restaurant. Ils ne promettent ni capacité, ni tarif, ni food truck, ni livraison régulière. Après ajout de l’e-mail confirmé, vérifier les adresses `mailto:` et leurs objets « Demande de privatisation — Thakyo » et « Demande entreprise — Thakyo » sans envoyer de message de test.

Le site vitrine actuel n’a pas de backend, de base de données ni de service de paiement à configurer. La réservation et la commande sont prises en charge sur les sites externes ; aucune API de prestataire n’est intégrée. Les liens sont centralisés dans `src/data/restaurant.ts` et ne nécessitent aucun secret applicatif. Les éventuels futurs identifiants de prestataires doivent être enregistrés dans les variables privées Vercel, jamais dans Git ou dans une variable `NEXT_PUBLIC_`.

## 7. Publication Vercel après accord

Après validation de la preview et accord explicite, connecter le dépôt si nécessaire, publier la version approuvée depuis `main` et vérifier l’URL de production retournée par Vercel. Contrôler les journaux de compilation, le certificat HTTPS, les liens, les photos et l’affichage mobile.

Si un domaine personnalisé est choisi, l’ajouter dans **Project Settings → Domains**, puis créer uniquement les enregistrements DNS indiqués par Vercel chez le registrar. Ne pas remplacer les enregistrements de messagerie existants. Attendre la validation du domaine et du certificat, mettre à jour `NEXT_PUBLIC_SITE_URL`, puis redéployer la version approuvée avec cette adresse.

L’ancienne configuration GitHub Pages ne publie pas automatiquement cette application Next.js sur Vercel. Lorsque le nouveau site est prêt, décider avec le propriétaire du maintien ou du retrait de l’ancienne adresse.

## Limites de cette préparation

Ces instructions ne prouvent pas qu’un compte ou projet Vercel est configuré, qu’un déploiement distant réussit ou qu’un domaine est actif. Ces points doivent être vérifiés lors de l’étape autorisée correspondante. Les résultats effectifs des contrôles locaux sont consignés dans le compte rendu de livraison.

Le proxy de l’environnement de développement bloque les accès directs aux liens de réservation Google et de commande Booqcloud (HTTP 403). Le fonctionnement de leurs parcours externes reste à vérifier dans un navigateur disposant de l’accès ; les contrôles locaux ne valident pas une réservation, une commande ou un paiement réel.

Documentation officielle : [Next.js sur Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs), [CLI de déploiement](https://vercel.com/docs/cli/deploy), [intégration Git](https://vercel.com/docs/git), [variables d’environnement](https://vercel.com/docs/environment-variables), [domaines](https://vercel.com/docs/domains).
