# BDC. Studio - Style Guide (Phase 0)

## 1) Design Tokens (Single Source)
Tokens are defined in `src/styles/theme.css` under `:root` with the `--bdc-*` prefix.

### Color
- `--bdc-color-bg`: Pearl background
- `--bdc-color-surface`: Main light surface
- `--bdc-color-surface-soft`: Soft footer / secondary surface
- `--bdc-color-ink`: Primary text
- `--bdc-color-muted`: Secondary text
- `--bdc-color-muted-strong`: Strong secondary text
- `--bdc-color-accent`: Accent green used for validation/check cues
- `--bdc-hairline`: Light border
- `--bdc-hairline-strong`: Strong border

### Motion
- `--bdc-motion-fast`: 160ms
- `--bdc-motion-base`: 200ms
- `--bdc-motion-slow`: 220ms
- `--bdc-ease-out`: `cubic-bezier(0.22, 0.61, 0.36, 1)`

### Typography
- `--bdc-font-sans`: Manrope stack
- `--bdc-font-serif`: Newsreader stack

### Texture / Depth
- `--bdc-shadow-soft`
- `--bdc-noise-texture`

## 2) Typography Scale
Implemented in `src/index.css`.

- H1 (`.type-h1`)
  - Mobile: `40px`
  - Desktop: `64px`
  - Line-height: `0.92`
  - Tracking: `-0.045em`
- H2 (`.type-h2`)
  - Desktop target: `36px`
  - Mobile fallback: `30px`
- Body (`.type-body`)
  - Mobile: `16px`
  - Desktop: `18px`
  - Line-height: `1.65`

## 3) Motion Rules
Implemented globally in `src/index.css`.

- Reveal on scroll (`.reveal`):
  - Initial: opacity `0`, translateY `10px`
  - Enter: opacity `1`, translateY `0`
  - Duration: `200ms`
- Hover lift (buttons): `translateY(-2px)`
- Press state (buttons): `scale(0.98)`
- Transitions constrained to `160–220ms`

## 4) Layout Rules
- Base theme is light editorial (pearl/off-white).
- Only two dark sections:
  - Metrics
  - Offers (`#kap-numerik`)
- Hero is split layout:
  - Text left
  - Generated stage visual right
- Anchors maintained:
  - `#infrastructures`
  - `#zero-defaut`
  - `#kap-numerik`
  - `#eligibilite`

## 5) Components
- `Navbar`: glass on scroll + active section indicator + mobile minimal sheet
- `HeroSplit`: split composition + stage placeholder
- `ProofGallery`: two 4:3 framed proof placeholders
- `Metrics`: dark authority section
- `Offers`: dark premium offer section with Kap wording compliance
- `Method`: editorial process section
- `Form`: eligibility form section
- `Footer`: FEDER + NAF compliance mention
