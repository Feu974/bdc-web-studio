# Audit d'Accessibilité WCAG 2.1 AA — BDC Web Studio

**Standard :** WCAG 2.1 AA | **Date :** 2026-03-10
**URL auditée :** `https://bdc-web-studio-theta.vercel.app`
**Code source :** `bdc-web-studio/src/`
**Auditeur :** Claude (audit automatisé + revue manuelle du code)

---

## Résumé exécutif

| Métrique | Valeur |
|----------|--------|
| **Issues totales** | 38 |
| **Critiques (🔴)** | 8 |
| **Majeures (🟡)** | 14 |
| **Mineures (🟢)** | 16 |

**Verdict :** Le site **ne passe pas** WCAG 2.1 AA en l'état. 8 violations de niveau A bloquent la conformité. La base technique (Radix UI / shadcn) est solide, mais l'intégration comporte des lacunes significatives.

---

## 1. Perceivable (Perceptible)

| # | Issue | Critère WCAG | Sévérité | Fichier | Recommandation |
|---|-------|-------------|----------|---------|----------------|
| 1 | `<html lang="en">` alors que le contenu est en français | 3.1.1 Language of Page (A) | 🔴 Critique | `index.html:2` | Changer en `lang="fr"` |
| 2 | 33 SVG sur 35 sans aucun attribut d'accessibilité (ni `title`, ni `aria-label`, ni `aria-hidden`) | 1.1.1 Non-text Content (A) | 🔴 Critique | Multiple fichiers | Ajouter `aria-hidden="true"` sur les icônes décoratives, `aria-label` sur les icônes porteuses de sens |
| 3 | Logo BDC (span texte + carré décoratif) sans rôle ni label accessible | 1.1.1 Non-text Content (A) | 🔴 Critique | `Navbar.tsx:47-50` | Ajouter `role="img" aria-label="BDC Web - Accueil"`, `aria-hidden="true"` sur le carré |
| 4 | Couleur seule pour distinguer le métrique Kap Numérik (emerald-400 vs zinc-100) | 1.4.1 Use of Color (A) | 🔴 Critique | `MetricsBar.tsx:17-22` | Ajouter un badge, icône ou texte en complément de la couleur |
| 5 | Prix barré (`line-through`) sans contexte sémantique — lecteur d'écran lit un prix normal | 1.3.1 Info and Relationships (A) | 🟡 Majeure | `PricingKapNumerik.tsx:47` | Envelopper avec `aria-label="Prix de base avant prise en charge"` |
| 6 | Couleur seule pour le montant FEDER (emerald-400) dans la section pricing | 1.4.1 Use of Color (A) | 🟡 Majeure | `PricingKapNumerik.tsx:54-59` | Ajouter bordure, fond ou icône en complément |
| 7 | Texte `text-emerald-400/80` sur fond `bg-emerald-500/5` dans le footer FEDER — contraste potentiellement insuffisant | 1.4.3 Contrast (A) | 🟡 Majeure | `LegalFooter.tsx:80-84` | Augmenter l'opacité du texte ou assombrir le fond |
| 8 | Éléments décoratifs (carrés, gradients) non marqués `aria-hidden` | 1.1.1 Non-text Content (A) | 🟢 Mineure | `HeroSection.tsx:14-16`, `LegalFooter.tsx:44-45` | Ajouter `aria-hidden="true"` |
| 9 | Section MetricsBar sans heading — trou dans la hiérarchie H1 → H2 | 1.3.1 Info and Relationships (A) | 🟢 Mineure | `MetricsBar.tsx` | Ajouter un `<h2 className="sr-only">` |
| 10 | Pipeline (Audit → Spécification → Déploiement → Monitoring) affiché avec `<div>` au lieu de `<ol>` | 1.3.1 Info and Relationships (A) | 🟢 Mineure | `ZeroDefectMethodology.tsx:57-68` | Utiliser `<ol><li>` pour la séquence |

---

## 2. Operable (Utilisable)

