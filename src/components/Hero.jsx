import Citation from './Citation'
import { acquisition, acquisitionCitations } from '../data/sources'

function fmt(n) {
  return n.toLocaleString('en-US')
}

export default function Hero() {
  return (
    <header className="border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <p className="font-mono text-xs tracking-widest uppercase text-[var(--accent)] mb-6">
          Independent analysis · not affiliated with Hugging Face
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-[3.25rem] font-semibold tracking-tight leading-[1.08] text-[var(--text)] max-w-4xl">
          Hugging Face just got Nvidia&rsquo;s reach.
          <br className="hidden md:block" /> Here&rsquo;s what that actually means if you&rsquo;re evaluating
          open-source AI.
        </h1>

        <div className="mt-10 grid md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-lg overflow-hidden">
          <div className="bg-[var(--surface)] p-6">
            <p className="font-mono text-3xl md:text-4xl font-semibold text-[var(--text)]">
              {acquisition.priceLabel}
            </p>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Nvidia&rsquo;s acquisition of 100% of Hugging Face
            </p>
          </div>
          <div className="bg-[var(--surface)] p-6">
            <p className="font-mono text-3xl md:text-4xl font-semibold text-[var(--text)]">Sep 3, 2026</p>
            <p className="text-sm text-[var(--text-muted)] mt-1">Deal announced</p>
          </div>
          <div className="bg-[var(--surface)] p-6">
            <p className="font-mono text-3xl md:text-4xl font-semibold text-[var(--text)]">
              {fmt(acquisition.scale.companies)}+
            </p>
            <p className="text-sm text-[var(--text-muted)] mt-1">Companies already on the platform</p>
          </div>
        </div>

        <blockquote className="mt-10 max-w-3xl border-l-2 border-[var(--accent)] pl-5">
          <p className="text-lg md:text-xl text-[var(--text)] leading-relaxed">
            &ldquo;Together, {acquisition.huangQuote}&rdquo;
          </p>
          <footer className="mt-3 text-sm text-[var(--text-muted)]">
            — Jensen Huang, Nvidia CEO, announcing the acquisition
          </footer>
        </blockquote>

        <div className="mt-6">
          <Citation sources={acquisitionCitations} />
        </div>
      </div>
    </header>
  )
}
