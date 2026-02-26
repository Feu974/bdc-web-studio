# Planning Guide

A premium dark-mode landing page for BDC Web - a B2B web engineering studio that positions itself as high-level developers providing infrastructure and software solutions with an emphasis on technical authority and financial legitimacy.

**Experience Qualities**: 
1. **Authoritative** - Establishes immediate technical credibility through precision, metrics, and no-nonsense language that speaks to decision-makers
2. **Luxurious** - Apple/Fintech-inspired dark aesthetic with generous whitespace, sharp typography, and subtle sophistication
3. **Performance-focused** - Every element reinforces the message of engineering excellence, from load times to operational metrics

**Complexity Level**: Content Showcase (information-focused)
This is a marketing landing page designed to establish authority and drive qualified leads through strategic CTAs, featuring static content with dynamic scroll behaviors.

## Essential Features

### Smart Sticky Navigation
- **Functionality**: Navigation bar that transitions from transparent to frosted glass background on scroll
- **Purpose**: Maintains access to CTA while creating visual depth and polish
- **Trigger**: Page scroll beyond hero section
- **Progression**: Page loads with transparent nav → User scrolls → Nav background fades in with backdrop blur → Remains sticky throughout scroll
- **Success criteria**: Smooth visual transition, always readable logo and CTA button, no layout shift

### Hero Section with Dual CTAs
- **Functionality**: Large-format headline with subheading and two distinct call-to-action buttons
- **Purpose**: Immediately communicate value proposition and guide visitors to primary conversion paths
- **Trigger**: Page load (above the fold)
- **Progression**: Visitor lands → Reads headline → Processes metrics bar below → Clicks primary or secondary CTA
- **Success criteria**: Clear hierarchy between primary/secondary CTAs, compelling copy visible without scroll

### Performance Metrics Bar
- **Functionality**: Four-column data display showing quantitative proof points
- **Purpose**: Build credibility through concrete performance indicators
- **Trigger**: Visible immediately below hero
- **Progression**: Visitor scrolls past headline → Sees metrics → Builds trust through data
- **Success criteria**: Metrics are scannable, clearly labeled, and visually separated

### Infrastructure Showcase (Bento Grid)
- **Functionality**: Grid layout displaying real deployed project examples with technical specifications
- **Purpose**: Demonstrate practical expertise through case studies
- **Trigger**: Mid-page scroll
- **Progression**: Visitor scrolls → Sees project cards → Reads technical details (hosting, performance, security) → Validates expertise
- **Success criteria**: Cards display project type, technical stack, performance metrics, and validation badge

### Engineering Method Section
- **Functionality**: Light-themed section with three principle blocks
- **Purpose**: Break visual rhythm and articulate methodology
- **Trigger**: Scroll after infrastructure section
- **Progression**: Visitor scrolls → Visual contrast draws attention → Reads three core principles → Understands differentiation
- **Success criteria**: Clear visual break from dark theme, icons reinforce each principle, scannable layout

### Final CTA & Footer
- **Functionality**: Bottom conversion section with large CTA and legal footer
- **Purpose**: Final conversion opportunity and compliance/legitimacy signaling
- **Trigger**: Bottom of page
- **Progression**: Visitor finishes content → Sees final CTA prompt → Takes action or notes legal compliance
- **Success criteria**: CTA is distinct from previous sections, footer includes NAF code for French B2B credibility

## Edge Case Handling

- **Fast Scrolling**: Nav transition uses debounced scroll listener to avoid jank
- **Mobile Navigation**: CTA button remains accessible with appropriate sizing for touch targets
- **Long Project Descriptions**: Cards use consistent heights with text truncation if needed
- **Missing Images**: Placeholder gradients maintain layout integrity
- **Narrow Viewports**: Metrics stack vertically, grid becomes single column below breakpoints

## Design Direction

The design should evoke precision engineering, financial sophistication, and uncompromising quality. Think dark Apple product pages crossed with fintech dashboards - where every pixel serves a purpose and nothing feels arbitrary. The aesthetic should communicate "we build the infrastructure that runs businesses" rather than "we make pretty websites."

## Color Selection

Dark, high-contrast palette emphasizing depth and luxury through layered blacks and strategic use of emerald for validation.

