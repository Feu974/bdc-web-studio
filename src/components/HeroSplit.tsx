import { ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Reveal from '@/components/Reveal'

const scrollToSection = (id: string) => {
  const target = document.getElementById(id)
  if (!target) {
    return
  }

  const y = target.getBoundingClientRect().top + window.scrollY - 110
  window.scrollTo({ top: y, behavior: 'smooth' })
}

const HeroSplit: React.FC = () => (
  <section className="relative pt-32 md:pt-40">
    <div className="bdc-container grid items-center gap-14 pb-20 md:pb-28 lg:grid-cols-[1.02fr_0.98fr]">
      <Reveal className="space-y-8">
        <p className="eyebrow">Ingénierie logicielle à La Réunion</p>

        <h1 className="type-h1 max-w-[14ch]">
          L&apos;ingénierie logicielle des leaders réunionnais.
        </h1>

        <p className="type-body max-w-[58ch]">
          Nous déployons des infrastructures web haute performance. Code propriétaire, sécurité
          renforcée, et potentiel de prise en charge via Kap Numérik avec un plafond de 3 200 €, sous
          réserve d&apos;éligibilité et validation Région.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            onClick={() => scrollToSection('eligibilite')}
            className="bdc-button-primary h-auto rounded-full px-7 py-4 text-base"
          >
            Demander un audit technique
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => scrollToSection('infrastructures')}
            className="bdc-button-secondary h-auto rounded-full px-7 py-4 text-base"
          >
            Voir les architectures
          </Button>
        </div>

        <p className="text-sm leading-relaxed text-[var(--bdc-color-muted)]">
          Audit orienté performance / sécurité. Réponse 24–48h. Sans engagement.
        </p>
      </Reveal>

      <Reveal delay={80} className="lg:justify-self-end">
        <div className="stage-panel noise-surface">
          <div className="stage-glow stage-glow-a" aria-hidden="true" />
          <div className="stage-glow stage-glow-b" aria-hidden="true" />

          <div className="glass-panel absolute left-5 top-5 w-[72%] p-4 md:left-7 md:top-7 md:w-[68%] md:p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--bdc-color-muted)]">
              Audit initial
            </p>
            <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-[var(--bdc-color-ink)] md:text-xl">
              Performance + sécurité
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--bdc-color-muted)]">
              Relevé technique, plan d&apos;actions et priorisation sans sur-promesse.
            </p>
          </div>

          <div className="glass-panel absolute bottom-6 left-5 right-5 p-4 md:bottom-8 md:left-7 md:right-7 md:p-5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--bdc-color-muted)]">
                  Potentiel Kap Numérik
                </p>
                <p className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.03em] text-[var(--bdc-color-ink)]">
                  3 200 €
                </p>
                <p className="mt-1 text-xs text-[var(--bdc-color-muted)]">Plafond</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--bdc-color-muted)]">
                  Délai standard
                </p>
                <p className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.03em] text-[var(--bdc-color-ink)]">
                  5 jours
                </p>
                <p className="mt-1 text-xs text-[var(--bdc-color-muted)]">Périmètre type</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
)

export default HeroSplit
