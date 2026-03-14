# BDC Web Studio — Design System

> **Version** : 1.0.0
> **Date** : 2026-03-11
> **Stack** : React 19 · Vite 7 · Tailwind CSS 4 · Radix UI / shadcn · Lucide Icons
> **Scope** : Landing page Kap Numerik — site vitrine TPE La Reunion

---

## 1. Architecture CSS

Trois couches, importees dans `main.css` dans cet ordre :

| Couche | Fichier | Role | Systeme de couleur |
|--------|---------|------|--------------------|
| 1 | `tailwindcss` | Utilitaires atomiques | — |
| 2 | `theme.css` | *(purge — fichier vide apres nettoyage Radix)* | — |
| 3 | `index.css` | Tokens shadcn/ui | OKLCH |
| 4 | `tw-animate-css` | Animations d'entree/sortie | — |

**Refactoring 2026-03-11** : La couche 2 (theme.css) a ete purgee de 60+ palettes Radix inutilisees, du bloc `#spark-app` orphelin, du bloc `.dark-theme` orphelin et de l'accent Blue (non utilise, le site utilise Emerald). Tous les design tokens custom sont desormais definis dans `main.css` (`:root` + `@theme inline`).

### Tokens custom BDC (main.css :root)

| Variable CSS | Valeur | Classe Tailwind |
|-------------|--------|-----------------|
| `--bdc-emerald-400` | `#34d399` | `bg-bdc-emerald`, `text-bdc-emerald` |
| `--bdc-zinc-950` | `#09090b` | `bg-bdc-surface` |
| `--bdc-zinc-100` | `#f4f4f5` | `text-bdc-text` |
| `--bdc-zinc-400` | `#a1a1aa` | `text-bdc-text-muted` |
| `--bdc-white-10` | `rgba(255,255,255,0.1)` | `border-bdc-border` |
| `--duration-fast` | `200ms` | `duration-fast` |
| `--duration-base` | `300ms` | `duration-base` |
| `--duration-slow` | `500ms` | `duration-slow` |

### Mode sombre

Le site est dark-mode-first. Un seul mecanisme actif :

- `:root` dans `index.css` — valeurs sombres par defaut (OKLCH)
- `.dark` dans `main.css` — overrides shadcn (conserve pour compatibilite shadcn)

**Historique** : Les mecanismes `.dark-theme` (Radix) et `#spark-app` (Spark) ont ete supprimes car orphelins (aucun element correspondant dans le DOM). Les composants codent directement `bg-zinc-950`, `text-zinc-100`, etc. ou utilisent les tokens `bg-bdc-surface`, `text-bdc-text`. Le mode clair n'est pas implemente globalement. **Exception** : `ZeroDefectMethodology` utilise `bg-zinc-50 text-zinc-900` comme section light contrastante — choix de design intentionnel.

---

## 2. Design Tokens

### 2.1 Couleurs

Palette a 3 axes : accent + neutres + noir/blanc.

| Token | Valeur Tailwind | Usage |
|-------|----------------|-------|
| `emerald-400` | `#34d399` | Accent principal — prix, badges, icones, highlights |
| `emerald-500` | `#10b981` | Badges featured ("Offre phare"), fond badge plein |
| `emerald-300` | `#6ee7b7` | Gradient hero (via) |
| `emerald-500/10` | — | Fond badges "Eligible Kap Numerik" |
| `emerald-400/30` | — | Bordure badges eligible |
| `emerald-400/40` | — | Bordure carte highlighted |
| `zinc-100` | `#f4f4f5` | Texte principal (titres, valeurs) |
| `zinc-400` | `#a1a1aa` | Texte secondaire (corps, features) |
| `zinc-500` | `#71717a` | Texte tertiaire (micro-labels, nav links) |
| `zinc-600` | `#52525b` | Texte disclaimers |
| `zinc-700` | `#3f3f46` | Texte meta (tres attenue) |
| `zinc-950` | `#09090b` | Fond sections, fond cartes |
| `white` | `#ffffff` | Boutons primaires, texte over dark |
| `white/10` | — | Bordures standard |
| `white/20` | — | Bordures hover / boutons ghost |
| `white/[0.02]` | — | Glow radial hero (subtil) |
| `white/[0.03]` | — | Fond cartes internes (price breakdown) |
| `black` | `#000000` | Texte sur boutons primaires |
| `black/20` | — | Ombre navbar au scroll |
| `red-400` | `#f87171` | Texte erreur (validation formulaire) |
| `red-500` | `#ef4444` | Bordure erreur, fond erreur |
| `zinc-900` | `#18181b` | Fond ChatWidget, SelectContent, inputs formulaire |
| `zinc-800` | `#27272a` | Hover states (ChatWidget, selects) |
| `zinc-50` | `#fafafa` | Fond section light (ZeroDefectMethodology) |

