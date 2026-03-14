import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Shield, Star } from 'lucide-react'
import { useFadeIn } from '@/hooks/use-fade-in'
import type { PricingPlan, MaintenanceContract } from '@/types/business'

// --- Donnees metier (source unique de verite) ---
// Conforme Business Plan BDC Digital 2026-2028, section 4.2

const PACKS: PricingPlan[] = [
  {
    id: 'pack-presence-pro',
    name: 'Presence Pro',
    basePriceHT: 1_200,
    federCoverageRate: 0.8,
    federAmountHT: 960,
    remainingChargeHT: 240,
    highlighted: false,
    features: [
      { label: 'Site vitrine responsive (3-4 pages)', included: true },
      { label: 'Hebergement securise (HTTPS, SSL Grade A)', included: true },
      { label: 'Formulaire de contact fonctionnel', included: true },
      { label: 'Mentions legales conformes', included: true },
    ],
  },
  {
    id: 'pack-visibilite-avancee',
    name: 'Visibilite Avancee',
    basePriceHT: 2_500,
    federCoverageRate: 0.8,
    federAmountHT: 2_000,
    remainingChargeHT: 500,
    highlighted: false,
    features: [
      { label: 'Site pro (5-6 pages, responsive, SEO on-page)', included: true },
      { label: 'Referencement local (Google Business Profile)', included: true },
      { label: 'Mise en conformite technique (HTTPS, durcissement)', included: true },
      { label: 'Accompagnement dossier Kap Numerik', included: true },
    ],
  },
  {
    id: 'pack-business-premium',
    name: 'Business Premium',
    basePriceHT: 4_000,
    federCoverageRate: 0.8,
    federAmountHT: 3_200,
    remainingChargeHT: 800,
    highlighted: true,
    features: [
      { label: 'Site web pro (5-8 pages, responsive, SEO technique)', included: true },
      { label: 'SEO local + technique (GMB + structure avancee)', included: true },
      { label: 'Securite renforcee (HTTPS, durcissement, monitoring)', included: true },
      { label: 'Montage administratif complet (sequence obligatoire)', included: true },
      { label: 'Tableau de bord performances (Lighthouse, uptime)', included: true },
    ],
  },
]

const PACTE_SERENITE: MaintenanceContract = {
  name: 'Pacte de Serenite',
  monthlyPriceHT: 49,
  services: [
    'Hebergement & disponibilite (objectif 99,9 %)',
    'Sauvegardes automatisees',
    'Mises a jour de securite',
    'Monitoring / alerting',
  ],
}

// --- Sous-composants ---

interface PriceBreakdownProps {
  plan: PricingPlan
  compact?: boolean
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ plan, compact = false }) => (
  <div className={`space-y-2 rounded-xl bg-white/[0.03] border border-white/10 ${compact ? 'p-4 mb-4' : 'p-5 mb-6'}`}>
    {/* Prix de base barre */}
    <div className="flex items-center justify-between">
      <span className="text-sm text-zinc-500">Prix de base</span>
      <span
        className={`font-bold text-zinc-600 line-through ${compact ? 'text-base' : 'text-lg'}`}
        aria-label={`Prix de base avant prise en charge : ${plan.basePriceHT.toLocaleString('fr-FR')} euros hors taxes`}
      >
        {plan.basePriceHT.toLocaleString('fr-FR')} EUR HT
      </span>
    </div>

    {/* Prise en charge FEDER */}
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-emerald-400">
        Prise en charge FEDER ({(plan.federCoverageRate * 100).toFixed(0)} %)
      </span>
      <span className={`font-bold text-emerald-400 ${compact ? 'text-base' : 'text-lg'}`}>
        - {plan.federAmountHT.toLocaleString('fr-FR')} EUR
      </span>
    </div>

    <hr className="border-white/10" />

    {/* Reste a charge */}
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-zinc-100">Reste a charge</span>
      <div className="flex items-baseline gap-1">
        <span className={`font-bold tracking-tighter text-emerald-400 ${compact ? 'text-3xl' : 'text-4xl'}`}>
          {plan.remainingChargeHT.toLocaleString('fr-FR')}
        </span>
        <span className={`text-emerald-400 ${compact ? 'text-base' : 'text-lg'}`}>EUR HT</span>
      </div>
    </div>
  </div>
)

interface PackCardProps {
  plan: PricingPlan
  onCTA: () => void
}

