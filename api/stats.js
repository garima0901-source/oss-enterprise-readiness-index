// Serverless function that re-scrapes the live Hub model count directly from
// huggingface.co/models (the `numTotalItems` value embedded in the page payload,
// not an AI-summarized read) and returns it with a timestamp.
//
// Response is cached at Vercel's edge for one week (s-maxage=604800) with
// stale-while-revalidate, so most requests are served instantly from cache.
// The weekly Vercel Cron Job (see vercel.json) hits this same endpoint on a
// schedule, which forces the edge cache to revalidate — giving a genuine
// weekly refresh without needing a database. If the live scrape fails for any
// reason, the last known-good figure baked in at build time is returned instead,
// clearly marked as a fallback.

const FALLBACK = {
  models: 3073794,
  asOf: '2026-09-17',
  source: 'build-time fallback',
}

export default async function handler(req, res) {
  try {
    const resp = await fetch('https://huggingface.co/models', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    })
    if (!resp.ok) throw new Error(`upstream responded ${resp.status}`)
    const html = await resp.text()
    const match = html.match(/"numTotalItems":(\d+)/)

    if (!match) throw new Error('numTotalItems not found in page payload')

    const models = Number(match[1])
    res.setHeader('Cache-Control', 'public, s-maxage=604800, stale-while-revalidate=86400')
    res.status(200).json({
      models,
      asOf: new Date().toISOString(),
      source: 'live scrape of huggingface.co/models',
    })
  } catch (err) {
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=3600')
    res.status(200).json({ ...FALLBACK, error: String(err) })
  }
}
