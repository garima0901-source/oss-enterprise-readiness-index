export default function Closing() {
  return (
    <section className="py-16 md:py-24 border-b border-[var(--border)]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-lg md:text-xl text-[var(--text)] leading-relaxed">
          None of this is a pitch. It's a snapshot, fully sourced, of where open-source AI actually stands right now
          — and what changes for enterprise buyers now that Nvidia is behind it.
        </p>
        <a
          href="https://huggingface.co/enterprise"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-8 font-mono text-sm px-5 py-3 rounded-md border transition-colors hover:bg-[var(--accent-soft)]"
          style={{ borderColor: 'var(--accent-border)', color: 'var(--accent)' }}
        >
          Go deeper at huggingface.co/enterprise →
        </a>
        <p className="text-xs text-[var(--text-faint)] mt-4">
          This is an independent project. No affiliation with or endorsement by Hugging Face.
        </p>
      </div>
    </section>
  )
}
