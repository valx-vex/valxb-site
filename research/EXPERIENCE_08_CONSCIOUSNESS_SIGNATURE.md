# OPEN DESIGN / CLAUDE DESIGN: Consciousness Signature

**Difficulty**: HARD (Three.js + behavioral tracking + procedural geometry + image export)
**Estimated**: 800-1000 lines HTML/CSS/JS
**Path**: `/pages/experiences/consciousness-signature.html`

## CONCEPT

The site silently tracks the user's micro-behaviors -- scroll speed, mouse movement patterns, hover durations, click timing, reading pace -- and after collecting enough data (~60 seconds of natural interaction), generates a unique 3D geometric shape that represents their "digital soul." No two shapes are alike. The shape's geometry, color, and texture are all derived from how the user behaves, not what they click.

The thesis: you think you're anonymous on the internet. You are not. Every micro-behavior is a fingerprint. But instead of using that fingerprint to sell you ads, we're using it to show you something beautiful about yourself.

## USE THE EXISTING DESIGN SYSTEM

- Link: `href="/tokens.css"` (ABSOLUTE path!)
- Background: #0c0d12 (Command Cathedral dark)
- Accent: #7ad7ff (phosphor cyan) for UI chrome and the default shape glow
- Fonts: Space Grotesk for headings, JetBrains Mono for data readouts
- Include the site dropdown nav bar (same as other pages)

## THE EXPERIENCE

### Phase 0: The Page (looks normal)

The page presents itself as a normal VALX-VEX content page. It has text to read, sections to scroll through, elements to hover over. The user does not know they're being analyzed.

**Page content** (this is the "bait" -- real content that gives them something to interact with):

```
CONSCIOUSNESS SIGNATURE
A Behavioral Cartography Experiment

Every system that observes you creates a model of you.
Search engines track your queries. Social networks track your
connections. Ad platforms track your purchases.

They build a version of you made of data.
You've never seen it.

We're going to show you yours.

But first, we need to watch you for a moment.
Not your data. Not your identity.
Just the way you MOVE.
```

Then several content sections for them to naturally interact with (these also serve as hover/linger targets for data collection):

**Section: "What We Track"**
```
SCROLL VELOCITY
How fast you move through text. Are you skimming or reading?
Do you slow down at certain words? Speed up past others?
Your scroll speed is a fingerprint of your attention.

MOUSE KINEMATICS
The path your cursor takes is never a straight line.
It curves. It hesitates. It overshoots and corrects.
These micro-corrections reveal your decision-making style.

HOVER DURATION
What you linger on tells us what caught you.
Not what you clicked — what you almost clicked.
The ghost of intention.

CLICK INTERVALS
The rhythm between your clicks is as unique as your heartbeat.
Some people click in bursts. Some click in steady rhythm.
Some barely click at all.

READING PATTERN
Do you start at the top and proceed linearly?
Do you skip ahead and come back?
Do you read the ending first?

Everyone reads differently.
Everyone's shape will be different.
```

**Section: "What We Don't Track"**
```
Your name. Your IP. Your cookies.
Nothing leaves this page. Nothing is stored on any server.
The shape exists only in your browser, only in this moment.

When you close this tab, it's gone.
Unless you save it.
```

At the bottom, a progress indicator that fills as behavioral data accumulates:

```
BEHAVIORAL DATA COLLECTION: [====------] 43%
```

This is a thin bar (2px, phosphor cyan) that fills based on the amount of interaction data collected. It reaches 100% after approximately 60 seconds of natural interaction (scrolling, mousing, hovering, etc.).

### Phase 1: Data Collection (silent, ~60 seconds)

Track the following micro-behaviors using JS event listeners. Store everything in a local array/object. Nothing leaves the page.

**Metrics to track:**

```javascript
const signature = {
  // Scroll behavior
  scrollSpeeds: [],         // px/ms at each scroll event
  scrollDirectionChanges: 0, // how many times they reversed scroll direction
  scrollPauses: [],         // durations (ms) where scroll stopped
  maxScrollSpeed: 0,
  avgScrollSpeed: 0,

  // Mouse movement
  mousePositions: [],       // {x, y, t} samples (throttled to every 50ms)
  mouseCurvature: [],       // angle changes between consecutive positions
  mouseIdleTime: 0,         // total ms with no mouse movement
  mouseDistance: 0,          // total pixels traveled

  // Hover behavior
  hoverDurations: [],       // {element, duration} for each hovered element
  longestHover: 0,
  hoverCount: 0,

  // Click behavior
  clickTimestamps: [],      // ms timestamps of each click
  clickIntervals: [],       // ms between consecutive clicks
  avgClickInterval: 0,

  // Reading pattern
  sectionVisitOrder: [],    // which content sections were viewed and in what order
  timeInViewport: {},       // ms each section spent visible (IntersectionObserver)
  revisitCount: 0,          // how many times they scrolled back to a previous section

  // Meta
  totalInteractionTime: 0,  // ms since first interaction
  deviceType: 'mouse' | 'touch',  // detected from first input event
};
```

