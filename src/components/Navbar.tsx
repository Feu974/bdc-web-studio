import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

interface NavLink {
  label: string;
  sectionId: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Infrastructures', sectionId: 'infrastructures' },
  { label: 'Methode Zero Defaut', sectionId: 'zero-defaut' },
  { label: 'Kap Numerik', sectionId: 'kap-numerik' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold tracking-tight text-zinc-100">BDC.</span>
            <span className="w-1.5 h-1.5 bg-white rounded-sm"></span>
          </div>

          {/* Nav links desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => scrollToSection(link.sectionId)}
                className="text-sm text-zinc-500 hover:text-zinc-100 transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => scrollToSection('eligibilite')}
              className="hidden md:inline-flex bg-white text-black hover:bg-zinc-200 transition-colors duration-300 font-medium text-sm px-5 py-2 rounded-lg"
            >
              Verifier mon eligibilite
            </Button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-zinc-300 hover:text-white transition-colors"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu mobile — glassmorphism */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => scrollToSection(link.sectionId)}
                className="block w-full text-left text-zinc-400 hover:text-zinc-100 transition-colors duration-300 py-2"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('eligibilite')}
              className="w-full bg-white text-black hover:bg-zinc-200 transition-colors font-medium rounded-lg"
            >
              Verifier mon eligibilite
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
