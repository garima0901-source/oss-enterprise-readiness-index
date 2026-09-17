import { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Dot,
} from 'recharts'
import Section from './Section'
import Citation from './Citation'
import { hubGrowth, hubGrowthCitations, BUILD_DATE } from '../data/sources'

function fmt(n) {
  return n.toLocaleString('en-US')
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div
      className="rounded-md border px-3 py-2 text-sm shadow-lg"
      style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
    >
      <p className="font-mono text-xs text-[var(--text-muted)]">{d.label}</p>
      <p className="font-mono text-base font-semibold text-[var(--text)]">{fmt(d.models)} models</p>
      {d.milestoneLabel && <p className="text-xs text-[var(--accent)] mt-1 max-w-[200px]">{d.milestoneLabel}</p>}
    </div>
  )
}

function MilestoneDot(props) {
  const { cx, cy, payload } = props
  if (!payload.milestone && !payload.isLive) return null
  return (
    <Dot
      cx={cx}
      cy={cy}
      r={payload.isLive ? 5 : 4.5}
      fill={payload.isLive ? 'var(--amber)' : 'var(--chart-1)'}
      stroke="var(--surface)"
      strokeWidth={2}
    />
  )
}

export default function HubGrowthChart() {
  const [showTable, setShowTable] = useState(false)
  const [liveData, setLiveData] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/stats')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.models) setLiveData(data)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const data = liveData
    ? [...hubGrowth.slice(0, -1), { ...hubGrowth.at(-1), models: liveData.models, label: 'Today' }]
    : hubGrowth
  const liveCount = liveData?.models ?? hubGrowth.at(-1).models
  const liveAsOf = liveData?.asOf ? liveData.asOf.slice(0, 10) : BUILD_DATE

  return (
    <Section
      id="hub-scale"
      eyebrow="Module 2 — The Hub, at Scale"
      title="From 108K to 3M+ models in under four years"
      subtitle="Every point below is reconstructed from the Hub API's per-model creation timestamps and cross-checked against Internet Archive snapshots — not an estimate."
    >
      <div
        className="rounded-lg border p-4 md:p-8"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <div className="h-[320px] md:h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 24, left: 8, bottom: 8 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="0" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: 'var(--text-faint)', fontSize: 12, fontFamily: 'JetBrains Mono, monospace' }}
                axisLine={{ stroke: 'var(--border)' }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `${v / 1e6}M`}
                tick={{ fill: 'var(--text-faint)', fontSize: 12, fontFamily: 'JetBrains Mono, monospace' }}
                axisLine={false}
                tickLine={false}
                width={44}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border)', strokeWidth: 1 }} />
              <Line
                type="monotone"
                dataKey="models"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={<MilestoneDot />}
                activeDot={{ r: 6, fill: 'var(--chart-1)', stroke: 'var(--surface)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm">
          <p className="text-[var(--text-muted)]">
            {liveData ? 'Live count as of' : 'Snapshot as of'}{' '}
            <span className="font-mono text-[var(--text)]">{liveAsOf}</span>:{' '}
            <span className="font-mono font-semibold text-[var(--text)]">{fmt(liveCount)}</span> models.
            {liveData
              ? ' Refetched from huggingface.co/models on page load.'
              : ' Live refetch unavailable right now — showing the last verified snapshot.'}
          </p>
          <a
            href="https://huggingface.co/models"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs px-3 py-1.5 rounded border shrink-0 hover:bg-[var(--accent-soft)] transition-colors"
            style={{ borderColor: 'var(--accent-border)', color: 'var(--accent)' }}
          >
            See the current count on huggingface.co/models →
          </a>
        </div>

        <button
          onClick={() => setShowTable((s) => !s)}
          className="mt-4 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text)] underline underline-offset-2"
        >
          {showTable ? 'Hide' : 'Show'} underlying data table
        </button>
        {showTable && (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b" style={{ borderColor: 'var(--border)' }}>
                  <th className="py-2 pr-4 font-mono text-xs uppercase text-[var(--text-faint)]">Date</th>
                  <th className="py-2 pr-4 font-mono text-xs uppercase text-[var(--text-faint)]">Models</th>
                  <th className="py-2 font-mono text-xs uppercase text-[var(--text-faint)]">Note</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.date} className="border-b" style={{ borderColor: 'var(--border)' }}>
                    <td className="py-2 pr-4 font-mono text-[var(--text-muted)]">{d.date}</td>
                    <td className="py-2 pr-4 font-mono text-[var(--text)]">{fmt(d.models)}</td>
                    <td className="py-2 text-[var(--text-muted)]">{d.milestoneLabel ?? (d.isLive ? 'Live snapshot at build time' : '—')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-4">
        <Citation sources={hubGrowthCitations} />
      </div>
    </Section>
  )
}
