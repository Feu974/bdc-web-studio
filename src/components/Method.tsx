import { ChevronRight, ShieldCheck, Zap, Server } from 'lucide-react'

import Reveal from '@/components/Reveal'

interface MethodStep {
  icon: React.ReactNode
  title: string
  description: string
}

const STEPS: MethodStep[] = [
  {
    icon: <Zap className="h-5 w-5 text-[var(--bdc-color-accent)]" />,
    title: 'Performance extrême',
    description:
      'Budget de performance alloué. Audit Lighthouse systématique. Latence optimisée, architecture Edge.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-[var(--bdc-color-accent)]" />,
    title: 'QA bloquante',
    description:
      '7 critères bloquants validés avant toute mise en production. Aucune exception. PASS ou FAIL.',
  },
  {
    icon: <Server className="h-5 w-5 text-[var(--bdc-color-accent)]" />,
    title: 'Procédure Kap Numérik',
    description:
      'Séquence obligatoire respectée. Montage administratif complet. Friction réduite au minimum.',
  },
]

const PIPELINE = ['Audit', 'Spécification', 'Déploiement', 'Monitoring']

const Method: React.FC = () => (
  <section id="zero-defaut" className="py-20 md:py-28">
    <div className="bdc-container">
      <Reveal className="max-w-[80ch]">
        <p className="eyebrow">Méthode Zéro Défaut</p>
        <h2 className="type-h2 mt-4">Le standard BDC. Scientifique. Zéro défaut.</h2>
        <p className="mt-5 text-[16px] leading-[1.65] text-[var(--bdc-color-muted)] md:text-[18px]">
          Chaque mise en production passe des critères bloquants. PASS ou FAIL.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <Reveal className="noise-surface rounded-[24px] border border-[var(--bdc-hairline)] bg-[color:var(--bdc-color-surface)] p-6 md:p-7">
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--bdc-color-muted)]">Pipeline</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {PIPELINE.map((step, index) => (
              <div key={step} className="flex items-center gap-2.5">
                <div className="rounded-full border border-[var(--bdc-hairline-strong)] bg-white px-3 py-1.5 text-sm tracking-[-0.01em] text-[var(--bdc-color-ink)]">
                  {index + 1}. {step}
                </div>
                {index < PIPELINE.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-[var(--bdc-color-muted)]" />
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="space-y-5">
          {STEPS.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 70}
              className="rounded-[20px] border border-[var(--bdc-hairline)] bg-[color:var(--bdc-color-surface)] p-5 md:p-6"
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[var(--bdc-hairline-strong)] bg-white">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-[25px] font-semibold leading-[1.08] tracking-[-0.025em] text-[var(--bdc-color-ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.65] text-[var(--bdc-color-muted)] md:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default Method
