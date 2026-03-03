import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import type { EligibilityFormData } from '@/types/business'

const INITIAL_FORM: EligibilityFormData = {
  name: '',
  company: '',
  phone: '',
  email: '',
  size: '',
  budget: '',
  message: '',
  consent: false,
  honeypot: '',
}

const inputClasses = "bg-white/[0.03] border-white/10 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-zinc-400 focus-visible:ring-zinc-400/20 rounded-lg"
const selectTriggerClasses = "bg-white/[0.03] border-white/10 text-zinc-100 focus:border-zinc-400 focus:ring-zinc-400/20 rounded-lg"

const EligibilityForm: React.FC = () => {
  const [formData, setFormData] = useState<EligibilityFormData>(INITIAL_FORM)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot anti-spam
    if (formData.honeypot) {
      return
    }

    console.log({
      nom: formData.name,
      societe: formData.company,
      email: formData.email,
      taille: formData.size,
      budget: formData.budget,
      timestamp: new Date().toISOString(),
    })

    toast.success('Demande envoyee')
    setFormData(INITIAL_FORM)
  }

  return (
    <section id="eligibilite" className="bg-zinc-950 py-24 md:py-36 px-6 md:px-8">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-zinc-500 font-medium mb-4">
          Formulaire d'eligibilite
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-5 text-zinc-100">
          Verifier votre eligibilite.
        </h2>
        <p className="text-zinc-400 mb-14">
          Remplissez ce formulaire pour recevoir une etude d'eligibilite personnalisee sous 24-48h.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs tracking-widest uppercase text-zinc-500 font-medium">
                Nom complet
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClasses}
                placeholder="Jean Dupont"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-xs tracking-widest uppercase text-zinc-500 font-medium">
                Societe
              </Label>
              <Input
                id="company"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={inputClasses}
                placeholder="Nom de votre societe"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs tracking-widest uppercase text-zinc-500 font-medium">
                Telephone
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={inputClasses}
                placeholder="0692 XX XX XX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs tracking-widest uppercase text-zinc-500 font-medium">
                Email professionnel
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClasses}
                placeholder="jean@entreprise.fr"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="size" className="text-xs tracking-widest uppercase text-zinc-500 font-medium">
                Taille entreprise
              </Label>
              <Select
                value={formData.size}
                onValueChange={(value) => setFormData({ ...formData, size: value })}
              >
                <SelectTrigger id="size" className={selectTriggerClasses}>
                  <SelectValue placeholder="Selectionner" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 text-zinc-100">
                  <SelectItem value="tpe">TPE (1-9 salaries)</SelectItem>
                  <SelectItem value="pme">PME (10-249 salaries)</SelectItem>
                  <SelectItem value="eti">ETI (250-4999 salaries)</SelectItem>
                  <SelectItem value="ge">Grande entreprise (5000+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget" className="text-xs tracking-widest uppercase text-zinc-500 font-medium">
                Budget estime
              </Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => setFormData({ ...formData, budget: value })}
              >
                <SelectTrigger id="budget" className={selectTriggerClasses}>
                  <SelectValue placeholder="Selectionner" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 text-zinc-100">
                  <SelectItem value="moins-2k">Moins de 2 000 EUR</SelectItem>
                  <SelectItem value="2k-5k">2 000 - 5 000 EUR</SelectItem>
                  <SelectItem value="5k-10k">5 000 - 10 000 EUR</SelectItem>
                  <SelectItem value="plus-10k">Plus de 10 000 EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-xs tracking-widest uppercase text-zinc-500 font-medium">
              Decrivez votre projet
            </Label>
            <Textarea
              id="message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`${inputClasses} min-h-[120px]`}
              placeholder="Decrivez brievement votre besoin..."
            />
          </div>

          {/* Honeypot anti-spam */}
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
              className="mt-1 w-4 h-4 bg-zinc-950 border-white/20 rounded focus:ring-zinc-400 focus:ring-offset-0 accent-zinc-100"
            />
            <Label htmlFor="consent" className="text-sm text-zinc-500 font-normal cursor-pointer leading-relaxed">
              J'accepte d'etre recontacte pour l'etude d'eligibilite et l'audit.
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-zinc-200 transition-colors duration-300 font-medium py-6 text-base rounded-lg"
          >
            Envoyer la demande
          </Button>
        </form>
      </div>
    </section>
  )
}

export default EligibilityForm
