# Changelog

Toutes les évolutions notables de ce projet sont documentées dans ce fichier.
Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/)
et le versionnement suit [SemVer](https://semver.org/lang/fr/).

## [Unreleased]

## [1.2.0] - 2026-10-28

### Modifié (BREAKING)

- **Palette recalibrée WCAG 2.1 AA** — audit automatisé : 84 paires
  texte/fond et composants vérifiées ≥ 4.5:1 (texte) et ≥ 3:1 (UI),
  en light **et** en dark :
  - `--color-primary` : 48 % d'invalid → **38 %** ;
  - `--color-success` : 38 % → **27 %** ;
  - `--color-danger` : 59 % → **37 %** ;
  - `--color-error` : 50 % → **45 %** ;
  - `--color-link` : 38 % → **27 %** ; `--color-link-visited` : 47 % → **45 %** ;
  - `--color-border` (light) : 71 % → **55 %** (UI ≥ 3:1 ; dark 71 % conservé).
- **Variants `-focus`** (hover/focus) : plus sombres en light, plus claires en
  dark — désormais définies par thème au lieu du simple swap.
- **`.text-secondary` / `.text-muted`** = `--color-gray-3` : 4.5:1 sur fond
  clair, 9.9:1 sur fond sombre (l'ancien gray-6 était illisible, ~1.2:1).
- **Composantes « remplis »** passent sur les solides constants (texte blanc
  garanti) : `bg-*`, badges, skip-link, pagination/docs `.active`.
- **Alertes** : titre et corps en `--color-gray-0` (contraste final sur le
  panneau teinté) ; bordure, icône et progression conservent l'accent.
- **`mark`** : texte noir statique (`--color-link-text`) — les gris inversés
  en dark rendaient le surlignage illisible.
- **Docs sidebar hover** : inversion complète `gray-0`/`gray-8` ; terminal
  de la page d'accueil : `gray-4` → `gray-2`.

### Ajouté

- Variables **solides constants** (fonds à texte blanc garanti ≥ 4.5:1) :
  `--color-primary-solid`, `--color-success-solid`, `--color-warning-solid`,
  `--color-error-solid`, `--color-muted-solid`.
- Variables **invariables** : `--color-white` (blanc), `--color-link-text`
  (noir de texte) et `--color-secondary` figé à `hsl(0, 0%, 30%)`.- Teintes de texte **thématisées pour dark** (précédemment absentes) :
  `--color-primary` (50 %), `--color-success` (37 %), `--color-danger` (49 %),
  `--color-error` (66 %), `--color-link` (37 %), `--color-link-visited` (60 %),
  `--color-link-active` (66 %), `--color-link-focus` (62 %) et leurs
  `-focus`.
- Section documentation **« Couleurs & accessibilité »** (`#colors`) avec
  nuanciers dynamiques et table des hexadécimaux par thème ; palette à jour
  dans le README.
- **Accessibilité (au-delà du contraste)** :
  - focus clavier visible global `:focus-visible` (+ ring dédié sur boutons
    et champs qui supprimait précédemment l'outline) — WCAG 2.4.7 / 2.4.11 ;
  - utilitaires `.sr-only` et `.sr-only-focusable` ;
  - liens de contenu « nus » soulignés (reconnaissance sans la couleur
    seule) — WCAG 1.4.1 ;
  - boutons de fermeture (alerte, modal) en cible tactile ≥ 24px — WCAG 2.5.8 ;
  - `alertMessage.js` : `role="alert"` + `aria-live`, nom accessible et
    activation clavier sur l'élément de fermeture, auto-fermeture suspendue
    au survol/focus et désactivée si `prefers-reduced-motion` — WCAG 2.2.1 ;
  - `interactions.js` : piège à focus + `aria-modal="true"` sur la modale,
    rôles `tablist/tab/tabpanel` et navigation clavier (flèches, Orig, Fin)
    des onglets ;
  - `themeSwitch.js` : `role="switch"` + activation Entrée/Espace si le
    toggle n'est pas un `<input>` natif.
- Section documentation **« Accessibilité »** (`#a11y`) : récapitulatif des
  mécanismes automatiques et des utilitaires.

### Corrigé

- `.text-white` était **inversé en dark mode** → il pointait sur
  `--color-gray-8` (noir en dark) ; pointe désormais sur `--color-white` :
  le blanc reste blanc dans les deux thèmes.
- Contraste `.bg-secondary + .text-white` **constant** (≈ 8.5:1) : le fond
  `--color-secondary` ne change plus avec le thème.
- Démo docs : cercle `bg-error` utilise `text-white` (la classe `white`
  n'existait pas) ; `--color-secondary-focus` désormais défini et cohérent
  entre les thèmes.

### Notes

- Le visuel du framework est plus « profond » en light (fonds AA plus
  sombres) : vérifiez vos personnalisations locales si elles s'appuient sur
  les anciens hexadécimaux.

## [1.1.0] - 2024

Grille responsive 12 colonnes, dark mode intégré, composants interactifs
via attributs `data-*`.

[Unreleased]: https://github.com/jm-holland/illaweight/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/jm-holland/illaweight/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/jm-holland/illaweight/releases/tag/v1.1.0
