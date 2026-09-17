import Section from './Section'
import Citation from './Citation'
import { enterpriseFeatures, enterpriseCitations, enterpriseCustomers, enterpriseCustomersCitation } from '../data/sources'

export default function EnterpriseFeatures() {
  return (
    <Section
      id="enterprise"
      eyebrow="Module 4 — What Enterprise Actually Gets"
      title="The real objections, and the documented answers"
      subtitle="No marketing paraphrase — every answer below is drawn directly from Hugging Face's own Enterprise Hub and security documentation."
    >
      <div className="grid md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-lg overflow-hidden">
        {enterpriseFeatures.map((f) => (
          <div key={f.name} className="bg-[var(--surface)] p-6 flex flex-col">
            <h3 className="font-semibold text-[var(--text)] text-base">{f.name}</h3>
            <p className="text-sm italic text-[var(--text-faint)] mt-2">{f.objection}</p>
            <p className="text-sm text-[var(--text-muted)] mt-3 leading-relaxed flex-1">{f.answer}</p>
            <a
              href={`https://huggingface.co${f.doc}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs mt-4 text-[var(--accent)] hover:underline underline-offset-2 self-start"
            >
              huggingface.co{f.doc} →
            </a>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Citation sources={enterpriseCitations} />
      </div>

      <div className="mt-14 pt-10 border-t" style={{ borderColor: 'var(--border)' }}>
        <p className="font-mono text-xs tracking-widest uppercase text-[var(--text-faint)] mb-4">
          Who's actually on Enterprise Hub
        </p>
        <div className="flex flex-wrap gap-2">
          {enterpriseCustomers.map((c) => (
            <span
              key={c}
              className="text-sm px-3 py-1.5 rounded-full border text-[var(--text-muted)]"
              style={{ borderColor: 'var(--border)' }}
            >
              {c}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <Citation sources={[enterpriseCustomersCitation]} />
        </div>
      </div>
    </Section>
  )
}
