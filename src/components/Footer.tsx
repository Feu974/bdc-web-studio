interface FooterLink {
  label: string
  sectionId: string
}

const FEDER_NOTICE =
  "Ce projet a été financé par l'Union Européenne dans le cadre du programme FEDER-FSE+ Réunion dont l'Autorité de gestion est la Région Réunion. L'Europe s'engage à La Réunion avec le fonds FEDER."

const NAF_ACTIVITY = 'Programmation Informatique'
const NAF_CODE = '62.01Z'
const COMPANY_NAME = 'BDC Web'

const FOOTER_LINKS: FooterLink[] = [
  { label: 'Infrastructures', sectionId: 'infrastructures' },
  { label: 'Méthode Zéro Défaut', sectionId: 'zero-defaut' },
  { label: 'Kap Numérik', sectionId: 'kap-numerik' },
  { label: 'Vérifier mon éligibilité', sectionId: 'eligibilite' },
]

const scrollToSection = (id: string) => {
  const target = document.getElementById(id)
  if (!target) {
    return
  }

  const y = target.getBoundingClientRect().top + window.scrollY - 110
  window.scrollTo({ top: y, behavior: 'smooth' })
}

const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--bdc-hairline)] bg-[var(--bdc-color-surface-soft)] py-14" role="contentinfo">
      <div className="bdc-container grid gap-10 lg:grid-cols-[0.9fr_0.55fr_1.05fr] lg:gap-14">
        <div>
          <div className="text-[24px] font-semibold leading-none tracking-[-0.05em] text-[var(--bdc-color-ink)]">BDC.</div>
          <p className="mt-2 text-[11px] uppercase tracking-[0.13em] text-[var(--bdc-color-muted)]">
            Studio d&apos;ingénierie web
          </p>

          <p className="mt-5 max-w-[40ch] text-sm leading-relaxed text-[var(--bdc-color-muted)]">
            Studio de développement spécialisé en ingénierie logicielle, déploiement et maintien en
            condition opérationnelle.
          </p>

          <p className="mt-4 text-xs leading-relaxed text-[var(--bdc-color-muted)]">
            Activité principale : {NAF_ACTIVITY} (NAF {NAF_CODE})
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.12em] text-[var(--bdc-color-muted)]">Navigation</h3>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_LINKS.map((link) => (
              <li key={link.sectionId}>
                <button
                  onClick={() => scrollToSection(link.sectionId)}
                  className="text-sm text-[var(--bdc-color-muted)] transition-colors duration-[200ms] hover:text-[var(--bdc-color-ink)]"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.12em] text-[var(--bdc-color-muted)]">
            Financement européen
          </h3>
          <div className="mt-4 rounded-[16px] border border-[var(--bdc-hairline-strong)] bg-white/75 p-4">
            <p className="text-xs leading-relaxed text-[var(--bdc-color-muted)]">{FEDER_NOTICE}</p>
          </div>
        </div>
      </div>

      <div className="bdc-container mt-10 border-t border-[var(--bdc-hairline)] pt-6 text-xs text-[var(--bdc-color-muted)]">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© {year} {COMPANY_NAME} — Studio de développement. Tous droits réservés.</p>
          <p>Activité principale : {NAF_ACTIVITY} (NAF {NAF_CODE})</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
