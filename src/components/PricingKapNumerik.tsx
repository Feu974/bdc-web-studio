import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Shield } from 'lucide-react'
import type { PricingPlan, MaintenanceContract } from '@/types/business'

// ─── Données métier (source unique de vérité) ────────────────────────────────

const PACK_BUSINESS_PREMIUM: PricingPlan = {
  id: 'pack-business-premium',
  name: 'Pack Business Premium',
  basePriceHT: 4_000,
  federCoverageRate: 0.8,
  federAmountHT: 3_200,
  remainingChargeHT: 800,
  highlighted: true,
  features: [
    { label: 'Site web pro (5–8 pages, responsive, SEO on-page)', included: true },
    { label: 'SEO local + technique (GMB + structure)', included: true },
    { label: 'Mise en conformité de base (HTTPS, durcissement standard)', included: true },
    { label: 'Montage administratif : accompagnement dossier (séquence obligatoire)', included: true },
  ],
}

const PACTE_SERENITE: MaintenanceContract = {
  name: 'Pacte de Sérénité',
  monthlyPriceHT: 49,
  services: [
    'Hébergement & disponibilité (objectif 99,9%)',
    'Sauvegardes automatisées',
    'Mises à jour de sécurité',
    'Monitoring / alerting',
  ],
}

// ─── Sous-composants ─────────────────────────────────────────────────────────

interface PriceBreakdownProps {
  plan: PricingPlan;
}

/** Affiche le calcul financier Kap Numérik en 3 lignes explicites */
const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ plan }) => (
  <div className="space-y-3 rounded-xl bg-zinc-900/50 border border-zinc-800 p-5 mb-6">
    {/* Ligne 1 — Prix de base barré */}
    <div className="flex items-center justify-between">
      <span className="text-sm text-zinc-400">Prix de base</span>
      <span className="text-lg font-bold text-zinc-600 line-through">
        {plan.basePriceHT.toLocaleString('fr-FR')} € HT
      </span>
    </div>

    {/* Ligne 2 — Prise en charge FEDER (emerald) */}
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-emerald-400">
        Prise en charge FEDER ({(plan.federCoverageRate * 100).toFixed(0)} %)
      </span>
      <span className="text-lg font-bold text-emerald-400">
        − {plan.federAmountHT.toLocaleString('fr-FR')} €
      </span>
    </div>

    <hr className="border-zinc-800" />

    {/* Ligne 3 — Reste à charge */}
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-white">Reste à charge</span>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight text-emerald-400">
          {plan.remainingChargeHT.toLocaleString('fr-FR')}
        </span>
        <span className="text-emerald-400 text-lg">€ HT</span>
      </div>
    </div>
  </div>
)

interface MaintenanceCardProps {
  contract: MaintenanceContract;
}

const MaintenanceCardComponent: React.FC<MaintenanceCardProps> = ({ contract }) => (
  <Card className="bg-black border-zinc-800 p-8 hover:border-zinc-700 transition-all duration-300">
    <div className="mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-emerald-400" />
          <h3 className="text-2xl font-bold">{contract.name}</h3>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-400/30 font-medium">
          Protection continue
        </Badge>
      </div>
      <p className="text-zinc-400 text-sm mb-4">
        Maintien en Condition Opérationnelle (MCO)
      </p>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight">{contract.monthlyPriceHT}</span>
        <span className="text-zinc-400 text-sm">€ HT / mois</span>
      </div>
    </div>
    <div className="space-y-3 mb-8">
      {contract.services.map((service) => (
        <div key={service} className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <span className="text-sm text-zinc-300">{service}</span>
        </div>
      ))}
    </div>
    <Button
      onClick={() => {
        const el = document.getElementById('eligibilite')
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      className="w-full bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 font-semibold tracking-tight hover:scale-[1.02] transition-all duration-300"
    >
      Activer la maintenance
    </Button>
  </Card>
)

// ─── Composant principal ─────────────────────────────────────────────────────

const PricingKapNumerik: React.FC = () => {
  const plan = PACK_BUSINESS_PREMIUM

  const scrollToEligibilite = () => {
    const el = document.getElementById('eligibilite')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="kap-numerik" className="bg-zinc-950 py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center">
          Infrastructures éligibles. Reste à charge minimal.
        </h2>
        <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
          Grâce au dispositif Kap Numérik, bénéficiez d'une prise en charge FEDER
          de {(plan.federCoverageRate * 100).toFixed(0)} % sur votre projet d'ingénierie logicielle.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* ── Pack Business Premium ── */}
          <Card className="bg-black border-zinc-800 p-8 hover:border-zinc-700 transition-all duration-300 ring-2 ring-white">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-400/30 font-medium">
                  Éligible Kap Numérik
                </Badge>
              </div>
              <p className="text-zinc-400 text-sm mb-4">
                L'offre phare éligible Kap Numérik — Ingénierie logicielle clé-en-main
              </p>

              {/* Calcul financier explicite en 3 lignes */}
              <PriceBreakdown plan={plan} />

              <p className="text-xs text-zinc-500">
                Sous réserve d'éligibilité et validation par la Région Réunion.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {plan.features.map((feat) => (
                <div key={feat.label} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300">{feat.label}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={scrollToEligibilite}
              className="w-full bg-white text-black hover:bg-zinc-100 font-semibold tracking-tight hover:scale-[1.02] transition-all duration-300"
            >
              Vérifier mon reste à charge
            </Button>
          </Card>

          {/* ── Pacte de Sérénité ── */}
          <MaintenanceCardComponent contract={PACTE_SERENITE} />
        </div>
      </div>
    </section>
  )
}

export default PricingKapNumerik
