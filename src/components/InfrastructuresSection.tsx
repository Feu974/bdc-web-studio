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
    description: 'Budget de performance alloué à chaque projet. Temps de chargement optimisés.',
    features: [
      'Images format next-gen (WebP/AVIF)',
      'Mise en cache stratégique',
      'Code splitting et lazy loading',
    ],
  },
  {
    icon: 'shield',
    title: 'Sécurité',
    description: 'Durcissement de sécurité appliqué systématiquement. Protection multi-couches.',
    features: [
      'Certificat SSL Grade A minimum',
      'Protection anti-spam avancée',
      'Headers de sécurité HTTP configurés',
    ],
  },
  {
    icon: 'code',
    title: 'Code propriétaire',
    description: "Pas de template pré-fabriqué. Développement sur mesure, vous en êtes propriétaire.",
    features: [
      'Accès complet au repository Git',
      'Transfert de propriété documenté',
      'Code maintenable et documenté',
    ],
  },
  {
    icon: 'server',
    title: 'Disponibilité',
    description: "Infrastructure surveillée en continu. Interventions rapides en cas d'incident.",
    features: [
      'Monitoring proactif 24/7',
      'Sauvegardes automatisées quotidiennes',
      'Procédure de rollback immédiate',
    ],
  },
]

const InfrastructuresSection: React.FC = () => (
  <section id="infrastructures" className="bg-black py-20 md:py-32 px-6 md:px-8">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">
        Infrastructures.
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {CARDS.map((card) => {
          const IconComponent = ICON_MAP[card.icon]
          return (
            <Card
              key={card.title}
              className="bg-zinc-950 border-zinc-800 p-6 md:p-8 hover:border-zinc-700 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center border border-zinc-800">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-400/30 font-medium">
                  Standard BDC
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-sm text-zinc-400 mb-4">{card.description}</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                {card.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
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
