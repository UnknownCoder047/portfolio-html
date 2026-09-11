# Changelog

All notable changes, architectural implementations, and visual design alignments for the Ankit Kumar Portfolio project are documented in this file.

---

## [Unreleased] - 2026-09-06

### 🌐 Global Architectural & Style Unifications

- **Unified Universal Page Background (`body::before`)**:
  - Centralized the complete, persistent page background in [`scss/base/_reset.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/base/_reset.scss) on `body::before` (`position: fixed; inset: 0; pointer-events: none; z-index: 0;`).
  - Unified both ambient radial glows (`radial-gradient(circle at 80% 20%, ...)`, `radial-gradient(circle at 10% 80%, ...)`) AND the subtle 24px technical dot grid (`radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)` with `background-size: 24px 24px`) into `body::before`.
  - Removed all page-level `display: none` overrides from [`scss/sections/_services_page.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_services_page.scss), [`scss/sections/_contact_page.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_contact_page.scss), and [`scss/sections/_service_detail.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_service_detail.scss).
  - Removed duplicate `section::before` dot pattern from [`scss/layout/_grid.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/layout/_grid.scss) so the background is identical and uniform across the Home page and all subpages without double-rendering or moiré artifacts.
### ⚡ Motion & Architectural Interaction System (Pattern 3 & Pattern 4)

- **Pattern 3: The "Technical Line Draw" (Horizontal Line Expansion)**:
  - **Styles & Keyframes** ([`scss/components/_animations.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/components/_animations.scss)):
    - Added `.line-draw`, `.tech-line-draw`, `[data-line-draw]`, and `.section-divider` utility rules animating `scaleX(0) → scaleX(1)` from `transform-origin: left center` with swift architectural easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
    - Top card rule lines: Implemented crisp 1.5px gradient top borders (`rgba(163, 230, 53, 0.75)` to `rgba(255, 255, 255, 0.18)`) expanding on `.card`, `.work-card`, `.service-card`, `.service-item-card`, `.project-item-card`, `.process-card`, `.approach-card`, `.exp-card`, and `.exploring-card` with desktop row-aware cascade delays.
    - Section Dividers: Applied animated pseudo-element dividers across `.hero__footer`, `.approach__bottom`, `.cta__bottom-bar`, `.footer`, `.footer__bottom`, `.about-stats`, and `.service-detail__highlights`.
    - Cycle & Meta Dividers: Added expanding underlines and divider tracks for `.exploring__cycle-line`, `.experience__cycle-line`, `.projects-hero__cycle-line`, `.experience__meta-line`, `.approach__philosophy-line`, `.mindset__meta-underline`, and `.process__track-line`.
    - SVG Trajectory Splines: Dynamic curve length calculation via `getTotalLength()` in [`js/main.js`](file:///Users/ankitkumar/Projects/www/portfolio/js/main.js) for `.process__spline-draw` and `.approach__spline-draw`, transitioning stroke-dashoffset to 0 as cards scroll into viewport with sequential node light-up animations.
  - **Observer Controller** ([`js/main.js`](file:///Users/ankitkumar/Projects/www/portfolio/js/main.js)): Integrated into `initScrollReveal()` and `initTrajectoryLines()` using Vanilla `IntersectionObserver` (0 KB external dependency, zero CLS).

- **Pattern 4: Ambient 3D Graphic Parallax Drift (Subtle Floating)**:
  - **Styles & Keyframes** ([`scss/components/_animations.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/components/_animations.scss)):
    - Added GPU-accelerated `.parallax-drift` utilizing `transform: translate3d(0, var(--parallax-y, 0px), 0)`.
    - Added `.ambient-float` (6.5s cycle, 8px subtle levitation) and `.ambient-float-alt` (7.2s cycle, 6px subtle levitation) with sub-degree rotational drift.
    - Decoupled motion hierarchy (scroll reveal container → parallax drift wrapper → ambient float wrapper → hover scale graphic) to prevent transform clipping or layout shifts.
  - **Scroll Controller** ([`js/main.js`](file:///Users/ankitkumar/Projects/www/portfolio/js/main.js)):
    - High-performance non-blocking `requestAnimationFrame` controller with bidirectional interoperability for both Lenis smooth scroll and native window scroll.
    - Bounded drift range (-28px to +28px) with configurable per-element `data-drift-factor` (default `0.08`).
    - Full `@media (prefers-reduced-motion: reduce)` accessibility overrides.
  - **Pages Integrated**:
    - **Home**: Hero 3D blueprint graphic, Exploring planetary orbit graphic, CTA left & right concept diagrams.
    - **Services** ([`pages/services.html`](file:///Users/ankitkumar/Projects/www/portfolio/pages/services.html)): Hero 3D isometric green cubes & bottom CTA glowing chat bubbles graphic.
    - **Service Detail** ([`pages/service-detail.html`](file:///Users/ankitkumar/Projects/www/portfolio/pages/service-detail.html)): Right-column tilted smartphone graphic.
    - **About** ([`pages/about.html`](file:///Users/ankitkumar/Projects/www/portfolio/pages/about.html)): Hero tilted portrait frame graphic.

- **Pattern 5: Back & Forth Arrow Motion System (Horizontal & Vertical Oscillation)**:
  - **Styles & Keyframes** ([`scss/components/_animations.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/components/_animations.scss)):
    - **Horizontal Oscillation (`arrowOscillateX` & `arrowOscillateXLeft`)**: Continuous, architectural back-and-forth motion (`translateX(0) <-> translateX(4px)` for right arrows `→`, and `translateX(0) <-> translateX(-4px)` for left arrows `←`) over a smooth `1.8s ease-in-out` infinite loop.
    - **Vertical Oscillation (`arrowOscillateY` & `arrowOscillateYUp`)**: Continuous back-and-forth vertical motion (`translateY(0) <-> translateY(5px)` for down arrows `↓`, and `translateY(0) <-> translateY(-4px)` for up arrows `↑`).
    - **Interactive Hover Amplification & Acceleration**: Hovering any button, card, link, or CTA automatically accelerates the oscillation frequency to `0.8s` with increased amplitude (`translateX(2px) <-> translateX(7px)` or `translateY(2px) <-> translateY(8px)`), providing responsive tactile feedback.
    - **Zero-Transform Conflict Refactoring**: Removed legacy static `transform: translateX(...)` hover rules across all section stylesheets ([`_hero.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_hero.scss), [`_services.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_services.scss), [`_exploring.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_exploring.scss), [`_cta.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_cta.scss), [`_selected_work.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_selected_work.scss), [`_experience.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_experience.scss), [`_header.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/layout/_header.scss), [`_footer.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/layout/_footer.scss), [`_buttons.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/components/_buttons.scss), [`_services_page.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_services_page.scss), [`_service_detail.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_service_detail.scss), [`_contact_page.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_contact_page.scss)), allowing the active keyframe animation to render seamlessly.
    - **Universal Coverage**: Applied to `.btn-arrow`, `.btn-talk__arrow`, `.cta-arrow`, `.banner-arrow`, `.service-card__arrow`, `.service-item-card__arrow`, `.exploring-card__arrow`, `.process__track-arrow`, `.scroll-arrow`, `.scroll-top-btn__icon`, `.arrow-icon`, and universal `.arrow` spans across all pages.
    - **Automated JS Controller** ([`js/main.js`](file:///Users/ankitkumar/Projects/www/portfolio/js/main.js)): `initArrowAnimations()` automatically tags directional metadata (`arrow--left`, `arrow--down`, `arrow--up`, `arrow--right`) and progressively wraps raw text arrow glyphs inside interactive elements.
- **Pattern 6: The Process Sequential Progression Pipeline (Glowing Milestone Track Animation)**:
  - **Concept & Mechanics**:
    - Recreated the bottom milestone trajectory track (`• [ PROBLEM ] ── [ SOLUTION ] ── [ SYSTEM ] ── [ PRODUCT ] →`) into an 8.0s infinite sequential progression loop.
    - **Step 1 (`[ PROBLEM ]`)**: Dot 1 pulses from subtle to intense neon green bloom (`#a3e635`, `scale(1.35)`) and `[ PROBLEM ]` text glows bright green (`color: #a3e635`, dual neon `text-shadow`).
    - **Line 1 Advance**: Progress bar (`.process__track-bar`) scales across from left to right (`scaleX(0) → scaleX(1)`) with a vibrant lime gradient while a bright white glowing tracer particle (`.process__track-particle`) travels along the leading edge.
    - **Step 2 (`[ SOLUTION ]`)**: Particle arrives at dot 2, blooming into bright green light while `[ SOLUTION ]` text illuminates.
    - **Line 2 Advance**: Progress bar fills across line 2 from left to right with travelling particle head.
    - **Step 3 (`[ SYSTEM ]`)**: Particle arrives at dot 3, blooming into bright green glow and `[ SYSTEM ]` text illuminates.
    - **Line 3 Advance**: Progress bar fills across line 3 from left to right with travelling particle head.
    - **Step 4 (`[ PRODUCT ] →`)**: Dot 4 blooms into high-intensity glow, `[ PRODUCT ]` text glows bright lime (`#bef264`), the track container border activates an ambient green aura, and the arrow `→` pulses and oscillates horizontally.
    - **Triumphant Completion & Loop Reset**: All 4 milestones and connecting bars remain fully illuminated for a celebratory pause before a smooth 0.3s fade reset and seamless repetition.
  - **Modular Architecture & Synchronization**:
    - Updated [`sections/process.html`](file:///Users/ankitkumar/Projects/www/portfolio/sections/process.html) and [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html) with `.process__track-item--1` through `--4`, `<span class="process__track-dot">`, `<span class="process__track-label">`, `<span class="process__track-bar">`, and `<span class="process__track-particle">`.
    - Keyframe sequencers implemented in [`scss/sections/_process.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_process.scss) (`trackDot1-4`, `trackLabel1-4`, `trackLine1-3Bar`, `trackLine1-3Particle`, `trackArrowGlow`, `trackContainerGlow`).
    - Interactivity: Hovering on the status track pauses animation execution (`:hover * { animation-play-state: paused !important; }`).
    - Responsive: Verified across Desktop (1440px), Tablet (768px), and Mobile (375px) where lines collapse gracefully into a balanced 2x2 grid.
  - **Step 01 Layout Alignment**:
    - Replaced obsolete `.process-card__split` (which anchored the first image to the bottom) with the unified `.process-card__visual-wrap` architecture matching Steps 02, 03, and 04.
    - Elevated `process-01-understand.png` to the top visual row, establishing a unified horizontal baseline for all 4 milestone graphics, numbers (`01 _` through `04 _`), titles (`UNDERSTAND`, `DESIGN`, `BUILD`, `SHIP`), and descriptions across Desktop, Tablet, and Mobile.
- **Interactive Process Animation Concepts Lab ([`process-concepts.html`](file:///Users/ankitkumar/Projects/www/portfolio/process-concepts.html))**:
  - Created a dedicated standalone review page served live via Laravel Herd at [`http://portfolio.test/process-concepts.html`](http://portfolio.test/process-concepts.html) with a sticky jump navigation bar.
  - Implemented 4 distinct animation concepts plus an All-in-One master combo:
    1. **Concept 01**: Holographic Floating & Ambient Breathing for 3D Visuals (`conceptFloat1-4`).
    2. **Concept 02**: Fiber-Optic Energy Pulse & Travelling Photon Bead along the curved wave spline (`splineEnergyFlow`, `photonTravel`).
    3. **Concept 03**: Concentric Radar / Sonar Milestone Node Rings (`sonarRipple`).
    4. **Concept 04**: Terminal CLI Cursor Blink & Interactive Card Focus States.
    5. **Combo**: Synchronized architectural integration running all concepts in subtle harmony.
  - **Concept 2 Production Adoption & Transition Glitch Resolution**:
    - Selected **Concept 2** (Fiber-Optic Energy Pulse Along the Curved Wave Spline) for `#process` on the main page.
    - Preserved all alternative concept CSS rules in [`scss/sections/_process_concepts.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_process_concepts.scss) for reuse in other portfolio components.
    - **Transition Glitch Fixed**: Solved the loop pause/hesitation where the pulse would stop at the arrow and pause before restarting.
      - Calibrated exact SVG curve length using `pathLength="1195"` to lock user units across all rendering engines.
      - Implemented dual-layer centered architecture:
        - Vibrant Lime Aura: `stroke-dasharray: 140 1055` (`seamlessSplineFlow 3.6s linear infinite`, offset `0 → -1195`).
        - High-Luminance White Core: `stroke-dasharray: 100 1095` (`seamlessSplineFlowCore 3.6s linear infinite`, offset `-20 → -1215`).
      - Switched from decelerating easing with off-path travel to continuous `linear` modulo looping.
      - Core is centered within aura with 20px leading and trailing glow margins.
      - Added `@media (prefers-reduced-motion: reduce)` accessibility overrides.
      - Bumped stylesheet query to `v=11` in [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html) and [`process-concepts.html`](file:///Users/ankitkumar/Projects/www/portfolio/process-concepts.html).
  - **Synchronized Pulse-Crossing Float Choreography for Process Graphics**:
    - Implemented kinetic energy induction where each 3D graphic levitates (`translateY(-16px)` with `scale(1.035)`) and blooms with an electric neon drop-shadow (`drop-shadow(0 0 32px rgba(163, 230, 53, 0.65)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.4))`) precisely as the traveling fiber-optic energy pulse crosses under it, and softly touches down back to rest (`translateY(0)`) after the pulse passes through.
    - Synchronized per-card keyframes running at the exact same cycle (`3.6s linear infinite`) in lockstep with the SVG energy pulse:
      - **Step 01 (UNDERSTAND)** (`processVisualPulseFloat1`): Lifts as pulse enters `x = 0 → 150` (peak crest at 8%, ~0.29s), glides down and touches down to rest by 23% (~0.8s).
      - **Step 02 (DESIGN)** (`processVisualPulseFloat2`): Lifts as pulse crosses `x = 400 → 580` (peak crest at 42%, ~1.51s), glides down and touches down to rest by 57% (~2.0s).
      - **Step 03 (BUILD)** (`processVisualPulseFloat3`): Lifts as pulse crosses `x = 700 → 890` (peak crest at 68%, ~2.45s), glides down and touches down to rest by 83% (~3.0s).
      - **Step 04 (SHIP)** (`processVisualPulseFloat4`): Lifts as pulse crosses `x = 970 → 1145` (peak crest at 91%, ~3.31s), glides down and touches down to rest seamlessly as pulse enters arrow tip at 100% / 0% (~3.6s).
    - Isolated animations on `.process-card__visual` with GPU-accelerated `will-change: transform, filter`, cleanly composing with `:hover` on `.process-card__img`.
    - Full `@media (prefers-reduced-motion: reduce)` accessibility compliance.
- **Pattern 7: My Approach Alternating Sine Wave Fiber-Optic Pulse & Float System**:
  - **Concept & Mechanics**:
    - Applied the continuous fiber-optic energy pulse and synchronized pulse-crossing floating image choreography to the 6-step **My Approach** section ([`#approach`](file:///Users/ankitkumar/Projects/www/portfolio/sections/my-approach.html)).
    - **Dual-Layer Spline Energy Pulse** ([`sections/my-approach.html`](file:///Users/ankitkumar/Projects/www/portfolio/sections/my-approach.html) & [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html)):
      - Path calibrated with `pathLength="1177"` along the alternating sine wave curve.
      - Neon Lime Aura: `.approach__spline-pulse-aura` (`stroke-dasharray: 140 1037`, `4.2s linear infinite`).
      - White Core: `.approach__spline-pulse` (`stroke-dasharray: 100 1077`, centered at `-20px` inset, `4.2s linear infinite`).
    - **Synchronized 6-Step Levitation Choreography** ([`scss/sections/_approach.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_approach.scss)):
      - Each alternating step graphic (whether on top or bottom) detects the passing energy pulse and levitates `translateY(-16px)` with `scale(1.035)` and an electric neon glow bloom, before softly touching down back to rest:
        - **Step 01 (QUESTION)** (`approachVisualPulseFloat1`): Floats at `t = 0.07s` (apex at 3%), rests by 11%.
        - **Step 02 (PROBLEM)** (`approachVisualPulseFloat2`): Floats over Node 2 at `t = 0.78s` (apex at 18.7%), rests by 26%.
        - **Step 03 (ARCHITECTURE)** (`approachVisualPulseFloat3`): Floats over inflection 3 at `t = 1.56s` (apex at 37.1%), rests by 44.5%.
        - **Step 04 (PROTOTYPE)** (`approachVisualPulseFloat4`): Floats over Node 4 at `t = 2.34s` (apex at 55.7%), rests by 63%.
        - **Step 05 (BUILD)** (`approachVisualPulseFloat5`): Floats over inflection 5 at `t = 3.11s` (apex at 74.1%), rests by 81.5%.
        - **Step 06 (SHIP)** (`approachVisualPulseFloat6`): Floats over Node 6 at `t = 3.89s` (apex at 92.6%), rests by 99% / 100% loop wrap.
    - Zero interference with card hover zoom effects (`.approach-card:hover .approach-card__visual img`).
    - Added `@media (prefers-reduced-motion: reduce)` accessibility safety overrides.
    - Bumped stylesheet query to `v=12`.
- **Pattern 8: CTA Holographic Floating & Ambient Levitation System (Concept 1)**:
  - **Concept & Physics Implementation** ([`scss/sections/_cta.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_cta.scss)):
    - Integrated the weightless holographic floating and ambient breathing physics from Concept 1 (`conceptFloat` in [`_process_concepts.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_process_concepts.scss)) onto the two 3D architectural diagrams in the CTA section (`#cta`).
    - **Refined Subtle Holographic Luminescence**:
      - Calibrated ambient breathing dropshadow from overblown lightbulb-like bloom down to ethereal, architectural luminescence:
        - Baseline Rest (`0%, 100%`): Delicate `drop-shadow(0 0 8px rgba(163, 230, 53, 0.12))`.
        - Apex Levitation (`50%`): Soft, breathable aura `drop-shadow(0 0 18px-20px rgba(163, 230, 53, 0.28-0.3))`.
      - Preserves technical grid crispness, coordinate typography readability, and deep black space aesthetics.
    - **Smooth Sinusoidal Levitation**:
      - **Left Diagram (`cta-diagram-left.png`: Idea to Product Flow)**: `.cta__art-box--left` animated via `@keyframes ctaHoloFloatLeft` over a continuous `5.6s ease-in-out infinite` cycle (`translateY(0) <-> translateY(-12px)` with `-0.5deg` tilt).
      - **Right Diagram (`cta-diagram-right.png`: 4-Tier Isometric Glass Plates System)**: `.cta__art-box--right` animated via `@keyframes ctaHoloFloatRight` over an offset `6.4s ease-in-out infinite 0.8s` cycle (`translateY(0) <-> translateY(-13px)` with `+0.5deg` tilt).
      - Asymmetric frequency and phase offset impart natural, organic suspension.
    - **Fluid, Non-Freezing Interactive Hover State**:
      - Completely eliminated abrupt freezing (`animation-play-state: paused` and jarring transform overrides removed).
      - Floating levitation cycle on `.cta__art-box` continues 100% uninterrupted without any stutter or mid-air stoppage.
      - Child image `.cta__art-img` applies smooth responsive magnification (`scale(1.028)`) and gentle accent glow (`drop-shadow(0 0 16px rgba(163, 230, 53, 0.42))`) via GPU-accelerated `0.45s cubic-bezier(0.16, 1, 0.3, 1)` easing.
  - **Decoupled Transform Architecture**:
    - Nested `.cta__art-box` inside `.cta__art-col.parallax-drift`, allowing scroll parallax and holographic levitation to compose seamlessly.
  - **Synchronization & Verification**:
    - Synchronized across [`sections/cta.html`](file:///Users/ankitkumar/Projects/www/portfolio/sections/cta.html) and [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html).
    - Enforced `@media (prefers-reduced-motion: reduce)` accessibility overrides.
    - Verified live on Laravel Herd (`http://portfolio.test/#cta`) across Desktop (1440px), Tablet (768px), and Mobile (375px) with zero console errors.
    - Bumped stylesheet query to `v=14`.
- **Pattern 9: About Page Vertical Pipeline Progression & Fluid Content Floating System**:
  - **Concept & Mechanics** ([`pages/about.html`](file:///Users/ankitkumar/Projects/www/portfolio/pages/about.html) & [`scss/sections/_about_page.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_about_page.scss)):
    - Transformed the 4-step vertical timeline on the About page ("My Approach: Solve. Build. Improve. Repeat.") into a synchronized, continuous vertical progression pipeline with non-abrupt, fluid content floating.
    - **Step-by-Step Downward Pipeline Choreography (7.2s Infinite Loop)**:
      - **Step 1 (`Understand`)**: Dot 1 blooms with radiant lime green light (`box-shadow: 0 0 12px #a3e635, 0 0 20px rgba(163, 230, 53, 0.4); scale(1.3)`). Step 1 card content softly floats upward (`translateY(-6px)`) with graceful sinusoidal ease, while its icon box illuminates.
      - **Line 1 Advance**: Progress bar (`.about-timeline__bar`) fills vertically downward (`scaleY(0) → scaleY(1)`) while a bright glowing tracer particle (`.about-timeline__particle`) glides down to Step 2. Step 1 content glides smoothly back down to rest.
      - **Step 2 (`Plan`)**: Particle lands on Dot 2, triggering a blooming flash (`scale(1.4)` + lime glow). Step 2 card content smoothly floats upward (`translateY(-6px)`) with ease and illuminates, then glides back to rest as Line 2 fills downward.
      - **Line 2 Advance**: Progress bar fills vertically downward to Step 3 with travelling particle.
      - **Step 3 (`Build`)**: Particle lands on Dot 3, blooming into glowing lime light. Step 3 card content smoothly floats upward (`translateY(-6px)`) with ease and illuminates, then glides back to rest as Line 3 fills downward.
      - **Line 3 Advance**: Progress bar fills vertically downward to Step 4 with travelling particle.
      - **Step 4 (`Improve`)**: Particle lands on Dot 4 at the bottom of the timeline, blooming into peak radiance (`scale(1.45)`). Step 4 card content floats upward (`translateY(-6px)`) with ease and illuminates, then gently touches down.
      - **Full Pipeline Hold**: All 4 milestone dots and 3 connecting bars remain illuminated in unison from 86% to 92% of the cycle, showcasing the complete end-to-end journey.
      - **Soft Fade Reset**: Lines and dots softly fade/reset from 94% to 100%, seamlessly initiating the next cycle at Step 1 with zero visual jarring.
    - **Mathematical Alignment**:
      - Calibrated `.about-timeline__step` to `align-items: flex-start` so the 48px icon box and 8px dot centers match at `y = 24px` with 0.0px variance.
      - Line starts at `top: 24px` and spans `height: calc(100% + 22px)`, dynamically tracking text content height across all responsive breakpoints.
    - **Fluid Content Float**:
      - Content wrapped in `.about-timeline__body` (`will-change: transform; transform-origin: left center`) with `cubic-bezier(0.33, 1, 0.68, 1)` easing for organic, silky levitation without abrupt start or stop.
    - **Responsive & Accessible**:
      - Verified across Desktop (1440px), Tablet (768px), and Mobile (375px).
      - Added `@media (prefers-reduced-motion: reduce)` accessibility safety overrides.
      - Bumped stylesheet query to `v=14`.
- **Pattern 10: Stats Counter Animation System (Quartic Ease-Out Counter)**:
  - **Concept & Controller Implementation** ([`js/main.js`](file:///Users/ankitkumar/Projects/www/portfolio/js/main.js) & [`scss/sections/_about_page.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_about_page.scss)):
    - Integrated a high-performance, zero-dependency numerical counter animation that increments stats smoothly from `0` to target numbers upon scrolling into view.
    - **Parsing & Data Attributes**:
      - Supports both declarative data attributes (`data-counter="3" data-suffix="+"`, `data-counter="100" data-suffix="%"`) and regex text parsing fallback (`3+`, `10+`, `5+`, `100%`).
      - Preserves static fallback text in HTML for search engines and non-JS clients.
    - **Quartic Ease-Out Curve**:
      - Utilizes `1 - Math.pow(1 - progress, 4)` via `requestAnimationFrame` for a rapid initial takeoff and ultra-gentle, tactile deceleration landing.
      - Duration: 1300ms for short ranges (`3+`, `5+`, `10+`) and 1800ms for larger numbers (`100%`).
      - Staggers start times by 70ms per card (`0ms`, `70ms`, `140ms`, `210ms`) for an organic cascading wave.
    - **Visual Stability & Active Glow State**:
      - Applied `font-variant-numeric: tabular-nums` to `.about-stats__val` to ensure uniform character widths and completely eliminate horizontal digit jitter during rapid increments.
      - Toggles `.is-counting` class to bloom with enhanced neon text-shadow (`text-shadow: 0 0 30px rgba(163, 230, 53, 0.5), 0 0 8px rgba(163, 230, 53, 0.7)`).
      - Added interactive hover lift (`translateY(-2px)`) with heightened lime text-shadow.
    - **Observer & Accessibility**:
      - Managed via `IntersectionObserver` with `threshold: 0.15` and `rootMargin: '0px 0px -40px 0px'`, unobserving once triggered.
      - Full `@media (prefers-reduced-motion: reduce)` compliance, rendering final numbers instantaneously if reduced motion is requested.
      - Cache query bumped to `../js/main.js?v=2` in [`pages/about.html`](file:///Users/ankitkumar/Projects/www/portfolio/pages/about.html).
- **Pattern 11: Global Animation Architecture Rollout across Subpages (`about.html` & `contact.html`)**:
  - **Comprehensive Coverage**:
    - Rolled out the complete portfolio animation system (Patterns 1 through 5: Scroll Reveal Fade-Up, Cascading Stagger Grid, Technical Line Expansion / Card Top Borders, Parallax Drift + Ambient Floating, and Back-and-Forth Arrow Motion) across both [`pages/about.html`](file:///Users/ankitkumar/Projects/www/portfolio/pages/about.html) and [`pages/contact.html`](file:///Users/ankitkumar/Projects/www/portfolio/pages/contact.html).
  - **About Page Integration (`pages/about.html`)**:
    - **Hero Intro**: Applied `.reveal-on-scroll` to typography and story column; decoupled `.parallax-drift` (`data-drift-factor="0.07"`) with `.ambient-float` and `.reveal-on-scroll` (`data-reveal-delay="150"`) to portrait photo frame.
    - **Stats Counter Bar**: Integrated `reveal-on-scroll`, top border line expand (`scaleX(0) → scaleX(1)`), and 4-number Quartic Ease-Out counter animation.
    - **What I Do Cards**: Applied `.reveal-on-scroll` to `.about-duo__left`, `.reveal-cascade cascade--3col` to `.about-duo__cards-grid`, and `.reveal-on-scroll` to all 6 `.about-card` articles with 1.5px glowing lime top borders and 90ms row-aware cascade delays.
    - **My Approach Pipeline**: Synced `.reveal-on-scroll` (`data-reveal-delay="150"`) on `.about-duo__right` with continuous vertical 4-step pipeline animation.
    - **Philosophy Callout**: Applied `.reveal-on-scroll` to `.about-philosophy` and `.line-draw` to `.about-philosophy__quote-line`.
  - **Contact Page Integration (`pages/contact.html`)**:
    - **Header Row**: Applied `.reveal-on-scroll` to `.contact-page__title-group`.
    - **World Map Graphic**: Wrapped in `.contact-page__map-drift.parallax-drift` (`data-drift-factor="0.05"`) and `.ambient-float.reveal-on-scroll` (`data-reveal-delay="200"`) so the graphic and its radar overlay float in perfect synchrony.
    - **Contact Cards Column**: Applied `.reveal-cascade` to `.contact-page__cards`, `.reveal-on-scroll` to all 5 `.contact-card` items (with 1.5px glowing top border expansion), and `.reveal-on-scroll` (`data-reveal-delay="250"`) to the handwritten note.
    - **Interactive Form Card**: Applied `.reveal-on-scroll` (`data-reveal-delay="150"`) with top border expansion to `.contact-form-card`, and tagged `.arrow--right` on submit button for smooth back-and-forth oscillation.
  - **SCSS Architecture & Compilation**:
    - Updated [`scss/components/_animations.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/components/_animations.scss) and page stylesheets ([`scss/sections/_about_page.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_about_page.scss), [`scss/sections/_contact_page.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_contact_page.scss)) with `position: relative; overflow: hidden;` on all cards.
    - Compiled cleanly via `npm run build` to `css/style.css` and `css/style.min.css`.
    - Bumped stylesheet queries to `?v=15` across [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html), [`pages/about.html`](file:///Users/ankitkumar/Projects/www/portfolio/pages/about.html), and [`pages/contact.html`](file:///Users/ankitkumar/Projects/www/portfolio/pages/contact.html).
    - Verified live on Laravel Herd across Desktop (1440px), Tablet (768px), and Mobile (375px).
---

### 🚀 Implemented Sections (Pixel-Perfect & Fully Responsive)

#### 1. Let's Build / CTA Section (`#cta`)
- **Reference Design**: [`designs/cta.png`](file:///Users/ankitkumar/Projects/www/portfolio/designs/cta.png)
- **Modular Component**: [`sections/cta.html`](file:///Users/ankitkumar/Projects/www/portfolio/sections/cta.html) (synchronized in [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html))
- **Styles**: [`scss/sections/_cta.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_cta.scss)
- **Assets Created & Processed**:
  - [`images/cta-diagram-left.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/cta-diagram-left.png): Cleaned circle & rounded square concept diagram with coordinate grid, boolean cutout intersection, `IDEA → PRODUCT` label, and output line node.
  - [`images/cta-diagram-right.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/cta-diagram-right.png): Cleaned 4-tier isometric glass plate stack with vertical guideline markers, internal neon illumination, and `BUILD → REAL IMPACT` label.
- **Key Features**:
  - Top meta bar with micro-labels on left (`IDEAS / PROBLEMS / SOLUTIONS / REAL IMPACT` with underline) and right (`DISCUSS / PLAN / BUILD / SHIP` with underline), centered around `• LET'S BUILD` pill badge.
  - Large headline: `GOT SOMETHING WORTH` (white) + `BUILDING?` (neon lime glow) and lead description text.
  - Interactive buttons: Primary solid neon button (`START A PROJECT →`) and outline button (`GET IN TOUCH`).
  - Desktop 3-column diagram flow with central neon SVG wave spline (`cta__wave-svg`), glowing anchor node (`▪`), and center philosophy label (`SAME IDEAS. / BIGGER POSSIBILITIES.`).
  - Bottom bar with execution motto (`// | GOOD IDEAS DESERVE GREAT EXECUTION.`) on the left, paired with the engineering disciplines list on the right (`SOFTWARE / MOBILE APPS / APIS / SYSTEMS` with lime underline).
  - Verified across Desktop (1440px), Tablet (768px), and Mobile (375px).

#### 2. Currently Exploring Section (`#exploring`)
- **Reference Design**: [`designs/exploring.png`](file:///Users/ankitkumar/Projects/www/portfolio/designs/exploring.png)
- **Modular Component**: [`sections/exploring.html`](file:///Users/ankitkumar/Projects/www/portfolio/sections/exploring.html) (synchronized in [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html))
- **Styles**: [`scss/sections/_exploring.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_exploring.scss)
- **Assets Created & Processed**:
  - [`images/exploring-orbit.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/exploring-orbit.png): Glowing green planet sphere with concentric planetary orbits.
  - [`images/exploring-android.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/exploring-android.png): Smartphone with Android mascot + `BUILD / BETTER / APPS`.
  - [`images/exploring-kotlin.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/exploring-kotlin.png): Glowing code editor window with Kotlin syntax.
  - [`images/exploring-compose.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/exploring-compose.png): Layered green glass UI planes + `IDEAS / INTO / INTERFACES`.
  - [`images/exploring-ai.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/exploring-ai.png): AI prompt cards + `Plan / Build / Refactor / Improve`.
  - [`images/exploring-product.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/exploring-product.png): Isometric glowing green cubes + `IDEA -> PRODUCT -> IMPACT`.
  - [`images/exploring-architecture.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/exploring-architecture.png): Modern server rack stack + `SCALABLE / RELIABLE / MAINTAINABLE`.
- **Key Features**:
  - Header with badge `• CURRENTLY EXPLORING`, headline `CURRENTLY EXPLORING →`, and lead text.
  - Top right learning philosophy: `LEARN / BUILD / IMPROVE / REPEAT`.
  - 6 emerging technology cards with custom SVGs, index markers (`01 ──` to `06 ──`), neon arrows, tag lists, and glowing border hover states.
  - Bottom status banner: `// | ALWAYS LEARNING, ALWAYS BUILDING.` + center motto `NEW TOOLS. BETTER SOLUTIONS. BIGGER POSSIBILITIES.` + outline CTA button `VIEW MY WORK →`.
  - Verified across Desktop (1440px), Tablet (768px), and Mobile (375px).

#### 3. Experience Section (`#experience`)
- **Reference Design**: [`designs/experience.png`](file:///Users/ankitkumar/Projects/www/portfolio/designs/experience.png)
- **Modular Component**: [`sections/experience.html`](file:///Users/ankitkumar/Projects/www/portfolio/sections/experience.html) (synchronized in [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html))
- **Styles**: [`scss/sections/_experience.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_experience.scss)
- **Assets Created & Processed**:
  - [`images/experience-sphere.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/experience-sphere.png): Glowing green particle sphere dome.
  - [`images/experience-backend.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/experience-backend.png): Scalable backend server stack.
  - [`images/experience-api.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/experience-api.png): Terminal API console window.
  - [`images/experience-database.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/experience-database.png): Tiered cylindrical database disks.
  - [`images/experience-architecture.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/experience-architecture.png): Layered isometric architectural planes.
  - [`images/experience-android.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/experience-android.png): Smartphone with neon Android robot.
  - [`images/experience-product.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/experience-product.png): Floating product metric graphs.
- **Key Features**:
  - Header with badge `• EXPERIENCE`, headline `3+ YEARS OF BUILDING SOFTWARE.`, description.
  - Top right philosophy block: `// | REAL PROBLEMS / REAL SOLUTIONS / REAL IMPACT`.
  - 6 interactive engineering domain cards with custom SVGs, index numbers (`01` to `06`), status arrows, and monospace technology tags.
  - Bottom status banner: `// | ALWAYS EVOLVING, ALWAYS DELIVERING.` + center motto `RELIABLE CODE. REAL-WORLD IMPACT. CONTINUOUS GROWTH.` + outline CTA button `VIEW MY RESUME →`.
  - Verified across Desktop (1440px), Tablet (768px), and Mobile (375px).

#### 4. The Process Section (`#process`)
- **Reference Design**: [`designs/the-process.png`](file:///Users/ankitkumar/Projects/www/portfolio/designs/the-process.png)
- **Modular Component**: [`sections/process.html`](file:///Users/ankitkumar/Projects/www/portfolio/sections/process.html) (synchronized in [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html))
- **Styles**: [`scss/sections/_process.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_process.scss)
- **Assets Created & Processed**:
  - [`images/process-01-understand.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/process-01-understand.png): Discovery & system analysis node.
  - [`images/process-02-design.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/process-02-design.png): System architecture & interface blueprint.
  - [`images/process-03-build.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/process-03-build.png): Engineering execution & code compilation.
  - [`images/process-04-ship.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/process-04-ship.png): Production deployment & real-world launch.
- **Key Features**:
  - Header with badge `[ THE PROCESS ]`, headline `MORE THAN JUST CODE.`, lead description.
  - Interactive 4-step process timeline with desktop continuous glowing SVG wave spline with glowing nodes and trajectory arrow.
  - Cards featuring deliverables checklist, monospace phase tags, and responsive accordion/stack breakdown for tablet & mobile.
  - Verified across Desktop (1440px), Tablet (768px), and Mobile (375px).

#### 5. Featured Services Section (`#services`)
- **Reference Design**: [`designs/featured-services.png`](file:///Users/ankitkumar/Projects/www/portfolio/designs/featured-services.png)
- **Modular Component**: [`sections/services.html`](file:///Users/ankitkumar/Projects/www/portfolio/sections/services.html) (synchronized in [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html))
- **Styles**: [`scss/sections/_services.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_services.scss)
- **Assets Created & Processed**:
  - [`images/service-header-graphic.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/service-header-graphic.png): Trajectory curve banner with `LET'S BUILD WHAT'S NEXT`.
  - [`images/service-backend.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/service-backend.png)
  - [`images/service-android.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/service-android.png)
  - [`images/service-mvp.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/service-mvp.png)
  - [`images/service-system-design.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/service-system-design.png)
  - [`images/service-existing-products.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/service-existing-products.png)
  - [`images/service-product-eng.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/service-product-eng.png)
- **Key Features**:
  - Header with badge `SERVICES`, headline `WHAT CAN I BUILD FOR YOU?`, lead text, and trajectory curve with neon arrow.
  - 6 service cards with indexes (`01` to `06`), category tags, and hover card glows.
  - Verified across Desktop (1440px), Tablet (768px), and Mobile (375px).

#### 6. Featured Projects / Selected Work (`#selected-work`)
- **Reference Design**: [`designs/fetaured-projects.png`](file:///Users/ankitkumar/Projects/www/portfolio/designs/fetaured-projects.png)
- **Modular Component**: [`sections/selected-work.html`](file:///Users/ankitkumar/Projects/www/portfolio/sections/selected-work.html) (synchronized in [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html))
- **Styles**: [`scss/sections/_selected_work.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_selected_work.scss)
- **Key Features**:
  - Interactive project showcase cards (MVP SaaS Platform, Android Native App, High-Performance Go Backend).
  - Glassmorphic card surfaces with hover glowing borders, tech tags, metric indicators, and external link arrow triggers.

#### 7. Hero Section (`#hero`)
- **Modular Component**: [`sections/hero.html`](file:///Users/ankitkumar/Projects/www/portfolio/sections/hero.html) (synchronized in [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html))
- **Styles**: [`scss/sections/_hero.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_hero.scss)
- **Key Features**:
  - Status badge `• AVAILABLE FOR NEW PROJECTS`.
  - Massive typography headline: `SOFTWARE ENGINEER & PRODUCT DEVELOPER`.
  - Terminal philosophy code snippet.
  - 3D isometric glowing tech stack graphic illustration.
  - Dual action CTAs ("START A PROJECT →", "EXPLORE WORK").

#### 9. Footer Section (`#main-footer`)
- **Reference Design**: [`designs/footer.png`](file:///Users/ankitkumar/Projects/www/portfolio/designs/footer.png)
- **Modular Component**: [`sections/footer.html`](file:///Users/ankitkumar/Projects/www/portfolio/sections/footer.html) (synchronized in [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html))
- **Styles**: [`scss/layout/_footer.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/layout/_footer.scss)
- **Key Features**:
  - Left column with monospace badge `[ BUILD • LEARN • SHIP ]`, high-contrast 3-tier headline (`Good / Software / Matters.`), subtitle, and rounded square GitHub and LinkedIn icon buttons.
  - Subtle vertical divider line separating the brand and navigation columns.
  - Middle column with `NAVIGATE` header and clean vertical list of 4 pages (`Work →`, `Services →`, `About →`, `Contact →`) featuring neon green arrows.
  - Right column featuring clean status marker `● LET'S BUILD`, 2-line headline (`Software engineer building reliable / systems and useful products.`), description, and bold neon CTA button (`START A PROJECT →`).
  - Technical coordinate grid graphic with subtle dark grid lines, neon axis glow beams, glowing crosshairs (`+`), and vertical keyword stack (`IDEAS / CODE / PEOPLE / IMPACT`).
  - Bottom bar with copyright (`© 2026 Jhon Smith`), center execution motto (`// SAME IDEAS. BIGGER POSSIBILITIES.`), and custom lime green outline SVG coffee cup icon (`MADE WITH </> AND ☕`).
  - Verified across Desktop (1440px), Tablet (768px), and Mobile (375px) with zero horizontal overflow.

#### 10. My Approach Section (`#approach`)
- **Reference Design**: [`designs/my-approach.png`](file:///Users/ankitkumar/Projects/www/portfolio/designs/my-approach.png)
- **Modular Component**: [`sections/my-approach.html`](file:///Users/ankitkumar/Projects/www/portfolio/sections/my-approach.html) (synchronized in [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html))
- **Styles**: [`scss/sections/_approach.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_approach.scss)
- **Assets Created & Processed**:
  - [`images/approach-01-question.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/approach-01-question.png): Radar question mark discovery node.
  - [`images/approach-02-problem.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/approach-02-problem.png): Magnifying glass blueprint inspection plane.
  - [`images/approach-03-architecture.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/approach-03-architecture.png): 4-layer stacked isometric illuminated glass plates.
  - [`images/approach-04-prototype.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/approach-04-prototype.png): Isometric cubes with illuminated core neon cube.
  - [`images/approach-05-build.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/approach-05-build.png): Isometric code development window with illuminated brackets.
  - [`images/approach-06-ship.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/approach-06-ship.png): Glowing paper plane cutting through orbital trajectory rings.
- **Key Features**:
  - Pill badge `• MY APPROACH` and headline `I DON'T START WITH CODE.` featuring neon glow emphasis.
  - Header meta block with philosophy list (`THOUGHTFUL / ENGINEERING / BETTER PRODUCTS`), neon divider line, and corner-bracket bounding box (`IDEAS / TO / IMPACT`).
  - Interactive 6-step alternating wave flow (odd cards: content top, visual bottom; even cards: visual top, content bottom) with continuous glowing SVG sine wave spline and glowing milestone anchor nodes.
  - Monospace micro-tag badges (`CURIOSITY / ABOUT THE PROBLEM`, `CLARITY / CREATES DIRECTION`, `A SOLID PLAN / REDUCES RISK`, `TURN IDEAS / INTO SOMETHING REAL`, `CODE WITH PURPOSE / NOT JUST FEATURES`, `REAL USERS / REAL IMPACT`).
  - Bottom status bar with philosophy motto (`| // | BETTER QUESTIONS. CLEARER SOLUTIONS. MORE USEFUL PRODUCTS.`) and step counter (`[ 01 - 06 ]`).
  - Verified across Desktop (1440px), Tablet (768px), and Mobile (375px) with zero horizontal overflow.

#### 11. My Mindset Section (`#mindset`)
- **Reference Design**: [`designs/my-mindset.png`](file:///Users/ankitkumar/Projects/www/portfolio/designs/my-mindset.png)
- **Modular Component**: [`sections/my-mindset.html`](file:///Users/ankitkumar/Projects/www/portfolio/sections/my-mindset.html) (synchronized in [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html))
- **Styles**: [`scss/sections/_mindset.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_mindset.scss)
- **Assets Created & Processed**:
  - [`images/mindset-01.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/mindset-01.png): Isometric discs detailing Users, Constraints, Goals, and Real Problem nodes.
  - [`images/mindset-02.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/mindset-02.png): Isometric wireframe cube cluster with glowing core cube.
  - [`images/mindset-03.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/mindset-03.png): Four-tier stacked isometric architectural glass plates.
  - [`images/mindset-04.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/mindset-04.png): User avatar radar circle with useful, reliable, accessible, delightful nodes.
  - [`images/mindset-05.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/mindset-05.png): Continuous growth spline curve with milestone nodes.
- **Key Features**:
  - Top header with `• MY MINDSET` pill badge, bold headline `HOW I THINK ABOUT SOFTWARE.` with neon lime highlight, and technical manifesto block (`// BETTER THINKING BUILDS BETTER SOFTWARE` and `IDEAS / SYSTEMS / PEOPLE / IMPACT`).
  - 5 mindset card rows separated by subtle 1px dividers:
    - `01`: `UNDERSTAND BEFORE BUILDING.` + tags `USERS · CONTEXT · REAL NEEDS · RIGHT QUESTIONS`.
    - `02`: `COMPLEXITY SHOULD SOLVE A REAL PROBLEM.` + tags `CLARITY · SIMPLICITY · PURPOSE · TRADE-OFFS`.
    - `03`: `ARCHITECTURE SHOULD SERVE THE PRODUCT.` + tags `PRAGMATIC · SCALABLE · MAINTAINABLE · BUSINESS VALUE`.
    - `04`: `GOOD SOFTWARE IS SOFTWARE PEOPLE CAN ACTUALLY USE.` + tags `USABILITY · RELIABILITY · REAL IMPACT · HAPPY USERS`.
    - `05`: `KEEP LEARNING. KEEP BUILDING.` + tags `CURIOSITY · PRACTICE · ADAPT · LONG-TERM THINKING`.
  - Column 1 index markers: bold index number (`01`–`05`), glowing neon dot (`●`), and vertical technical guideline.
  - Bottom status bar with motto (`| // | SAME THINKING. BETTER SOFTWARE.`) and range counter (`[ 01 - 05 ]`).
  - Verified across Desktop (1440px), Tablet (768px), and Mobile (375px) with zero horizontal overflow.

#### 12. About Me Page (`pages/about.html`)
- **Reference Design**: [`designs/anout-me.png`](file:///Users/ankitkumar/Projects/www/portfolio/designs/anout-me.png)
- **Page File**: [`pages/about.html`](file:///Users/ankitkumar/Projects/www/portfolio/pages/about.html)
- **Styles**: [`scss/sections/_about_page.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_about_page.scss)
- **Assets Created & Processed**:
  - [`images/about-portrait-full.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/about-portrait-full.png): Crisp portrait of Ankit with laptop, tilted glowing green polygon backdrop, floating dark glass badges (`</> Clean Code...`, `💡 Always Curious...`), and arrow note (`Turning Problems into Possibilities`).
  - [`images/about-handwritten-badge.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/about-handwritten-badge.png): Hand-drawn `Code / Build / Learn / Repeat` badge with curved lime green stroke.
- **Key Features**:
  - Header synchronized with [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html) including active dot indicator on `About`, mobile drawer toggle, and `LET'S TALK →` button.
  - Intro Hero with tag `ABOUT ME`, bold headline `Building Ideas Into Real Products.` with neon lime glow, biography paragraph, handwritten badge, and portrait composition.
  - 4-column Stats Bar (`3+ Years of Experience`, `10+ Projects Built`, `5+ Technologies`, `100% Commitment to Learning`) with vertical borders and mobile 2x2 grid.
  - Two-Column Layout:
    - Left (`WHAT I DO`): Headline `From Backend to Mobile, I Build End-to-End Solutions.` and 6 capability cards with custom green stroke SVGs (Backend Development, Android Development, Product Development, Database Design, System Architecture, Tools & Automation).
    - Right (`MY APPROACH`): Headline `Solve. Build. Improve. Repeat.` and 4-step vertical timeline with glowing green nodes and dark glass icon boxes (Understand, Plan, Build, Improve).
  - "Beyond Code" philosophy card with glowing rocket icon, headline `I Believe in Building a Better Tomorrow.`, and italicized quote with vertical divider.
  - Footer synchronized with [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html) with updated navigation paths and `START A PROJECT` button.
  - Verified across Desktop (1440px), Tablet (768px), and Mobile (375px) with zero horizontal overflow and 0 console errors.

#### 13. Contacts Page (`pages/contact.html`)
- **Reference Design**: [`designs/contacts.png`](file:///Users/ankitkumar/Projects/www/portfolio/designs/contacts.png)
- **Page File**: [`pages/contact.html`](file:///Users/ankitkumar/Projects/www/portfolio/pages/contact.html)
- **Styles**: [`scss/sections/_contact_page.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_contact_page.scss)
- **Assets Created & Processed**:
  - [`images/contact-world-map.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/contact-world-map.png): 760x300 clean high-resolution crop of dotted world map with glowing green nodes and curved flight arcs, completely decoupled from the floating card and handwritten notes.
  - [`images/contact-map-overlay.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/contact-map-overlay.png): 265x265 transparent PNG overlay containing the handwritten note `Different Places Same Passion`, curved green pointer arrow, and dark glass impact card (`● Let's create impact together.` with lime underline) rendered via `.contact-page__map-wrap::before` so design elements persist even if the underlying map image is swapped.
  - [`images/contact-handwritten-note.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/contact-handwritten-note.png): 192x90 transparent PNG crop of handwritten note `Let's Build Something Amazing Together!` with curved neon lime pointer arrow and arrowhead, zeroed-out borders, and anti-aliased transparency.
- **Key Features**:
  - Decoupled World Map Overlay: The floating card and note are extracted and attached via `::before` pseudo-element on the `.contact-page__map-wrap` container, ensuring the design overlay stays intact when the underlying map image is swapped.
  - Synchronized Header matching [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html) and [`pages/about.html`](file:///Users/ankitkumar/Projects/www/portfolio/pages/about.html) with active state on `Contact`, dot indicator, mobile drawer toggle, and `LET'S TALK →` button.
  - Page Header: Left title group with monospace tag `LET'S CONNECT`, bold headline `Have a Project in <span class="highlight">Mind?</span>`, and descriptive lead paragraph; Right side displays the world map graphic.
  - Left Column (Contact Cards): 5 dark glass cards with neon-bordered glowing icon containers, title, description, and green monospace value:
    1. Email (`mailto:ankit@example.com`)
    2. Phone (`tel:+919876543210`)
    3. Location (`Bengaluru, India`)
    4. LinkedIn (`https://linkedin.com/in/ankitkumar`)
    5. GitHub (`https://github.com/ankitkumar`)
    - Below GitHub card: Handwritten note graphic (`Let's Build Something Amazing Together!`) pointing to the contact stack.
  - Right Column (Interactive Form Card):
    - Glass surface with tag `— SEND A MESSAGE`, headline `Tell Me About Your Idea.`, and subtitle.
    - Two-column row for `Your Name` and `Your Email` with user and email SVG icons.
    - Full-width `Subject` input with briefcase icon.
    - Full-width `Your Message` textarea with speech bubble icon and dynamic character counter (`0/500`).
    - Full-width solid neon lime submit button (`Send Message →`) with interactive submission feedback ("Sending...", "Message Sent! ✓", and form reset).
    - Security/privacy disclaimer with padlock icon: `Your information is safe with me. I never share your details.`.
  - Synchronized Footer matching [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html) including brand manifesto, navigation directory, technical coordinate grid graphic with glowing crosshairs and keyword stack (`IDEAS / CODE / PEOPLE / IMPACT`), and bottom status bar.
  - Verified across Desktop (1440px), Tablet (768px), and Mobile (375px) with zero horizontal overflow, 0 console errors, and full mobile drawer functionality.

#### 14. Services Page (`pages/services.html`)
- **Reference Design**: [`designs/services.png`](file:///Users/ankitkumar/Projects/www/portfolio/designs/services.png)
- **Page File**: [`pages/services.html`](file:///Users/ankitkumar/Projects/www/portfolio/pages/services.html)
- **Styles**: [`scss/sections/_services_page.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_services_page.scss)
- **Script**: [`js/main.js`](file:///Users/ankitkumar/Projects/www/portfolio/js/main.js) (`initServicesFilter()`)
- **Assets Created & Processed**:
  - [`images/services-hero-cubes.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/services-hero-cubes.png): High-resolution clean transparent PNG crop of the 3D isometric glowing green glass cubes with code, smartphone, cloud, and database icons, plus the handwritten note `Ideas into Impact` with curved arrow.
  - [`images/services-cta-bubbles.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/services-cta-bubbles.png): High-resolution clean transparent PNG crop of the two glowing neon speech bubbles with the handwritten note `Discuss Plan Build` and curved arrow.
- **Key Features**:
  - Synchronized Header matching [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html) with active state on `Services` (`.active` with glowing dot indicator), mobile drawer toggle, and `LET'S TALK →` button.
  - Page Hero: Left title group with monospace tag `OUR SERVICES`, bold headline `Solutions for <span class="highlight">Real-World Problems</span>`, and lead paragraph; Right side displays the 3D isometric glowing cubes graphic with `"Ideas into Impact"`.
  - Filter Toolbar:
    - Search input (`#services-search`) with magnifying glass SVG icon and live filtering.
    - Custom styled dropdown filter (`#filter-dropdown-btn` / `#filter-menu`) with category options (`All Services`, `Backend Development`, `Android Development`, `API Development`, `Database Design`, `System Architecture`, `Technical Consultation`).
    - Synergistic live filtering: cards dynamically filter based on both category selection and real-time search query matching.
    - Empty state message (`#no-services-found`) displayed if no services match query.
  - 6 Service Cards Grid (3 columns on desktop, 2 on tablet, 1 on mobile):
    1. **Backend Development**: Scalable and secure backend systems using Java, Spring Boot and modern architectures.
    2. **Android App Development**: Modern, user-friendly Android apps with clean architecture and best practices.
    3. **API Development**: Design and development of robust RESTful APIs for web and mobile applications.
    4. **Database Design**: Efficient and scalable database solutions tailored to your business needs.
    5. **System Architecture**: Guidance on scalable architecture, tech stack, and best practices.
    6. **Technical Consultation**: Get expert advice for your project, code reviews, or technology decisions.
    - Each card includes a dark glass container, glowing neon lime stroke SVG icon, title, description, and `"Learn More →"` link with hover translation.
  - Bottom CTA Banner (`Let's Build Something Great Together.`):
    - Dark glass container with subtle radial lime glow and border.
    - Monospace tag `HAVE A CUSTOM REQUIREMENT?`.
    - Headline `Let's Build Something Great Together.`.
    - Subtitle `Not sure which service fits your needs? Get in touch and let's discuss your idea.`.
    - Primary solid lime button `Contact Me →` linking to `contact.html`.
    - Right-side graphic of glowing neon speech bubbles with `"Discuss Plan Build"` handwritten note.
  - Synchronized Footer matching [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html) with brand manifesto, navigation directory, technical coordinate grid graphic with glowing crosshairs and keyword stack (`IDEAS / CODE / PEOPLE / IMPACT`), and bottom status bar.
  - Verified across Desktop (1440px), Tablet (768px), and Mobile (375px) with zero horizontal overflow, 0 console errors, and full mobile drawer functionality.

#### 15. Service Detail Page (`pages/service-detail.html`)
- **Reference Design**: [`designs/services-details.png`](file:///Users/ankitkumar/Projects/www/portfolio/designs/services-details.png)
- **Page File**: [`pages/service-detail.html`](file:///Users/ankitkumar/Projects/www/portfolio/pages/service-detail.html)
- **Styles**: [`scss/sections/_service_detail.scss`](file:///Users/ankitkumar/Projects/www/portfolio/scss/sections/_service_detail.scss)
- **Assets Created & Processed**:
  - [`images/service-detail-android-hero.png`](file:///Users/ankitkumar/Projects/www/portfolio/images/service-detail-android-hero.png): Clean, razor-sharp transparent PNG crop of the tilted smartphone with green Android mascot and text, surrounded by the 4 floating dark glass feature badges (`Clean Architecture`, `Scalable Code`, `Modern UI/UX`, `Play Store Ready`) and centered green ambient aura.
- **Key Features**:
  - Synchronized Header matching [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html) and [`pages/services.html`](file:///Users/ankitkumar/Projects/www/portfolio/pages/services.html) with active state on `Services` (`.active` with glowing dot indicator), mobile drawer toggle, and `LET'S TALK →` button.
  - Back Navigation: Monospace green link `← Back to Services` linking to `services.html` with arrow hover translation.
  - Hero Section:
    - Left side: Monospace tag `ANDROID DEVELOPMENT`, bold headline `Android App <span class="highlight">Development</span>` with neon lime glow, and lead descriptive text.
    - Right side: Responsive presentation of the Android smartphone illustration and floating architectural badges.
  - Key Highlights Banner (3 columns):
    - Dark glass container with subtle borders and dividers between items on desktop.
    - Item 1: `High Performance` (Speedometer/gauge SVG) — `Optimized and efficient apps`.
    - Item 2: `Best Practices` (Shield with checkmark SVG) — `Clean and maintainable code`.
    - Item 3: `Wide Compatibility` (Smartphone SVG) — `Supports latest Android versions`.
  - "What I Offer" (2x2 Grid):
    - Heading with green dash `— What I Offer`.
    - 4 interactive dark glass cards with neon lime bordered icon containers and hover effects:
      1. `Custom Android Apps` (Settings/cog gear SVG) — `Tailored solutions for your business needs.`
      2. `UI/UX Implementation` (Smartphone SVG) — `Modern and intuitive user interfaces using Material Design.`
      3. `API Integration` (Stacked layers SVG) — `Seamless integration with REST APIs and third-party services.`
      4. `App Maintenance` (Wrench SVG) — `Ongoing support, bug fixes, and feature enhancements.`
  - "Technologies I Use":
    - Heading with green dash `— Technologies I Use`.
    - 6 custom pill badges with authentic SVGs and hover lift:
      - `Kotlin` (gradient polygon SVG)
      - `Android Studio` (compass logo SVG)
      - `Jetpack Compose` (blue geometric hexagon SVG)
      - `Retrofit` (REST API box SVG)
      - `Room` (database cylinders SVG)
      - `Firebase` (multi-tone flame SVG)
  - "Process" (4 Columns):
    - Heading with green dash `— Process`.
    - 4 sequential steps with large monospace green numbers (`01`, `02`, `03`, `04`) and vertical dividers on desktop:
      - `01 Discuss` — `Understand your requirements`
      - `02 Plan` — `Define features and architecture`
      - `03 Build` — `Develop and test the app`
      - `04 Deploy` — `Launch on Play Store or internal distribution`
  - Bottom CTA Banner:
    - Dark glass container with green gradient border.
    - Left: Glowing circular badge with rocket SVG icon, headline `Ready to Build Your Android App?`, subtitle `Turn your idea into a high-quality Android application.`.
    - Right: Solid neon lime button `Get in Touch →` linking to `contact.html?service=android`.
  - Synchronized Footer matching [`index.html`](file:///Users/ankitkumar/Projects/www/portfolio/index.html) with brand manifesto, navigation directory, technical coordinate grid graphic with glowing crosshairs and keyword stack (`IDEAS / CODE / PEOPLE / IMPACT`), and bottom status bar.
  - Verified across Desktop (1440px), Tablet (768px), and Mobile (375px) with zero horizontal overflow, 0 console errors, and full mobile drawer functionality.

---

### 📋 Module Status Tracker ([`MODULES.md`](file:///Users/ankitkumar/Projects/www/portfolio/MODULES.md))

- [x] **Header**
- [x] **Hero**
- [x] **Featured Projects (Selected Work)**
- [x] **Featured Services**
- [x] **The Process**
- [x] **My Approach**
- [x] **My Mindset**
- [x] Experience
- [x] Exploring
- [x] **About Me**
- [x] Let's Build (CTA)
- [x] **Contacts**
- [x] **Services Page**
- [x] **Service Detail Page**
- [x] **Footer**



