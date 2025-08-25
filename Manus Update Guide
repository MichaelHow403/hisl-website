1\) Site Map / IA (high-level)

graph TD

A\[HISL Home\] \-\-- B\[Globe · Where Your Prompts Go\]

A \-\-- C\[Deploy Agents · IntegAI Platform\]

A \-\-- D\[Live News\]

A \-\-- E\[About\]

A \-\-- F\[Contact\]

A \--\> A1\[Hero: \"AI + Human... with soul\"\]

A \--\> A2\[Capabilities Card + MiniGlobe\]

A \--\> A3\[Features Grid\]

A \--\> A4\[Poem / Ethos · Reach for the Stars\]

A \--\> A5\[Footer: Legal, Links\]

B \--\> B1\[Prompt Input + Run Simulation\]

B \--\> B2\[3D Globe Canvas (Three.js)\]

B1 \-\-- B3\[Output Panel + runId, hashes\]

B2 \-\-- B4\[Ravens Orbits · Pins · Pulse Lines\]

B2 \-\-- B5\[Legend · Energy Estimate · Region Hops\]

C \--\> C1\[Org/Sector Form\]

C \--\> C2\[Constraints & Integrations\]

C \--\> C3\[Assess & Simulate (server API)\]

C \--\> C4\[Feasibility Plan + Summary\]

D \--\> D1\[Query Search\]

D \--\> D2\[Results List (title/snippet/source)\]

D \--\> D3\[External links\]

E \--\> E1\[Michael Bio\]

E \--\> E2\[IntegAI Bio\]

E \--\> E3\[Ethos + Poem panel\]

F \--\> F1\[Contact Form\]

F \--\> F2\[Confirmation\]

\-\--

2\) Landing Page Wireframe (section-by-section)

flowchart TB

subgraph L0\[Landing / Home\]

direction TB

H1\[\[Hero · Full-bleed\]\]

H1 \-\-- t1\[\"Headline: AI + Human... with soul\"\]

H1 \-\-- t2\[\"Sub: Sovereign AI agents that respect your data, privacy
& humanity\"\]

H1 \-\-- cta1((\"Primary CTA: Start a Demo → scroll to Chat preview\"))

H1 \-\-- cta2((\"Secondary CTA: Explore the Globe → /globe\"))

H1 \-\-- bg1\[/Subtle DNA/Human silhouette bg/\]

L1\[\[Capabilities + MiniGlobe · 2-col\]\]

L1 \-\-- cap\[\"Bullets: On-prem, Local-first, Auditability, GDPR/NIS2,
Ravens lore\"\]

L1 \-\-- mini\[MiniGlobe (preview) --- small rotating sphere, gold
accents\]

L2\[\[Features Grid\]\]

L2 \-\-- f1\[Cards (hover): ComplianceGuard, DataSovereign,
PrivacyShield, AuditTrail\...\]

L2 \-\-- f2\[Short 1--2 line descriptions\]

L3\[\[Poem / Ethos Panel\]\]

L3 \-\-- pbg\[/Background: reach\_stars.png faint/\]

L3 \-\-- ptxt\[\"Exact poem text (final version) + intro line\"\]

L4\[\[Chat Preview (Simulation)\]\]

L4 \-\-- inp\[(Input field + Send)\]

L4 \-\-- out\[\[JSON preview (runId, hashes, text)\]\]

L5\[\[Footer\]\]

L5 \-\-- flogo\[HISL logo + tagline\]

L5 \-\-- flegal\[\"© 2025 · Reg. 786214\"\]

L5 \-\-- flinks\[Substack · LinkedIn\]

end

\-\--

3\) Globe Page Wireframe (with features)

flowchart LR

subgraph G0\[/Where Your Prompts Go · Page/\]

direction LR

Gleft\[\[Left Panel · Controls\]\]

Gleft \-\-- g1\[(Prompt textarea)\]

Gleft \-\-- g2\[Run Simulation button\]

Gleft \-\-- g3\[\[Output: text + metrics\]\]

Gleft \-\-- g4\[Badges: IntegAI Simulation Mode; runId; hashes\]

Gleft \-\-- g5\[Energy estimate (wH), token count, hops\]

Gright\[\[Right Panel · 3D Globe\]\]

Gright \-\-- g6\[Three.js Canvas + Atmosphere shader\]

Gright \-\-- g7\[Data Center Pins/Heatmap\]

Gright \-\-- g8\[Pulse Lines (great-circle arcs)\]

Gright \-\-- g9\[Ravens (Huginn/Muninn) on distinct orbits\]

Gright \-\-- g10\[Legend: Primary/Backup; Energy/Jurisdiction\]

G1\[Server API: /api/integai/simulate\] \--\> g3

g1 \--\> G1

end

\-\--

4\) Agents (Deploy Platform) Wireframe

flowchart TB

subgraph A0\[IntegAI Agent Deployment Platform\]

A1\[Form: Org, Sector, OS, Network, Integrations, Privacy, Targets\]

A2\[Assess & Simulate (POST /api/integai/assess)\]

A3\[\[Result Panel: Feasible?, Plan phases, Summary, requestHash\]\]

A1 \--\> A2 \--\> A3

end

\-\--

5\) Live News Wireframe

flowchart TB

subgraph N0\[Live AI & Infrastructure News\]

N1\[(Search box: query)\]

N2\[Fetch: /api/news/search → Grok proxy\]

N3\[\[Results Grid: title, snippet, source → links\]\]

N1 \--\> N2 \--\> N3

end

\-\--

6\) About & Contact Wireframe

flowchart LR

subgraph AB\[About\]

AB1\[Michael Bio\]

AB2\[IntegAI Bio\]

AB3\[Ethos panel + Poem over reach\_stars.png\]

end

subgraph CT\[Contact\]

C1\[(Form: Name, Email, Org, Message)\]

C2\[\[Thanks/Confirmation\]\]

C1 \--\> C2

end

\-\--

Quick notes

These match the locked schema and the Next.js refactor plan we prepared.

When you want a PNG/SVG: paste each diagram into mermaid.live →
"Export".

If you want a single giant board, I can output one combined Mermaid or
generate a printable SVG site map on request.
