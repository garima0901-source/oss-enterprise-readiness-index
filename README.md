# Open-Source Enterprise Readiness Index

A public, self-serve tool for the audience Hugging Face's leadership pointed at when
announcing the Nvidia acquisition — enterprise and institutional decision-makers
(CTOs, VPs of AI/ML, procurement leads) evaluating whether open-source AI fits their
organization. It is not aimed at Hugging Face's existing developer community; it's
built for the "institutions worldwide" half of that sentence, who are far less likely
to already know what the Hub actually offers.

This is an independent project, built by Garima as a public work sample. **It is not
affiliated with, endorsed by, or built in partnership with Hugging Face or Nvidia.**

## Why it's built this way

General web searches for "Hugging Face statistics" surface a wall of SEO aggregator
sites (gitnux.org, wifitalents.com, worldmetrics.org, fueler.io, and similar) whose
numbers contradict each other on basic facts — model counts alone range from 600K to
3M+ depending on which site you land on. None of those sites are used as a source
anywhere on this page. Every figure here traces to a primary source (Hugging Face's
own blog, docs, or live site) or, where a primary source wasn't available, to press
coverage whose direct quotes were independently verified against the company's own
announcement.

## Data sources, by confidence tier

**Primary (Hugging Face's own sources, or directly reproducible)**

- Hub model growth (108,473 → 450,208 → 1M → 3M+): [Ivan Fioravanti, "Three Million Models and Counting"](https://huggingface.co/blog/ivanfioravanti/three-million-models-and-counting) — methodology rebuilds the curve from the Hub API's per-model `createdAt` timestamp, independently reproducible by anyone via `huggingface_hub.list_models()`, cross-checked against Internet Archive snapshots.
- Live model count: scraped directly from the `numTotalItems` value embedded in [huggingface.co/models](https://huggingface.co/models)'s page payload — not an AI-paraphrased read, not a cached third-party number.
- Robotics dataset growth (1,145 → 26,991, now the Hub's #1 dataset category): [Ghosh, Kaffee, Jernite, Solaiman — "State of Open Source on Hugging Face"](https://huggingface.co/blog/huggingface/state-of-os-hf-spring-2026), published on Hugging Face's own blog, 2026-03-17.
- Enterprise Hub features (SSO, audit logs, resource groups, data residency, SOC 2 Type II): [huggingface.co/docs/hub/enterprise](https://huggingface.co/docs/hub/enterprise) and [huggingface.co/docs/hub/security](https://huggingface.co/docs/hub/security).
- Named enterprise customers (Salesforce AI Research, DoorDash, JetBrains, Shopify, Airbnb, AMD, Perplexity, IBM Research, ServiceNow, BCG, Toyota Research Institute, and others): the live customer-logo section of [huggingface.co/enterprise](https://huggingface.co/enterprise).
- Nvidia acquisition scale figures (18M developers, 3M models, 500K datasets, 1M applications, 200K+ companies), deal price ($12,930,300,000), and the Jensen Huang quote: [NVIDIA Blog, "NVIDIA to Acquire Hugging Face"](https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/), 2026-09-03.
- Pollen Robotics acquisition (April 2025): [TechCrunch](https://techcrunch.com/2025/04/14/hugging-face-buys-a-humanoid-robotics-startup), 2025-04-14.

**Press (quote verified against the primary announcement)**

- Clément Delangue's "turning point" quote: [CNBC](https://www.cnbc.com/2026/09/03/nvidia-agrees-to-buy-hugging-face-for-almost-13-billion-ai-expansion.html), from the CNBC "Squawk Box" interview, 2026-09-03.

**Reference (cross-checked against press coverage)**

- Founding year (2016), founders (Clément Delangue, Julien Chaumond, Thomas Wolf), HQ (New York City), 2025 revenue (~$150M): [Wikipedia's company infobox](https://en.wikipedia.org/wiki/Hugging_Face).
  - Note: Wikipedia's infobox listed the acquisition as announced Aug 26, 2026 at the time of writing. This page uses **September 3, 2026** instead, confirmed directly against NVIDIA's own blog post and matched by CNBC, Fortune, Bio-IT World, and Yahoo Finance — Wikipedia's date appears to be stale.

## What was found but explicitly excluded

- **"10,000+ companies including Intel, Pfizer, Bloomberg, eBay"** and similar customer-count claims that circulate on aggregator sites — never confirmed against a Hugging Face primary source, and the specific named customers don't appear on Hugging Face's own enterprise page. Not used. A real, verified list of named customers was found directly on `huggingface.co/enterprise` and is used instead, with that direct citation.
- **Generic "interesting stats"** from SEO aggregator sites generally — excluded wholesale regardless of how plausible they read, per the sourcing standard for this build.

If a number on this page turns out to be wrong or a source goes stale, please open an issue.

## How the weekly refresh works

The headline Hub model count is a **snapshot, not a live counter** — it changes daily
on Hugging Face's side, and this page says so explicitly, linking out to
[huggingface.co/models](https://huggingface.co/models) for the real-time figure rather
than competing with it.

On top of the build-time snapshot, `/api/stats` (a Vercel serverless function) attempts
to re-scrape the live count from `huggingface.co/models` on demand, cached at Vercel's
edge for one week (`s-maxage=604800`) with `stale-while-revalidate`. A Vercel Cron Job
defined in [`vercel.json`](./vercel.json) hits that same endpoint every Monday, forcing
the edge cache to revalidate.

In practice, Hugging Face's Cloudflare bot protection appears to block the scrape from
Vercel's serverless IP ranges (it works fine from a normal machine, as used during this
build). Rather than mask that, the endpoint fails honestly: it falls back to the last
known-good build-time figure, clearly marked `"source": "build-time fallback"` with the
underlying error, and the page itself says "Live refetch unavailable right now — showing
the last verified snapshot" instead of pretending the number is current. This is the
intended behavior, not a bug to silently hide — a wrong "live" number would be worse
than an honest snapshot.

## Tech stack

- React + Vite
- Tailwind CSS v4
- Recharts (Hub growth trajectory, robotics dataset shift)
- Vercel (hosting + serverless `/api` function + Cron)

## Local development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Deployment

Push to `main` on the connected GitHub repo; Vercel auto-deploys. The weekly cron job
is picked up automatically from `vercel.json` once the project is linked on Vercel.

## Live site

https://oss-enterprise-readiness.vercel.app

## Contact

Built by Garima — [GitHub](https://github.com/garima0901-source/oss-enterprise-readiness-index) · [LinkedIn](https://www.linkedin.com/in/garima-1676141b4/)