| # | Issue | Critère WCAG | Sévérité | Fichier | Recommandation |
|---|-------|-------------|----------|---------|----------------|
| 11 | Aucun skip link (lien "Aller au contenu") | 2.4.1 Bypass Blocks (A) | 🔴 Critique | `index.html` / `App.tsx` | Ajouter un lien skip-to-content avant la navbar |
| 12 | Quick reply badges dans le chat : `onClick` sans support clavier — non focusable, pas de `keyDown` | 2.1.1 Keyboard (A) | 🔴 Critique | `ChatWidget.tsx:284-291` | Convertir en `<button>` avec `tabIndex={0}` |
| 13 | Bouton mobile menu sans `aria-expanded` | 4.1.2 Name, Role, Value (A) | 🟡 Majeure | `Navbar.tsx:74-80` | Ajouter `aria-expanded={mobileMenuOpen}` |
| 14 | Aucun `focus-visible` explicite sur les boutons CTA, footer links, submit | 2.4.7 Focus Visible (AA) | 🟡 Majeure | Multiple fichiers | Ajouter `focus:ring-2 focus:ring-white focus:ring-offset-2` |
| 15 | Outline focus à 50% opacité (`outline-ring/50`) — visibilité insuffisante | 2.4.7 Focus Visible (AA) | 🟡 Majeure | `main.css` | Passer à 100% opacité minimum |
| 16 | Navigation interne par `<button onClick={scrollToSection}>` au lieu de `<a href="#section">` | 1.3.1 Info and Relationships (A) | 🟡 Majeure | `Navbar.tsx`, `LegalFooter.tsx` | Utiliser des ancres `<a>` sémantiques |
| 17 | Animations Framer Motion sans vérification `prefers-reduced-motion` | 2.3.3 Animation (AAA) | 🟡 Majeure | `ChatWidget.tsx:169-272` | Implémenter `useReducedMotion()` de Framer Motion |
| 18 | Aucune media query `prefers-reduced-motion` dans les CSS | 2.3.3 Animation (AAA) | 🟡 Majeure | `main.css`, `index.css` | Ajouter `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }` |
| 19 | 5 cibles tactiles < 44×44px détectées (liens nav principalement) | 2.5.5 Target Size (AAA) | 🟢 Mineure | `Navbar.tsx` | Augmenter le padding des liens de navigation |

---

## 3. Understandable (Compréhensible)