### 2.2 Typographie

Font display : **Inter** (Google Fonts), chargee avec `font-display: swap` et `preload` dans `index.html`. Appliquee aux balises `h1`–`h4` via `main.css`.

| Role | Classes | Exemple |
|------|---------|---------|
| **Hero h1** | `text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]` | "Votre site pro des 240 EUR." |
| **Section h2** | `text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter` | "Votre site pro des 240 EUR." |
| **Card h3 (standard)** | `text-xl font-bold tracking-tight` | "Presence Pro" |
| **Card h3 (highlighted)** | `text-2xl font-bold tracking-tight` | "Business Premium" |
| **Micro-label** | `text-xs tracking-widest uppercase font-medium text-zinc-500` | "STUDIO D'INGENIERIE LOGICIELLE" |
| **Corps** | `text-lg md:text-xl text-zinc-400 leading-relaxed` | Paragraphes descriptifs |
| **Feature line** | `text-sm text-zinc-400` | Liste de fonctionnalites |
| **Disclaimer** | `text-xs text-zinc-600` ou `text-xs text-zinc-700` | Mentions legales inline |
| **Nav link** | `text-sm text-zinc-500 hover:text-zinc-100` | Menu desktop |
| **Metric value** | `text-4xl md:text-5xl font-bold tracking-tighter` | "Des 240 EUR" |
| **Metric label** | `text-xs tracking-widest uppercase text-zinc-500 font-medium` | "RESTE A CHARGE" |

**Pattern** : `tracking-tighter` pour tout element bold > text-xl. `tracking-widest uppercase` pour tout micro-label.

### 2.3 Espacement

| Contexte | Padding/Margin | Notes |
|----------|---------------|-------|
| **Section standard** | `py-24 md:py-36 px-6 md:px-8` | Pricing, Infra, Eligibilite |
| **Section large** | `py-32 md:py-40 px-6 md:px-8` | KapNumerikProcess, TargetSectors, ZeroDefectMethodology |
| **Hero** | `pt-36 pb-24 md:pt-48 md:pb-40 px-6 md:px-8` | Plus de padding top (navbar fixe) |
| **MetricsBar** | `py-16 px-6 md:px-8` | Compact |
| **Footer** | `py-14 px-6 md:px-8` | Compact |
| **Container** | `max-w-7xl mx-auto` | Standard |
| **Grid gap** | `gap-6` (cards), `gap-8` (nav links), `gap-10` (metrics) | — |
| **Card padding** | `p-6 md:p-8` | Standard |
| **Price breakdown** | `p-4` (compact) / `p-5` (full) | Imbriquee dans carte |

### 2.4 Bordures et rayons

| Element | Classes |
|---------|---------|
| Bordure standard | `border border-white/10` |
| Bordure hover | `hover:border-white/20` |
| Bordure accent | `border-emerald-400/30` (badge) / `border-emerald-400/40` (carte highlight) |
| Bordure navbar scroll | `border-b border-white/10` |
| Rayon bouton | `rounded-lg` |
| Rayon badge | `rounded-full` (pattern standard Kap Numerik) |
| Rayon carte | herite composant shadcn (`rounded-xl` par defaut) |
| Separateur | `border-white/10` (hr) |

### 2.5 Ombres et elevation

Usage minimal — coherent avec l'esthetique flat/dark.

| Element | Classes |
|---------|---------|
| Navbar au scroll | `shadow-lg shadow-black/20` |
| Carte highlighted | `ring-1 ring-emerald-400/20` (glow subtil) |
| Hero glow | `bg-white/[0.02] blur-3xl` (radial, decoratif) |

### 2.6 Transitions et mouvement

Trois tokens de duree definis dans `:root` et mappes dans `@theme inline` :

| Token | Variable CSS | Classe | Usage |
|-------|-------------|--------|-------|
| Rapide | `--duration-fast` (200ms) | `duration-fast` | Hover rapide (chat widget) |
| Standard | `--duration-base` (300ms) | `duration-base` | Cartes, boutons, liens, bordures |
| Lente | `--duration-slow` (500ms) | `duration-slow` | Navbar (apparition/disparition fond), fade-in scroll |

