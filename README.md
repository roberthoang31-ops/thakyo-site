# THAKYO — Restaurant à Cornebarrieu

Site vitrine responsive en HTML5, CSS3 et JavaScript natif, sans dépendance de production ni compilation.

## Lancement

Depuis le dossier du site :

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Le serveur Python sert au développement. Pour un hébergement statique, publier `index.html`, `styles.css`, `script.js`, `logo-thakyo.png` et les trois PNG référencés ci-dessous en conservant leurs noms et leur position.

## Fichiers

- `index.html` : accueil, maison, ambiance, carte complète, informations pratiques et footer. Contient aussi des données structurées Restaurant.
- `styles.css` : thème charbon/ambre, styles responsive et accessibilité.
- `script.js` : menu mobile, dialogue légal, année automatique.
- `logo-thakyo.png` : logo officiel conservé sans retouche.
- `5a6aee01-3081-435d-95c9-a042de98419e.png` : accueil ordinateur.
- `e8cba225-b4ae-4e87-a577-5ded9bfb4cb4.png` : accueil mobile.
- `7ff4702b-c4b0-4413-9631-a5a8cd24d8e0.png` : montage de la salle dans la section ambiance.

Les visuels fournis représentent le décor actuel selon la confirmation du propriétaire. L'ancien visuel généré sous `assets/` est conservé localement mais n'est plus affiché ni nécessaire au site.

## Contenu confirmé

- Adresse : 4 chemin de la Plane, 31700 Cornebarrieu, France.
- Téléphone : 09 83 50 23 26.
- Horaires : lundi fermé ; mardi à samedi 12:00–14:00 et 19:00–22:00 ; dimanche 19:00–22:00.
- Services : terrasse et plats végétaliens.
- Carte transcrite depuis l'image fournie : 80 plats dans 11 catégories, 4 plateaux, formule midi à 15,50 € (Japon ou Thaï), menu enfant moins de 8 ans à 13,50 €.

Les catégories de la carte utilisent des éléments HTML `details` et restent utilisables sans JavaScript. Les liens d'appel et d'itinéraire sont reliés aux coordonnées fournies. Aucun service de réservation ou de paiement n'est intégré.

## Avant publication

Compléter les mentions légales avec la raison sociale, l'immatriculation, le responsable de publication et l'hébergeur. Le lien complet Booqcloud n'est pas connu ; la carte est intégralement consultable sur le site, donc ce lien est facultatif. Le site d'inspiration Botna a renvoyé HTTP 403 lors de sa consultation.

La publication et l'envoi du code local sur GitHub n'ont pas été effectués.

## Vérification

Contrôles Chromium/Playwright à 1440, 768, 390 et 320 px : aucun débordement, aucune image manquante, aucune erreur console ou HTTP. Menu mobile, catégories de carte, dialogue légal et restitution du focus vérifiés. Navigation, carte et informations légales accessibles sans JavaScript. Syntaxe JavaScript et `git diff --check` vérifiés.

Détails et preuves : `design-qa.md`.
