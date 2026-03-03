import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const HeroSection: React.FC = () => (
  <section className="relative pt-36 pb-24 md:pt-48 md:pb-40 px-6 md:px-8 overflow-hidden">
    {/* Subtle radial glow — ajoute de la profondeur sans surcharger */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-white/[0.02] rounded-full blur-3xl" />
    </div>

    <div className="relative max-w-7xl mx-auto">
      {/* Micro-label technique — espacement large, uppercase */}
      <p className="text-xs tracking-widest uppercase text-zinc-500 font-medium mb-6">
        Studio d'ingenierie logicielle — La Reunion
      </p>

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 max-w-5xl text-zinc-100">
        L'ingenierie logicielle des{' '}
        <span className="bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
          leaders reunionnais
        </span>
        .
      </h1>

      <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-12 max-w-2xl">
        Nous deployons des infrastructures web haute performance. Code proprietaire, securite renforcee,
        et jusqu'a 3 200 EUR de prise en charge via Kap Numerik (selon eligibilite).
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        {/* CTA Primaire — bg-white, seul element qui saute aux yeux */}
        <Button
          onClick={() => scrollToSection('eligibilite')}
          className="bg-white text-black hover:bg-zinc-200 transition-colors duration-300 font-medium text-base px-8 py-6 rounded-lg"
        >
          Demander un audit technique
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>

        {/* CTA Secondaire — fantome, bordure subtile */}
        <Button
          onClick={() => scrollToSection('infrastructures')}
          variant="outline"
          className="bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/30 transition-all duration-300 font-medium text-base px-8 py-6 rounded-lg"
        >
          Voir les architectures
        </Button>
      </div>

      <p className="text-xs tracking-wide text-zinc-600">
        Audit oriente performance / securite. Reponse 24-48h. Sans engagement.
      </p>
    </div>
  </section>
)

export default HeroSection
