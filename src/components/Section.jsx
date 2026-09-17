export default function Section({ id, eyebrow, title, subtitle, children, className = '' }) {
  return (
    <section id={id} className={`py-16 md:py-24 border-b border-[var(--border)] ${className}`}>
      <div className="max-w-5xl mx-auto px-6">
        {eyebrow && (
          <p className="font-mono text-xs tracking-widest uppercase text-[var(--accent)] mb-3">{eyebrow}</p>
        )}
        {title && (
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-[var(--text)] mb-4 max-w-3xl">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-base md:text-lg text-[var(--text-muted)] max-w-2xl mb-10 leading-relaxed">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  )
}
