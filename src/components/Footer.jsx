import { BUILD_DATE } from '../data/sources'

export default function Footer({ githubUrl, linkedinUrl }) {
  return (
    <footer className="py-12">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
          Every figure on this page is sourced, dated, and where possible independently reproducible — see
          citations and methodology notes throughout. This is an independent project, not affiliated with or
          endorsed by Hugging Face.
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 text-sm">
          <span className="text-[var(--text)]">Built by Garima</span>
          <span className="text-[var(--text-faint)]">·</span>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
            GitHub
          </a>
          <span className="text-[var(--text-faint)]">·</span>
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
            LinkedIn
          </a>
        </div>
        <p className="font-mono text-xs text-[var(--text-faint)] mt-6">Page last verified {BUILD_DATE}</p>
      </div>
    </footer>
  )
}
