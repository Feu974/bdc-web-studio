import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const HeroSection: React.FC = () => (
  <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none mb-6 max-w-4xl">
        L'ingénierie logicielle des{' '}
        <span className="bg-gradient-to-r from-zinc-300 to-zinc-600 bg-clip-text text-transparent">
          leaders réunionnais
        </span>
        .
      </h1>
      <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-10 max-w-3xl">
        Nous déployons des infrastructures web haute performance. Code propriétaire, sécurité renforcée,
        et jusqu'à 3 200 € de prise en charge via Kap Numérik (selon éligibilité).
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button
          onClick={() => scrollToSection('eligibilite')}
          className="bg-white text-black hover:bg-zinc-100 hover:scale-[1.02] transition-all duration-300 font-semibold tracking-tight text-base px-8 py-6"
        >
          Demander un audit technique
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
        <Button
          onClick={() => scrollToSection('infrastructures')}
          variant="outline"
          className="bg-black text-white border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 hover:scale-[1.02] transition-all duration-300 font-semibold tracking-tight text-base px-8 py-6"
        >
          Voir les architectures
        </Button>
      </div>
      <p className="text-xs text-zinc-500 max-w-xl">
        Audit orienté performance / sécurité. Réponse 24–48h. Sans engagement.
      </p>
    </div>
  </section>
)

export default HeroSection
