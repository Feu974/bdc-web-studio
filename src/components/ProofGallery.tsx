import { CheckCircle2 } from 'lucide-react'

import Reveal from '@/components/Reveal'

const PROOF_BLOCKS = [
  {
    title: 'Performance + sécurité',
    description:
      'Budget de performance alloué à chaque projet. Durcissement de sécurité appliqué systématiquement.',
    features: [
      'Images format next-gen (WebP/AVIF)',
      'Mise en cache stratégique',
      'Certificat SSL Grade A minimum',
      'Headers de sécurité HTTP configurés',
    ],
    className: 'photo-frame photo-frame-a',
  },
  {
    title: 'Code + disponibilité',
    description:
      'Développement sur mesure, accès complet au repository Git et infrastructure surveillée en continu.',
    features: [
      'Code splitting et lazy loading',
      'Transfert de propriété documenté',
      'Monitoring proactif 24/7',
      'Sauvegardes automatisées quotidiennes',
    ],
    className: 'photo-frame photo-frame-b',
  },
]

const ProofGallery: React.FC = () => (
  <section id="infrastructures" className="py-20 md:py-28">
    <div className="bdc-container">
      <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="eyebrow">Infrastructures</p>
          <h2 className="type-h2 mt-4 max-w-[18ch]">Architecture web, pensée comme un studio.</h2>
        </div>

        <p className="type-body max-w-[62ch] lg:justify-self-end">
          Nous composons chaque projet comme une production: intention éditoriale, discipline technique,
          et lisibilité opérationnelle. Le fond reste minimal, la structure reste robuste.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
        {PROOF_BLOCKS.map((block, index) => (
          <Reveal key={block.title} delay={index * 80} className="space-y-6">
            <div className={block.className}>
              <span className="photo-badge">Preuve opérationnelle</span>
            </div>

            <div>
              <h3 className="text-[28px] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--bdc-color-ink)]">
                {block.title}
              </h3>
              <p className="mt-3 text-[16px] leading-[1.65] text-[var(--bdc-color-muted)] md:text-[17px]">
                {block.description}
              </p>
            </div>

            <ul className="space-y-2.5">
              {block.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-[15px] text-[var(--bdc-color-muted-strong)] md:text-base">
                  <CheckCircle2 className="mt-[2px] h-4 w-4 flex-shrink-0 text-[var(--bdc-color-accent)]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export default ProofGallery
