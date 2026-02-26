import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Code2, ShieldCheck, Zap, ChevronRight } from 'lucide-react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const infrastructuresRef = useRef<HTMLElement>(null)
  const methodsRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  }

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }
    }
  }

  const slideInLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
  }

  const slideInRight = {
    hidden: { opacity: 0, x: 80 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const scaleRotate = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as const }
    }
  }

  const infrastructures = [
    {
      title: 'Plateforme E-commerce',
      stack: 'Hébergement Cloud Dédié',
      loadTime: '0.8s',
      security: 'SSL Grade A',
      mco: 'Actif',
      status: 'Production Validée'
    },
    {
      title: 'Application B2B',
      stack: 'Next.js / Supabase',
      availability: '99.9%',
      security: 'Anti-DDoS',
      mco: 'Actif',
      status: 'Production Validée'
    }
  ]

  const methods = [
    {
      icon: Code2,
      title: 'Code Natif',
      description: 'Refus des templates lourds. Programmation optimisée.'
    },
    {
      icon: ShieldCheck,
      title: 'Sécurité Active',
      description: 'Sauvegardes automatisées, patchs de sécurité en temps réel.'
    },
    {
      icon: Zap,
      title: 'Conformité ZFANG',
      description: 'Code NAF 62.01Z, devis normalisés pour subventions.'
    }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-zinc-50">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold tracking-tight">BDC Web</span>
            <span className="w-1.5 h-1.5 bg-white rounded-sm"></span>
          </div>
          <Button 
            onClick={() => scrollToSection(ctaRef)}
            className="bg-white text-black hover:bg-zinc-100 font-semibold tracking-tight"
          >
            Vérifier mon éligibilité
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-800/50">
          <motion.div
            className="h-full bg-white"
            style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
            initial={{ scaleX: 0 }}
          />
        </div>
      </nav>

      <motion.section 
        className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tighter leading-none mb-6 max-w-4xl"
            variants={slideInLeft}
          >
            Ingénierie Web. Sans compromis. Que de la performance.
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-10 max-w-3xl"
            variants={slideInLeft}
          >
            Nous déployons des solutions logicielles et des infrastructures web haute disponibilité.
            Éligible aux dispositifs de financement régionaux.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={slideInLeft}
          >
            <Button 
              onClick={() => scrollToSection(infrastructuresRef)}
              className="bg-white text-black hover:bg-zinc-100 hover:scale-[1.02] transition-all duration-300 font-semibold tracking-tight text-base px-8 py-6"
            >
              Voir les Infrastructures
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => scrollToSection(ctaRef)}
              variant="outline"
              className="bg-zinc-950 text-white border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 hover:scale-[1.02] transition-all duration-300 font-semibold tracking-tight text-base px-8 py-6"
            >
              Audit Technique Gratuit
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="pb-20 md:pb-32 px-6 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-zinc-800"
            variants={staggerContainer}
          >
            <motion.div 
              className="flex flex-col items-start md:px-8 first:pl-0 last:pr-0"
              variants={fadeInScale}
            >
              <div className="text-5xl font-bold tracking-tighter mb-2">98/100</div>
              <div className="text-xs uppercase tracking-wide text-zinc-400 font-medium">
                Score de Performance
              </div>
            </motion.div>
            <motion.div 
              className="flex flex-col items-start md:px-8"
              variants={fadeInScale}
            >
              <div className="text-5xl font-bold tracking-tighter mb-2">100%</div>
              <div className="text-xs uppercase tracking-wide text-zinc-400 font-medium">
                Propriété du Code
              </div>
            </motion.div>
            <motion.div 
              className="flex flex-col items-start md:px-8"
              variants={fadeInScale}
            >
              <div className="text-5xl font-bold tracking-tighter mb-2">24/7</div>
              <div className="text-xs uppercase tracking-wide text-zinc-400 font-medium">
                Maintien Opérationnel
              </div>
            </motion.div>
            <motion.div 
              className="flex flex-col items-start md:px-8"
              variants={fadeInScale}
            >
              <div className="text-5xl font-bold tracking-tighter mb-2">0</div>
              <div className="text-xs uppercase tracking-wide text-zinc-400 font-medium">
                Dette Technique
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        ref={infrastructuresRef}
        className="bg-zinc-950 py-20 md:py-32 px-6 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold tracking-tight mb-12"
            variants={fadeInUp}
          >
            Infrastructures Déployées.
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            {infrastructures.map((project, index) => (
              <motion.div
                key={index}
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
              >
                <Card
                  className="bg-black border-zinc-800 p-6 md:p-8 hover:border-zinc-700 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 group"
                >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-zinc-400 text-sm">{project.stack}</p>
                  </div>
                  <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 font-medium">
                    {project.status}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {project.loadTime && (
                    <div className="flex items-center justify-between py-3 border-t border-zinc-800">
                      <span className="text-sm text-zinc-400">Temps de charge</span>
                      <span className="text-sm font-semibold">{project.loadTime}</span>
                    </div>
                  )}
                  {project.availability && (
                    <div className="flex items-center justify-between py-3 border-t border-zinc-800">
                      <span className="text-sm text-zinc-400">Disponibilité</span>
                      <span className="text-sm font-semibold">{project.availability}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-3 border-t border-zinc-800">
                    <span className="text-sm text-zinc-400">Sécurité</span>
                    <span className="text-sm font-semibold">{project.security}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-t border-zinc-800">
                    <span className="text-sm text-zinc-400">MCO</span>
                    <span className="text-sm font-semibold text-emerald-500">{project.mco}</span>
                  </div>
                </div>
              </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        ref={methodsRef}
        className="bg-white text-black py-20 md:py-32 px-6 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold tracking-tight mb-12"
            variants={fadeInUp}
          >
            Le Standard BDC.
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {methods.map((method, index) => {
              const Icon = method.icon
              return (
                <motion.div 
                  key={index} 
                  className="space-y-4"
                  variants={scaleRotate}
                >
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{method.title}</h3>
                  <p className="text-zinc-600 leading-relaxed">{method.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        ref={ctaRef}
        className="bg-zinc-950 py-20 md:py-32 px-6 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInScale}
      >
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={fadeInScale}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold tracking-tight mb-8"
            variants={fadeInUp}
          >
            Prêt à moderniser votre infrastructure ?
          </motion.h2>
          <motion.div variants={fadeInUp}>
            <Button 
              onClick={() => scrollToSection(methodsRef)}
              className="bg-white text-black hover:bg-zinc-100 hover:scale-[1.02] transition-all duration-300 font-semibold tracking-tight text-lg px-10 py-7"
            >
              Démarrer le déploiement
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

      <footer className="bg-black border-t border-zinc-800 py-8 px-6 md:px-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-zinc-400">
          <p>BDC Web - Programmation Informatique (62.01Z). Hébergement Haute Disponibilité.</p>
        </div>
      </footer>
    </div>
  )
}

export default App