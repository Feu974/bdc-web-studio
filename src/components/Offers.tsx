import { CheckCircle2, Shield } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Reveal from '@/components/Reveal'

import type { MaintenanceContract, PricingPlan } from '@/types/business'

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

const scrollToEligibility = () => {
  const target = document.getElementById('eligibilite')
  if (!target) {
    return
  }

  const y = target.getBoundingClientRect().top + window.scrollY - 110
  window.scrollTo({ top: y, behavior: 'smooth' })
}

const Offers: React.FC = () => (
  <section id="kap-numerik" className="section-dark py-20 md:py-28">
    <div className="bdc-container">
      <Reveal className="max-w-[86ch]">
        <p className="eyebrow text-white/65">Kap Numérik</p>
        <h2 className="type-h2 mt-4 text-white">Infrastructures éligibles. Reste à charge minimal.</h2>
        <p className="mt-5 text-[16px] leading-[1.65] text-white/72 md:text-[18px]">
          Potentiel de prise en charge FEDER: {(PACK_BUSINESS_PREMIUM.federCoverageRate * 100).toFixed(0)} %,
          avec un plafond de {PACK_BUSINESS_PREMIUM.federAmountHT.toLocaleString('fr-FR')} €. Calcul présenté à
          titre indicatif, sous réserve d&apos;éligibilité et validation Région.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal className="noise-surface rounded-[28px] border border-white/14 bg-white/[0.03] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-[30px] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
              {PACK_BUSINESS_PREMIUM.name}
            </h3>
            <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.1em] text-white/78">
              Potentiel FEDER
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/70">
            L&apos;offre phare Kap Numérik pour lancer une présence web solide et maintenable.
          </p>

          <div className="mt-7 space-y-4 rounded-[18px] border border-white/12 bg-black/20 p-5 md:p-6">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-white/62">Prix de base</span>
              <span className="text-lg font-semibold text-white/35 line-through">
                {PACK_BUSINESS_PREMIUM.basePriceHT.toLocaleString('fr-FR')} € HT
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-white/75">
                Potentiel de prise en charge FEDER ({(PACK_BUSINESS_PREMIUM.federCoverageRate * 100).toFixed(0)} %)
              </span>
              <span className="text-lg font-semibold text-[#72d8be]">
                - {PACK_BUSINESS_PREMIUM.federAmountHT.toLocaleString('fr-FR')} €
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-white/75">Plafond FEDER</span>
              <span className="text-lg font-semibold text-[#72d8be]">
                {PACK_BUSINESS_PREMIUM.federAmountHT.toLocaleString('fr-FR')} €
              </span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex items-end justify-between gap-4">
              <span className="text-sm font-semibold text-white">Reste à charge estimatif</span>
              <div className="text-right">
                <p className="text-[42px] font-semibold leading-[0.92] tracking-[-0.04em] text-white">
                  {PACK_BUSINESS_PREMIUM.remainingChargeHT.toLocaleString('fr-FR')} €
                </p>
                <p className="text-xs text-white/62">HT</p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-white/58">
            Sous réserve d&apos;éligibilité et validation Région.
          </p>

          <ul className="mt-7 space-y-2.5">
            {PACK_BUSINESS_PREMIUM.features.map((feature) => (
              <li key={feature.label} className="flex items-start gap-2.5 text-sm text-white/82 md:text-[15px]">
                <CheckCircle2 className="mt-[2px] h-4 w-4 flex-shrink-0 text-[#72d8be]" />
                <span>{feature.label}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={scrollToEligibility}
            className="bdc-button-primary mt-8 h-auto rounded-full px-7 py-3.5 text-base"
          >
            Vérifier mon reste à charge
          </Button>
        </Reveal>

        <Reveal delay={90} className="space-y-6">
          <div className="rounded-[24px] border border-white/14 bg-white/[0.03] p-6 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[30px] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
                {PACTE_SERENITE.name}
              </h3>
              <Shield className="h-5 w-5 text-[#72d8be]" />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-white/72">
              Maintien en Condition Opérationnelle (MCO)
            </p>

            <p className="mt-4 text-[46px] font-semibold leading-[0.92] tracking-[-0.04em] text-white">
              {PACTE_SERENITE.monthlyPriceHT}
              <span className="ml-1 text-[26px]">€</span>
            </p>
            <p className="text-sm text-white/62">HT / mois</p>

            <ul className="mt-6 space-y-2.5">
              {PACTE_SERENITE.services.map((service) => (
                <li key={service} className="flex items-start gap-2.5 text-sm text-white/82 md:text-[15px]">
                  <CheckCircle2 className="mt-[2px] h-4 w-4 flex-shrink-0 text-[#72d8be]" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={scrollToEligibility}
              className="bdc-button-secondary mt-7 h-auto rounded-full border-white/30 bg-white/5 px-6 py-3 text-base text-white hover:bg-white/10"
            >
              Activer la maintenance
            </Button>
          </div>

          <div className="rounded-[18px] border border-white/10 bg-black/20 p-5 text-xs leading-relaxed text-white/58">
            Les montants affichés sont exprimés HT, à titre indicatif. Ils dépendent du périmètre validé,
            des contenus fournis et du respect de la séquence administrative.
          </div>
        </Reveal>
      </div>
    </div>
  </section>
)

export default Offers
