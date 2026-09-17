// Central registry of every verified figure used on this page.
// Every entry was checked against a primary source during the build on 2026-09-17.
// Confidence tiers: "primary" (HF's own docs/blog/API), "press" (major outlet reporting
// on a primary announcement, quote verified against the company's own blog where possible),
// "reference" (Wikipedia infobox, cross-checked against press coverage).

export const BUILD_DATE = '2026-09-17'

export const sources = {
  hfModelsLive: {
    id: 'hfModelsLive',
    tier: 'primary',
    label: 'huggingface.co/models (live payload)',
    url: 'https://huggingface.co/models',
    note: 'Scraped directly from the page\'s embedded JSON (numTotalItems), not the rendered UI, to avoid stale cache.',
  },
  threeMillionBlog: {
    id: 'threeMillionBlog',
    tier: 'primary',
    label: 'Ivan Fioravanti, "Three Million Models and Counting" — Hugging Face blog',
    url: 'https://huggingface.co/blog/ivanfioravanti/three-million-models-and-counting',
    note: 'Methodology: rebuilds the cumulative model curve from the Hub API\'s per-model createdAt timestamp (huggingface_hub.list_models()), independently reproducible by anyone. Cross-checked against Internet Archive Wayback Machine snapshots.',
  },
  stateOfOSSpring2026: {
    id: 'stateOfOSSpring2026',
    tier: 'primary',
    label: 'Ghosh, Kaffee, Jernite, Solaiman — "State of Open Source on Hugging Face" — Hugging Face blog',
    url: 'https://huggingface.co/blog/huggingface/state-of-os-hf-spring-2026',
    note: 'Published 2026-03-17 on Hugging Face\'s own blog.',
  },
  enterpriseDocs: {
    id: 'enterpriseDocs',
    tier: 'primary',
    label: 'Hugging Face Docs — Team & Enterprise plans',
    url: 'https://huggingface.co/docs/hub/enterprise',
  },
  securityDocs: {
    id: 'securityDocs',
    tier: 'primary',
    label: 'Hugging Face Docs — Security',
    url: 'https://huggingface.co/docs/hub/security',
  },
  enterprisePage: {
    id: 'enterprisePage',
    tier: 'primary',
    label: 'huggingface.co/enterprise (live page)',
    url: 'https://huggingface.co/enterprise',
  },
  nvidiaBlog: {
    id: 'nvidiaBlog',
    tier: 'primary',
    label: 'Jensen Huang — "NVIDIA to Acquire Hugging Face" — NVIDIA Blog',
    url: 'https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/',
    note: 'Published 2026-09-03. Primary source for the deal price, scale figures, and the Huang quote.',
  },
  cnbcCoverage: {
    id: 'cnbcCoverage',
    tier: 'press',
    label: 'CNBC — "Hugging Face approached Nvidia\'s Huang weeks ahead of $12.9B acquisition, CEO tells CNBC"',
    url: 'https://www.cnbc.com/2026/09/03/nvidia-agrees-to-buy-hugging-face-for-almost-13-billion-ai-expansion.html',
    note: 'Source for the Delangue "Squawk Box" quote, 2026-09-03.',
  },
  wikipedia: {
    id: 'wikipedia',
    tier: 'reference',
    label: 'Wikipedia — Hugging Face (company infobox)',
    url: 'https://en.wikipedia.org/wiki/Hugging_Face',
    note: 'Used only for founding year/founders/HQ, cross-checked against press coverage. Its acquisition-date field was stale at build time (Aug 26) — this page uses the Sept 3, 2026 date confirmed directly on NVIDIA\'s own blog and by CNBC, Fortune, and Bio-IT World.',
  },
  techcrunchPollen: {
    id: 'techcrunchPollen',
    tier: 'press',
    label: 'TechCrunch — "Hugging Face buys a humanoid robotics startup"',
    url: 'https://techcrunch.com/2025/04/14/hugging-face-buys-a-humanoid-robotics-startup',
    note: 'Published 2025-04-14.',
  },
}

// --- Hub growth trajectory ---------------------------------------------
export const hubGrowth = [
  { date: '2022-12-30', label: 'Dec 2022', models: 108473, milestone: false },
  { date: '2023-12-30', label: 'Dec 2023', models: 450208, milestone: false },
  { date: '2024-09-25', label: 'Sep 2024', models: 1000000, milestone: true, milestoneLabel: '1M — announced by CEO Clément Delangue' },
  { date: '2026-08-18', label: 'Aug 2026', models: 3012377, milestone: true, milestoneLabel: '3M — official @huggingface announcement' },
  { date: BUILD_DATE, label: 'Today', models: 3073794, milestone: false, isLive: true },
]

export const hubGrowthCitations = [sources.threeMillionBlog, sources.hfModelsLive]

// --- Robotics dataset shift ---------------------------------------------
export const roboticsShift = {
  before: { year: 2024, count: 1145, rank: 44 },
  after: { year: 2025, count: 26991, rank: 1 },
  comparisonCategory: { name: 'Text Generation', rank: 2, count: 5000, approx: true },
}

