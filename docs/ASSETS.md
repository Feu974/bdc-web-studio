# BDC. Studio - Asset Plan (When Real Photos Are Ready)

Current UI uses generated placeholders (gradients + noise + glass). Replace with real photos in Phase 1.

## 1) File Location
Place files in:
- `public/assets/studio/`

## 2) Required Files
1. `hero-stage-editorial-3840x2560.jpg`
- Usage: Hero right visual stage
- Ratio: 3:2 (desktop crop-friendly)
- Minimum resolution: 3840 x 2560
- Style: premium studio lighting, soft highlights, neutral pearl/graphite palette
- Lighting: one key softbox + subtle rim light
- Notes: leave negative space for glass overlays (top-left and bottom area)

2. `proof-performance-security-2400x1800.jpg`
- Usage: Proof panel A (`#infrastructures`)
- Ratio: 4:3
- Minimum resolution: 2400 x 1800
- Style: workstation/server detail, clean reflections, no neon
- Lighting: controlled directional highlights, low noise

3. `proof-code-availability-2400x1800.jpg`
- Usage: Proof panel B (`#infrastructures`)
- Ratio: 4:3
- Minimum resolution: 2400 x 1800
- Style: editorial desk / terminal / infra context, minimal props
- Lighting: soft contrast with dark accents and bright focal zone

## 3) Color + Grading Constraints
- Keep whites warm-neutral (avoid blue cast).
- Avoid saturated colors and avoid purple bias.
- Prefer muted graphite, pearl, slate, and deep green accents.

## 4) Framing Guidelines
- Composition must preserve readable copy overlays.
- Keep one clean high-luminance area and one low-luminance area per image.
- Avoid busy backgrounds and hard texture clutter.

## 5) Export Rules
- Format: JPEG (`q=82-88`) or WebP (if generated from source)
- Color space: sRGB
- Sharpening: mild
- No watermark, no text in image

## 6) Naming Convention
- `hero-stage-editorial-WxH.ext`
- `proof-performance-security-WxH.ext`
- `proof-code-availability-WxH.ext`
