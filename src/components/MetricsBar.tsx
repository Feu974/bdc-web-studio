import type { Metric } from '@/types/business'

const METRICS: Metric[] = [
  { value: '98/100', label: 'Score Lighthouse', disclaimer: '(objectif interne)' },
  { value: '5 Jours', label: 'Delai de Deploiement', disclaimer: '(perimetre standard)' },
  { value: '3 200 EUR', label: 'Plafond Kap Numerik', disclaimer: '(selon eligibilite)' },
  { value: '100%', label: 'Propriete du Code', disclaimer: '(cession apres paiement complet)' },
]

const MetricsBar: React.FC = () => (
  <section className="bg-zinc-950 border-y border-white/10 py-16 px-6 md:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x divide-white/10">
        {METRICS.map((metric, index) => (
          <div key={metric.label} className="flex flex-col items-start md:px-8 first:pl-0 last:pr-0">
            <div
              className={`text-4xl md:text-5xl font-bold tracking-tighter mb-3 ${
                index === 2 ? 'text-emerald-400' : 'text-zinc-100'
              }`}
            >
              {metric.value}
            </div>
            <div className="text-xs tracking-widest uppercase text-zinc-500 font-medium">
              {metric.label}
            </div>
            {metric.disclaimer && (
              <div className="text-xs text-zinc-700 mt-1">{metric.disclaimer}</div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-zinc-700 text-center mt-10 max-w-3xl mx-auto">
        Indicateurs cibles. Variables selon perimetre, contenus fournis et validation.
      </p>
    </div>
  </section>
)

export default MetricsBar