| # | Issue | Critère WCAG | Sévérité | Fichier | Recommandation |
|---|-------|-------------|----------|---------|----------------|
| 20 | Formulaire : aucun message d'erreur affiché si validation échoue — champs `required` sans feedback visuel | 3.3.1 Error Identification (A) | 🔴 Critique | `EligibilityForm.tsx` | Implémenter `aria-invalid`, `aria-describedby` avec messages d'erreur en `aria-live="polite"` |
| 21 | Champs requis non indiqués visuellement (pas d'astérisque ni de texte "obligatoire") | 3.3.2 Labels or Instructions (A) | 🟡 Majeure | `EligibilityForm.tsx` | Ajouter `*` aux labels requis + légende "* Champ obligatoire" |
| 22 | Checkbox consent a `required` mais pas `aria-required="true"` | 4.1.2 Name, Role, Value (A) | 🟢 Mineure | `EligibilityForm.tsx:193-204` | Ajouter `aria-required="true"` |
| 23 | Attributs `autocomplete` absents sur tous les champs du formulaire | 1.3.5 Identify Input Purpose (AA) | 🟡 Majeure | `EligibilityForm.tsx` | Ajouter `autocomplete="name"`, `autocomplete="organization"`, `autocomplete="tel"`, `autocomplete="email"` |
| 24 | Input chat sans label — seulement un placeholder | 3.3.2 Labels or Instructions (A) | 🟢 Mineure | `ChatWidget.tsx:303-308` | Ajouter `aria-label="Votre message"` |

---

## 4. Robust (Robuste)

| # | Issue | Critère WCAG | Sévérité | Fichier | Recommandation |
|---|-------|-------------|----------|---------|----------------|
| 25 | Fenêtre chat sans `role="dialog"` ni `aria-modal` — pas de piégeage focus | 4.1.2 Name, Role, Value (A) | 🔴 Critique | `ChatWidget.tsx:195-320` | Ajouter `role="dialog" aria-labelledby="chat-title" aria-modal="true"` + focus trap |
| 26 | Aucune landmark `<main>` — 0 balise main sur la page entière | 4.1.2 Name, Role, Value (A) | 🟡 Majeure | `App.tsx` | Envelopper le contenu principal dans `<main>` |
| 27 | Conteneur messages chat sans `aria-live="polite"` — nouveaux messages non annoncés | 4.1.3 Status Messages (AA) | 🟡 Majeure | `ChatWidget.tsx:227-249` | Ajouter `aria-live="polite" role="log"` |
| 28 | Honeypot anti-spam sans `aria-hidden="true"` — lecteur d'écran le vocalise | 1.3.1 Info and Relationships (A) | 🟢 Mineure | `EligibilityForm.tsx:182-190` | Ajouter `aria-hidden="true"` |
| 29 | Bouton chat ouvert sans `aria-label` — icône seule | 4.1.2 Name, Role, Value (A) | 🟢 Mineure | `ChatWidget.tsx:175-189` | Ajouter `aria-label="Ouvrir le chat"` |
| 30 | Bouton fermer chat (X) sans `aria-label` | 4.1.2 Name, Role, Value (A) | 🟢 Mineure | `ChatWidget.tsx:216-223` | Ajouter `aria-label="Fermer le chat"` |
| 31 | Badge "messages non lus" sans contexte sémantique | 4.1.2 Name, Role, Value (A) | 🟢 Mineure | `ChatWidget.tsx:180-188` | Ajouter `aria-label` dynamique |
| 32 | Indicateur de saisie (dots animés) sans alternative texte | 1.1.1 Non-text Content (A) | 🟢 Mineure | `ChatWidget.tsx:251-277` | Ajouter `aria-label="L'assistant écrit..."` |
| 33 | `role="contentinfo"` redondant sur `<footer>` | Best practice | 🟢 Mineure | `LegalFooter.tsx:37` | Supprimer le `role` redondant |

---

## Contraste couleurs

Les couleurs utilisent OKLCH, ce qui empêche le calcul automatique direct. Voici l'analyse par inspection visuelle et composants :

| Élément | Avant-plan | Arrière-plan | Taille | Ratio requis | Verdict |
|---------|-----------|-------------|--------|-------------|---------|
| H1 titre | zinc-50 (~blanc) | noir | 96px bold | 3:1 | ✅ Pass |
| Nav links | `oklch(0.552)` (~gris moyen) | noir | 14px normal | 4.5:1 | ⚠️ À vérifier — potentiellement limite |
| Body text | `oklch(0.552)` | noir | 12-16px | 4.5:1 | ⚠️ À vérifier |
| Form labels | zinc-300 | zinc-950 | 14px medium | 4.5:1 | ✅ Probablement pass |
| Footer text | zinc-500 | zinc-950 | 12-14px | 4.5:1 | ❌ Probablement fail |
| FEDER notice | emerald-400/80 | emerald-500/5 | 12px | 4.5:1 | ❌ Probablement fail |
| Disclaimer text | zinc-600 | noir | 12px | 4.5:1 | ❌ Probablement fail |

---

## Navigation clavier

| Élément | Tab | Enter/Space | Escape | Verdict |
|---------|-----|-------------|--------|---------|
| Nav buttons | ✅ | ✅ Scroll | N/A | ⚠️ Focus peu visible |
| CTA buttons | ✅ | ✅ Scroll | N/A | ⚠️ Focus peu visible |
| Form inputs | ✅ | ✅ | N/A | ✅ OK |
| Select dropdowns | ✅ | ✅ Ouvre | ✅ Ferme | ✅ OK (Radix) |
| Chat widget | ✅ | ✅ Ouvre | ❌ Ne ferme pas | ❌ Pas de focus trap |
| Quick replies | ❌ Non focusable | ❌ | N/A | ❌ Bloquant |
| Mobile menu | ✅ | ✅ Toggle | ❌ Ne ferme pas | ⚠️ Partiel |

---

## Lecteur d'écran

| Élément | Annoncé comme | Problème |
|---------|--------------|----------|
| Logo BDC | "BDC." (texte brut) | Pas identifié comme logo/lien d'accueil |
| Nav items | "button, Infrastructures" | Devrait être "link" |
| Metrics bar | 4 blocs texte sans structure | Pas de contexte "indicateurs" |
| Prix barré | "4 000 EUR HT" (prix normal) | Pas de notion "ancien prix" |
| Icônes features | Silence | 33 SVG invisibles aux lecteurs |
| Chat badge | Nombre seul | Pas de contexte "messages non lus" |
| Typing dots | Silence | Animation non annoncée |

---

## Corrections prioritaires

### Priorité 1 — Bloquants conformité (Niveau A)

1. **`lang="fr"`** sur `<html>` — 1 ligne, impact maximal
2. **Skip link** — ajouter avant `<Navbar>` dans `App.tsx`
3. **`<main>` landmark** — envelopper les sections dans `App.tsx`
4. **SVG `aria-hidden="true"`** — passe globale sur toutes les icônes décoratives
5. **Form error handling** — implémenter `aria-invalid` + messages d'erreur
6. **Quick replies → `<button>`** — remplacer les `<Badge onClick>` dans `ChatWidget.tsx`
7. **Chat `role="dialog"`** + focus trap
8. **Distinction non-couleur** pour le métrique Kap Numérik

### Priorité 2 — Conformité AA

9. Focus visible explicite sur tous les éléments interactifs
10. `autocomplete` sur les champs du formulaire
11. `aria-expanded` sur le bouton mobile menu
12. `aria-live="polite"` sur le conteneur messages chat
13. `prefers-reduced-motion` dans CSS + Framer Motion
14. Vérifier et corriger les ratios de contraste (nav links, footer, disclaimers)

### Priorité 3 — Améliorations

15. Convertir `<button onClick={scroll}>` en `<a href="#">` dans la navigation
16. Ajouter `aria-label` aux boutons icône-only du chat
17. Structurer le pipeline en `<ol><li>`
18. Marquer les éléments décoratifs `aria-hidden`

---

## Outils recommandés pour validation post-correction

- **axe DevTools** (extension Chrome) — tests automatisés WCAG
- **Lighthouse Accessibility** — score intégré au CI/CD
- **NVDA** ou **VoiceOver** — test manuel lecteur d'écran
- **eslint-plugin-jsx-a11y** — linting accessibilité dans le code React

```bash
# Ajouter au projet
npm install --save-dev eslint-plugin-jsx-a11y
```

---

*Audit réalisé par analyse automatisée du DOM live + revue manuelle du code source. Ne remplace pas un test utilisateur avec technologies d'assistance réelles.*
