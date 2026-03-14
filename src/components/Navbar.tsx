import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

interface NavLink {
  label: string;
  sectionId: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Nos offres', sectionId: 'kap-numerik' },
  { label: 'Infrastructures', sectionId: 'infrastructures' },
  { label: 'Methode Zero Defaut', sectionId: 'zero-defaut' },
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

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenuOpen(false)
    }
  }, [])

  return (
    <nav
      aria-label="Navigation principale"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-slow ${isScrolled
          ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#contenu-principal"
            className="flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded"
            role="img"
            aria-label="BDC Web — Accueil"
          >
            <span className="text-xl font-bold tracking-tight text-zinc-100">BDC.</span>
            <span className="w-1.5 h-1.5 bg-white rounded-sm" aria-hidden="true"></span>
          </a>

          {/* Nav links desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.sectionId}
                href={`#${link.sectionId}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.sectionId); }}
                className="relative text-sm text-zinc-500 hover:text-zinc-100 transition-colors duration-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded px-1 after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-emerald-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => scrollToSection('eligibilite')}
              className="hidden md:inline-flex bg-white text-black hover:bg-zinc-200 transition-colors duration-base font-medium text-sm px-5 py-2 rounded-lg"
            >
              Verifier mon eligibilite
            </Button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-zinc-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Menu mobile — glassmorphism */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-4" role="menu">
            {NAV_LINKS.map((link) => (
              <a
                key={link.sectionId}
                href={`#${link.sectionId}`}
                role="menuitem"
                onClick={(e) => { e.preventDefault(); scrollToSection(link.sectionId); }}
                className="block w-full text-left text-zinc-400 hover:text-zinc-100 transition-colors duration-base py-2 focus:outline-none focus:ring-2 focus:ring-white rounded px-1"
              >
                {link.label}
              </a>
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
