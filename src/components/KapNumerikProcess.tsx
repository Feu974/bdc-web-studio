import { ClipboardCheck, FolderOpen, BadgeCheck, Rocket, RefreshCcw } from 'lucide-react'

interface ProcessStep {
  index: number
  icon: React.ReactNode
  title: string
  description: string
}

const STEPS: ProcessStep[] = [
  {
    index: 1,
    icon: <ClipboardCheck className="w-6 h-6 text-emerald-400" aria-hidden="true" />,
    title: "Audit d'eligibilite",
    description:
      'Verification de votre statut TPE, de votre siege social a La Reunion et de votre conformite au dispositif Kap Numerik.',
  },
  {
    index: 2,
    icon: <FolderOpen className="w-6 h-6 text-emerald-400" aria-hidden="true" />,
    title: 'Montage du dossier FEDER',
    description:
      'Constitution complete du dossier administratif : pieces justificatives, devis detaille, plan de financement.',
  },
  {
    index: 3,
    icon: <BadgeCheck className="w-6 h-6 text-emerald-400" aria-hidden="true" />,
    title: 'Validation Region',
    description:
      "Depot et suivi du dossier aupres de la Region Reunion. Notification d'attribution de la subvention FEDER.",
  },
  {
    index: 4,
    icon: <Rocket className="w-6 h-6 text-emerald-400" aria-hidden="true" />,
    title: 'Deploiement',
    description:
      'Conception, developpement et mise en production de votre site web selon la methodologie Zero Defaut.',
  },
  {
    index: 5,
    icon: <RefreshCcw className="w-6 h-6 text-emerald-400" aria-hidden="true" />,
    title: 'Demande de remboursement',
    description:
      'Transmission du dossier de solde a la Region pour obtenir le remboursement FEDER de 80 % du montant HT.',
  },
]

export default function KapNumerikProcess() {
  return (
    <section id="processus-kap" className="bg-zinc-950 py-32 md:py-40 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-zinc-500 font-medium mb-4">
          Processus Kap Numerik
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-5 text-zinc-100">
          Prise en charge de A a Z.
        </h2>
        <p className="text-zinc-400 mb-16 max-w-2xl leading-relaxed">
          Nous gerons l'integralite de la procedure administrative pour que vous
          puissiez vous concentrer sur votre activite.
        </p>

        <div className="relative">
          {/* Connector line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-400/40 via-emerald-400/20 to-transparent hidden md:block"
            aria-hidden="true"
          />

          <ol className="space-y-10 list-none p-0 m-0">
            {STEPS.map((step) => (
              <li key={step.index} className="relative md:pl-20">
                {/* Step number badge */}
                <div className="absolute left-0 top-0 hidden md:flex w-12 h-12 rounded-full border border-emerald-400/30 bg-black items-center justify-center text-sm font-bold text-emerald-400">
                  {step.index}
                </div>

                <div className="rounded-2xl border border-white/10 bg-black p-8 transition-colors duration-300 hover:border-emerald-400/20">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="md:hidden flex w-8 h-8 rounded-full border border-emerald-400/30 bg-black items-center justify-center text-xs font-bold text-emerald-400">
                      {step.index}
                    </span>
                    {step.icon}
                    <h3 className="text-lg font-bold tracking-tight text-zinc-100">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed md:ml-0">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
