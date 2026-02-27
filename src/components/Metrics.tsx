import Reveal from '@/components/Reveal'

import type { Metric } from '@/types/business'

const METRICS: Metric[] = [
  { value: '98/100', label: 'Score Lighthouse', disclaimer: '(objectif interne)' },
  { value: '5 jours', label: 'Délai de déploiement', disclaimer: '(périmètre standard)' },
  { value: '3 200 €', label: 'Plafond Kap Numérik', disclaimer: '(selon éligibilité)' },
  { value: '100%', label: 'Propriété du code', disclaimer: '(cession après paiement complet)' },
]

const Metrics: React.FC = () => (
  <section className="section-dark py-20 md:py-24">
    <div className="bdc-container">
      <Reveal>
        <p className="eyebrow text-white/65">Repères d&apos;exécution</p>
      </Reveal>

      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {METRICS.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 60} className="rounded-[20px] border border-white/12 bg-white/[0.03] p-5 md:p-6">
            <p className="text-[42px] font-semibold leading-[0.92] tracking-[-0.04em] text-white">
              {metric.value}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.12em] text-white/62">{metric.label}</p>
            {metric.disclaimer && <p className="mt-1 text-xs text-white/45">{metric.disclaimer}</p>}
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <p className="mt-8 text-sm leading-relaxed text-white/55">
          Indicateurs cibles. Variables selon périmètre, contenus fournis et validation.
        </p>
      </Reveal>
    </div>
  </section>
)

export default Metrics
