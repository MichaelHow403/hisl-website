Pass 1 --- Global style system + Apple-style hero

Prompt to Manus (paste verbatim):

\> Goal: Apply a premium, Apple-style visual system across the site,
then rebuild the Hero with layered imagery + scroll polish. Do not
remove existing sections; refine and enhance.

Tech assumptions: Current stack (Vite/React/Tailwind) OR Next.js if
already switched. Keep Tailwind. Use Framer Motion for light, smooth
animations (respect prefers-reduced-motion).

1\) Design tokens (Tailwind)

Fonts: Inter (UI) + Spectral (display/poem).

Preload Inter 400/600/700 and Spectral 400/500.

Colors (CSS variables in :root or Tailwind theme):

\--bg:\#0b1220, \--panel:\#0f1828, \--edge:\#1e2a42, \--text:\#e8f0ff,
\--muted:\#a8b8d6, \--gold:\#f6c650, \--teal:\#39d7c9.

Container: max-width 1200px, generous paddings (px-6 md:px-8, py-24
blocks).

Headings scale (Apple-like):

H1 clamp(40px, 6vw, 80px) / tight letter-spacing.

H2 clamp(24px, 3vw, 40px); body 18--19px on desktop.

Buttons:

Primary: subtle gold gradient, rounded-xl, shadow; hover raises 2--3px.

Secondary: ghost w/ 1px edge border, soft hover glow.

2\) Hero (full-bleed, layered, confident)

Copy (exact):

Headline: AI + Human... with soul.

Subline: Sovereign AI agents that respect your data, privacy, and
humanity.

Primary CTA: Start a Demo (scrolls to chat preview on the same page)

Secondary CTA: Explore the Globe (routes to /globe)

Visuals (use our real assets):

Background layers:

1\. public/images/dna\_bg.png (very faint, 6--10% opacity)

2\. soft radial vignette (center transparency → edges dark)

Foreground accent: the DNA + human-augment silhouette as a subtle
parallax layer (moves 3--6px on scroll).

Mini-globe badge on the right side of hero (small, \~240--300px) as a
teaser (see section below).

Motion (Framer Motion):

H1: fade-up, 300ms delay, 500ms duration

Subline: fade-up, +100ms

CTAs: stagger 120ms each

Parallax: tiny transform on scroll for the DNA layer; disable when
prefers-reduced-motion

3\) Mini-globe (Hero teaser --- not the full globe page)

Use a lightweight Canvas/Three layer with:

Slow auto-rotation

Warmer, realistic shading (don't render too dark)

Remove placeholder orbits/white rings

Add a slim gold rim-light to the terminator edge so it "reads" on dark
BG

Raven sprites: use our real assets (no cartoons!)

public/images/raven\_huginn.png and public/images/raven\_muninn.png

Place them in two distinct, slow orbits (different elevations)

Light, tasteful trail (alpha-faded dots), not "busy"

4\) Features grid polish (home)

2--4 columns responsive, equal card heights, soft glass panel
(bg-\[var(\--panel)\]/70 + border + shadow).

Icons: use our provided imagery where applicable; otherwise simple
stroked SVGS.

Hover: subtle raise + inner glow (no harsh scaling).

5\) Poem / Ethos panel (home)

Background: public/images/reach\_stars.png with very low opacity (5--8%)
and a centered radial gradient mask so text pops.

Typography: switch to Spectral, 20--22px, 1.5--1.6 line-height.

Poem text (exact, including punctuation):

\> Then prove we now with best endeavour, what from our efforts yet may
spring, he justly is despised who never, did thought to aid his labours
bring; for this is Art's true indication, when skill is minister to
thought, when types that are the mind's creation --- the hand to perfect
form has wrought.

Small caption: "--- Family verse, adapted"

6\) Footer

HISL logo (new) + tagline: HISL --- Smart Solutions, Solid Foundations

Links: Substack, LinkedIn (open in new tab, real URLs)

Line: © 2025 Howard Integritas Solutions Ltd · Reg. No. 786214

7\) Accessibility & perf

Respect prefers-reduced-motion.

Lazy-load heavy imagery and the mini-globe.

Preload fonts.

Keep Lighthouse ≥90 (mobile/desktop).

Acceptance criteria

1\. Hero reads instantly, looks premium, and scrolls smoothly; CTAs work
as specified.

2\. Mini-globe is bright enough, no placeholder orbits, real gold ravens
glide on different paths.

3\. Features cards feel consistent and elegant on hover.

4\. Poem section shows the exact wording above with the stars image
faint behind it.

5\. Footer shows new logo + correct legal line + working links.

6\. prefers-reduced-motion disables parallax and heavy motion.