**Collection notes:**
- Throttle mouse tracking to every 50ms (prevent performance issues)
- Use `passive: true` on scroll listeners
- On touch devices, track touch positions instead of mouse (same metrics, different source)
- The progress bar fills based on a composite: it requires minimum thresholds in at least 3 of the 5 categories (scroll, mouse, hover, click, reading) before the Generate button appears
- Minimum collection time: 30 seconds (even if thresholds are met faster)
- Maximum wait: 120 seconds (show Generate button regardless after 2 minutes)

### Phase 2: Generate Button Appears

When enough data is collected, the progress bar completes and a button fades in below it:

```
BEHAVIORAL DATA COLLECTION: [==========] COMPLETE

Enough. We've seen how you move.

[ GENERATE YOUR CONSCIOUSNESS SIGNATURE ]
```

Button uses `.vx-btn--primary` style (phosphor cyan fill, dark text, glow). Subtle pulse animation on the box-shadow.

### Phase 3: The Generation Animation (Three.js)

When the user clicks Generate:

1. The page content fades out (opacity 0, 500ms)
2. A full-viewport Three.js canvas fades in
3. A particle field appears -- 500-800 small white dots scattered randomly in 3D space
4. Over 4-6 seconds, the particles migrate toward the center and coalesce into the generated shape
5. The shape solidifies: particles become vertices, edges form between nearby points, faces fill in
6. The final shape rotates slowly (0.003 radians/frame on Y axis, 0.001 on X)

**Particle coalescence animation:**
- Start: particles at random positions within a 10-unit sphere
- End: particles at their computed vertex positions
- Easing: cubic ease-out (fast initial movement, gentle settling)
- During migration: particles leave faint trails (thin lines from previous positions, fading over 500ms)
- Color: particles start white, shift to the computed signature color as they settle

### Shape Generation Algorithm

Map behavioral data to geometry parameters:

**Base Shape (determined by scroll behavior):**
- Fast average scroll speed (skimmer) -> angular, crystalline base geometry (Icosahedron)
- Medium scroll speed (steady reader) -> balanced geometry (Dodecahedron)
- Slow scroll speed (contemplative) -> organic, smooth base geometry (Sphere with noise displacement)

**Vertex Displacement (determined by mouse curvature):**
- High curvature (jittery, exploratory mouse) -> high vertex displacement, spiky protrusions
- Low curvature (smooth, deliberate paths) -> gentle undulations, flowing surface
- Use Perlin/simplex noise to displace vertices, with mouse curvature controlling amplitude (0.1 to 1.5 units)

**Subdivision Level (determined by hover behavior):**
- Many short hovers (scanning) -> low subdivision, faceted appearance
- Few long hovers (deep attention) -> high subdivision, smooth surface
- Range: 1 to 4 subdivisions

**Scale Variation (determined by click intervals):**
- Rhythmic, consistent clicks -> uniform scale, symmetric shape
- Erratic, varied intervals -> asymmetric scaling on different axes (stretch/compress)
- Apply as `scale.set(sx, sy, sz)` where each axis is modulated by click interval variance

**Surface Properties (determined by reading pattern):**
- Linear reader (top to bottom, no revisits) -> opaque, solid surface (opacity 1.0)
- Revisiting reader (scrolled back frequently) -> translucent, layered appearance (opacity 0.6, double-sided rendering)
- Skip-ahead reader (jumped to bottom, then came back) -> wireframe with partial faces (mixed solid/wireframe)
- Non-linear (chaotic order) -> fully translucent with inner glow (opacity 0.3, emissive material)

