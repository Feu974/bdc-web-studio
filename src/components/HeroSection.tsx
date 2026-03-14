import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { useFadeIn } from '@/hooks/use-fade-in'

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const HeroSection: React.FC = () => {
  const { ref, isVisible } = useFadeIn()

  return (
    <section className="relative pt-36 pb-24 md:pt-48 md:pb-40 px-6 md:px-8 overflow-hidden">
    {/* Gradient mesh background — profondeur visuelle CSS pur */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-950/40 rounded-full blur-3xl opacity-20" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-teal-900/30 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-zinc-950/80 rounded-full blur-3xl opacity-30" />
    </div>

    {/* Particules decoratives flottantes — CSS only, respects reduced motion */}
    <div className="absolute inset-0 pointer-events-none motion-safe:block hidden" aria-hidden="true">
      <div className="absolute top-[15%] left-[10%] w-32 h-32 bg-emerald-500 rounded-full opacity-[0.04] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[60%] right-[15%] w-24 h-24 bg-teal-500 rounded-full opacity-[0.06] animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-[40%] left-[60%] w-20 h-20 bg-emerald-500 rounded-full opacity-[0.04] animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute bottom-[20%] left-[25%] w-16 h-16 bg-teal-500 rounded-full opacity-[0.05] animate-pulse" style={{ animationDuration: '9s' }} />
    </div>

    <div
      ref={ref}
      className={`relative max-w-7xl mx-auto fade-in-section ${isVisible ? 'is-visible' : ''}`}
    >
      {/* Micro-label technique — espacement large, uppercase */}
      <p className="text-xs tracking-widest uppercase text-zinc-500 font-medium mb-6">
        Studio d'ingenierie logicielle — La Reunion
      </p>

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 max-w-5xl text-zinc-100">
        Votre site pro des{' '}
        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-200 bg-clip-text text-transparent">
          240 EUR
        </span>
        .
      </h1>

      <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-14 max-w-2xl">
        Grace au dispositif Kap Numerik, la Region finance jusqu'a 80 % de votre site internet.
        Trois formules adaptees a votre activite, de 240 a 800 EUR de reste a charge.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        {/* CTA Primaire — micro-gradient + shadow emerald au hover */}
        <Button
          onClick={() => scrollToSection('eligibilite')}
          className="bg-gradient-to-b from-white to-zinc-100 text-black hover:shadow-lg hover:shadow-emerald-500/10 hover:scale-[1.02] transition-[transform,box-shadow,background-color] duration-base font-medium text-base px-8 py-6 rounded-lg"
        >
          Verifier mon eligibilite
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>

        {/* CTA Secondaire — hover emerald subtil */}
        <Button
          onClick={() => scrollToSection('kap-numerik')}
          variant="outline"
          className="bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-emerald-400/30 transition-all duration-base font-medium text-base px-8 py-6 rounded-lg"
        >
          Decouvrir nos offres
        </Button>
      </div>

      <p className="text-xs tracking-wide text-zinc-600">
        Reponse sous 24-48h. Sans engagement. Eligible TPE La Reunion.
      </p>
    </div>
  </section>
  )
}

export default HeroSection
