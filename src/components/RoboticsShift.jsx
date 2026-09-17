import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts'
import Section from './Section'
import Citation from './Citation'
import { roboticsShift, roboticsCitations } from '../data/sources'

function fmt(n) {
  return n.toLocaleString('en-US')
}

const chartData = [
  { name: `${roboticsShift.before.year}`, count: roboticsShift.before.count, rankLabel: `Rank #${roboticsShift.before.rank} category` },
  { name: `${roboticsShift.after.year}`, count: roboticsShift.after.count, rankLabel: 'Now the #1 category on the Hub' },
]

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div
      className="rounded-md border px-3 py-2 text-sm shadow-lg"
      style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
    >
      <p className="font-mono text-xs text-[var(--text-muted)]">{d.name}</p>
      <p className="font-mono text-base font-semibold text-[var(--text)]">{fmt(d.count)} robotics datasets</p>
      <p className="text-xs text-[var(--accent)] mt-1">{d.rankLabel}</p>
    </div>
  )
}

export default function RoboticsShift() {
  const multiplier = (roboticsShift.after.count / roboticsShift.before.count).toFixed(1)

  return (
    <Section
      id="robotics"
      eyebrow="Module 3 — Open Source Is Moving Into the Physical World"
      title="Robotics datasets grew 23x in one year — and became the Hub's single largest category"
      subtitle="Not a niche. In 2024, robotics ranked 44th among dataset categories. By 2025 it had overtaken every other category, including text generation."
    >
      <div className="grid md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-3">
          <div
            className="rounded-lg border p-4 md:p-8"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 16, left: 8, bottom: 8 }} barCategoryGap="35%">
                  <XAxis
                    dataKey="name"
                    tick={{ fill: 'var(--text-faint)', fontSize: 13, fontFamily: 'JetBrains Mono, monospace' }}
                    axisLine={{ stroke: 'var(--border)' }}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--accent-soft)' }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={120}>
                    {chartData.map((d, i) => (
                      <Cell key={d.name} fill="var(--chart-1)" fillOpacity={i === 0 ? 0.35 : 1} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2 text-center">
              <div>
                <p className="font-mono text-2xl font-semibold text-[var(--text-muted)]">{fmt(roboticsShift.before.count)}</p>
                <p className="text-xs text-[var(--text-faint)] mt-1">2024 · rank #{roboticsShift.before.rank}</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-semibold text-[var(--text)]">{fmt(roboticsShift.after.count)}</p>
                <p className="text-xs text-[var(--accent)] mt-1">2025 · rank #{roboticsShift.after.rank}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Citation sources={roboticsCitations} />
          </div>
        </div>

        <div className="md:col-span-2">
          <p className="font-mono text-5xl font-bold text-[var(--text)] leading-none">{multiplier}x</p>
          <p className="text-[var(--text-muted)] mt-3 leading-relaxed">
            growth in one year — while text generation, the second-largest category in 2025, sat at roughly{' '}
            <span className="font-mono text-[var(--text)]">5,000</span> datasets.
          </p>
          <p className="text-[var(--text-muted)] mt-4 leading-relaxed text-sm">
            For institutions evaluating open source, this is the signal worth watching: the center of gravity on the
            Hub is shifting from pure language models toward physical AI — robotics, perception, and embodied
            control. Hugging Face's own 2025 acquisition of Pollen Robotics (the humanoid robot Reachy 2) looks less
            like a side bet in hindsight.
          </p>
        </div>
      </div>
    </Section>
  )
}
