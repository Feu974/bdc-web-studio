import type { LegalMentions } from '@/types/business'

// ─── Données légales (source unique de vérité) ──────────────────────────────

const LEGAL: LegalMentions = {
  federNotice:
    'Ce projet a été financé par l\'Union Européenne dans le cadre du programme FEDER-FSE+ Réunion dont l\'Autorité de gestion est la Région Réunion. L\'Europe s\'engage à La Réunion avec le fonds FEDER.',
  nafActivity: 'Programmation Informatique',
  nafCode: '62.01Z',
  companyName: 'BDC Web',
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

interface FooterLink {
  label: string;
  sectionId: string;
}

const FOOTER_LINKS: FooterLink[] = [
  { label: 'Tarifs Kap Numérik', sectionId: 'kap-numerik' },
  { label: 'Méthode Zéro Défaut', sectionId: 'zero-defaut' },
  { label: 'Vérifier mon éligibilité', sectionId: 'eligibilite' },
]

// ─── Composant ───────────────────────────────────────────────────────────────

const LegalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-zinc-800 py-12 px-6 md:px-8" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        {/* Grille 3 colonnes */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {/* Col 1 — Identité */}
          <div>
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-lg font-bold tracking-tight text-white">BDC.</span>
              <span className="w-1.5 h-1.5 bg-white rounded-sm"></span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-3">
              Studio de développement spécialisé en ingénierie logicielle,
              déploiement et maintien en condition opérationnelle.
            </p>
            <p className="text-xs text-zinc-600">
              Activité principale : {LEGAL.nafActivity} (NAF {LEGAL.nafCode})
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.sectionId}>
                  <button
                    onClick={() => scrollToSection(link.sectionId)}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Mention FEDER obligatoire */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300 mb-4">
              Financement européen
            </h3>
            <div className="rounded-lg border border-emerald-400/20 bg-emerald-500/5 p-4">
              <p className="text-xs leading-relaxed text-emerald-400/80">
                {LEGAL.federNotice}
              </p>
            </div>
          </div>
        </div>

        {/* Barre de copyright */}
        <hr className="border-zinc-800 mb-6" />
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-zinc-600 sm:flex-row">
          <p>© {currentYear} {LEGAL.companyName} — Studio de développement. Tous droits réservés.</p>
          <p>Activité principale : {LEGAL.nafActivity} (NAF {LEGAL.nafCode})</p>
        </div>
      </div>
    </footer>
  )
}

export default LegalFooter
