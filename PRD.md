# Planning Guide

Une landing page ultra-minimaliste pour BDC Web (La Réunion) - studio d'ingénierie logicielle positionné sur le code NAF 62.01Z (Programmation informatique), pas une agence marketing. L'interface respire la rigueur, le contrôle, la preuve mesurable et la procédure.

**Experience Qualities**: 
1. **Rigoureuse** - Chaque élément communique précision technique, métriques vérifiables et processus scientifique
2. **Premium Dark Fintech** - Esthétique sombre inspirée Apple/fintech avec typographie serrée et espacement généreux
3. **Preuve constante** - Aucune promesse sans qualification ("estimée", "potentielle", "selon éligibilité")

**Complexity Level**: Light Application (multiple features with basic state)
Single page avec ancres (#infrastructures, #zero-defaut, #kap-numerik, #eligibilite), navigation sticky smart, formulaire qualifié avec instrumentation.

## Essential Features

### Navigation Sticky Smart
- **Functionality**: Navbar transparente qui devient bg-black/80 + backdrop-blur après 12px de scroll
- **Purpose**: Maintenir accès au CTA "Vérifier mon éligibilité" tout en créant profondeur visuelle
- **Trigger**: Scroll > 12px
- **Progression**: Page charge (nav transparente) → Scroll → Nav devient opaque + flou → Reste sticky
- **Success criteria**: Transition smooth, logo "BDC." + carré blanc visible, liens ancres desktop uniquement, menu burger mobile

### Hero Section Engineering
- **Functionality**: H1 avec gradient sur "leaders réunionnais", sous-titre qualifié, 2 CTAs, microcopy
- **Purpose**: Impact immédiat, proposition technique claire, pas de marketing flou
- **Trigger**: Above the fold
- **Progression**: Visiteur arrive → Lit H1 → Comprend offre → Clique CTA primaire (audit) ou secondaire (architectures)
- **Success criteria**: Gradient subtil, CTAs distincts (blanc vs outline), microcopy rassurante sous CTAs

### Barre Métriques (Preuves)
- **Functionality**: 4 colonnes avec métriques + disclaimers micro
- **Purpose**: Preuve chiffrée, pas marketing - objectifs internes, périmètre, plafond
- **Trigger**: Visible immédiatement sous hero
- **Progression**: Visiteur scroll → Voit 98/100, 5 jours, 3 200 €, 100% → Lit disclaimers → Comprend réalisme
- **Success criteria**: Métriques grandes, labels uppercase xs, disclaimers en zinc-600 xs

### Section Infrastructures (Bento Grid)
- **Functionality**: 4 cartes avec icône, titre, phrase preuve, 3 bullets, badge "Standard BDC"
- **Purpose**: Démontrer expertise via caractéristiques techniques concrètes
- **Trigger**: Scroll ancre #infrastructures
- **Progression**: Visiteur scroll → Voit 4 cartes (Performance, Sécurité, Code propriétaire, Disponibilité) → Lit bullets techniques → Valide expertise
- **Success criteria**: Cards hover border-zinc-700, badge émeraude, icônes Zap/ShieldCheck/Code2/Server

### Section Kap Numérik (Offres)
- **Functionality**: 2 cartes pricing avec qualification légale stricte
- **Purpose**: Convertir leads qualifiés via offre FEDER + MCO récurrent
- **Trigger**: Scroll ancre #kap-numerik
- **Progression**: Visiteur scroll → Voit Pack Business Premium (4 000 € → 800 €) → Lit "estimation potentielle sous réserve" → Clique CTA → Form
- **Success criteria**: Prix barré + prix émeraude, disclaimer légal visible, badge "Pack optimisé plafond 3 200 €", carte phare avec ring-2 ring-white

### Section Méthode Zéro Défaut
- **Functionality**: Fond blanc (rupture visuelle), 3 blocs principe, mini-process 4 étapes
- **Purpose**: Différenciation méthodologique, rigueur scientifique "PASS ou FAIL"
- **Trigger**: Scroll ancre #zero-defaut
- **Progression**: Visiteur scroll → Rupture visuelle bg-white → Lit "Scientifique. Zéro défaut." → Comprend process → Voit 4 étapes (chips)
- **Success criteria**: bg-white text-black, 3 icônes (Zap, ShieldCheck, Server), 4 chips process avec ChevronRight

### Formulaire Éligibilité
- **Functionality**: Form complet avec honeypot, console.log instrumentation, toast success
- **Purpose**: Qualifier leads, instrumenter conversions, anti-spam
- **Trigger**: Scroll ancre #eligibilite ou clic CTA navbar
- **Progression**: Visiteur clique CTA → Scroll form → Remplit champs → Coche consentement → Submit → Toast "Demande envoyée" → console.log minimal
- **Success criteria**: Champs Nom, Société, Téléphone, Email, Taille (select), Budget (select), Message, checkbox consentement, honeypot invisible

## Edge Case Handling

- **Fast Scrolling**: Navbar transition via useState sans throttle (React gère)
- **Mobile Menu**: Burger icon, menu déroulant avec liens ancres + CTA
- **Form Spam**: Honeypot field invisible (position absolute -9999px), validation côté client
- **Form Submit Sans Backend**: console.log objet minimal (pas message complet), toast success, reset form
- **Liens Ancres**: scroll-behavior smooth via scrollIntoView({ behavior: 'smooth' })
- **Missing Form Values**: Select placeholder "Sélectionner", tous champs required sauf honeypot

## Design Direction

L'interface doit évoquer précision scientifique, contrôle financier et preuve mesurable. Esthétique dark fintech (Apple/Stripe) où chaque pixel sert un objectif. Communication "nous déployons l'infrastructure qui fait tourner les entreprises" pas "nous faisons de jolis sites".

## Color Selection

Palette dark ultra-contrastée avec accent émeraude stratégique pour preuves/validation.

- **Primary Color**: Noir absolu (oklch(0 0 0)) - Fond principal, autorité technique
- **Secondary Colors**: 
  - Zinc-950 (oklch(0.14 0 0)) - Cartes, sections alternées
  - Zinc-400 (oklch(0.62 0 0)) - Texte secondaire
  - Zinc-800 (oklch(0.28 0 0)) - Borders subtiles
- **Accent Color**: Emerald-400 (oklch(0.68 0.17 161)) - Métriques ROI, badges validation, prix subventionné
- **Foreground/Background Pairings**: 
  - Noir (oklch(0 0 0)): Zinc-50 (oklch(0.99 0 0)) - Ratio 21:1 ✓
  - Blanc section (oklch(1 0 0)): Noir (oklch(0 0 0)) - Ratio 21:1 ✓
  - Zinc-950 (oklch(0.14 0 0)): Zinc-50 (oklch(0.99 0 0)) - Ratio 16.5:1 ✓
  - Emerald-400 (oklch(0.68 0.17 161)): Blanc (oklch(1 0 0)) - Ratio 4.9:1 ✓

## Font Selection

Inter exclusivement. Typographie géométrique avec tracking très serré sur titres pour précision technique.

- **Typographic Hierarchy**: 
  - H1 (Hero): Inter Bold / 64px desktop, 36px mobile / tracking-tighter / leading-none
  - H2 (Sections): Inter Bold / 48px desktop, 28px mobile / tracking-tight
  - Sous-titres: Inter Regular / 20px / text-zinc-400 / leading-relaxed
  - Body: Inter Regular / 16px / leading-normal
  - Métriques: Inter Bold / 48px / tracking-tighter
  - Labels métriques: Inter Medium / 12px / uppercase / tracking-wide / text-zinc-400
  - Disclaimers: Inter Regular / 12px / text-zinc-600 (ou zinc-500)
  - Boutons: Inter Semibold / 16px / tracking-tight

## Animations

Micro-interactions sobres, jamais gadget. Hover/press/scroll uniquement.

Navbar: transition opacity + backdrop-blur 300ms. Buttons: hover scale-[1.02] (pas 1.05) + shadow subtile 300ms. Cards: hover border-zinc-700 300ms, pas de lift. Aucune animation scroll complexe (parallax). Form: focus-visible border-emerald-400. Toast sonner pour feedback submit. Tout doit respirer précision mécanique.

## Component Selection

- **Components**: 
  - Button (shadcn) - Blanc primaire, outline secondaire, hover scale-[1.02]
  - Card (shadcn) - bg-zinc-950 border-zinc-800 pour infrastructures et pricing
  - Badge (shadcn) - bg-emerald-500/10 text-emerald-400 border-emerald-400/30
  - Input, Textarea, Label (shadcn) - bg-zinc-950 border-zinc-800 focus-visible:border-emerald-400
  - Select (shadcn) - Taille entreprise et Budget estimé
  - Toast (sonner) - "Demande envoyée" success
  
- **Customizations**: 
  - Navbar avec useEffect scroll detection (isScrolled state)
  - Mobile menu burger (useState mobileMenuOpen)
  - Form honeypot (input invisible absolute -9999px)
  - scrollToSection function (scrollIntoView smooth)
  
- **States**: 
  - Button blanc: hover bg-zinc-100 + scale-[1.02]
  - Button outline: hover bg-zinc-900 border-zinc-700 + scale-[1.02]
  - Card: hover border-zinc-700 shadow-2xl
  - Input/Select: focus-visible border-emerald-400 ring-emerald-400/20
  
- **Icon Selection**: 
  - Lucide-react: ChevronRight, ShieldCheck, Zap, Code2, Server, CheckCircle, Menu, X
  
- **Spacing**: 
  - Sections: py-20 md:py-32 px-6 md:px-8
  - Container: max-w-7xl mx-auto
  - Cards: p-6 md:p-8
  - Form gaps: space-y-6, grid md:grid-cols-2 gap-6
  
- **Mobile**: 
  - Hero: stack buttons vertical, text 36px
  - Métriques: grid-cols-2 mobile, md:grid-cols-4 desktop
  - Infrastructures: 1 col mobile, md:grid-cols-2 desktop
  - Pricing: 1 col mobile, md:grid-cols-2 desktop
  - Zéro Défaut: 1 col mobile, md:grid-cols-3 desktop
  - Process chips: flex-wrap mobile
  - Navbar: burger menu mobile, liens inline desktop
