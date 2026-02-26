import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, ShieldCheck, Zap, Code2, Server, CheckCircle, Menu, X } from 'lucide-react'
import { toast } from 'sonner'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    size: '',
    budget: '',
    message: '',
    consent: false,
    honeypot: ''
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.honeypot) {
      return
    }

    console.log({
      nom: formData.name,
      societe: formData.company,
      email: formData.email,
      taille: formData.size,
      budget: formData.budget,
      timestamp: new Date().toISOString()
    })

    toast.success('Demande envoyée')
    
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      size: '',
      budget: '',
      message: '',
      consent: false,
      honeypot: ''
    })
  }

  return (
    <div className="min-h-screen bg-black text-zinc-50">
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
              <button
                onClick={() => scrollToSection('infrastructures')}
                className="text-zinc-400 hover:text-white transition-colors duration-300"
              >
                Infrastructures
              </button>
              <button
                onClick={() => scrollToSection('zero-defaut')}
                className="text-zinc-400 hover:text-white transition-colors duration-300"
              >
                Méthode Zéro Défaut
              </button>
              <button
                onClick={() => scrollToSection('kap-numerik')}
                className="text-zinc-400 hover:text-white transition-colors duration-300"
              >
                Kap Numérik
              </button>
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
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-zinc-800 space-y-4">
              <button
                onClick={() => scrollToSection('infrastructures')}
                className="block w-full text-left text-zinc-400 hover:text-white transition-colors duration-300 py-2"
              >
                Infrastructures
              </button>
              <button
                onClick={() => scrollToSection('zero-defaut')}
                className="block w-full text-left text-zinc-400 hover:text-white transition-colors duration-300 py-2"
              >
                Méthode Zéro Défaut
              </button>
              <button
                onClick={() => scrollToSection('kap-numerik')}
                className="block w-full text-left text-zinc-400 hover:text-white transition-colors duration-300 py-2"
              >
                Kap Numérik
              </button>
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

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none mb-6 max-w-4xl">
            L'ingénierie digitale des{' '}
            <span className="bg-gradient-to-r from-zinc-300 to-zinc-600 bg-clip-text text-transparent">
              leaders réunionnais
            </span>
            .
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-10 max-w-3xl">
            Nous déployons des infrastructures web haute performance. Code propriétaire, sécurité renforcée, 
            et jusqu'à 3 200 € de remboursement potentiel via Kap Numérik (selon éligibilité).
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

      <section className="bg-zinc-950 border-y border-zinc-900 py-12 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-zinc-800">
            <div className="flex flex-col items-start md:px-8 first:pl-0 last:pr-0">
              <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">98/100</div>
              <div className="text-xs uppercase tracking-wide text-zinc-400 font-medium">
                Score Lighthouse
              </div>
              <div className="text-xs text-zinc-600 mt-1">(objectif interne)</div>
            </div>
            <div className="flex flex-col items-start md:px-8">
              <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">5 Jours</div>
              <div className="text-xs uppercase tracking-wide text-zinc-400 font-medium">
                Délai de Déploiement
              </div>
              <div className="text-xs text-zinc-600 mt-1">(périmètre standard)</div>
            </div>
            <div className="flex flex-col items-start md:px-8">
              <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 text-emerald-400">3 200 €</div>
              <div className="text-xs uppercase tracking-wide text-zinc-400 font-medium">
                Plafond Kap Numérik
              </div>
              <div className="text-xs text-zinc-600 mt-1">(selon éligibilité)</div>
            </div>
            <div className="flex flex-col items-start md:px-8">
              <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">100%</div>
              <div className="text-xs uppercase tracking-wide text-zinc-400 font-medium">
                Propriété du Code
              </div>
              <div className="text-xs text-zinc-600 mt-1">(cession après paiement complet)</div>
            </div>
          </div>
          <p className="text-xs text-zinc-600 text-center mt-8 max-w-3xl mx-auto">
            Indicateurs cibles. Variables selon périmètre, contenus fournis et validation.
          </p>
        </div>
      </section>

      <section id="infrastructures" className="bg-black py-20 md:py-32 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">
            Infrastructures.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-zinc-950 border-zinc-800 p-6 md:p-8 hover:border-zinc-700 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center border border-zinc-800">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-400/30 font-medium">
                  Standard BDC
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-3">Performance</h3>
              <p className="text-sm text-zinc-400 mb-4">
                Budget de performance alloué à chaque projet. Temps de chargement optimisés.
              </p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Images format next-gen (WebP/AVIF)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Mise en cache stratégique</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Code splitting et lazy loading</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-zinc-950 border-zinc-800 p-6 md:p-8 hover:border-zinc-700 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center border border-zinc-800">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-400/30 font-medium">
                  Standard BDC
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-3">Sécurité</h3>
              <p className="text-sm text-zinc-400 mb-4">
                Durcissement de sécurité appliqué systématiquement. Protection multi-couches.
              </p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Certificat SSL Grade A minimum</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Protection anti-spam avancée</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Headers de sécurité HTTP configurés</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-zinc-950 border-zinc-800 p-6 md:p-8 hover:border-zinc-700 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center border border-zinc-800">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-400/30 font-medium">
                  Standard BDC
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-3">Code propriétaire</h3>
              <p className="text-sm text-zinc-400 mb-4">
                Pas de template pré-fabriqué. Développement sur mesure, vous en êtes propriétaire.
              </p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Accès complet au repository Git</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Transfert de propriété documenté</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Code maintenable et documenté</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-zinc-950 border-zinc-800 p-6 md:p-8 hover:border-zinc-700 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center border border-zinc-800">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-400/30 font-medium">
                  Standard BDC
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-3">Disponibilité</h3>
              <p className="text-sm text-zinc-400 mb-4">
                Infrastructure surveillée en continu. Interventions rapides en cas d'incident.
              </p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Monitoring proactif 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Sauvegardes automatisées quotidiennes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Procédure de rollback immédiate</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section id="kap-numerik" className="bg-zinc-950 py-20 md:py-32 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center">
            Infrastructures éligibles. Reste à charge minimal.
          </h2>
          <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
            Profitez du dispositif Kap Numérik avec jusqu'à 3 200 € de remboursement potentiel (sous réserve d'éligibilité).
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-black border-zinc-800 p-8 hover:border-zinc-700 transition-all duration-300 ring-2 ring-white">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold">Pack Business Premium</h3>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-400/30 font-medium">
                    Pack optimisé plafond 3 200 €
                  </Badge>
                </div>
                <p className="text-zinc-400 text-sm mb-4">L'offre phare éligible Kap Numérik</p>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-zinc-600 line-through">4 000 €</span>
                    <span className="text-zinc-500 text-sm">HT</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold tracking-tight text-emerald-400">800</span>
                    <span className="text-emerald-400 text-xl">€ HT</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">
                    Estimation : remboursement potentiel jusqu'à 3 200 € (plafond), sous réserve d'éligibilité et validation Région.
                  </p>
                </div>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300">Site web pro (5–8 pages, responsive, SEO on-page)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300">SEO local + technique (GMB + structure)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300">Mise en conformité de base (HTTPS, durcissement standard)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300">Montage administratif : accompagnement dossier (séquence obligatoire)</span>
                </div>
              </div>
              <Button
                onClick={() => scrollToSection('eligibilite')}
                className="w-full bg-white text-black hover:bg-zinc-100 font-semibold tracking-tight hover:scale-[1.02] transition-all duration-300"
              >
                Vérifier mon reste à charge
              </Button>
            </Card>

            <Card className="bg-black border-zinc-800 p-8 hover:border-zinc-700 transition-all duration-300">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold">Pacte de Sérénité</h3>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-400/30 font-medium">
                    Protection continue
                  </Badge>
                </div>
                <p className="text-zinc-400 text-sm mb-4">MCO - Maintenance en Conditions Opérationnelles</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">49</span>
                  <span className="text-zinc-400 text-sm">€ HT / mois</span>
                </div>
              </div>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300">Hébergement & disponibilité (objectif 99,9%)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300">Sauvegardes automatisées</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300">Mises à jour de sécurité</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300">Monitoring / alerting</span>
                </div>
              </div>
              <Button
                onClick={() => scrollToSection('eligibilite')}
                className="w-full bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 font-semibold tracking-tight hover:scale-[1.02] transition-all duration-300"
              >
                Activer la maintenance
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <section id="zero-defaut" className="bg-white text-black py-20 md:py-32 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Le standard BDC. Scientifique. Zéro défaut.
          </h2>
          <p className="text-zinc-600 mb-12 max-w-2xl">
            Chaque mise en production passe des critères bloquants. PASS ou FAIL.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Performance extrême</h3>
              <p className="text-zinc-600 leading-relaxed">
                Budget de performance alloué. Audit Lighthouse systématique. Latence optimisée, architecture Edge.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">QA bloquante</h3>
              <p className="text-zinc-600 leading-relaxed">
                7 critères bloquants validés avant toute mise en production. Aucune exception. PASS ou FAIL.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <Server className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Procédure Kap Numérik</h3>
              <p className="text-zinc-600 leading-relaxed">
                Séquence obligatoire respectée. Montage administratif complet. Friction réduite au minimum.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <div className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
              1. Audit
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-400 mt-2" />
            <div className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
              2. Spécification
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-400 mt-2" />
            <div className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
              3. Déploiement
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-400 mt-2" />
            <div className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
              4. Monitoring
            </div>
          </div>
        </div>
      </section>

      <section id="eligibilite" className="bg-black py-20 md:py-32 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Vérifier votre éligibilité.
          </h2>
          <p className="text-zinc-400 mb-12">
            Remplissez ce formulaire pour recevoir une étude d'éligibilité personnalisée sous 24–48h.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-200">
                  Nom complet
                </Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-zinc-950 border-zinc-800 text-zinc-50 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/20"
                  placeholder="Jean Dupont"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-zinc-200">
                  Société
                </Label>
                <Input
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-zinc-950 border-zinc-800 text-zinc-50 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/20"
                  placeholder="Nom de votre société"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-zinc-200">
                  Téléphone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-zinc-950 border-zinc-800 text-zinc-50 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/20"
                  placeholder="0692 XX XX XX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-200">
                  Email professionnel
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-zinc-950 border-zinc-800 text-zinc-50 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/20"
                  placeholder="jean@entreprise.fr"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="size" className="text-zinc-200">
                  Taille entreprise
                </Label>
                <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
                  <SelectTrigger id="size" className="bg-zinc-950 border-zinc-800 text-zinc-50 focus:border-emerald-400 focus:ring-emerald-400/20">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-50">
                    <SelectItem value="tpe">TPE (1-9 salariés)</SelectItem>
                    <SelectItem value="pme">PME (10-249 salariés)</SelectItem>
                    <SelectItem value="eti">ETI (250-4999 salariés)</SelectItem>
                    <SelectItem value="ge">Grande entreprise (5000+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="text-zinc-200">
                  Budget estimé
                </Label>
                <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                  <SelectTrigger id="budget" className="bg-zinc-950 border-zinc-800 text-zinc-50 focus:border-emerald-400 focus:ring-emerald-400/20">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-50">
                    <SelectItem value="moins-2k">Moins de 2 000 €</SelectItem>
                    <SelectItem value="2k-5k">2 000 - 5 000 €</SelectItem>
                    <SelectItem value="5k-10k">5 000 - 10 000 €</SelectItem>
                    <SelectItem value="plus-10k">Plus de 10 000 €</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-zinc-200">
                Décrivez votre projet
              </Label>
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-zinc-950 border-zinc-800 text-zinc-50 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/20 min-h-[120px]"
                placeholder="Décrivez brièvement votre besoin..."
              />
            </div>

            <input
              type="text"
              name="website"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="absolute -left-[9999px]"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                required
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 w-4 h-4 bg-zinc-950 border-zinc-800 rounded focus:ring-emerald-400 focus:ring-offset-0 accent-emerald-400"
              />
              <Label htmlFor="consent" className="text-sm text-zinc-400 font-normal cursor-pointer">
                J'accepte d'être recontacté pour l'étude d'éligibilité et l'audit.
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-zinc-100 font-semibold tracking-tight hover:scale-[1.02] transition-all duration-300 py-6 text-base"
            >
              Envoyer la demande
            </Button>
          </form>
        </div>
      </section>

      <footer className="bg-black border-t border-zinc-800 py-12 px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-3">
            <p className="text-sm text-zinc-400">BDC Web - Studio de Programmation Premium</p>
            <p className="text-xs text-zinc-600 max-w-3xl mx-auto">
              Ce projet a été financé par l'Union Européenne dans le cadre du programme FEDER-FSE+ Réunion dont l'Autorité de gestion est la Région Réunion. 
              L'Europe s'engage à La Réunion avec le fonds FEDER.
            </p>
            <p className="text-xs text-zinc-600">
              BDC Web — Activité principale : Programmation Informatique (NAF 62.01Z).
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
