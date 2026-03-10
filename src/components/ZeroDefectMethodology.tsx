import { Zap, ShieldCheck, Server, ChevronRight } from 'lucide-react'

interface MethodStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const STEPS: MethodStep[] = [
  {
    icon: <Zap className="w-6 h-6 text-white" aria-hidden="true" />,
    title: 'Performance extreme',
    description:
      'Budget de performance alloue. Audit Lighthouse systematique. Latence optimisee, architecture Edge.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-white" aria-hidden="true" />,
    title: 'QA bloquante',
    description:
      '7 criteres bloquants valides avant toute mise en production. Aucune exception. PASS ou FAIL.',
  },
  {
    icon: <Server className="w-6 h-6 text-white" aria-hidden="true" />,
    title: 'Procedure Kap Numerik',
    description:
      'Sequence obligatoire respectee. Montage administratif complet. Friction reduite au minimum.',
  },
]

const PIPELINE = ['Audit', 'Specification', 'Deploiement', 'Monitoring']

const ZeroDefectMethodology: React.FC = () => (
  <section id="zero-defaut" className="bg-zinc-50 text-zinc-900 py-32 md:py-40 px-6 md:px-8">
    <div className="max-w-7xl mx-auto">
      <p className="text-xs tracking-widest uppercase text-zinc-400 font-medium mb-4">
        Methodologie Zero Defaut
      </p>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-5 text-zinc-900">
        Le standard BDC. Scientifique. Zero defaut.
      </h2>
      <p className="text-zinc-500 mb-16 max-w-2xl leading-relaxed">
        Chaque mise en production passe des criteres bloquants. PASS ou FAIL.
      </p>

      <div className="grid md:grid-cols-3 gap-10 mb-16">
        {STEPS.map((step) => (
          <div key={step.title} className="space-y-4">
            <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold tracking-tight text-zinc-900">{step.title}</h3>
            <p className="text-zinc-500 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>

      <ol className="flex flex-wrap gap-3 justify-center list-none p-0 m-0" aria-label="Pipeline de deploiement">
        {PIPELINE.map((label, index) => (
          <li key={label} className="flex items-center gap-3">
            <div className="px-5 py-2.5 bg-zinc-900 text-white rounded-full text-sm font-medium tracking-tight">
              {index + 1}. {label}
            </div>
            {index < PIPELINE.length - 1 && (
              <ChevronRight className="w-5 h-5 text-zinc-300" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </div>
  </section>
)

export default ZeroDefectMethodology
