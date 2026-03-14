import type { LegalMentions } from '@/types/business'

// --- Donnees legales (source unique de verite) ---

const LEGAL: LegalMentions = {
  federNotice:
    "Ce projet a ete finance par l'Union Europeenne dans le cadre du programme FEDER-FSE+ Reunion dont l'Autorite de gestion est la Region Reunion. L'Europe s'engage a La Reunion avec le fonds FEDER.",
  nafActivity: 'Programmation Informatique',
  nafCode: '62.01Z',
  companyName: 'BDC Digital',
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
  { label: 'Tarifs Kap Numerik', sectionId: 'kap-numerik' },
  { label: 'Methode Zero Defaut', sectionId: 'zero-defaut' },
  { label: 'Verifier mon eligibilite', sectionId: 'eligibilite' },
]

// --- Composant ---

interface LegalFooterProps {
  onOpenLegal: (modal: 'mentions' | 'confidentialite') => void
}

const LegalFooter: React.FC<LegalFooterProps> = ({ onOpenLegal }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-zinc-950 py-14 px-6 md:px-8">
      {/* Separateur gradient top */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto pt-14">
        {/* Grille 3 colonnes */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {/* Col 1 — Identite */}
          <div>
            <div className="flex items-center gap-1.5 mb-4" aria-hidden="true">
              <span className="text-lg font-bold tracking-tight text-zinc-100">BDC.</span>
              <span className="w-1.5 h-1.5 bg-white rounded-sm" aria-hidden="true"></span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed mb-3">
              Studio de developpement specialise en ingenierie logicielle,
              deploiement et maintien en condition operationnelle.
            </p>
            <p className="text-xs text-zinc-700">
              Activite principale : {LEGAL.nafActivity} (NAF {LEGAL.nafCode})
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <nav aria-label="Liens du pied de page">
            <h3 className="text-xs tracking-widest uppercase text-zinc-500 font-medium mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.sectionId}>
                  <a
                    href={`#${link.sectionId}`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.sectionId); }}
                    className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors duration-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded px-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('mentions')}
                  className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors duration-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded px-1"
                >
                  Mentions legales
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('confidentialite')}
                  className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors duration-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded px-1"
                >
                  Politique de confidentialite
                </button>
              </li>
            </ul>
          </nav>

          {/* Col 3 — Mention FEDER obligatoire */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xs tracking-widest uppercase text-zinc-500 font-medium mb-4">
              Financement europeen
            </h3>
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-4">
              <p className="text-xs leading-relaxed text-emerald-300">
                {LEGAL.federNotice}
              </p>
            </div>
          </div>
        </div>

        {/* Barre de copyright — separateur gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" aria-hidden="true" />
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-zinc-600 sm:flex-row">
          <p>&copy; {currentYear} <span className="text-zinc-100 font-bold">{LEGAL.companyName}</span> — Studio de developpement. Tous droits reserves.</p>
          <p>Activite principale : {LEGAL.nafActivity} (NAF {LEGAL.nafCode})</p>
        </div>
      </div>
    </footer>
  )
}

export default LegalFooter
