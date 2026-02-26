import { Zap, ShieldCheck, Server, ChevronRight } from 'lucide-react'

interface MethodStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const STEPS: MethodStep[] = [
  {
    icon: <Zap className="w-6 h-6 text-white" />,
    title: 'Performance extrême',
    description:
      'Budget de performance alloué. Audit Lighthouse systématique. Latence optimisée, architecture Edge.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    title: 'QA bloquante',
    description:
      '7 critères bloquants validés avant toute mise en production. Aucune exception. PASS ou FAIL.',
  },
  {
    icon: <Server className="w-6 h-6 text-white" />,
    title: 'Procédure Kap Numérik',
    description:
      'Séquence obligatoire respectée. Montage administratif complet. Friction réduite au minimum.',
  },
]

const PIPELINE = ['1. Audit', '2. Spécification', '3. Déploiement', '4. Monitoring']

const ZeroDefectMethodology: React.FC = () => (
  <section id="zero-defaut" className="bg-white text-black py-20 md:py-32 px-6 md:px-8">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
        Le standard BDC. Scientifique. Zéro défaut.
      </h2>
      <p className="text-zinc-600 mb-12 max-w-2xl">
        Chaque mise en production passe des critères bloquants. PASS ou FAIL.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {STEPS.map((step) => (
          <div key={step.title} className="space-y-4">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="text-zinc-600 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {PIPELINE.map((label, index) => (
          <div key={label} className="flex items-center gap-3">
            <div className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
              {label}
            </div>
            {index < PIPELINE.length - 1 && (
              <ChevronRight className="w-5 h-5 text-zinc-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default ZeroDefectMethodology
