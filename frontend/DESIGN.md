---
name: Luminous NGO Analytics
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#464555'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#95002b'
  on-tertiary: '#ffffff'
  tertiary-container: '#bf0f3c'
  on-tertiary-container: '#ffd0d2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b7'
  on-tertiary-fixed: '#40000d'
  on-tertiary-fixed-variant: '#92002a'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: jetbrainsMono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: jetbrainsMono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding-desktop: 40px
  container-padding-mobile: 20px
  gutter: 24px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system embodies a "Futuristic Altruism" aesthetic—fusing high-end data precision with the warmth of social impact. It draws inspiration from the refined utility of Linear and the polished depth of Stripe. 

The style is **Premium Minimalism** with a **Glassmorphic** layer. It prioritizes clarity and focus, using translucent surfaces to suggest a multi-dimensional data environment. The emotional response should be one of "Informed Optimism": the user feels in control of complex predictive data (AI-driven) while remaining connected to the human element of donor relations. 

Key attributes include:
- **Luminous Depth:** Surfaces appear to float over a soft, infinite canvas.
- **Precision:** Mathematical alignments and monospaced accents for technical trust.
- **Etherial Guidance:** Use of soft glows and subtle gradients to draw attention to churn risks without causing alarm.

## Colors
The palette is rooted in a pristine white environment to maximize legibility and "airiness." 

- **Primary (Deep Indigo):** Used for primary actions, navigation states, and core branding. It represents institutional strength and intelligence.
- **Secondary (Vibrant Teal):** Reserved for growth metrics, "saved" donors, and positive retention trends.
- **Tertiary (Soft Rose):** A sophisticated warning color used for churn risk indicators and declining engagement. It is soft enough to avoid "error" fatigue but distinct enough to signal urgency.
- **Neutrals:** A range of Cool Grays (Slate) provides the structural scaffolding, maintaining a clean, high-tech finish.
- **Glass Effects:** Surfaces utilize a white semi-transparent fill (`rgba(255, 255, 255, 0.7)`) with a high-saturation backdrop blur.

## Typography
This design system utilizes **Geist** for its systematic, developer-centric precision which translates beautifully to high-density analytics dashboards. Its geometric construction ensures clarity at all sizes.

To reinforce the "Data/AI" aspect of the platform, **JetBrains Mono** is introduced for labels, metadata, and numerical values. This monospaced touch provides a technical "readout" feel that distinguishes predicted data points from editorial content.

- **Headlines:** Tight tracking and medium-to-bold weights create a strong visual anchor.
- **Body:** Generous line heights are maintained to prevent information density from feeling overwhelming.
- **Labels:** Used for chart axes, status badges, and table headers to provide a clear technical hierarchy.

## Layout & Spacing
The layout follows a **12-column fluid grid** for the main dashboard content, allowing widgets to span varying widths (typically 3, 4, 6, or 12 columns). 

- **Philosophy:** Content is grouped into "Data Modules" (Glass cards). 
- **Whitespace:** Emphasize extreme padding within cards (minimum 32px) to give the metrics "room to breathe."
- **Sidebars:** A fixed left navigation (width: 280px) uses a more compact vertical rhythm.
- **Breakpoints:** 
  - Desktop: 1440px+ (12 columns)
  - Tablet: 1024px (8 columns, stacked sidebar)
  - Mobile: 375px (4 columns, vertical flow)

## Elevation & Depth
Depth is the cornerstone of this system, achieved through **Stacking and Blur** rather than heavy shadows.

- **Level 0 (Canvas):** Pure white or a very subtle gradient (#F8FAFC to #FFFFFF).
- **Level 1 (Main Cards):** White background at 70% opacity with a `backdrop-filter: blur(12px)`. A 1.5px border in `rgba(255, 255, 255, 0.8)` creates a "glowing edge" effect.
- **Level 2 (Popovers/Tooltips):** 85% opacity with a soft, diffused ambient shadow (`0 12px 40px rgba(0,0,0,0.04)`).
- **Interaction:** On hover, cards should subtly "lift" by increasing the shadow spread and reducing border transparency.

## Shapes
The shape language is sophisticated and friendly. 
- **Base Components:** 0.5rem (8px) for buttons and inputs.
- **Large Components (Cards):** Use `rounded-2xl` (1.5rem / 24px) to create the soft, modern "Vercel-like" container aesthetic.
- **Interactive Elements:** Checkboxes and radio buttons use a softer `rounded-md` (6px) to feel tactile but precise.

## Components

### Buttons
- **Primary:** Solid Deep Indigo with white text. High-gloss finish on hover.
- **Ghost/Glass:** Transparent background with the Indigo border. Subtle backdrop blur.
- **Shape:** 8px corner radius, generous horizontal padding.

### Cards (The "Insight" Module)
- The primary container for analytics.
- **Glassmorphism:** 12px backdrop blur, white semi-transparent fill.
- **Border:** 1px white border with a subtle inner glow.
- **Padding:** 32px standard internal padding.

### Input Fields
- Understated style. Light gray background (`#F1F5F9`) that turns white on focus with a primary indigo border glow.
- Labels are always `label-sm` (Monospace) positioned above the field.

### Chips & Status Badges
- **Churn Risk (Rose):** Soft rose background (10% opacity) with rose text.
- **Retention (Teal):** Soft teal background (10% opacity) with teal text.
- All chips are pill-shaped (`rounded-full`).

### Data Visualization
- **Charts:** Use thin 2px lines for line charts with soft area-fills (10% opacity gradients).
- **Markers:** Use small, high-contrast dots for data points.
- **Grid Lines:** Extremely faint (`#E2E8F0` at 50% opacity).

### Predictive Indicators
- Use a subtle pulsing "glow" effect (Indigo) for AI-generated insights to signify the dynamic nature of the data.