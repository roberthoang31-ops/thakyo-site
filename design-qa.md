# Design QA — THAKYO

final result: passed

## Périmètre et références

Adaptation graphique d'un site vitrine à partir de photographies du décor, et non reproduction d'une maquette d'interface. Aucun ratio de fidélité pixel à pixel n'est applicable aux sections textuelles.

- Source desktop : `/workspace/thakyo-site/5a6aee01-3081-435d-95c9-a042de98419e.png`, 1448 × 1086 pixels.
- Source mobile : `/workspace/thakyo-site/e8cba225-b4ae-4e87-a577-5ded9bfb4cb4.png`, 1086 × 1448 pixels.
- Ambiance : `/workspace/thakyo-site/7ff4702b-c4b0-4413-9631-a5a8cd24d8e0.png`, 1448 × 1086 pixels.
- Logo fourni : PNG 206 × 206, fond blanc et proportions conservés.
- Contenu métier : captures fournies dans la conversation pour coordonnées, horaires et carte. Confirmation du propriétaire : décor actuel.

## Preuves de rendu

Captures Chromium avec Playwright, densité 1, pixels de capture identiques aux pixels CSS. Navigation fermée, catégorie Nigiris ouverte par défaut.

- Desktop : `/workspace/thakyo-review/desktop.png`, viewport 1440 × 1000.
- Accueil desktop : `/workspace/thakyo-review/desktop-accueil.png`, 1440 × 1000.
- Tablette : `/workspace/thakyo-review/tablet.png`, viewport 768 × 1024.
- Mobile : `/workspace/thakyo-review/mobile.png`, viewport 390 × 844.
- Accueil mobile : `/workspace/thakyo-review/mobile-accueil.png`, 390 × 844.
- Petit mobile : `/workspace/thakyo-review/small-mobile.png`, viewport 320 × 740.
- Détails carte et visite : `/workspace/thakyo-review/mobile-carte.png` et `mobile-visite.png`, 390 × 844.
- Résultats des contrôles : `/workspace/thakyo-review/checks.json`.

Le navigateur cloud du plugin demeure indisponible. La validation a été réalisée dans Chromium local, dans le cadre du mode de secours approuvé par l'utilisateur.

## Comparaison et surfaces contrôlées

La photo source et la capture de l'accueil ont été ouvertes dans la même entrée de comparaison, ainsi que les vues rapprochées carte/visite sur mobile. Les captures pleine page et mobile ont également été inspectées. Le cadrage responsive constitue une adaptation intentionnelle des photographies à une interface, sans retouche des fichiers originaux.

- Typographie : Georgia pour les titres, Arial pour l'interface, hiérarchie et retours à la ligne lisibles. Pas de police externe nécessaire.
- Espacement : colonnes desktop, empilement mobile, catégories ouvrantes, prix alignés et horaires lisibles. Aucun débordement à 320, 390, 768 ou 1440 px.
- Couleurs : charbon, bois et ambre issus des références ; texte clair et accents dorés. Voile sombre sur le hero pour la lisibilité.
- Images : vrais fichiers fournis et logo officiel. Photo portrait sélectionnée sur mobile, photo horizontale sur ordinateur. Montage ambiance présenté entier. Aucun visuel généré affiché.
- Contenu : 80 plats, 4 plateaux, formules, prix, adresse et horaires transcrits et vérifiés. Deux prix corrigés lors de la relecture indépendante : maki thon 7,50 € et poké poulet 14,50 €.

## Historique et corrections

1. État initial : validation bloquée faute de navigateur exposé ; illustration générée et coordonnées provisoires.
2. Remplacement du visuel par les photos fournies, ajout des informations métier, menu complet. Chromium local trouvé et rendu capturé.
3. P2 : boutons inopérants sans JavaScript. Correction : bouton Menu masqué sans JS, navigation visible, informations légales sous `details` en fallback. Validation sans JS réussie.
4. Zones des boutons Menu et dialogue agrandies à 44 px. Nouvelle capture et contrôles après correction.
5. Contrôle final : toutes les interactions testées passent ; aucune erreur console ou HTTP, image manquante ou collision de mise en page relevée.

## Interactions vérifiées

- Menu mobile : ouverture, fermeture par lien, fermeture par Échap et focus.
- Carte : ouverture/fermeture des catégories, contenu et prix accessibles avec et sans JavaScript.
- Dialogue légal : ouverture, fermeture Échap et restitution du focus au déclencheur.
- Liens : téléphone conforme, itinéraire associé à l'adresse fournie, ancres locales présentes.
- Sans JavaScript : navigation visible, carte ouvrante, informations légales consultables.

## Limites et suivi

- Les mentions légales sont encore à compléter avant publication : ce résultat valide la version de travail et ne constitue pas une autorisation de publication.
- Safari et Firefox non testés.
- Les liens d'appel et d'itinéraire ont été vérifiés dans le code ; aucun appel réel n'a été émis.
- P3 : produire ultérieurement des formats photo WebP/AVIF optimisés pour réduire le poids mobile, en conservant les originaux.
- Booqcloud : lien exact facultatif encore manquant, carte consultable directement sur le site.
