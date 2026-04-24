---
name: ExpeditionLocal
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#9d4300'
  on-secondary: '#ffffff'
  secondary-container: '#fd761a'
  on-secondary-container: '#5c2400'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#00201c'
  on-tertiary-container: '#009485'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#71f8e4'
  tertiary-fixed-dim: '#4fdbc8'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#005048'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system centers on the intersection of professional reliability and the raw excitement of local discovery. The brand personality is that of an "Expert Guide": knowledgeable, secure, and inspiring. To achieve this, the system adopts a **Modern / Premium** style that prioritizes high-fidelity photography and generous whitespace to create an editorial feel. 

The visual language balances the "Trust" of a financial institution with the "Vibrancy" of a travel magazine. Every element is designed to feel intentional and polished, removing friction from the booking process while amplifying the emotional pull of the destination.

## Colors

The palette is engineered to guide the user's journey from security to action:
- **Deep Navy (Primary):** Used for navigation, headings, and core structural elements to establish immediate authority and trust.
- **Energetic Orange (Secondary):** Reserved exclusively for high-priority calls to action (CTAs), booking buttons, and price highlights to drive conversions.
- **Soft Teal (Tertiary):** Applied to badges, success states, and decorative accents to evoke nature, water, and the outdoors.
- **Surface Neutrals:** A range of cool grays provides a sophisticated backdrop that allows vibrant tour imagery to remain the focal point.

## Typography

**Plus Jakarta Sans** is the sole typeface for this design system, chosen for its modern geometric clarity and friendly, open counters. 
- **Headlines:** Use Bold and ExtraBold weights with slight negative letter-spacing to create a high-impact, premium feel.
- **Body Text:** Maintained at a generous 16px-18px size with a 1.6 line-height to ensure maximum readability during long-form tour descriptions.
- **Case Usage:** Use Sentence case for all headings. All-caps is reserved strictly for small labels or overlines to maintain a professional, non-aggressive tone.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model for desktop (12 columns) and a **Fluid Grid** for mobile. The rhythm is governed by an 8px base unit. 
- **Content Density:** High whitespace is prioritized to prevent the marketplace from feeling cluttered. 
- **Vertical Rhythm:** Elements within a card use `stack-sm`, while sections on a landing page are separated by `stack-lg`. 
- **Alignment:** Content should generally be center-aligned in containers to maintain a balanced, premium aesthetic.

## Elevation & Depth

Visual hierarchy is achieved through a combination of **Tonal Layering** and **Ambient Shadows**:
- **Tonal Layers:** Subtle light-gray backgrounds (`#F8FAFC`) are used to distinguish section blocks from the main white background.
- **Shadows:** Use extremely soft, diffused shadows (Blur: 20px-40px, Opacity: 4-8%) with a slight Navy tint to lift "Product Cards" and "Search Bars" off the page. This creates a sense of tangibility without the harshness of traditional dropshadows.
- **Interaction:** Upon hover, elevation should increase slightly via a more pronounced shadow to indicate interactivity.

## Shapes

The shape language is defined by a consistent 8px to 12px radius. This "Rounded" approach softens the authoritative Navy palette, making the platform feel approachable and modern.
- **Standard Radius:** 8px for buttons and input fields.
- **Large Radius (16px):** Used for Tour Cards and Image Containers to create a "containerized" and organized look.
- **Full Radius:** Reserved for category chips and "Save/Wishlist" buttons to provide a distinct functional contrast.

## Components

### Buttons
- **Primary:** Energetic Orange background, white text. Bold weight. 8px radius.
- **Secondary:** Deep Navy border (2px), Navy text, transparent background. 
- **Ghost:** No border, Navy or Neutral text, used for secondary actions like "Cancel."

### Cards
- **Tour Cards:** Must feature a 16:9 aspect ratio image at the top with a 16px top-corner radius. Content padding should be a minimum of 20px. 
- **Pricing:** Should be positioned at the bottom-right of the card in Bold Navy text.

### Inputs & Search
- **Search Bar:** A prominent, high-elevation component with a persistent "Search" icon and a large Primary Button.
- **Form Fields:** Use a 1px soft-gray border that shifts to Teal on focus.

### Additional Elements
- **Badges:** Small, rounded-full pills in Soft Teal with Navy text for "Eco-Friendly" or "Top Rated" tags.
- **Imagery:** All photos should use high-saturation, natural lighting to maintain the "Vibrant" brand promise. Avoid stock photography that feels overly staged.