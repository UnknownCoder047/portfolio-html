---
name: image-to-html
description: "Transform UI mockups, screenshots, Figma exports, wireframes, and design images into clean, responsive, accessible, pixel-accurate HTML/CSS/Tailwind or component code. Use when converting designs, images, photos, or screenshots into web pages, recreating visual layouts, extracting color palettes/fonts from mockups, or building interfaces from visual references."
---

# Image to HTML & Modern UI Recreation Skill

This skill provides a systematic, battle-tested methodology for translating visual design images, screenshots, Figma mockups, and AI-generated concepts into production-quality, responsive, and pixel-accurate code (Semantic HTML5, Tailwind CSS, or React/Vue components).

---

## 1. When to Use This Skill

Activate this skill when:
- The user provides an image or references a mockup file (e.g. in `designs/` or an uploaded screenshot) and asks to build, translate, convert, or recreate it in code.
- Building a landing page, portfolio, dashboard, or UI component inspired by a visual reference.
- Extracting design tokens (colors, gradients, typography, shadow elevations, glassmorphism) from an image.
- Refining an existing HTML page to match a reference image with pixel precision.

---

## 2. Step-by-Step Conversion Workflow

### Phase 1: Visual Decomposition & Token Extraction
Before writing any code, examine the reference image and extract the visual blueprint:

1. **Section Hierarchy**:
   - Header / Navigation (Logo, links, status pills, CTA buttons, mobile drawer trigger)
   - Hero Section (Badge/announcement tag, H1 headline, subheadline, CTA cluster, social proof / avatars)
   - Feature Highlights / Bento Grid (Multi-span grid cards, spotlight cards, metric counters)
   - Content Sections (Showcases, interactive demos, testimonials, pricing tiers, FAQs)
   - Footer (Branding, navigation columns, newsletter input, copyright & social links)

2. **Color Palette & Atmosphere**:
   - **Background**: Is it pure black (`#000000`), zinc (`#09090b`), slate (`#0f172a`), or off-white? Are there ambient background glows (e.g., radial gradients, blurred colored orbs)?
   - **Text Tiers**:
     - Primary: High contrast (`text-white` or `text-zinc-900`)
     - Secondary: Medium contrast (`text-zinc-400` or `text-zinc-600`)
     - Muted / Meta: Low contrast (`text-zinc-500`)
   - **Accent Colors**: Primary brand gradient/color (e.g., violet `#8b5cf6`, cyan `#06b6d4`, emerald `#10b981`).

3. **Surface Materials & Elevation**:
   - **Glassmorphism**: `backdrop-blur-md` or `backdrop-blur-xl` combined with semi-transparent fills (`bg-zinc-900/60` or `bg-white/[0.04]`).
   - **Borders & Highlights**: Subtle translucent borders (`border border-white/10` or `border border-zinc-800`), inner top highlights (`inset 0 1px 0 0 rgba(255, 255, 255, 0.1)`).
   - **Shadows & Glows**: Ambient drop shadows (`shadow-2xl`), colored glow drops (`shadow-[0_0_50px_-12px_rgba(124,58,237,0.25)]`).

4. **Typography & Spacing**:
   - Font family pairing (e.g., geometric sans like Inter, Plus Jakarta Sans, Outfit, Geist).
   - Heading treatment: tight letter-spacing (`tracking-tight`), bold/extrabold weights (`font-bold` to `font-black`), line height (`leading-tight`).
   - Corner Radii: Identify the rounding curve (`rounded-xl` = 12px, `rounded-2xl` = 16px, `rounded-3xl` = 24px, `rounded-full` for badges/pills).

---

### Phase 2: Technical Architecture & Layout Planning

1. **Layout Strategy**:
   - Use CSS Grid for complex 2D layouts (Bento grids, multi-column dashboards, card matrices).
   - Use Flexbox for 1D distributions (navbars, button groups, icon + text pairings, vertically centered hero content).
   - Always constrain width with a standard container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.

2. **Mobile-First Responsive Breakdown**:
   - Mobile (`< 640px`): Single column stack, hidden desktop menus with toggleable drawer, adjusted hero font sizes (`text-3xl sm:text-5xl lg:text-7xl`).
   - Tablet (`640px - 1024px`): 2-column grids, collapsed navigation if dense.
   - Desktop (`> 1024px`): Full multi-column bento grids, sticky navbars, horizontal feature splits.

3. **Icon & Graphic Assets**:
   - **Never** use broken `<img>` tags or low-res raster placeholders for icons.
   - Use clean, accessible inline SVGs (with `aria-hidden="true"` and matching `w-5 h-5`) or standard Lucide / Heroicons icons.
   - For user avatars, use high-quality Unsplash portrait URLs or crisp SVG avatar placeholders.
   - Recreate abstract decorative graphics (gradients, dots grids, mesh waves) with CSS rather than images.

---

### Phase 3: Implementation Rules & Code Standards

1. **Semantic HTML Elements**:
   - `<header>` for navigation and top announcement banners.
   - `<main>` for primary page content.
   - `<section aria-labelledby="...">` for distinct thematic sections.
   - `<nav aria-label="...">` for navigational link clusters.
   - `<button>` for clickable triggers, `<a>` for page navigations.
   - `<footer>` for page conclusions.

2. **Tailwind Best Practices for Visual Accuracy**:
   - Background Glows:
     ```html
     <div class="absolute -top-40 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[600px] bg-gradient-to-tr from-violet-600/30 to-fuchsia-600/20 blur-[128px] rounded-full pointer-events-none"></div>
     ```
   - Bento Grid Cards with Inner Glow:
     ```html
     <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-zinc-900/80 group">
       <div class="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none"></div>
       <!-- Card Content -->
     </div>
     ```
   - Gradient Text Headlines:
     ```html
     <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
       Crafting Digital Experiences
     </h1>
     ```
   - Interactive Buttons with Micro-hover:
     ```html
     <button class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">
       <span>Explore Projects</span>
       <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" ...></svg>
     </button>
     ```

---

### Phase 4: Visual Verification & Polish Checklist

After building the HTML/CSS, conduct a rigorous visual comparison against the original image:

- [ ] **Contrast & Readability**: Does all text meet WCAG AA (minimum 4.5:1 for normal text, 3:1 for large text)?
- [ ] **Spacing Proportions**: Are paddings (`py-16 sm:py-24`) and gaps (`gap-6`, `gap-8`) proportional to the design?
- [ ] **Border Radius Consistency**: Are card corners, buttons, and badges using a cohesive radius scale?
- [ ] **Glassmorphism Transparency**: Is the backdrop blur visible without washing out text?
- [ ] **Responsive Resiliency**: Does the layout gracefully scale from 375px mobile to 1920px widescreen without overflow or clipping?
- [ ] **Micro-Interactions**: Do interactive elements have hover, focus-visible, and active states?
