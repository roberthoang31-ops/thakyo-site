# Modifier les contenus du site THAKYO

Les contenus se modifient dans les fichiers du projet. Après chaque changement, reconstruire le site puis publier la version validée selon [le guide de publication](DEPLOYMENT.md). Modifier un fichier local ne met pas automatiquement le site en ligne. La version préparée reste une prévisualisation jusqu’à sa publication autorisée.

## Remplacer la carte PDF

1. Déposer la nouvelle carte à la place de `public/assets/menus/menu-thakyo.pdf`, en conservant exactement ce nom.
2. Relancer les contrôles et la compilation indiqués en bas de ce guide.
3. Vérifier « Consulter la carte » et « Télécharger la carte PDF » dans la prévisualisation.

Le dossier `public/` est la racine publique de Next.js : le fichier est servi à l’adresse `/assets/menus/menu-thakyo.pdf`, ou `/thakyo-site/assets/menus/menu-thakyo.pdf` sur GitHub Pages. Il ne faut pas créer un second dossier `assets/menus/` à la racine du dépôt.

Le fichier initial est le PDF `Menu_Thakyo_Impression.pdf` fourni par le restaurant, conservé sans modification. Les plats et les prix sont lus directement dans le document ; le site ne les retranscrit pas.

Si le nom ou le dossier du PDF doit changer, modifier aussi `src/data/documents.ts` :

```ts
export const menuDocument: { path: string | null; downloadName: string } = {
  path: "/assets/menus/menu-thakyo.pdf",
  downloadName: "Menu_Thakyo_Impression.pdf",
};
```

`path` correspond au fichier sous `public/`. `downloadName` est le nom proposé lors du téléchargement. Ne pas ajouter `public/` ni `/thakyo-site/` à `path` : le site applique lui-même le préfixe d’hébergement. Si le document doit être retiré temporairement, mettre `path: null` masque les deux liens. Un chemin configuré vers un fichier absent arrête le build afin d’éviter un lien cassé.

## Ajouter une photo à la galerie

1. Déposer la vraie photo dans `public/assets/galerie/` avec un nom simple, en minuscules et sans espace, par exemple `mon-plat.jpg`.
2. Ouvrir `src/data/galerie.json` et ajouter un objet à la liste, séparé du précédent par une virgule.
3. Renseigner les dimensions réelles du fichier en pixels, sa légende, son texte alternatif et sa catégorie.

Exemple à adapter uniquement après avoir déposé la photo correspondante ; ce fichier d’exemple n’est pas ajouté au site :

```json
{
  "src": "/assets/galerie/mon-plat.jpg",
  "alt": "Description précise du plat visible sur la photographie",
  "caption": "Légende de la photographie",
  "category": "plats",
  "width": 1600,
  "height": 1200
}
```

Les valeurs `1600` et `1200` sont un exemple : les remplacer par celles de votre fichier. Les dimensions se trouvent dans les propriétés de l’image sur votre ordinateur. Conserver les guillemets doubles et ne pas mettre de virgule après le dernier objet de la liste. Le fichier JSON n’accepte pas les commentaires.

| Champ             | À renseigner                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `src`             | Chemin à partir de la racine publique, sans `public/` ni `/thakyo-site/`.                    |
| `caption`         | Courte légende affichée avec la photo.                                                       |
| `alt`             | Description utile de ce que montre la photo pour les personnes utilisant un lecteur d’écran. |
| `category`        | `"plats"` pour « Les plats » ou `"restaurant"` pour « Le restaurant ».                       |
| `width`, `height` | Largeur et hauteur réelles en pixels, sous forme de nombres entiers.                         |

L’ordre de la liste détermine l’ordre des photos. Les catégories sont proposées lorsqu’elles contiennent des images. La première photo de la catégorie `plats` illustre également la rubrique « La carte ». Les quatre photos du décor actuellement référencées sous `/images/` peuvent rester dans `public/images/` ; il n’est pas nécessaire de les déplacer.

