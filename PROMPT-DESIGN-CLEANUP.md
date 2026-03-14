# Prompt — Nettoyage CSS & Amelioration Design BDC Web Studio

> Copier-coller ce prompt dans une nouvelle session Claude avec acces au repo.

---

## Contexte

Tu travailles sur le repo `bdc-web-studio` — une landing page React 19 + Vite 7 + Tailwind CSS 4 + shadcn/ui pour une agence web (BDC Digital) ciblant les TPE de La Reunion via le dispositif Kap Numerik (subvention FEDER 80%).

Lis d'abord `DESIGN-SYSTEM.md` a la racine du projet. Ce document decrit l'etat actuel du design system, les tokens utilises, les patterns, et **5 points de dette technique identifies** (section 7).

## Tache 1 — Nettoyage dette CSS (obligatoire)

Resous les 5 problemes documentes dans DESIGN-SYSTEM.md section 7 :

1. **Dual token system** : `src/styles/theme.css` importe 50+ palettes Radix UI Colors dont seule Slate est utilisee. Les composants utilisent directement les classes Tailwind `zinc-*` / `emerald-*`.
   - Supprime tous les imports Radix inutilises dans theme.css (ne garde que ce qui est effectivement reference)
   - Verifie avec `grep -r` que chaque import Radix restant est utilise quelque part dans le code
   - Ne casse pas les composants shadcn/ui qui dependent peut-etre de certains tokens

2. **Triple dark mode** : `.dark-theme` (theme.css), `.dark` (main.css), et hardcode Tailwind coexistent. Seul le hardcode est utilise.
   - Supprime les blocs `.dark-theme` de theme.css s'ils ne sont references nulle part
   - Conserve `.dark` dans main.css uniquement si des composants shadcn l'utilisent
   - Documente la decision dans un commentaire CSS

3. **Accent Blue dans theme.css** : l'accent est mappe sur Blue (Radix) alors que le site utilise Emerald (Tailwind).
   - Realigne l'accent Radix sur Emerald ou supprime-le si inutilise

4. **Pas de design tokens custom** : les valeurs sont en dur dans les classes Tailwind.
   - Cree des CSS custom properties pour les 5 couleurs recurrentes (emerald-400, zinc-950, zinc-100, zinc-400, white/10) dans `:root` de main.css
   - Mappe-les dans le bloc `@theme` de tailwind pour qu'elles soient utilisables comme `bg-brand-accent`, `bg-brand-surface`, etc.
   - NE migre PAS tous les composants — documente juste les nouveaux tokens et migre 1 composant comme exemple

5. **Transitions** : 3 vitesses (200/300/500ms) existent sans tokens.
   - Cree `--duration-fast: 200ms`, `--duration-base: 300ms`, `--duration-slow: 500ms` dans `:root`
   - Mappe dans `@theme` comme `transition-duration-fast`, etc.

**Validation** : apres chaque modification CSS, lance `npx tsc --noEmit` et verifie que le build Vite transforme tous les modules sans erreur.

## Tache 2 — Ameliorations visuelles (si tache 1 OK)

Ameliore le design en respectant les contraintes suivantes :
- Dark-mode-only, palette emerald/zinc, esthetique premium mais accessible
- WCAG 2.1 AA (le site est deja conforme, ne regresse pas)
- Mobile-first, performant (pas de fonts custom lourdes, pas de JS superflu)

Axes d'amelioration :

### 2.1 Micro-interactions
- Ajoute des `hover:translate-y-[-2px]` subtils sur les cartes pricing (avec `transition-transform`)
- Ajoute un `hover:shadow-emerald-500/5` sur la carte highlighted
- Ajoute une animation d'entree fade-in au scroll pour chaque section (utilise `tw-animate-css` deja installe, ou IntersectionObserver)

### 2.2 Typographie
- Evalue l'ajout d'une font display (Inter, Geist, ou Satoshi) pour les headings uniquement — charge via `<link rel="preload">` avec `font-display: swap`
- Si le gain visuel est marginal, ne change rien et documente pourquoi

### 2.3 Gradient et couleur
- Le hero utilise `from-emerald-400 via-emerald-300 to-zinc-100` sur le prix. Teste un gradient plus dynamique (ex: `from-emerald-400 via-teal-300 to-cyan-200`) et compare visuellement
- Ajoute un subtle gradient radial en fond de section pricing (`bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/20 via-transparent to-transparent`)

### 2.4 Espacement et rythme
- Verifie que le rythme vertical est coherent : les sections "large" (`py-32 md:py-40`) doivent avoir une raison d'etre plus espacees que les sections "standard" (`py-24 md:py-36`). Si non, uniformise.

### 2.5 Composants
- Le ChatWidget flottant : ajoute une animation d'entree (slide-up + fade) au premier affichage
- Les badges "Eligible Kap Numerik" : teste un style pill (`rounded-full px-3 py-1`) vs le style actuel
- Le formulaire d'eligibilite : ameliore les etats focus (glow emerald subtil via `focus:ring-emerald-400/30 focus:border-emerald-400/50`)

## Contraintes absolues

- **Ne modifie AUCUN contenu textuel** (titres, descriptions, features, prix, mentions legales)
- **Ne modifie pas la structure HTML/JSX** des composants sauf si necessaire pour le CSS
- **Chaque modification doit etre testable independamment** — commit atomique par axe
- **Met a jour DESIGN-SYSTEM.md** apres chaque changement significatif
- **Respecte `prefers-reduced-motion: reduce`** pour toute nouvelle animation

## Ordre d'execution

1. Lis DESIGN-SYSTEM.md
2. Tache 1 (nettoyage) — commit
3. Tache 2.1 (micro-interactions) — commit
4. Tache 2.2 (typographie) — commit ou skip documente
5. Tache 2.3 (gradient) — commit
6. Tache 2.4 (espacement) — commit ou skip
7. Tache 2.5 (composants) — commit
8. Met a jour DESIGN-SYSTEM.md — commit final
