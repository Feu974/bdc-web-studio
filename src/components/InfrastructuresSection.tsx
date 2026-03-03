import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, ShieldCheck, Code2, Server, CheckCircle } from 'lucide-react'
import type { InfrastructureCard } from '@/types/business'

const ICON_MAP = {
  zap: Zap,
  shield: ShieldCheck,
  code: Code2,
  server: Server,
} as const

const CARDS: InfrastructureCard[] = [
  {
    icon: 'zap',
    title: 'Performance',
    description: 'Budget de performance alloue a chaque projet. Temps de chargement optimises.',
    features: [
      'Images format next-gen (WebP/AVIF)',
      'Mise en cache strategique',
      'Code splitting et lazy loading',
    ],
  },
  {
    icon: 'shield',
    title: 'Securite',
    description: 'Durcissement de securite applique systematiquement. Protection multi-couches.',
    features: [
      'Certificat SSL Grade A minimum',
      'Protection anti-spam avancee',
      'Headers de securite HTTP configures',
    ],
  },
  {
    icon: 'code',
    title: 'Code proprietaire',
    description: "Pas de template pre-fabrique. Developpement sur mesure, vous en etes proprietaire.",
    features: [
      'Acces complet au repository Git',
      'Transfert de propriete documente',
      'Code maintenable et documente',
    ],
  },
  {
    icon: 'server',
    title: 'Disponibilite',
    description: "Infrastructure surveillee en continu. Interventions rapides en cas d'incident.",
    features: [
      'Monitoring proactif 24/7',
      'Sauvegardes automatisees quotidiennes',
      'Procedure de rollback immediate',
    ],
  },
]

const InfrastructuresSection: React.FC = () => (
  <section id="infrastructures" className="bg-zinc-950 py-24 md:py-36 px-6 md:px-8">
    <div className="max-w-7xl mx-auto">
      <p className="text-xs tracking-widest uppercase text-zinc-500 font-medium mb-4">
        Architecture technique
      </p>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-16 text-zinc-100">
        Infrastructures.
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {CARDS.map((card) => {
          const IconComponent = ICON_MAP[card.icon]
          return (
            <Card
              key={card.title}
              className="bg-white/[0.03] border-white/10 p-6 md:p-8 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-white/[0.05] rounded-xl flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors duration-300">
                  <IconComponent className="w-6 h-6 text-zinc-300" />
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-400/30 font-medium text-xs">
                  Standard BDC
                </Badge>
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-3 text-zinc-100">{card.title}</h3>
              <p className="text-sm text-zinc-500 mb-5">{card.description}</p>
              <ul className="space-y-2.5 text-sm">
                {card.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-400">{feat}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )
        })}
      </div>
    </div>
  </section>
)

export default InfrastructuresSection