Les deux photos de plats présentes dans `public/assets/galerie/` proviennent du PDF fourni : `soupe-thaie.jpg` (1200 × 960) et `pad-thai.jpg` (1536 × 2048). Les fichiers photographiques ont été extraits sans modification. Pour retirer une photo de la galerie, supprimer son objet dans `galerie.json`. Ne supprimer le fichier que s’il n’est plus utilisé ailleurs.

Pour les futures photos, préférer JPEG ou WebP, avec un poids raisonnable et un grand côté autour de 1600 pixels si cela convient au visuel. Conserver les proportions d’origine. Les vignettes peuvent recadrer l’image sans la déformer ; l’agrandissement permet de voir la photo entière. Un champ facultatif `objectPosition`, par exemple `"center 40%"`, peut ajuster le cadrage d’une vignette.

Next.js optimise les images avec son serveur sur Vercel. L’export GitHub Pages sert les fichiers tels quels : préparer leur taille et leur compression avant de les ajouter. Les images hors de la première vue sont chargées progressivement. Il n’y a pas de faux formulaire d’importation dans le site : les fichiers et la liste JSON sont la source de la galerie.

## Changer les coordonnées et les liens

Ouvrir `src/data/restaurant.ts`. Ce fichier centralise les coordonnées confirmées du restaurant, les horaires et les liens utiles.

| Information             | Propriété                                  |
| ----------------------- | ------------------------------------------ |
| Téléphone affiché       | `phone`                                    |
| Téléphone international | `phoneInternational`                       |
| Lien d’appel            | `phoneHref`, avec le préfixe `tel:`        |
| Adresse e-mail          | `email`                                    |
| Réservation             | `reservationUrl`                           |
| Commande en ligne       | `orderUrl`                                 |
| Adresse postale         | `address`, `postalCode`, `city`, `country` |
| Itinéraire              | `mapsHref`                                 |
| Horaires affichés       | `openingHours`                             |

En cas de changement de numéro, mettre à jour les trois valeurs de téléphone ensemble. Le numéro actuel est `09 83 50 23 26`, sa forme internationale `+33983502326` et le lien d’appel `tel:+33983502326`. Si les horaires changent, mettre à jour aussi les horaires structurés du référencement dans `src/lib/seo.ts`.

L’adresse e-mail n’a pas encore été confirmée : sa valeur reste `null`. Une fois l’adresse réelle connue, remplacer uniquement `null` par l’adresse entre guillemets, en conservant le type `as string | null`. Les boutons « Parler de mon événement » et « Contacter Thakyo » apparaissent alors automatiquement. Le code de `src/lib/contact.ts` vérifie le format et prépare les objets :

- « Demande de privatisation — Thakyo » ;
- « Demande entreprise — Thakyo ».

Tant que l’adresse manque, les sections proposent « Nous appeler », sans bouton e-mail inactif ni adresse inventée. Un lien `mailto:` ouvre l’application de messagerie du visiteur ; le site n’envoie aucun e-mail lui-même.

Conserver les URL de réservation Google et de commande Booqcloud déjà confirmées, sauf si le restaurant fournit de nouvelles adresses.

## Vérifier avant de publier

Depuis la racine du projet :

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

Ouvrir `http://localhost:3000`. Vérifier l’ouverture du PDF dans un nouvel onglet et son téléchargement, les photos et leurs légendes, l’agrandissement puis la fermeture avec Échap, les filtres, les six ancres de navigation et les liens de contact. Sur un écran étroit, contrôler le menu mobile, les boutons fixes de réservation et de commande, et l’absence de défilement horizontal.

Pour GitHub Pages, produire aussi le build destiné au sous-dossier :

```sh
NEXT_PUBLIC_SITE_URL=https://roberthoang31-ops.github.io npm run build:pages
```

La commande génère `out/` sans publier. Suivre les instructions de [prévisualisation sous `/thakyo-site/`](DEPLOYMENT.md#2-github-pages--compiler-sous-thakyo-site) pour tester réellement les chemins du PDF et des images avant la mise en ligne autorisée.
