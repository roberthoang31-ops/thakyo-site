# Validation de la migration Next.js

## Résultat

La version locale compilée fonctionne. Aucun déploiement de cette migration en production n'a été effectué.

## Installation et contrôles

- Node.js 24.19.0, Next.js 16.4.0, React 19.3.0, TypeScript 5.9.3, Tailwind 4.3.3 et Lucide React 1.55.0.
- Installation répétable effectuée avec `npm ci`, depuis `package-lock.json`.
- `npm run lint` : 17 fichiers contrôlés par Biome, aucune erreur ni avertissement.
- `npm run typecheck` : génération des types de routes et TypeScript réussis.
- `npm run build` : réussi ; accueil, page 404, robots et sitemap générés.
- `npm audit` : 0 vulnérabilité signalée, dépendances de développement incluses.
- `npm run start` : accueil HTTP 200 ; `npm run dev` : accueil HTTP 200.
- `git diff --check` : réussi.

Biome remplace l'outillage ESLint initialement évalué afin de conserver un ensemble compatible et sans l'avis de sécurité transitif trouvé dans cette version de la configuration ESLint Next. Les règles recommandées de Biome restent activées.

## Navigateur

Chromium local via Playwright, sur le build de production, largeurs 1440, 768, 390 et 320 px (hauteur 900, densité 1) :

- Aucun débordement horizontal.
- Toutes les photos et les icônes sont affichées.
- Aucune erreur console, requête échouée ou réponse HTTP d'erreur.
- Navigation mobile : ouverture, fermeture par lien, Échap et retour du focus validés.
- Carte : 11 catégories et 80 plats présents, ouverture et fermeture validées.
- Liens téléphone et ancres contrôlés ; aucun véritable appel émis.
- Navigation et catégories de carte utilisables sans JavaScript.
- JSON-LD Restaurant présent et parsable avec l'adresse, le téléphone, les cuisines et les horaires fournis.
- Sans URL de production configurée : `noindex`, robots interdisant l'indexation et sitemap vide, comme prévu.

La marge du hero sur mobile a été corrigée après la première capture, puis les tests ont été exécutés à nouveau sur le build final. Les captures finales ont été inspectées.

## Preuves locales

Captures et résultats conservés dans `/workspace/thakyo-next-review/` :

- `desktop-accueil.png`, `mobile-accueil.png` : aperçu de l'accueil.
- `desktop.png`, `768.png`, `mobile.png`, `320.png` : pages complètes.
- `results.json` : résultats des contrôles navigateur.

## Limites

Safari et Firefox n'ont pas été testés. Vercel, le domaine final et ses DNS n'ont pas été configurés. Les boutons réservation et commande à emporter passent par téléphone. L'identité légale de l'exploitant reste à compléter avant publication.
