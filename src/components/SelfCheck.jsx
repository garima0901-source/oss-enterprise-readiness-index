import { useState } from 'react'
import Section from './Section'

const QUESTIONS = [
  {
    id: 'sensitivity',
    prompt: 'How sensitive is the data your models or pipelines would touch?',
    options: [
      { value: 'public', label: 'Public or low-sensitivity data' },
      { value: 'internal', label: 'Internal / confidential business data' },
      { value: 'regulated', label: 'Regulated data — PII, PHI, financial records' },
    ],
  },
  {
    id: 'scale',
    prompt: 'Who would actually be using this?',
    options: [
      { value: 'solo', label: 'Just me, or a small team (under 10)' },
      { value: 'team', label: 'A department (10–100 people)' },
      { value: 'org', label: 'Org-wide (100+), across teams' },
    ],
  },
  {
    id: 'maturity',
    prompt: 'Where are you with open-source models today?',
    options: [
      { value: 'none', label: "Haven't started" },
      { value: 'experimenting', label: 'Experimenting / prototyping' },
      { value: 'production', label: 'Already running something in production' },
    ],
  },
]

function readout(answers) {
  const { sensitivity, scale, maturity } = answers
  const needsGovernance = sensitivity === 'regulated' || scale === 'org'
  const needsCollab = scale !== 'solo'

  let headline
  let body
  const links = []

  if (needsGovernance) {
    headline = 'Open source likely fits — but you need the Enterprise Hub, not the free tier.'
    body =
      'With regulated data or an org-wide footprint, the free Hub genuinely is not built for you: no SSO, no audit trail, no data residency guarantees. The Enterprise Hub adds exactly the controls that objection usually raises — SSO, audit logs, resource groups, GDPR-aligned storage regions, and SOC 2 Type II certification. That is a real gap to close before rollout, not a reason to avoid open source.'
    links.push({ label: 'Enterprise Hub docs', href: 'https://huggingface.co/docs/hub/enterprise' })
    links.push({ label: 'Security & compliance docs', href: 'https://huggingface.co/docs/hub/security' })
  } else if (needsCollab) {
    headline = 'A Team plan is probably the right starting point.'
    body =
      'You are past the point where a single free account makes sense — a Team plan gets you basic SSO, audit logs, resource groups, and shared private storage without the full Enterprise commitment. You can upgrade to Enterprise later if data sensitivity or scale increases.'
    links.push({ label: 'Compare Team vs Enterprise plans', href: 'https://huggingface.co/docs/hub/enterprise' })
  } else {
    headline = 'You can start on the free Hub today with no governance blockers.'
    body =
      'Low-sensitivity data and a small team means the main friction is usually technical, not compliance. Inference Endpoints let you deploy an open-source model behind a dedicated API without managing GPU infra yourself.'
    links.push({ label: 'Inference Endpoints docs', href: 'https://huggingface.co/docs/inference-endpoints' })
  }

  if (maturity === 'none') {
    links.push({ label: 'Hugging Face Hub quicktour', href: 'https://huggingface.co/docs/hub/quick-start' })
  }

  return { headline, body, links }
}

export default function SelfCheck() {
  const [answers, setAnswers] = useState({})
  const done = QUESTIONS.every((q) => answers[q.id])
  const result = done ? readout(answers) : null

  return (
    <Section
      id="self-check"
      eyebrow="Module 5 — Is Open Source Right for You"
      title="A short, honest self-check"
      subtitle="Three questions, a plain-language read-out, and links to the actual Hugging Face resources that apply — not a lead-gen form. Nothing here is submitted anywhere."
    >
      <div
        className="rounded-lg border p-6 md:p-8"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <div className="space-y-8">
          {QUESTIONS.map((q) => (
            <div key={q.id}>
              <p className="font-medium text-[var(--text)] mb-3">{q.prompt}</p>
              <div className="flex flex-wrap gap-2">
                {q.options.map((o) => {
                  const active = answers[q.id] === o.value
                  return (
                    <button
                      key={o.value}
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.value }))}
                      className="text-sm px-3.5 py-2 rounded-full border transition-colors"
                      style={
                        active
                          ? { background: 'var(--accent)', borderColor: 'var(--accent)', color: 'var(--surface)' }
                          : { borderColor: 'var(--border)', color: 'var(--text-muted)' }
                      }
                    >
                      {o.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {result && (
          <div className="mt-10 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
            <h3 className="text-lg font-semibold text-[var(--text)]">{result.headline}</h3>
            <p className="text-[var(--text-muted)] mt-3 leading-relaxed">{result.body}</p>
            <div className="flex flex-wrap gap-3 mt-5">
              {result.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs px-3 py-1.5 rounded border hover:bg-[var(--accent-soft)] transition-colors"
                  style={{ borderColor: 'var(--accent-border)', color: 'var(--accent)' }}
                >
                  {l.label} →
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}
