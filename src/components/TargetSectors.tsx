import { UtensilsCrossed, HeartPulse, HardHat, Sparkles, Store } from 'lucide-react'
import { useFadeIn } from '@/hooks/use-fade-in'

interface Sector {
  icon: typeof UtensilsCrossed
  name: string
  benefit: string
}

const SECTORS: Sector[] = [
  {
    icon: UtensilsCrossed,
    name: 'Restaurants & Traiteurs',
    benefit:
      'Carte en ligne, reservation et visibilite locale pour attirer une clientele connectee.',
  },
  {
    icon: HeartPulse,
    name: 'Professionnels de Sante',
    benefit:
      'Prise de rendez-vous digitalisee, fiche praticien et conformite RGPD renforcee.',
  },
  {
    icon: HardHat,
    name: 'Artisans BTP',
    benefit:
      'Portfolio de realisations, demande de devis en ligne et referencement local qualifie.',
  },
  {
    icon: Sparkles,
    name: 'Beaute & Bien-etre',
    benefit:
      'Galerie de prestations, systeme de reservation et avis clients pour fideliser.',
  },
  {
    icon: Store,
    name: 'Commerces de proximite',
    benefit:
      'Catalogue produits, horaires et itineraire integres pour capter le trafic local.',
  },
]

export default function TargetSectors() {
  const { ref, isVisible } = useFadeIn()

  return (
    <section id="cibles" className="bg-bdc-surface py-24 md:py-36 px-6 md:px-8">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto fade-in-section ${isVisible ? 'is-visible' : ''}`}
      >
        <p className="text-xs tracking-widest uppercase text-zinc-500 font-medium mb-4">
          Secteurs cibles
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-5 text-zinc-100">
          Concu pour les TPE de La Reunion.
        </h2>
        <p className="text-zinc-400 mb-16 max-w-2xl leading-relaxed">
          Cinq secteurs prioritaires identifies dans notre Business Plan. Une offre
          adaptee a chaque metier, financee jusqu'a 80 % par le FEDER.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTORS.map((sector) => {
            const IconComponent = sector.icon
            return (
              <article
                key={sector.name}
                className="group rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-8 transition-[transform,border-color,box-shadow,background-color] duration-base hover:-translate-y-[2px] hover:border-emerald-400/30 hover:bg-emerald-500/5 hover:shadow-[0_26px_60px_-38px_rgba(0,0,0,0.9)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-500/10 transition-colors duration-base group-hover:bg-emerald-500/15">
                  <IconComponent className="w-6 h-6 text-emerald-400 transition-colors duration-base group-hover:text-emerald-300" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-bold tracking-tight text-zinc-100">
                  {sector.name}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {sector.benefit}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
