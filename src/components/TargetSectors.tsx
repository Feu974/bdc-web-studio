import { UtensilsCrossed, HeartPulse, HardHat, Sparkles, Store } from 'lucide-react'

interface Sector {
  icon: React.ReactNode
  name: string
  benefit: string
}

const SECTORS: Sector[] = [
  {
    icon: <UtensilsCrossed className="w-6 h-6 text-emerald-400" aria-hidden="true" />,
    name: 'Restaurants & Traiteurs',
    benefit:
      'Carte en ligne, reservation et visibilite locale pour attirer une clientele connectee.',
  },
  {
    icon: <HeartPulse className="w-6 h-6 text-emerald-400" aria-hidden="true" />,
    name: 'Professionnels de Sante',
    benefit:
      'Prise de rendez-vous digitalisee, fiche praticien et conformite RGPD renforcee.',
  },
  {
    icon: <HardHat className="w-6 h-6 text-emerald-400" aria-hidden="true" />,
    name: 'Artisans BTP',
    benefit:
      'Portfolio de realisations, demande de devis en ligne et referencement local qualifie.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-emerald-400" aria-hidden="true" />,
    name: 'Beaute & Bien-etre',
    benefit:
      'Galerie de prestations, systeme de reservation et avis clients pour fideliser.',
  },
  {
    icon: <Store className="w-6 h-6 text-emerald-400" aria-hidden="true" />,
    name: 'Commerces de proximite',
    benefit:
      'Catalogue produits, horaires et itineraire integres pour capter le trafic local.',
  },
]

export default function TargetSectors() {
  return (
    <section id="cibles" className="bg-black py-24 md:py-36 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
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
          {SECTORS.map((sector) => (
            <div
              key={sector.name}
              className="group rounded-2xl border border-white/10 bg-zinc-950 p-8 transition-colors duration-300 hover:border-emerald-400/30"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 flex items-center justify-center mb-5">
                {sector.icon}
              </div>
              <h3 className="text-lg font-bold tracking-tight text-zinc-100 mb-2">
                {sector.name}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {sector.benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