- **Primary Color**: Pure Black (oklch(0 0 0)) - Creates depth, seriousness, and technical authority. Used for main backgrounds and primary buttons.
- **Secondary Colors**: 
  - Zinc-950 (oklch(0.14 0 0)) - Subtle layering for cards and sections
  - Zinc-400 (oklch(0.62 0 0)) - Secondary text, de-emphasized content
- **Accent Color**: Emerald-500 (oklch(0.68 0.17 161)) - Success validation badges, communicates "production ready" status
- **Foreground/Background Pairings**: 
  - Black background (oklch(0 0 0)): Zinc-50 text (oklch(0.99 0 0)) - Ratio 21:1 ✓
  - White section (oklch(1 0 0)): Black text (oklch(0 0 0)) - Ratio 21:1 ✓
  - Zinc-950 cards (oklch(0.14 0 0)): Zinc-50 text (oklch(0.99 0 0)) - Ratio 16.5:1 ✓
  - Emerald-500 badge (oklch(0.68 0.17 161)): White text (oklch(1 0 0)) - Ratio 4.9:1 ✓

## Font Selection

Geometric sans-serif with tight tracking for headlines to create technical precision and modern authority, paired with readable body text.

- **Typographic Hierarchy**: 
  - H1 (Hero Headline): Inter Bold / 56px desktop, 36px mobile / tracking-tighter (-0.05em) / leading-none
  - H2 (Section Titles): Inter Bold / 40px desktop, 28px mobile / tracking-tight (-0.025em)
  - Subtitle/Lead: Inter Regular / 20px / text-zinc-400 / leading-relaxed
  - Body Text: Inter Regular / 16px / leading-normal
  - Metric Numbers: Inter Bold / 48px / tracking-tighter
  - Metric Labels: Inter Medium / 12px / uppercase / tracking-wide / text-zinc-400
  - Button Text: Inter Semibold / 16px / tracking-tight

## Animations

Animations should feel engineered and purposeful - smooth but fast, never gratuitous. Emphasis on scroll-triggered opacity fades and precise transitions.

Scroll-driven navbar transition (opacity + backdrop blur) creates depth without distraction. Button hovers use subtle scale (1.02) and shadow expansion for tactile feedback. Card hovers lift slightly with shadow increase for dimensionality. All transitions use 300ms duration with ease curves. Section fade-ins on scroll entry add polish without slowing reading flow. No playful bounces or spins - everything should feel like precision machinery.

## Component Selection

- **Components**: 
  - Button (shadcn) - Primary white button and secondary dark button with custom styling for luxury feel
  - Card (shadcn) - Infrastructure project cards with dark zinc-950 background and border-zinc-800
  - Badge (shadcn) - "Production Validée" status with emerald-500 background
  - No dialog/modal components needed - single-page scroll experience
  
- **Customizations**: 
  - Custom navbar component with scroll detection logic (useEffect + useState)
  - Custom metrics display component with vertical dividers
  - Custom bento grid layout for infrastructure projects (CSS Grid with gap-4)
  - Custom light-themed section wrapper for methodology break
  
- **States**: 
  - Buttons: Default (bg-white text-black), Hover (scale-102 shadow-xl), Active (scale-98)
  - Cards: Default (bg-zinc-950 border-zinc-800), Hover (border-zinc-700 shadow-2xl translate-y-[-2px])
  - Nav: Transparent state (bg-transparent), Scrolled state (bg-black/80 backdrop-blur-md)
  
- **Icon Selection**: 
  - Lucide-React exclusively per requirements: Code2 (native code), ShieldCheck (security), Zap (performance)
  - Additional: ChevronRight for button emphasis, CheckCircle2 for validation
  
- **Spacing**: 
  - Section padding: py-20 md:py-32 (80px/128px vertical)
  - Container: max-w-7xl mx-auto px-6 md:px-8
  - Component gaps: gap-4 for tight groupings, gap-8 for section spacing
  - Card padding: p-6 md:p-8
  
- **Mobile**: 
  - Hero stacks vertically with buttons going full-width on mobile
  - Metrics bar shifts from 4 columns to 2x2 grid at md breakpoint, to vertical stack at sm
  - Infrastructure grid goes from 2 columns to 1 column below md breakpoint
  - Methodology blocks stack vertically on mobile with full width
  - Navigation CTA remains visible but with adjusted padding on mobile
  - Typography scales down: 56px → 36px for H1, 40px → 28px for H2
