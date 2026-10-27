# illaWeightCss

A simple **Dark Mode ready** minimalist CSS framework based on HTML and CSS
elements according to the [Mozilla](https://developer.mozilla.org/fr/)
documentation — une grille responsive 12 colonnes, des utilitaires et des
composants interactifs (modal, tabs, accordion), le tout dans **~10 kB gzip**.

- Site & documentation : <https://illaweight.illaweb.eu>
- Licence : [MIT](./LICENSE)

![logo](public/illaWeight.png)

## Features

**illaWeightCss** is a starting point for every website or web app. We take
care of all the CSS work that every site needs without making it look
cookie-cutter:

- A responsive flex grid that can be customized to your needs.
- A solid base built on [Normalize.css](https://necolas.github.io/normalize.css/)
  to fix cross-browser compatibility issues.
- Consistently styled buttons that work with `<a>` and `<button>` elements.
- Styles for vertical and horizontal menus, including support for dropdown menus.
- Useful form alignments that look great on all screen sizes.
- Various common table styles.
- Dark mode toggle built in ([`data-theme`](https://illaweight.illaweb.eu/scripts.html#darkMod)).
- Interactive components via `data-attributes` — no JS framework required.
- An extremely minimalist look that is super-easy to customize.
- Responsive by default, with a non-responsive option.

## Installation

### Depuis Git (recommandé)

Clonez le dépôt et construisez les fichiers distribuables :

```sh
git clone https://github.com/jm-holland/illaweight.git
cd illaweight
npm install
npm run build:lib
```

Puis copiez dans votre projet :

- `illaWeightCss.min.css` (ou `illaWeightCss.css`)
- le dossier `fonts/`
- les scripts dont vous avez besoin dans `js/`

### Via CDN (aucune installation)

Liez directement le fichier depuis GitHub :

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/jm-holland/illaweight@main/illaWeightCss.min.css"
/>
```

ou directement depuis `raw.githubusercontent.com` :

```html
<link
  rel="stylesheet"
  href="https://raw.githubusercontent.com/jm-holland/illaweight/main/illaWeightCss.min.css"
/>
```

### Depuis une Release GitHub

Téléchargez l'archive de la dernière [Release](https://github.com/jm-holland/illaweight/releases)
et copiez les fichiers dans votre projet.

### Via npm (optionnel)

Si vous préférez un gestionnaire de paquets :

```sh
npm install illaweightcss
```

## Démarrage

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/VOTRE_USER/illaweight@main/illaWeightCss.min.css"
    />
  </head>
  <body>
    <main class="container">
      <h1 class="heading-1">Bonjour illaWeight</h1>
      <button class="btn btn-primary">Cliquez-moi</button>
    </main>
  </body>
</html>
```

## Color Reference

| Variable          | Hex                                               |
| ----------------- | ------------------------------------------------- |
| --color-primary   | ![#0495ef](https://placehold.co/15/0495ef/0495ef) |
| --color-highlight | ![#b3f0fd](https://placehold.co/15/b3f0fd/b3f0fd) |
| --color-success   | ![#03abbd](https://placehold.co/15/03abbd/03abbd) |
| --color-danger    | ![#f1903b](https://placehold.co/15/f1903b/f1903b) |
| --color-error     | ![#f20c77](https://placehold.co/15/f20c77/f20c77) |

## Contenu du paquet

| Chemin                    | Contenu                                         |
| ------------------------- | ----------------------------------------------- |
| `illaWeightCss(.min).css` | bundle CSS unique (polices incluses en relatif) |
| `js/alertMessage.js`      | notifications animées                           |
| `js/interactions.js`      | API `data-attributes` modal / tabs / accordion  |
| `js/menu_burger.js`       | menu hamburger + sous-menus ouverts au clic     |
| `js/portfolio.js`         | léger filtrage de grille portfolio              |
| `js/scrollToTop.js`       | bouton retour en haut                           |
| `js/themeSwitch.js`       | bascule dark / light persistée                  |
| `fonts/`                  | Comfortaa, Manjari, Quicksand + Tabler Icons    |

Documentation complète des classes et des scripts :
<https://illaweight.illaweb.eu>

## Screenshots

![App Screenshot](public/screenshot.png)

## test on browsers

![Brave](https://img.shields.io/badge/Brave-FB542B?style=for-the-badge&logo=Brave&logoColor=white)
![Firefox](https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white)
![Edge](https://img.shields.io/badge/Edge-0078D7?style=for-the-badge&logo=Microsoft-edge&logoColor=white)
![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)

## design logo with

![Inkscape](https://img.shields.io/badge/Inkscape-e0e0e0?style=for-the-badge&logo=inkscape&logoColor=080A13)
![Gimp Gnu Image Manipulation Program](https://img.shields.io/badge/Gimp-657D8B?style=for-the-badge&logo=gimp&logoColor=FFFFFF)

## Exemple code

![CodePen](https://img.shields.io/badge/Codepen-000000?style=for-the-badge&logo=codepen&logoColor=white)

## Developed with

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![VSCodium](https://img.shields.io/badge/VSCodium-2F80ED?style=for-the-badge&logo=VSCodium&logoColor=0023A3)
![Sass](https://img.shields.io/badge/sass-hotpink.svg?style=for-the-badge&logo=Sass&logoColor=white)

## languages

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## Operating OS

![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
