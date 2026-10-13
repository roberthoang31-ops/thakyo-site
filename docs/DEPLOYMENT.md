# Publier THAKYO sur Vercel

La migration utilise Next.js, TypeScript, Tailwind CSS et l’App Router. Aucun déploiement Vercel n’a été effectué dans le cadre de cette préparation. Toute mise en production doit recevoir l’accord du propriétaire.

## 1. Vérifier la version à publier

Depuis la racine du dépôt `roberthoang31-ops/thakyo-site`, avec Node.js **24.x** :

```sh
git switch feat/nextjs-thakyo
npm ci
npm run lint
npm run build
npm run start
```

Ouvrir `http://localhost:3000`, puis vérifier l’accueil, la navigation mobile, la carte, les images, les horaires, les liens d’appel et les redirections de réservation et de commande. Le serveur lancé par `npm run start` permet de contrôler la version compilée.

Conserver les modifications sur une branche dédiée pour la revue. Le succès du build local ne confirme ni une publication ni le fonctionnement d’un futur domaine.

## 2. Préparer une prévisualisation

Une prévisualisation Vercel permet de valider le résultat sur ordinateur et téléphone avant de publier. L’import d’un dépôt depuis le tableau de bord Vercel peut déclencher une première production au clic sur **Deploy** : attendre l’accord du propriétaire avant cette action.

Pour un nouveau projet, une prévisualisation peut être créée avec la CLI, sans connecter d’abord le déploiement automatique Git :

```sh
npx vercel login
npx vercel link
npx vercel
```

Pendant la liaison, sélectionner le bon compte Vercel et créer ou choisir le projet THAKYO. Exécuter ces commandes à la racine du dépôt et garder les réglages Next.js proposés. La dernière commande produit par défaut un déploiement **Preview** ; ne pas ajouter `--prod` avant autorisation.

La prévisualisation possède sa propre URL : la communiquer au propriétaire pour validation. Vérifier le comportement des éventuelles protections d’accès Vercel avant de la partager.

## 3. Configuration du projet

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

Après connexion Git, les branches dédiées servent aux déploiements Preview ; une fusion ou un push sur la branche de production `main` peut déclencher automatiquement une publication. Obtenir l’accord avant de fusionner, pousser sur `main`, cliquer sur **Deploy** pour une production ou promouvoir une preview.

## 4. URL publique et référencement local

Ajouter dans **Project Settings → Environment Variables** :

| Variable               | Valeur                                                                                                                 | Usage                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `NEXT_PUBLIC_SITE_URL` | L’URL HTTPS publique finale, par exemple l’adresse Vercel attribuée au projet ou le domaine choisi par le propriétaire | URL canonique et sitemap |

Cette variable est facultative pour développer et compiler localement ; elle doit être définie avant la publication. Utiliser l’adresse réelle du site, sans chemin supplémentaire ni paramètre. Aucun nom de domaine personnalisé n’est présumé.

L’URL canonique et le sitemap sont ajoutés pour la production lorsque cette adresse est configurée. Les déploiements Preview Vercel et les versions sans URL publique configurée sont exclus de l’indexation ; leur sitemap reste vide. Ces consignes d’indexation ne remplacent pas une protection d’accès.

Après un changement de variable, refaire le build et le déploiement concernés : une variable `NEXT_PUBLIC_` est intégrée lors de la compilation. Cette variable est publique et ne doit contenir aucun secret.

Vérifier après publication :

- Les titres et descriptions pour « restaurant japonais Cornebarrieu », « sushi Cornebarrieu » et « restaurant thaï Cornebarrieu ».
- Les coordonnées, horaires et données structurées du restaurant.
- L’URL canonique, `/robots.txt` et `/sitemap.xml` sur l’adresse retenue.
- La cohérence du lien de site sur la fiche Google du restaurant.

Une fois l’adresse définitive disponible, le propriétaire peut vérifier son domaine dans Google Search Console et soumettre le sitemap. L’indexation dépend des moteurs de recherche.

## 5. Informations à valider avant production

- **Coordonnées** : 4 chemin de la Plane, 31700 Cornebarrieu ; 09 83 50 23 26.
- **Horaires** : lundi fermé ; mardi à samedi, 12 h–14 h et 19 h–22 h ; dimanche, 19 h–22 h.
- **Carte et tarifs** : faire confirmer les informations transcrites de la carte fournie, notamment les disponibilités et prix actuels.
- **Réservation et vente à emporter** : les boutons redirigent vers [la réservation Google](https://www.google.com/maps/reserve/v/dine/c/q8CeveU3FLM?hl=fr) et [la commande Booqcloud](https://france.booqcloud.com/webshop/Order2POSThakyo/), aux adresses fournies par le restaurant. Le téléphone reste disponible. Vérifier que chaque service affiche bien THAKYO et propose le parcours attendu avant publication ; aucune réservation ni commande réelle n'a été effectuée pendant cette préparation.
- **Mentions légales** : compléter l’identité juridique de l’éditeur, ses coordonnées légales, l’immatriculation, le responsable de publication et les coordonnées de l’hébergeur. Ajouter les informations applicables à l’entreprise, dont TVA et médiation de la consommation, si nécessaires.
- **Photos et logo** : faire valider le rendu et l’autorisation de publication des visuels fournis.

Le site vitrine actuel n’a pas de backend, de base de données ni de service de paiement à configurer. La réservation et la commande sont prises en charge sur les sites externes ; aucune API de prestataire n’est intégrée. Les liens sont centralisés dans `src/data/restaurant.ts` et ne nécessitent aucun secret applicatif. Les éventuels futurs identifiants de prestataires doivent être enregistrés dans les variables privées Vercel, jamais dans Git ou dans une variable `NEXT_PUBLIC_`.

## 6. Publication après accord

Après validation de la preview et accord explicite, connecter le dépôt si nécessaire, publier la version approuvée depuis `main` et vérifier l’URL de production retournée par Vercel. Contrôler les journaux de compilation, le certificat HTTPS, les liens, les photos et l’affichage mobile.

Si un domaine personnalisé est choisi, l’ajouter dans **Project Settings → Domains**, puis créer uniquement les enregistrements DNS indiqués par Vercel chez le registrar. Ne pas remplacer les enregistrements de messagerie existants. Attendre la validation du domaine et du certificat, mettre à jour `NEXT_PUBLIC_SITE_URL`, puis redéployer la version approuvée avec cette adresse.

L’ancienne configuration GitHub Pages ne publie pas automatiquement cette application Next.js sur Vercel. Lorsque le nouveau site est prêt, décider avec le propriétaire du maintien ou du retrait de l’ancienne adresse.

## Limites de cette préparation

Ces instructions ne prouvent pas qu’un compte ou projet Vercel est configuré, qu’un déploiement distant réussit ou qu’un domaine est actif. Ces points doivent être vérifiés lors de l’étape autorisée correspondante. Les résultats effectifs des contrôles locaux sont consignés dans le compte rendu de livraison.

Le proxy de l’environnement de développement bloque les accès directs aux liens de réservation Google et de commande Booqcloud (HTTP 403). Le fonctionnement de leurs parcours externes reste à vérifier dans un navigateur disposant de l’accès ; les contrôles locaux ne valident pas une réservation, une commande ou un paiement réel.

Documentation officielle : [Next.js sur Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs), [CLI de déploiement](https://vercel.com/docs/cli/deploy), [intégration Git](https://vercel.com/docs/git), [variables d’environnement](https://vercel.com/docs/environment-variables), [domaines](https://vercel.com/docs/domains).