7\. No regressions to other pages.

\-\--

Pass 2 --- Full Globe page + Raven-led pulse lines + energy/sovereignty
cues

Prompt to Manus (paste verbatim after Pass 1 is merged):

\> Goal: Upgrade /globe into the marquee experience: realistic Earth,
data-centre overlay, gold ravens on distinct orbits, and prompt-to-path
pulses that end at the output box. Dark theme, readable, cinematic.

1\) Visual globe

Use our high-quality textures (already in /public/assets):

earth\_daymap.jpg, earth\_nightmap.jpg, earth\_clouds.jpg

Atmosphere shader (thin blue line), subtle bloom, overall brighter than
current.

Camera: slow autorotation, scroll/touch drag; clamp zoom to keep
performance.

2\) Ravens (real assets)

Use public/images/raven\_huginn.png and public/images/raven\_muninn.png.

Give each a distinct orbit (inclination + altitude) and different lap
times.

Small gold trail dots, easing on turns. No thick rings or placeholder
birds.

3\) Data-centre overlay (heatmap + pins)

Draw pins/heat using our jurisdiction set (seed now; we'll wire real
metrics later):

Dublin (IE), Frankfurt (DE), London (UK), Ashburn (US-VA), Des Moines
(US-IA), Quincy (US-WA), Toronto (CA-ON), Calgary (CA-AB), São Paulo
(BR), Mexico City (MX), Paris (FR), Milan (IT), Warsaw (PL), Zürich
(CH), Amsterdam (NL), Johannesburg (ZA), Cape Town (ZA), Lagos (NG),
Nairobi (KE), Accra (GH), Abidjan (CI), Singapore (SG), Sydney (AU-NSW),
Melbourne (AU-VIC), Perth (AU-WA), Tokyo (JP), Osaka (JP), Seoul (KR),
Hong Kong (HK), Mumbai (IN), Delhi (IN), Jakarta (ID).

Style: small glowing pins + faint regional heat; on hover/tap show
label.

4\) Prompt simulation (IntegAI Simulation Mode)

Left column: input, Run Simulation button, output box.

On submit:

1\. Pick 2--3 "hops" (e.g., Dublin → Frankfurt → Ashburn)

2\. Animate great-circle pulse lines along the path; the ravens lead the
first leg, then rejoin orbit.

3\. When pulse reaches the last DC, animate a return pulse to the output
box; then reveal the text response.

Show a tiny metrics row: tokens, estimated energy (Wh) (stub calc),
hops.

Keep our branded copy: badge "IntegAI Simulation Mode", and include
runId, promptHash, responseHash in the JSON panel under the text.

5\) API & stability

The DeepSeek proxy must not crash or blank the page when it errors:

Defensive fetch with try/catch, timeout, and a graceful error panel.

If no valid key in env on Vercel, show a non-blocking banner: "Live
responses temporarily offline; running local simulation."

Keep the API name abstracted in UI: "HISL Sovereign Assistant" /
"IntegAI Simulation" (no vendor names).

6\) Performance & A11y

Framerate ≥ 50--60fps on desktop; cap GPU load.

Pause heavy animation when tab is hidden.

Respect prefers-reduced-motion: skip flight + pulse animations;
instantly draw path + show result.

Acceptance criteria

1\. Globe is bright, readable, with atmosphere + clouds; no muddy dark
rendering.

2\. Real gold ravens orbit smoothly on different planes; no
placeholders.

3\. Pins/heatmap for the jurisdiction list render correctly and are
legible.

4\. Submitting a prompt triggers raven-led pulses across 2--3
data-centres, then returns to the output box with a result + tiny
metrics.

5\. Errors never blank the screen; users get a clear, branded message.

6\. Lighthouse stays ≥ 90; motion respects user settings.

\-\--

Asset map (use exactly these paths)

public/images/dna\_bg.png --- Hero background accent

public/images/reach\_stars.png --- Poem background (faint)

public/images/raven\_huginn.png --- Gold raven 1

public/images/raven\_muninn.png --- Gold raven 2

public/images/integai\_logo.svg --- Badge next to "IntegAI Simulation
Mode"

public/assets/earth\_daymap.jpg, earth\_nightmap.jpg, earth\_clouds.jpg
--- Globe textures

\-\--

Optional: micro-interactions to sell the "Apple feel"

Nav: subtle blur + border when sticky; active section highlight on
scroll.

Feature cards: staggered reveal as they enter viewport; soft inner glow
on hover.

Buttons: 150--200ms spring with minor scale + shadow shift.

Type: light tracking for H1/H2, optical margins (negative letter-spacing
tiny).

Reduced motion: turn parallax off; keep fades only.