const PackCard: React.FC<PackCardProps> = ({ plan, onCTA }) => {
  const isHighlighted = plan.highlighted

  return (
    <Card
      className={`bg-bdc-surface p-6 md:p-8 transition-all duration-base relative flex flex-col hover:-translate-y-0.5 transition-transform ${
        isHighlighted
          ? 'border-emerald-400/40 ring-1 ring-emerald-400/20 md:scale-105 md:-my-4 z-10 hover:shadow-lg hover:shadow-emerald-500/5'
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {isHighlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-emerald-500 text-white border-0 font-semibold text-xs px-3 py-1 flex items-center gap-1.5">
            <Star className="w-3 h-3" aria-hidden="true" />
            Offre phare
          </Badge>
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className={`font-bold tracking-tight text-zinc-100 ${isHighlighted ? 'text-2xl' : 'text-xl'}`}>
            {plan.name}
          </h3>
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-400/30 font-medium text-xs whitespace-nowrap rounded-full px-3 py-1">
            Eligible Kap Numerik
          </Badge>
        </div>

        <PriceBreakdown plan={plan} compact={!isHighlighted} />

        <p className="text-xs text-zinc-600">
          Sous reserve d'eligibilite et validation par la Region Reunion.
        </p>
      </div>

      <div className="space-y-2.5 mb-6 flex-1">
        {plan.features.map((feat) => (
          <div key={feat.label} className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-zinc-400">{feat.label}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={onCTA}
        className={`w-full font-medium rounded-lg transition-colors duration-base ${
          isHighlighted
            ? 'bg-white text-black hover:bg-zinc-200'
            : 'bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/30'
        }`}
        aria-label={isHighlighted ? `Verifier mon reste a charge pour ${plan.name}` : `Decouvrir l'offre ${plan.name}`}
      >
        {isHighlighted ? 'Verifier mon reste a charge' : 'Decouvrir cette offre'}
      </Button>
    </Card>
  )
}

interface MaintenanceCardProps {
  contract: MaintenanceContract
}

const MaintenanceCardComponent: React.FC<MaintenanceCardProps> = ({ contract }) => (
  <Card className="bg-bdc-surface border-bdc-border p-8 hover:border-white/20 transition-all duration-base">
    <div className="mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-emerald-400" aria-hidden="true" />
          <h3 className="text-2xl font-bold tracking-tight text-zinc-100">{contract.name}</h3>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-400/30 font-medium text-xs rounded-full px-3 py-1">
          Protection continue
        </Badge>
      </div>
      <p className="text-xs tracking-widest uppercase text-zinc-500 font-medium mb-4">
        Maintien en Condition Operationnelle (MCO)
      </p>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tighter text-zinc-100">{contract.monthlyPriceHT}</span>
        <span className="text-zinc-500 text-sm">EUR HT / mois</span>
      </div>
    </div>
    <div className="space-y-3 mb-8">
      {contract.services.map((service) => (
        <div key={service} className="flex items-start gap-3">
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span className="text-sm text-zinc-400">{service}</span>
        </div>
      ))}
    </div>
    <Button
      onClick={() => {
        const el = document.getElementById('eligibilite')
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      className="w-full bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/30 transition-all duration-base font-medium rounded-lg"
    >
      Activer la maintenance
    </Button>
  </Card>
)

// --- Composant principal ---

const PricingKapNumerik: React.FC = () => {
  const { ref, isVisible } = useFadeIn()

  const scrollToEligibilite = () => {
    const el = document.getElementById('eligibilite')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="kap-numerik" className="bg-bdc-surface bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/20 via-transparent to-transparent py-24 md:py-36 px-6 md:px-8">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto fade-in-section ${isVisible ? 'is-visible' : ''}`}
      >
        <p className="text-xs tracking-widest uppercase text-zinc-500 font-medium mb-4 text-center">
          Dispositif Kap Numerik — FEDER
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-5 text-center text-zinc-100">
          Votre site pro des 240 EUR.
        </h2>
        <p className="text-zinc-400 text-center mb-16 max-w-2xl mx-auto">
          Grace au dispositif Kap Numerik, beneficiez d'une prise en charge FEDER
          de 80 % sur votre projet d'ingenierie logicielle. Trois formules adaptees a chaque besoin.
        </p>

        {/* Grille 3 packs */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-start mb-12">
          {PACKS.map((pack) => (
            <PackCard key={pack.id} plan={pack} onCTA={scrollToEligibilite} />
          ))}
        </div>

        {/* Pacte de Serenite — pleine largeur */}
        <div className="max-w-2xl mx-auto">
          <MaintenanceCardComponent contract={PACTE_SERENITE} />
        </div>
      </div>
    </section>
  )
}

export default PricingKapNumerik
