import { Star } from 'lucide-react'
import type { Metric } from '@/types/business'

const METRICS: Metric[] = [
  { value: 'Des 240 EUR', label: 'Reste a Charge', disclaimer: '(Pack Presence Pro, selon eligibilite)' },
  { value: '5 Jours', label: 'Delai de Deploiement', disclaimer: '(perimetre standard)' },
  { value: '3 200 EUR', label: 'Plafond Kap Numerik', disclaimer: '(prise en charge FEDER 80 %)' },
  { value: '100%', label: 'Propriete du Code', disclaimer: '(cession apres paiement complet)' },
]

const MetricsBar: React.FC = () => (
  <section className="bg-zinc-950 border-y border-white/10 py-16 px-6 md:px-8" aria-label="Indicateurs cles">
    <div className="max-w-7xl mx-auto">
      <h2 className="sr-only">Indicateurs cles</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x divide-white/10">
        {METRICS.map((metric, index) => (
          <div key={metric.label} className="flex flex-col items-start md:px-8 first:pl-0 last:pr-0">
            <div
              className={`text-4xl md:text-5xl font-bold tracking-tighter mb-3 flex items-center gap-2 ${
                index === 0 ? 'text-emerald-400' : 'text-zinc-100'
              }`}
            >
              {index === 0 && <Star className="w-5 h-5 text-emerald-400 flex-shrink-0" aria-hidden="true" />}
              {metric.value}
            </div>
            <div className="text-xs tracking-widest uppercase text-zinc-500 font-medium">
              {metric.label}
              {index === 0 && <span className="sr-only"> — metrique mise en avant</span>}
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
