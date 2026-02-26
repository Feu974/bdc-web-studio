import type { Metric } from '@/types/business'

const METRICS: Metric[] = [
  { value: '98/100', label: 'Score Lighthouse', disclaimer: '(objectif interne)' },
  { value: '5 Jours', label: 'Délai de Déploiement', disclaimer: '(périmètre standard)' },
  { value: '3 200 €', label: 'Plafond Kap Numérik', disclaimer: '(selon éligibilité)' },
  { value: '100%', label: 'Propriété du Code', disclaimer: '(cession après paiement complet)' },
]

const MetricsBar: React.FC = () => (
  <section className="bg-zinc-950 border-y border-zinc-900 py-12 px-6 md:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-zinc-800">
        {METRICS.map((metric, index) => (
          <div key={metric.label} className="flex flex-col items-start md:px-8 first:pl-0 last:pr-0">
            <div
              className={`text-4xl md:text-5xl font-bold tracking-tighter mb-2 ${
                index === 2 ? 'text-emerald-400' : ''
              }`}
            >
              {metric.value}
            </div>
            <div className="text-xs uppercase tracking-wide text-zinc-400 font-medium">
              {metric.label}
            </div>
            {metric.disclaimer && (
              <div className="text-xs text-zinc-600 mt-1">{metric.disclaimer}</div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-zinc-600 text-center mt-8 max-w-3xl mx-auto">
        Indicateurs cibles. Variables selon périmètre, contenus fournis et validation.
      </p>
    </div>
  </section>
)

export default MetricsBar