**Accessibilite** : `@media (prefers-reduced-motion: reduce)` defini dans `main.css` — desactive les transitions et animations pour les utilisateurs sensibles.

---

## 3. Composants

### 3.1 Boutons

Trois variantes utilisees :

| Variante | Classes | Contexte |
|----------|---------|----------|
| **Primaire** | `bg-white text-black hover:bg-zinc-200 font-medium rounded-lg` | CTA principal (hero, navbar, carte highlighted) |
| **Ghost** | `bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/30 font-medium rounded-lg` | CTA secondaire, cartes standard, maintenance |
| **Outline** | `variant="outline"` (shadcn) + overrides inline | CTA secondaire hero |

**Tailles** :
- Hero : `text-base px-8 py-6`
- Navbar : `text-sm px-5 py-2`
- Carte : `w-full` (pleine largeur)

### 3.2 Cartes

Basees sur `<Card>` shadcn, 4 variantes :

| Variante | Classes distinctives |
|----------|---------------------|
| **Standard** | `bg-zinc-950 border-white/10 hover:border-white/20 p-6 md:p-8` |
| **Highlighted** | `bg-zinc-950 border-emerald-400/40 ring-1 ring-emerald-400/20 md:scale-105 md:-my-4 z-10` + badge "Offre phare" positionne en `absolute -top-3` |
| **Maintenance** | Standard + icone Shield + badge "Protection continue" |
| **Price breakdown** | `bg-white/[0.03] border-white/10 rounded-xl` — imbriquee dans carte pricing |

### 3.3 Badges

Basees sur `<Badge>` shadcn, 2 variantes :

| Variante | Classes | Texte type |
|----------|---------|------------|
| **Eligible** | `bg-emerald-500/10 text-emerald-400 border-emerald-400/30 font-medium text-xs rounded-full px-3 py-1` | "Eligible Kap Numerik" |
| **Featured** | `bg-emerald-500 text-white border-0 font-semibold text-xs px-3 py-1` | "Offre phare" (avec icone Star) |

### 3.4 Icones

Lucide React — 20+ icones utilisees. Standards de taille :

| Taille | Classes | Usage |
|--------|---------|-------|
| Small | `w-4 h-4` | CheckCircle (features), icones inline |
| Medium | `w-5 h-5` | Star, Shield, ChevronRight, icones titres |
| Large | `w-6 h-6` | Menu, X (burger mobile) |

Toutes les icones decoratives portent `aria-hidden="true"`.

### 3.5 Formulaire (EligibilityForm)

- Inputs : fond transparent, bordure `border-white/10`, focus `ring-emerald-400/30 border-emerald-400/50`
- Labels : `text-sm text-zinc-400`
- Validation : cote client, messages d'erreur en `text-red-400`
- Honeypot : champ cache pour anti-spam
- Consentement RGPD : checkbox obligatoire

### 3.6 Navigation

- **Desktop** : liens horizontaux `text-sm text-zinc-500 hover:text-zinc-100` + CTA primaire
- **Mobile** : burger icon → panel overlay avec liens verticaux + CTA pleine largeur
- **Scroll behavior** : navbar fixe, fond glassmorphism au scroll (`bg-zinc-950/80 backdrop-blur-xl`)
- **Ordre** : Nos offres → Infrastructures → Methode Zero Defaut

---

## 4. Patterns

### 4.1 Layout de section

```
<section className="bg-zinc-950 py-24 md:py-36 px-6 md:px-8">
  <div className="max-w-7xl mx-auto">
    <p className="micro-label">MICRO-LABEL UPPERCASE</p>
    <h2 className="section-title">Titre de section</h2>
    <p className="section-subtitle">Sous-titre descriptif</p>
    {/* Contenu */}
  </div>
</section>
```

Chaque section suit : micro-label → h2 → sous-titre → contenu → disclaimer optionnel.

### 4.2 Pattern prix

```
Prix de base barre (text-zinc-600 line-through)
- Prise en charge FEDER 80% (text-emerald-400, signe -)
─────────────────────────────────
= Reste a charge (text-emerald-400, grand, tracking-tighter)
```

Ce pattern est encapsule dans `<PriceBreakdown>` et utilise dans toutes les cartes pricing.

### 4.3 Pattern feature list

```
<div className="flex items-start gap-2.5">
  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
  <span className="text-sm text-zinc-400">{label}</span>
</div>
```

Icone emerald + texte zinc-400. `flex-shrink-0 mt-0.5` pour alignement vertical avec le texte.