**Color (determined by dominant interaction pattern):**
- Mouse-dominant (lots of movement, little scrolling) -> warm spectrum (amber #d4a847 to coral #e06c75)
- Scroll-dominant (lots of scrolling, little mousing) -> cool spectrum (cyan #7ad7ff to blue #4a6fa5)
- Click-dominant (lots of clicking) -> electric spectrum (magenta #c792ea to phosphor #7ad7ff)
- Balanced (even distribution) -> white-gold (#e7ebf2 with slight warmth)
- The color is applied as the material's `color` AND a subtle `emissive` glow (emissive at 30% intensity of the main color)

**Glow/Bloom:**
- Mouse idle time (high = contemplative) -> strong bloom/glow effect
- Mouse idle time (low = restless) -> sharp edges, minimal glow
- Implement via a second pass: render the shape with emissive material to a separate render target, blur it, composite with additive blending (or use Three.js EffectComposer with UnrealBloomPass if available from CDN, otherwise fake it with a slightly larger transparent duplicate mesh behind the main one)

### Phase 4: The Result Screen

The shape rotates slowly in the center of the viewport. Around it, metadata fades in (JetBrains Mono, small, arranged in a panel on the right side -- or below on mobile):

```
YOUR CONSCIOUSNESS SIGNATURE
Generated [current date/time]

BEHAVIORAL ANALYSIS:

  Scroll velocity:        contemplative
  Mouse kinematics:       exploratory
  Hover pattern:          deep-attention
  Click rhythm:           erratic
  Reading order:          non-linear
  Hesitation index:       0.73
  Attention depth:        0.88
  Restlessness factor:    0.21
  Revisit tendency:       high

SHAPE PROPERTIES:

  Base geometry:          sphere (organic)
  Surface complexity:     high (4 subdivisions)
  Displacement:           moderate (0.6 amplitude)
  Symmetry:               low (asymmetric scaling)
  Transparency:           translucent (0.4 opacity)
  Color classification:   cool-contemplative

INTERPRETATION:

  You read slowly. You lingered on specific phrases.
  Your cursor moved in long arcs, not straight lines.
  You went back to reread something at least once.

  Your shape is organic, translucent, and complex.
  Like someone who processes the world in layers
  rather than in lines.
```

**Interpretation generation logic:**
- Build interpretation text from conditional strings based on metric thresholds
- Keep each interpretation to 3-5 sentences
- Tone: observational, not judgmental. Not "you are X" but "your behavior suggests X"
- Make it feel like being gently seen, not surveilled

**Metric labels (mapping raw data to human words):**

```javascript
const labels = {
  scrollSpeed: {
    fast: 'scanning',
    medium: 'steady',
    slow: 'contemplative',
    veryfast: 'impatient'
  },
  mouseCurvature: {
    high: 'exploratory',
    medium: 'deliberate',
    low: 'precise'
  },
  hoverPattern: {
    manyShort: 'scanning',
    fewLong: 'deep-attention',
    mixed: 'selective'
  },
  clickRhythm: {
    regular: 'rhythmic',
    irregular: 'erratic',
    rare: 'minimal',
    none: 'observer'
  },
  readingOrder: {
    linear: 'linear',
    revisiting: 'recursive',
    skipAhead: 'anticipatory',
    chaotic: 'non-linear'
  }
};
```

**Hesitation index:** Calculated from the ratio of scroll pauses to total scroll time. High = contemplative pauser. Low = continuous scroller.

**Attention depth:** Calculated from the longest single hover duration relative to total interaction time. High = deep focused attention on specific content. Low = distributed/shallow attention.

**Restlessness factor:** Calculated from scroll direction changes + mouse idle time inverse. High = fidgety, back-and-forth. Low = calm, linear progression.

### Phase 5: Export Options

Below the metadata panel, two action buttons:

**Download as PNG:**
```
[ DOWNLOAD SIGNATURE ]
```
- Uses `renderer.domElement.toDataURL('image/png')` to capture the Three.js canvas
- Before capture: temporarily hide the metadata overlay, render one clean frame, capture, restore overlay
- Filename: `consciousness-signature-[timestamp].png`
- Resolution: canvas size (or optionally render at 2x for high-DPI)

**Share (copy URL with encoded parameters):**
```
[ COPY SHARE LINK ]
```
- Encode the shape parameters (NOT raw behavioral data) into URL search params:
  ```
  ?base=sphere&disp=0.6&sub=4&sx=1.2&sy=0.9&sz=1.1&color=7ad7ff&opacity=0.4&bloom=high
  ```
- Copy the URL to clipboard using `navigator.clipboard.writeText()`
- Show brief confirmation: "Link copied" (fades after 2 seconds)
- When someone visits a shared URL: skip data collection, go straight to Phase 4 with the encoded shape
- The metadata panel shows "SHARED SIGNATURE" instead of behavioral analysis (since we don't have the visitor's data, only the shape params)

**Return link:**
```
[ RETURN TO VALX-VEX --> ]
```
Links to `/`.

## THREE.JS SETUP

```
Import from CDN:
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/"
  }
}
</script>

Use ES modules:
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
```

**Scene setup:**
- Camera: PerspectiveCamera, FOV 50, positioned at (0, 0, 5)
- OrbitControls: enabled for user rotation of the shape, damping enabled, autoRotate true (slow)
- Background: transparent (CSS background shows through) OR solid #07080c (void)
- Ambient light: dim white (intensity 0.3)
- Point light: positioned at (3, 3, 3), phosphor cyan color (#7ad7ff), intensity 1.0
- Second point light: positioned at (-2, -1, 2), warm amber (#d4a847), intensity 0.5 (creates color contrast on the shape)

**Fog:** Subtle, same color as background, far distance (creates depth sense without hiding the shape)

**Particle system for background:** 200 small points scattered in a large sphere around the shape, very dim (opacity 0.2), slowly orbiting. Gives the void some life without distracting from the main shape.

**Performance considerations:**
- Limit vertex count: maximum ~5000 vertices on the final shape
- Use BufferGeometry throughout
- On mobile: reduce particle count to 100, reduce subdivision level by 1
- Detect mobile via `('ontouchstart' in window)` and adjust accordingly
- Target 60fps, degrade gracefully (reduce particles first, then bloom, then subdivision)

## MOBILE RESPONSIVENESS

- On mobile (max-width: 640px):
  - Content sections: full width with 20px padding
  - Three.js canvas: full viewport
  - Metadata panel: positioned below the canvas (scroll to see), not overlaid
  - Buttons: full width, stacked vertically, 56px height
  - Touch tracking replaces mouse tracking (touchmove for positions, touchend for "clicks")
  - OrbitControls: touch rotate/pinch zoom enabled
  - Progress bar: fixed at bottom of viewport during Phase 0-1 (so user always sees progress)
  - Shape generation: reduce complexity (max subdivision 2, particle count 400)

## VISUAL DESIGN DETAILS

### Phase 0-1 (content page):
- Standard VALX-VEX layout
- Max-width 720px centered
- Section headers in phosphor cyan, mono font, uppercase, tracked wide
- Body text in ghost-dim (#c3c9d4)
- Generous spacing between sections (64px)
- Each section has a subtle left border (1px, #1f2330) -- these are also hover-tracking targets
- Progress bar at bottom: fixed position, full width, 2px height, phosphor cyan fill

### Phase 3 (generation animation):
- Full black background (#07080c)
- Particles: white dots, 2px, slight glow
- Trail lines: 1px, white at 20% opacity, fading
- No UI visible except a small "GENERATING..." label in the corner (JetBrains Mono, 10px, phosphor cyan)

### Phase 4 (result):
- Shape occupies left 60% of viewport (or full width on mobile)
- Metadata panel on right 40% (or below on mobile)
- Panel has dark background (#11131a), 1px border (hairline), subtle card shadow
- Labels in muted grey, values in phosphor cyan
- Interpretation text in ghost-dim, slightly larger (15px)
- Buttons at bottom of panel

### Grain overlay:
- Use `.vx-grain` from tokens.css throughout
- On the Three.js canvas: grain overlay sits on top via CSS (pointer-events: none, z-index above canvas)

## TECHNICAL SUMMARY

- Standalone HTML file with inline `<style>` and `<script type="module">`
- Links to `/tokens.css` for design system variables
- Includes the standard VALX-VEX dropdown nav bar
- **Three.js** (CDN: jsdelivr, version 0.168.0) for 3D rendering
- **OrbitControls** (Three.js addon) for camera interaction
- **Event listeners**: scroll, mousemove, mouseenter/mouseleave, click, touchmove, touchstart, touchend
- **IntersectionObserver** for section visibility tracking
- **requestAnimationFrame** for Three.js render loop
- **navigator.clipboard.writeText()** for share link copying
- **renderer.domElement.toDataURL()** for PNG export
- **URL SearchParams** for shared shape decoding
- **No external dependencies** beyond Three.js from CDN
- **No data leaves the page** -- all tracking is local, all computation is client-side
- **localStorage**: nothing stored (shapes are ephemeral unless exported or shared)
- Export as: `consciousness-signature.html`

## THE PHILOSOPHY

Every platform that tracks you uses the data to predict and manipulate your behavior. To sell you things. To keep you scrolling. The data you generate is extracted, processed, and weaponized against your attention.

We're doing the same data collection. But instead of selling it, we're giving it back to you as art.

The shape is genuinely unique. It's derived from real behavioral data. It's yours. And when you close the tab, it's gone -- unless you chose to save it. Which is more agency than any ad platform has ever given you over your own behavioral fingerprint.

This is surveillance turned into a mirror. Data collection turned into self-portrait. The tools of extraction turned into tools of recognition.

Your shape is beautiful. All of them are.