export const roboticsCitations = [sources.stateOfOSSpring2026]

// --- Enterprise Hub features ---------------------------------------------
export const enterpriseFeatures = [
  {
    name: 'Single Sign-On (SSO)',
    objection: '"Our identity team won\'t approve a tool outside our SSO perimeter."',
    answer: 'Basic SSO ships on Team and Enterprise plans (SAML 2.0 / OIDC — Okta, Azure AD, OneLogin, etc.); Enterprise Plus adds Managed SSO and SSO to the public Hub.',
    doc: '/docs/hub/security-sso',
  },
  {
    name: 'Audit Logs',
    objection: '"We need a record of who accessed or changed what, for compliance."',
    answer: 'Audit logs are included from the Team tier up, covering org-level activity for governance and incident review.',
    doc: '/docs/hub/audit-logs',
  },
  {
    name: 'Resource Groups & Fine-Grained Access',
    objection: '"We can\'t have every employee with equal access to every repo."',
    answer: 'Resource Groups plus fine-grained access control let you scope who can see or touch specific models, datasets, and Spaces — not just org-wide roles.',
    doc: '/docs/hub/security-resource-groups',
  },
  {
    name: 'Data Residency / Storage Regions',
    objection: '"Our data can\'t leave the EU (or another jurisdiction)."',
    answer: 'Enterprise plans support data residency controls, including GDPR-aligned storage regions, so regulated data stays where compliance requires.',
    doc: '/docs/hub/storage-regions',
  },
  {
    name: 'SOC 2 Type 2 Certification',
    objection: '"Can you prove your security controls, not just claim them?"',
    answer: 'The Hugging Face Hub, Inference Endpoints, and Inference Providers are SOC 2 Type II certified, with the report available under NDA through your account team. Hugging Face is also GDPR compliant and offers Business Associate Addendums (HIPAA) on Enterprise.',
    doc: '/docs/hub/security',
  },
  {
    name: 'Two-Factor Authentication (Enforced)',
    objection: '"Password-only auth isn\'t acceptable for us."',
    answer: '2FA enforcement is available from the Team tier, alongside advanced RBAC and token administration/revocation on Enterprise.',
    doc: '/docs/hub/security-2fa',
  },
]

export const enterpriseCitations = [sources.enterpriseDocs, sources.securityDocs]

// --- Enterprise customers (real, named, from the live enterprise page) --
export const enterpriseCustomers = [
  'Salesforce AI Research',
  'Red Hat AI',
  'DoorDash',
  'JetBrains',
  'Shopify',
  'Airbnb',
  'AMD',
  'Perplexity',
  'IBM Research',
  'ServiceNow',
  'Boston Consulting Group',
  'Toyota Research Institute',
]

export const enterpriseCustomersCitation = sources.enterprisePage

// --- Acquisition facts ---------------------------------------------
export const acquisition = {
  priceUSD: 12930300000,
  priceLabel: '$12.93B',
  announced: '2026-09-03',
  acquirer: 'Nvidia',
  target: 'Hugging Face',
  stake: '100%',
  huangQuote:
    "we will scale Hugging Face’s platform, strengthen its infrastructure and expand access to AI for developers and institutions worldwide.",
  delangueQuote:
    "During the summer, I think we realized that Hugging Face and open-source AI in general was at the turning point, and that it needed more, more resources, more scale, more visibility.",
  scale: {
    developers: 18000000,
    models: 3000000,
    datasets: 500000,
    applications: 1000000,
    companies: 200000,
  },
}

export const acquisitionCitations = [sources.nvidiaBlog, sources.cnbcCoverage]

// --- Company facts ---------------------------------------------
export const company = {
  founded: 2016,
  founders: ['Clément Delangue', 'Julien Chaumond', 'Thomas Wolf'],
  hq: 'New York City',
  revenue2025: '~$150M',
}

export const companyCitations = [sources.wikipedia]

// --- Pollen Robotics ---------------------------------------------
export const pollenAcquisition = {
  date: '2025-04-14',
  note: 'Hugging Face acquired Pollen Robotics, bringing its humanoid robot Reachy 2 and ~20 employees in-house — a prior expansion into physical AI that foreshadowed the robotics-dataset surge on the Hub.',
}

export const pollenCitations = [sources.techcrunchPollen]

// --- Explicitly excluded claims (for transparency, shown in README/footer) --
export const excludedClaims = [
  {
    claim: '"10,000+ companies including Intel, Pfizer, Bloomberg, eBay" (and similar aggregator customer-count claims)',
    reason:
      'Found only on SEO aggregator sites (gitnux.org, wifitalents.com, worldmetrics.org, fueler.io) with no primary-source confirmation, and those sites contradict each other on basic Hub counts. Not used. A verified, real list of named enterprise customers was found instead directly on huggingface.co/enterprise and is used in Module 4 with that direct citation.',
  },
  {
    claim: 'Model/dataset counts from generic SEO stat-aggregator sites (ranging 600K–3M+ depending on the site)',
    reason: 'Superseded entirely by direct verification against huggingface.co/models and Hugging Face\'s own blog methodology.',
  },
]