### 4.4 Pattern CTA double

Hero et sections cles utilisent deux CTA cote a cote :
- Primaire (bg-white) — action principale ("Verifier mon eligibilite")
- Ghost (border-white/20) — action secondaire ("Decouvrir nos offres")

Layout : `flex flex-col sm:flex-row gap-4`

### 4.5 Pattern scroll-to

Toutes les navigations internes utilisent `element.scrollIntoView({ behavior: 'smooth', block: 'start' })` avec `e.preventDefault()` sur les liens ancre.

---

## 5. Grille responsive

| Breakpoint | Largeur | Comportement |
|------------|---------|--------------|
| Mobile (defaut) | < 768px | Colonnes empilees, padding reduit |
| `md` | >= 768px | Grids 3-4 colonnes, padding elargi |
| `lg` | >= 1024px | Tailles typographiques maximales |

Grilles cles :
- Pricing : `grid md:grid-cols-3 gap-6`
- MetricsBar : `grid grid-cols-2 md:grid-cols-4`
- Infra : `grid md:grid-cols-2 gap-6`

---

## 6. Accessibilite

Conformite WCAG 2.1 AA verifiee (audit 38 points, commit `fix(a11y)`).

Points cles integres au design system :
- `aria-label` sur toutes les sections, nav, boutons sans texte visible
- `aria-hidden="true"` sur toutes les icones decoratives
- `aria-expanded` + `aria-controls` sur le burger mobile
- `role="menu"` / `role="menuitem"` sur le menu mobile
- `sr-only` pour contenu masque visuellement mais accessible aux lecteurs d'ecran
- Focus visible : `focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black`
- `prefers-reduced-motion: reduce` respecte
- Skip link implicite via logo → `#contenu-principal`
- Contrastes verifies >= 4.5:1 pour texte courant, >= 3:1 pour grand texte

---

## 7. Inconsistances et dette technique

| # | Probleme | Statut | Resolution |
|---|----------|--------|------------|
| 1 | **Dual token system** : theme.css (Radix/Hex) vs index.css (shadcn/OKLCH) | ✅ Resolu | theme.css purge. Tokens BDC custom dans main.css :root. |
| 2 | **Triple dark mode** : `.dark-theme`, `.dark`, hardcode Tailwind | ✅ Resolu | `.dark-theme` et `#spark-app` supprimes. `.dark` conserve pour shadcn. |
| 3 | **Accent Blue dans theme.css** | ✅ Resolu | Supprime avec le bloc `#spark-app`. Le site utilise Emerald via Tailwind. |
| 4 | **Pas de design tokens custom** | ✅ Resolu | 5 tokens couleur + 3 tokens duree definis dans `:root` et mappes dans `@theme inline`. |
| 5 | **Transition inconsistante** | ✅ Resolu | 3 tokens de duree (fast/base/slow) definis et documentes. |
| 6 | **Badges inconsistants** | ✅ Resolu | Pattern `rounded-full px-3 py-1` applique uniformement. |
| 7 | **Focus states formulaire** | ✅ Resolu | Standardise sur `focus:ring-emerald-400/30 focus:border-emerald-400/50`. |

---

## 8. Tokens de reference rapide

Pour les developpeurs, copier-coller les classes les plus frequentes :

```
/* Fond section */        bg-zinc-950 / bg-bdc-surface
/* Bordure standard */    border border-white/10 / border-bdc-border
/* Bordure hover */       hover:border-white/20
/* Texte principal */     text-zinc-100 / text-bdc-text
/* Texte secondaire */    text-zinc-400 / text-bdc-text-muted
/* Texte tertiaire */     text-zinc-500
/* Accent */              text-emerald-400 / text-bdc-emerald
/* Accent fond */         bg-emerald-500/10
/* Accent bordure */      border-emerald-400/30
/* Bouton primaire */     bg-white text-black hover:bg-zinc-200
/* Bouton ghost */        bg-transparent border-white/20 text-white hover:bg-white/5
/* Transition */          transition-all duration-base
/* Section padding */     py-24 md:py-36 px-6 md:px-8
/* Container */           max-w-7xl mx-auto
/* Focus ring */          focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
/* Focus form */          focus:ring-emerald-400/30 focus:border-emerald-400/50
/* Micro-label */         text-xs tracking-widest uppercase text-zinc-500 font-medium
/* Heading */             font-bold tracking-tighter text-zinc-100
/* Badge Kap Numerik */   rounded-full px-3 py-1 bg-emerald-500/10 text-emerald-400
```
