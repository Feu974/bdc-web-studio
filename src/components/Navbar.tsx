import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  id: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Infrastructures', id: 'infrastructures' },
  { label: 'Méthode Zéro Défaut', id: 'zero-defaut' },
  { label: 'Kap Numérik', id: 'kap-numerik' },
  { label: 'Éligibilité', id: 'eligibilite' },
]

const NAV_OFFSET = 110

const scrollToSection = (id: string) => {
  const target = document.getElementById(id)
  if (!target) {
    return
  }

  const y = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({ top: y, behavior: 'smooth' })
}

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('infrastructures')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const updateNavState = () => {
      setIsScrolled(window.scrollY > 20)

      const scanLine = window.scrollY + NAV_OFFSET + 24
      let current = NAV_ITEMS[0].id

      NAV_ITEMS.forEach((item) => {
        const section = document.getElementById(item.id)
        if (section && scanLine >= section.offsetTop) {
          current = item.id
        }
      })

      setActiveSection(current)
    }

    updateNavState()
    window.addEventListener('scroll', updateNavState, { passive: true })

    return () => window.removeEventListener('scroll', updateNavState)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (id: string) => {
    scrollToSection(id)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6">
        <div
          className={cn(
            'mx-auto flex w-full max-w-[1280px] items-center justify-between rounded-full border px-4 py-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[200ms] md:px-6',
            isScrolled
              ? 'border-[var(--bdc-hairline)] bg-white/70 shadow-[0_14px_40px_-30px_rgba(15,19,32,0.6)] backdrop-blur-xl'
              : 'border-transparent bg-transparent',
          )}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-left"
            aria-label="Retour en haut"
          >
            <div className="text-[22px] font-semibold leading-none tracking-[-0.05em]">BDC.</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[var(--bdc-color-muted)]">
              Studio d&apos;ingénierie web
            </div>
          </button>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Sections principales">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    'relative pb-1 text-sm tracking-[-0.01em] transition-colors duration-[200ms]',
                    isActive
                      ? 'text-[var(--bdc-color-ink)]'
                      : 'text-[var(--bdc-color-muted)] hover:text-[var(--bdc-color-ink)]',
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute inset-x-0 -bottom-0.5 h-px origin-left bg-[var(--bdc-color-ink)] transition-transform duration-[200ms]',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => handleNavClick('eligibilite')}
              className="bdc-button-primary hidden h-auto rounded-full px-5 py-2.5 text-sm md:inline-flex"
            >
              Demander un audit
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--bdc-hairline)] bg-white/75 text-[var(--bdc-color-ink)] backdrop-blur-md transition-all duration-[200ms] active:scale-[0.98] md:hidden"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/15 backdrop-blur-[1px] transition-opacity duration-[200ms] md:hidden',
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <aside
        id="mobile-menu"
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-[82%] max-w-[340px] border-l border-[var(--bdc-hairline)] bg-[var(--bdc-color-surface)] px-6 pb-8 pt-24 shadow-[0_24px_60px_-30px_rgba(18,24,40,0.55)] transition-transform duration-[200ms] md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <nav className="space-y-5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  'block w-full border-b border-[var(--bdc-hairline)] pb-3 text-left text-[17px] tracking-[-0.02em]',
                  isActive ? 'text-[var(--bdc-color-ink)]' : 'text-[var(--bdc-color-muted)]',
                )}
              >
                {item.label}
              </button>
            )
          })}
        </nav>

        <Button
          onClick={() => handleNavClick('eligibilite')}
          className="bdc-button-primary mt-8 h-auto w-full rounded-full px-6 py-3 text-base"
        >
          Vérifier mon éligibilité
        </Button>
      </aside>
    </>
  )
}

export default Navbar
