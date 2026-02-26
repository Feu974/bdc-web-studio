import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

interface NavLink {
  label: string;
  sectionId: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Infrastructures', sectionId: 'infrastructures' },
  { label: 'Méthode Zéro Défaut', sectionId: 'zero-defaut' },
  { label: 'Kap Numérik', sectionId: 'kap-numerik' },
]

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold tracking-tight">BDC.</span>
            <span className="w-1.5 h-1.5 bg-white rounded-sm"></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm">
            {NAV_LINKS.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => scrollToSection(link.sectionId)}
                className="text-zinc-400 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => scrollToSection('eligibilite')}
              className="hidden md:inline-flex bg-white text-black hover:bg-zinc-100 font-semibold tracking-tight transition-all duration-300"
            >
              Vérifier mon éligibilité
            </Button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-zinc-800 space-y-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => scrollToSection(link.sectionId)}
                className="block w-full text-left text-zinc-400 hover:text-white transition-colors duration-300 py-2"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('eligibilite')}
              className="w-full bg-white text-black hover:bg-zinc-100 font-semibold tracking-tight"
            >
              Vérifier mon éligibilité
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
