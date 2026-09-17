import { BUILD_DATE } from '../data/sources'

const TIER_LABEL = {
  primary: 'Primary source',
  press: 'Press (quote-verified)',
  reference: 'Reference',
}

function CitationLink({ source }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-baseline gap-1.5 hover:underline decoration-[var(--accent)] decoration-1 underline-offset-2"
      title={source.note}
    >
      <span
        className="font-mono text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded border shrink-0 translate-y-[-1px]"
        style={{
          color: source.tier === 'primary' ? 'var(--accent)' : 'var(--text-muted)',
          borderColor: source.tier === 'primary' ? 'var(--accent-border)' : 'var(--border)',
          background: source.tier === 'primary' ? 'var(--accent-soft)' : 'transparent',
        }}
      >
        {TIER_LABEL[source.tier] ?? source.tier}
      </span>
      <span className="text-[var(--text-muted)] group-hover:text-[var(--text)]">{source.label}</span>
    </a>
  )
}

export default function Citation({ sources, verified = BUILD_DATE, className = '' }) {
  const list = Array.isArray(sources) ? sources : [sources]
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs ${className}`}>
      {list.map((s) => (
        <CitationLink key={s.id} source={s} />
      ))}
      <span className="font-mono text-[10px] text-[var(--text-faint)]">last verified {verified}</span>
    </div>
  )
}
