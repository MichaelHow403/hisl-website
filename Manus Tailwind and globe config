1\) src/components/SectionHeading.jsx (new file)

import React from \"react\";

import { motion } from \"framer-motion\";

export default function SectionHeading({ eyebrow, title, subtitle }) {

return (

\<div className=\"mb-6\"\>

{eyebrow && (

\<motion.div

className=\"text-\[13px\] tracking-\[0.18em\] uppercase text-teal/80\"

initial={{ opacity: 0, y: 6 }}

whileInView={{ opacity: 1, y: 0 }}

viewport={{ once: true }}

transition={{ duration: .5 }}

\>

{eyebrow}

\</motion.div\>

)}

\<motion.h2

className=\"text-\[clamp(24px,3vw,40px)\] font-semibold\"

initial={{ opacity: 0, y: 8 }}

whileInView={{ opacity: 1, y: 0 }}

viewport={{ once: true }}

transition={{ duration: .55, delay: .05 }}

\>

{title}

\</motion.h2\>

{subtitle && (

\<motion.p

className=\"text-muted max-w-\[62ch\] mt-1\"

initial={{ opacity: 0, y: 8 }}

whileInView={{ opacity: 1, y: 0 }}

viewport={{ once: true }}

transition={{ duration: .55, delay: .08 }}

\>

{subtitle}

\</motion.p\>

)}

\</div\>

);

}

\-\--

2\) src/components/FeaturesGrid.jsx (new file)

import React from \"react\";

import { motion } from \"framer-motion\";

import SectionHeading from \"./SectionHeading\";

const FEATURES = \[

{

name: \"ComplianceGuard\",

blurb: \"GDPR & NIS2 monitoring with human-readable flags and
evidence.\",

badge: \"Active\"

},

{

name: \"DataSovereign\",

blurb: \"Local-first processing. Keep data in-region by default.\",

badge: \"Active\"

},

{

name: \"PrivacyShield\",

blurb: \"End-to-end encryption patterns for agent traffic.\",

badge: \"Standby\"

},

{

name: \"AuditTrail\",

blurb: \"Immutable logs with prompt/response hashing and run IDs.\",

badge: \"Active\"

},

{

name: \"EthicsCore\",

blurb: \"Human-aligned guardrails and escalation paths.\",

badge: \"In Build\"

},

{

name: \"SecureComms\",

blurb: \"Hardened agent-to-agent channels and policy enforcement.\",

badge: \"Standby\"

},

{

name: \"DocuGenie\",

blurb: \"On-prem document intelligence for real project files.\",

badge: \"Active\"

},

{

name: \"BuildLens\",

blurb: \"Construction ops insight: RAMS, handover, briefings.\",

badge: \"Active\"

},

\];

export default function FeaturesGrid() {

return (

\<section id=\"features\" className=\"py-20\"\>

\<div className=\"container-wrap\"\>

\<SectionHeading

eyebrow=\"Capabilities\"

title=\"Built for trust. Designed for action.\"

subtitle=\"Agent-centric architecture with sovereignty by design ---
fast to demo, ready for audited pilots.\"

/\>

\<div className=\"grid gap-4 md:grid-cols-2 lg:grid-cols-4\"\>

{FEATURES.map((f, i) =\> (

\<motion.article

key={f.name}

className=\"rounded-xl border border-edge bg-panel p-4 shadow-glow
hover:shadow-\[0\_0\_52px\_rgba(57,215,201,.12)\] transition
will-change-transform\"

initial={{ opacity: 0, y: 10 }}

whileInView={{ opacity: 1, y: 0 }}

viewport={{ once: true }}

transition={{ duration: .45, delay: i \* 0.03 }}

whileHover={{ y: -4 }}

\>

\<div className=\"flex items-center justify-between gap-3\"\>

\<h3 className=\"text-\[17px\] font-semibold\"\>{f.name}\</h3\>

\<span className=\"text-\[11px\] px-2 py-1 rounded-full border
border-edge/70 text-muted\"\>

{f.badge}

\</span\>

\</div\>

\<p className=\"mt-2 text-\[14px\] text-\[\#b7c7e6\]\"\>{f.blurb}\</p\>

\</motion.article\>

))}

\</div\>

\</div\>

\</section\>

);

}

\-\--

3\) src/components/PoemBlock.jsx (new file)

