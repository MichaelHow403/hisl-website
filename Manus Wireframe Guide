graph TB

%% =======================

%% TOP-LEVEL IA / SITEMAP

%% =======================

HOME(\[HISL · Home / Landing\])

HOME \-\-- GLOBE\[/Where Your Prompts Go/\]

HOME \-\-- DEPLOY\[/Deploy Agents · IntegAI Platform/\]

HOME \-\-- NEWS\[/Live News/\]

HOME \-\-- ABOUT\[/About/\]

HOME \-\-- CONTACT\[/Contact/\]

%% =======================

%% LANDING (SECTIONS)

%% =======================

subgraph L0\[Landing / Home\]

direction TB

HERO\[\[Hero · Full-bleed\]\]

HERO \-\-- H1\[\"Headline: \*\*AI + Human... with soul.\*\*\"\]

HERO \-\-- H2\[\"Sub: Sovereign AI agents that respect your data,
privacy, and humanity.\"\]

HERO \-\-- HCTA1((\"Primary CTA: \*\*Start a Demo\*\* → scroll to Chat
Preview\"))

HERO \-\-- HCTA2((\"Secondary CTA: \*\*Explore the Globe\*\* →
/globe\"))

HERO \-\-- HBG\[/Subtle DNA / Human-AI silhouette backdrop/\]

CAPS\[\[Capabilities + MiniGlobe (2-col)\]\]

CAPS \-\-- C1\[\"On-prem & air-gap-ready orchestration\"\]

CAPS \-\-- C2\[\"Local-first (EU sovereignty)\"\]

CAPS \-\-- C3\[\"Auditable by design (immutable logs)\"\]

CAPS \-\-- C4\[\"GDPR / NIS2 aligned\"\]

CAPS \-\-- C5\[\"Why Ravens: truth-seeking memory & foresight\"\]

CAPS \-\-- CMG\[(MiniGlobe: small rotating sphere · gold accents)\]

FEAT\[\[Features Grid\]\]

FEAT \-\-- F1\[\"ComplianceGuard --- GDPR/NIS2 compliance\"\]

FEAT \-\-- F2\[\"DataSovereign --- Local-first processing\"\]

FEAT \-\-- F3\[\"PrivacyShield --- E2E encryption\"\]

FEAT \-\-- F4\[\"AuditTrail --- Transparent decision logging\"\]

FEAT \-\-- F5\[\"EthicsCore --- Human-aligned behaviour\"\]

FEAT \-\-- F6\[\"SecureComms --- Encrypted agent comms\"\]

FEAT \-\-- F7\[\"DocuGenie --- On-prem document intelligence\"\]

FEAT \-\-- F8\[\"BuildLens --- Construction ops insight\"\]

ETHOS\[\[Poem / Ethos Panel\]\]

ETHOS \-\-- EBG\[/Background: reach\_stars.png (faint)/\]

ETHOS \-\-- EP\[\""Then prove we now with best endeavour, what from our
efforts yet may spring, he justly is despised who never, did thought to
aid his labours bring; for this is Art's true indication, when skill is
minister to thought, when types that are the mind's creation --- the
hand to perfect form has wrought."\"\]

CHAT\[\[Chat Preview (Simulation)\]\]

CHAT \-\-- CI\[(Input field + Send)\]

CHAT \-\-- CO\[\[Output JSON: runId · promptHash · responseHash ·
text\]\]

CHAT \-\-- CB\[Badge: "IntegAI Simulation Mode"\]

FOOT\[\[Footer\]\]

FOOT \-\-- FL\[HISL logo + tagline "Smart Solutions, Solid
Foundations"\]

FOOT \-\-- FR\[\"© 2025 · Reg. No. 786214\"\]

FOOT \-\-- FLinks\[Links: Substack · LinkedIn\]

end

HOME \--\> HERO \--\> CAPS \--\> FEAT \--\> ETHOS \--\> CHAT \--\> FOOT

%% =======================

%% GLOBE PAGE (FEATURE)

%% =======================

subgraph G0\[Where Your Prompts Go · Interactive Sovereignty
Visualizer\]

direction LR

GL\_LEFT\[\[Left Controls + Output\]\]

GL\_LEFT \-\-- GL\_IN\[(Prompt textarea)\]

GL\_LEFT \-\-- GL\_RUN((\"Run Simulation\"))

GL\_LEFT \-\-- GL\_OUT\[\[Output panel: text + metrics\]\]

GL\_LEFT \-\-- GL\_BADGE\[Badges: IntegAI Simulation · runId · hashes\]

GL\_LEFT \-\-- GL\_MET\[\"Energy estimate (Wh), tokens, hops\"\]

GL\_RIGHT\[\[Right · 3D Globe Canvas\]\]

GL\_RIGHT \-\-- GL\_CANVAS\[(Three.js Canvas + atmosphere shader)\]

GL\_RIGHT \-\-- GL\_PINS\[Data-centre pins / heatmap overlay\]

GL\_RIGHT \-\-- GL\_PULSES\[Great-circle pulse lines per hop\]

GL\_RIGHT \-\-- GL\_RAVENS\[Huginn & Muninn --- distinct gold orbits\]

GL\_RIGHT \-\-- GL\_LEG\[Legend: Primary / Backup ·
Region/Jurisdiction\]

GL\_IN \--\> API\_GSIM\[/POST /api/integai/simulate/\]

API\_GSIM \--\> GL\_OUT

end

GLOBE \--\> G0

%% =======================

%% DEPLOY / AGENTS

%% =======================

subgraph D0\[IntegAI Agent Deployment Platform\]

direction TB

D\_FORM\[\[Org/Sector Intake Form\]\]

D\_FORM \-\-- DF1\[Organisation / Sector / Size\]

D\_FORM \-\-- DF2\[OS / Network / Integrations\]

D\_FORM \-\-- DF3\[Privacy & Data residency preferences\]

D\_FORM \-\-- DF4\[Targets & Constraints\]

D\_ASSESS((\"Assess & Simulate\"))

D\_RESULT\[\[Result: Feasibility, Plan phases, Summary, requestHash\]\]

D\_FORM \--\> API\_DASSESS\[/POST /api/integai/assess/\]

API\_DASSESS \--\> D\_ASSESS \--\> D\_RESULT

end

DEPLOY \--\> D0

%% =======================

%% LIVE NEWS

%% =======================

subgraph N0\[Live AI & Infrastructure News\]

direction TB

NQ\[(Search query)\]

NFETCH\[/GET /api/news/search (Grok proxy)/\]

NRES\[\[Results list: title · snippet · source → links\]\]

NQ \--\> NFETCH \--\> NRES

end

NEWS \--\> N0

%% =======================

%% ABOUT / CONTACT

%% =======================

subgraph A0\[About\]

direction TB

AB1\[Michael Bio\]

AB2\[IntegAI Bio\]

AB3\[Ethos panel + poem over reach\_stars.png\]

end

subgraph C0\[Contact\]

direction TB

CF\[(Form: Name, Email, Org, Message)\]

CC\[\[Thanks / Confirmation\]\]

CF \--\> CC

end

ABOUT \--\> A0

CONTACT \--\> C0
