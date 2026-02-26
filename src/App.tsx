import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Code2, ShieldCheck, Zap, ChevronRight, Check } from 'lucide-react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { toast } from 'sonner'

function AnimatedCounter({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return
    
    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return <div ref={ref}>{count}{suffix}</div>
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const metricsRef = useRef<HTMLElement>(null)
  const infrastructuresRef = useRef<HTMLElement>(null)
  const methodsRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)
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

  const { scrollY: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const { scrollY: metricsScrollY } = useScroll({
    target: metricsRef,
    offset: ["start end", "end start"]
  })
  
  const { scrollY: infraScrollY } = useScroll({
    target: infrastructuresRef,
    offset: ["start end", "end start"]
  })
  
  const { scrollY: methodsScrollY } = useScroll({
    target: methodsRef,
    offset: ["start end", "end start"]
  })

  const { scrollY: pricingScrollY } = useScroll({
    target: pricingRef,
    offset: ["start end", "end start"]
  })

  const { scrollY: ctaScrollY } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"]
  })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Demande envoyée avec succès ! Nous vous contacterons sous 24h.')
    setIsContactModalOpen(false)
    setFormData({ name: '', email: '', company: '', message: '' })
  }

  const heroParallaxY = useTransform(heroScrollY, [0, 1000], [0, -200])
  const heroOpacity = useTransform(heroScrollY, [0, 500], [1, 0])
  const heroScale = useTransform(heroScrollY, [0, 500], [1, 0.95])

  const metricsParallaxY = useTransform(metricsScrollY, [0, 800], [60, -60])
  
  const infraParallaxY = useTransform(infraScrollY, [0, 1000], [100, -100])
  const infraScale = useTransform(infraScrollY, [0, 500, 1000], [0.95, 1, 0.98])
  
  const methodsParallaxY = useTransform(methodsScrollY, [0, 1000], [80, -80])
  const methodsRotate = useTransform(methodsScrollY, [0, 500, 1000], [-0.5, 0, 0.5])

  const pricingParallaxY = useTransform(pricingScrollY, [0, 1000], [70, -70])
  const pricingScale = useTransform(pricingScrollY, [0, 500, 1000], [0.97, 1, 0.98])

  const ctaParallaxY = useTransform(ctaScrollY, [0, 800], [50, -50])
  const ctaScale = useTransform(ctaScrollY, [0, 400, 800], [0.96, 1.02, 0.98])

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

  const pricingTiers = [
    {
      name: 'Starter',
      price: '2 500',
      period: 'forfait unique',
      description: 'Site vitrine professionnel',
      features: [
        '5 pages personnalisées',
        'Design responsive',
        'SEO optimisé',
        'Hébergement 1 an inclus',
        'SSL & sécurité de base',
        '2 révisions incluses'
      ]
    },
    {
      name: 'Business',
      price: '5 900',
      period: 'forfait unique',
      description: 'Application web sur mesure',
      features: [
        'Infrastructure cloud dédiée',
        'Base de données sécurisée',
        'API REST personnalisée',
        'Panel d\'administration',
        'MCO 24/7 pendant 3 mois',
        'Formation utilisateurs'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Sur devis',
      period: 'projet personnalisé',
      description: 'Solutions complexes haute disponibilité',
      features: [
        'Architecture microservices',
        'Scalabilité automatique',
        'CI/CD & DevOps',
        'SLA 99.9% garanti',
        'Support prioritaire',
        'Audit sécurité complet'
      ]
    }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-zinc-50 overflow-x-hidden">
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
            onClick={() => setIsContactModalOpen(true)}
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
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-8 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-transparent to-black pointer-events-none"
          style={{ 
            y: heroParallaxY,
            opacity: heroOpacity,
            scale: heroScale
          }}
        />
        <motion.div 
          className="absolute top-20 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"
          style={{ 
            y: heroParallaxY,
            x: useTransform(heroScrollY, [0, 500], [0, 100])
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none"
          style={{ 
            y: useTransform(heroScrollY, [0, 500], [0, -80]),
            x: useTransform(heroScrollY, [0, 500], [0, -50])
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
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
        ref={metricsRef}
        className="relative pb-20 md:pb-32 px-6 md:px-8 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.div 
          className="absolute top-0 right-1/3 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"
          style={{ 
            y: metricsParallaxY
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-zinc-800"
            variants={staggerContainer}
          >
            <motion.div 
              className="flex flex-col items-start md:px-8 first:pl-0 last:pr-0"
              variants={fadeInScale}
            >
              <div className="text-5xl font-bold tracking-tighter mb-2"><AnimatedCounter end={98} />/100</div>
              <div className="text-xs uppercase tracking-wide text-zinc-400 font-medium">
                Score de Performance
              </div>
            </motion.div>
            <motion.div 
              className="flex flex-col items-start md:px-8"
              variants={fadeInScale}
            >
              <div className="text-5xl font-bold tracking-tighter mb-2"><AnimatedCounter end={100} suffix="%" /></div>
              <div className="text-xs uppercase tracking-wide text-zinc-400 font-medium">
                Propriété du Code
              </div>
            </motion.div>
            <motion.div 
              className="flex flex-col items-start md:px-8"
              variants={fadeInScale}
            >
              <div className="text-5xl font-bold tracking-tighter mb-2"><AnimatedCounter end={24} />/7</div>
              <div className="text-xs uppercase tracking-wide text-zinc-400 font-medium">
                Maintien Opérationnel
              </div>
            </motion.div>
            <motion.div 
              className="flex flex-col items-start md:px-8"
              variants={fadeInScale}
            >
              <div className="text-5xl font-bold tracking-tighter mb-2"><AnimatedCounter end={0} /></div>
              <div className="text-xs uppercase tracking-wide text-zinc-400 font-medium">
                Dette Technique
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        ref={infrastructuresRef}
        className="relative bg-zinc-950 py-20 md:py-32 px-6 md:px-8 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div 
          className="absolute top-0 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none"
          style={{ 
            y: infraParallaxY,
            scale: infraScale
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"
          style={{ 
            y: useTransform(infraScrollY, [0, 1000], [-50, 50])
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
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
        className="relative bg-white text-black py-20 md:py-32 px-6 md:px-8 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={staggerContainer}
      >
        <motion.div 
          className="absolute top-1/4 right-0 w-72 h-72 bg-black/5 rounded-full blur-3xl pointer-events-none"
          style={{ 
            y: methodsParallaxY,
            rotate: methodsRotate
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none"
          style={{ 
            y: useTransform(methodsScrollY, [0, 1000], [60, -60]),
            scale: useTransform(methodsScrollY, [0, 500, 1000], [0.9, 1.05, 0.95])
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
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
        ref={pricingRef}
        className="relative bg-black py-20 md:py-32 px-6 md:px-8 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div 
          className="absolute top-1/3 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"
          style={{ 
            y: pricingParallaxY,
            scale: pricingScale
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"
          style={{ 
            y: useTransform(pricingScrollY, [0, 1000], [-60, 60])
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center"
            variants={fadeInUp}
          >
            Tarification Transparente.
          </motion.h2>
          <motion.p 
            className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Des formules adaptées à chaque besoin. Financement régional possible.
          </motion.p>
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                variants={fadeInScale}
              >
                <Card
                  className={`bg-zinc-950 border-zinc-800 p-8 h-full flex flex-col hover:border-zinc-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
                    tier.highlighted ? 'ring-2 ring-white' : ''
                  }`}
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-zinc-400 text-sm mb-4">{tier.description}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                      {tier.price !== 'Sur devis' && <span className="text-zinc-400">€</span>}
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">{tier.period}</p>
                  </div>
                  <div className="space-y-3 flex-grow">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-zinc-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    onClick={() => setIsContactModalOpen(true)}
                    className={`w-full mt-8 font-semibold tracking-tight ${
                      tier.highlighted 
                        ? 'bg-white text-black hover:bg-zinc-100' 
                        : 'bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800'
                    }`}
                  >
                    Demander un devis
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        ref={ctaRef}
        className="relative bg-zinc-950 py-20 md:py-32 px-6 md:px-8 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInScale}
      >
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"
          style={{ 
            y: ctaParallaxY,
            scale: ctaScale
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"
          style={{ 
            y: useTransform(ctaScrollY, [0, 800], [-40, 40]),
            x: useTransform(ctaScrollY, [0, 800], [0, -60])
          }}
        />
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
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

      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-zinc-50 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold tracking-tight">Vérifier mon éligibilité</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Remplissez ce formulaire pour recevoir une étude personnalisée sous 24h.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContactSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-200">Nom complet</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-zinc-50 focus:border-accent"
                placeholder="Jean Dupont"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-200">Email professionnel</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-zinc-50 focus:border-accent"
                placeholder="jean@entreprise.fr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-zinc-200">Entreprise</Label>
              <Input
                id="company"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-zinc-50 focus:border-accent"
                placeholder="Nom de votre société"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-zinc-200">Description du projet</Label>
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-zinc-900 border-zinc-800 text-zinc-50 focus:border-accent min-h-[100px]"
                placeholder="Décrivez brièvement votre besoin..."
              />
            </div>
            <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-100 font-semibold tracking-tight">
              Envoyer la demande
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App