\> Uses your "Reach for the Stars" image as a faint backdrop and
presents the ethos poem cleanly.

If you want the exact wording you typed earlier, just replace the poem
string.

import React from \"react\";

import { motion } from \"framer-motion\";

import SectionHeading from \"./SectionHeading\";

const poem = \[

\"Then prove we now with best endeavour,\",

\"What from our efforts yet may spring;\",

\"He justly is despised who never\",

\"Did thought to aid his labours bring;\",

\"For this is Art's true indication,\",

\"When skill is minister to thought,\",

\"When types that are the mind's creations ---\",

\"The hand to perfect form has wrought.\"

\];

export default function PoemBlock() {

return (

\<section id=\"ethos\" className=\"relative py-20 overflow-hidden\"\>

{/\* soft star backdrop \*/}

\<div className=\"poem-backdrop\" aria-hidden /\>

\<div className=\"container-wrap relative\"\>

\<SectionHeading

eyebrow=\"Why We Build\"

title=\"Engineering with human dignity. Precision without compromise.\"

subtitle=\"The ethos that guides our craft --- human thought first, AI
as the instrument.\"

/\>

\<motion.div

className=\"relative rounded-2xl border border-edge bg-panel p-6
md:p-8\"

initial={{ opacity: 0, y: 12 }}

whileInView={{ opacity: 1, y: 0 }}

viewport={{ once: true }}

transition={{ duration: .55 }}

\>

\<blockquote className=\"text-\[16px\] md:text-\[18px\] leading-relaxed
text-\[\#dbe6ff\]\"\>

{poem.map((line, idx) =\> (

\<div key={idx}\>{line}\</div\>

))}

\</blockquote\>

\<div className=\"mt-3 text-\[13px\] text-\[\#93a6c8\]\"\>

--- William Howard (adaptation)

\</div\>

\</motion.div\>

\</div\>

\</section\>

);

}

\-\--

4\) src/App.jsx (replace with this to wire sections)

import React from \"react\";

import \"./styles/globals.css\";

import Hero from \"./components/Hero\";

import FeaturesGrid from \"./components/FeaturesGrid\";

import PoemBlock from \"./components/PoemBlock\";

// If you already have other sections (Globe page, Chat, Footer, etc.),

// keep them and insert these where you want in the flow.

export default function App() {

return (

\<\>

\<Hero /\>

{/\* Capabilities / Feature grid \*/}

\<FeaturesGrid /\>

{/\* Ethos / Poem \*/}

\<PoemBlock /\>

{/\* Example: Chat anchor the Hero's "Start a Demo" scrolls to \*/}

\<section id=\"chat\" className=\"container-wrap py-20\"\>

\<h2 className=\"text-\[clamp(24px,3vw,40px)\] font-semibold mb-4\"\>Ask
Our AI\</h2\>

\<p className=\"text-muted mb-4\"\>

On-prem proxy, brand-aligned. Responses are logged with run IDs and
hashes.

\</p\>

\<div className=\"rounded-xl border border-edge bg-panel p-4\"\>

{/\* drop your existing chat UI here \*/}

\<div className=\"text-muted text-sm\"\>

(Chat UI placeholder --- Manus will insert the working component.)

\</div\>

\</div\>

\</section\>

\</\>

);

}

\-\--

Assets checklist (must exist)

/public/images/dna\_bg.png (hero accent)

/public/images/reach\_stars.png (poem backdrop)

/public/images/raven\_huginn.png & /public/images/raven\_muninn.png

/public/assets/earth\_daymap.jpg

/public/assets/earth\_nightmap.jpg

/public/assets/earth\_clouds.jpg

\> If any path differs in your repo, just adjust the imports/URLs in
MiniGlobe.jsx and CSS.

\-\--

What you'll get after dropping these in

A polished Apple-style Hero with parallax DNA accent, crisp typography,
and two CTAs (Demo scroll + Globe page).

A clean, animated Features Grid (8 cards, hover lift, audit/compliance
language).

A refined Poem/Ethos block with the "Reach for the Stars" backdrop and
your adapted text.

All animations are light Framer Motion transitions and will not tank
performance.

If you want me to also ship a "Where Your Prompts Go" full page scaffold
next (with the larger globe container and placeholders for pulse-lines +
energy metrics), say the word and I'll include that as a single
ready-to-paste page.
