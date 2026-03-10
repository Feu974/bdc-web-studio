import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Shield } from 'lucide-react'
import type { PricingPlan, MaintenanceContract } from '@/types/business'

// --- Donnees metier (source unique de verite) ---

const PACK_BUSINESS_PREMIUM: PricingPlan = {
  id: 'pack-business-premium',
  name: 'Pack Business Premium',
  basePriceHT: 4_000,
  federCoverageRate: 0.8,
  federAmountHT: 3_200,
  remainingChargeHT: 800,
  highlighted: true,
  features: [
    { label: 'Site web pro (5-8 pages, responsive, SEO on-page)', included: true },
    { label: 'SEO local + technique (GMB + structure)', included: true },
    { label: 'Mise en conformite de base (HTTPS, durcissement standard)', included: true },
    { label: 'Montage administratif : accompagnement dossier (sequence obligatoire)', included: true },
  ],
}

const PACTE_SERENITE: MaintenanceContract = {
  name: 'Pacte de Serenite',
  monthlyPriceHT: 49,
  services: [
    'Hebergement & disponibilite (objectif 99,9%)',
    'Sauvegardes automatisees',
    'Mises a jour de securite',
    'Monitoring / alerting',
  ],
}

// --- Sous-composants ---

interface PriceBreakdownProps {
  plan: PricingPlan;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ plan }) => (
  <div className="space-y-3 rounded-xl bg-white/[0.03] border border-white/10 p-5 mb-6">
    {/* Prix de base barre */}
    <div className="flex items-center justify-between">
      <span className="text-sm text-zinc-500">Prix de base</span>
      <span className="text-lg font-bold text-zinc-600 line-through" aria-label={`Prix de base avant prise en charge : ${plan.basePriceHT.toLocaleString('fr-FR')} euros hors taxes`}>
        {plan.basePriceHT.toLocaleString('fr-FR')} EUR HT
      </span>
    </div>

    {/* Prise en charge FEDER */}
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-emerald-400">
        Prise en charge FEDER ({(plan.federCoverageRate * 100).toFixed(0)} %)
      </span>
      <span className="text-lg font-bold text-emerald-400">
        - {plan.federAmountHT.toLocaleString('fr-FR')} EUR
      </span>
    </div>

    <hr className="border-white/10" />

    {/* Reste a charge */}
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-zinc-100">Reste a charge</span>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tighter text-emerald-400">
          {plan.remainingChargeHT.toLocaleString('fr-FR')}
        </span>
        <span className="text-emerald-400 text-lg">EUR HT</span>
      </div>
    </div>
  </div>
)

interface MaintenanceCardProps {
  contract: MaintenanceContract;
}

const MaintenanceCardComponent: React.FC<MaintenanceCardProps> = ({ contract }) => (
  <Card className="bg-zinc-950 border-white/10 p-8 hover:border-white/20 transition-all duration-300">
    <div className="mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-emerald-400" aria-hidden="true" />
          <h3 className="text-2xl font-bold tracking-tight text-zinc-100">{contract.name}</h3>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-400/30 font-medium text-xs">
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
      className="w-full bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/30 transition-all duration-300 font-medium rounded-lg"
    >
      Activer la maintenance
    </Button>
  </Card>
)

// --- Composant principal ---

const PricingKapNumerik: React.FC = () => {
  const plan = PACK_BUSINESS_PREMIUM

  const scrollToEligibilite = () => {
    const el = document.getElementById('eligibilite')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="kap-numerik" className="bg-zinc-950 py-24 md:py-36 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-zinc-500 font-medium mb-4 text-center">
          Dispositif Kap Numerik
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-5 text-center text-zinc-100">
          Infrastructures eligibles. Reste a charge minimal.
        </h2>
        <p className="text-zinc-400 text-center mb-16 max-w-2xl mx-auto">
          Grace au dispositif Kap Numerik, beneficiez d'une prise en charge FEDER
          de {(plan.federCoverageRate * 100).toFixed(0)} % sur votre projet d'ingenierie logicielle.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Pack Business Premium */}
          <Card className="bg-zinc-950 border-white/10 p-8 hover:border-white/20 transition-all duration-300 ring-1 ring-white/20">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold tracking-tight text-zinc-100">{plan.name}</h3>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-400/30 font-medium text-xs">
                  Eligible Kap Numerik
                </Badge>
              </div>
              <p className="text-zinc-400 text-sm mb-6">
                L'offre phare eligible Kap Numerik — Ingenierie logicielle cle-en-main
              </p>

              <PriceBreakdown plan={plan} />

              <p className="text-xs text-zinc-600">
                Sous reserve d'eligibilite et validation par la Region Reunion.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {plan.features.map((feat) => (
                <div key={feat.label} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm text-zinc-400">{feat.label}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={scrollToEligibilite}
              className="w-full bg-white text-black hover:bg-zinc-200 transition-colors duration-300 font-medium rounded-lg"
            >
              Verifier mon reste a charge
            </Button>
          </Card>

          {/* Pacte de Serenite */}
          <MaintenanceCardComponent contract={PACTE_SERENITE} />
        </div>
      </div>
    </section>
  )
}

export default PricingKapNumerik
