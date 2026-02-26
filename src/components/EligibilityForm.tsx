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

    toast.success('Demande envoyée')
    setFormData(INITIAL_FORM)
  }

  return (
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
              <Select
                value={formData.size}
                onValueChange={(value) => setFormData({ ...formData, size: value })}
              >
                <SelectTrigger
                  id="size"
                  className="bg-zinc-950 border-zinc-800 text-zinc-50 focus:border-emerald-400 focus:ring-emerald-400/20"
                >
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
              <Select
                value={formData.budget}
                onValueChange={(value) => setFormData({ ...formData, budget: value })}
              >
                <SelectTrigger
                  id="budget"
                  className="bg-zinc-950 border-zinc-800 text-zinc-50 focus:border-emerald-400 focus:ring-emerald-400/20"
                >
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
  )
}

export default EligibilityForm
