import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Reveal from '@/components/Reveal'

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

const fieldClass =
  'border-[var(--bdc-hairline-strong)] bg-white/80 text-[var(--bdc-color-ink)] shadow-none transition-all duration-[200ms] focus-visible:border-[var(--bdc-color-accent)] focus-visible:ring-[var(--bdc-color-accent)]/20'

const Form: React.FC = () => {
  const [formData, setFormData] = useState<EligibilityFormData>(INITIAL_FORM)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (formData.honeypot) {
      return
    }

    toast.success('Demande envoyée')
    setFormData(INITIAL_FORM)
  }

  return (
    <section id="eligibilite" className="pb-24 pt-20 md:pb-28 md:pt-24">
      <div className="bdc-container grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <Reveal className="max-w-[56ch] space-y-5">
          <p className="eyebrow">Éligibilité</p>
          <h2 className="type-h2">Vérifier votre éligibilité.</h2>
          <p className="text-[16px] leading-[1.65] text-[var(--bdc-color-muted)] md:text-[18px]">
            Remplissez ce formulaire pour recevoir une étude d&apos;éligibilité personnalisée sous 24–48h.
          </p>
          <p className="text-sm leading-relaxed text-[var(--bdc-color-muted)]">
            La simulation Kap Numérik reste indicative: potentiel de prise en charge, plafond, puis validation
            administrative.
          </p>
        </Reveal>

        <Reveal delay={90} className="noise-surface rounded-[28px] border border-[var(--bdc-hairline)] bg-white/74 p-6 shadow-[var(--bdc-shadow-soft)] backdrop-blur-sm md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2.5">
                <Label htmlFor="name" className="text-[var(--bdc-color-muted-strong)]">Nom complet</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  className={fieldClass}
                  placeholder="Jean Dupont"
                />
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="company" className="text-[var(--bdc-color-muted-strong)]">Société</Label>
                <Input
                  id="company"
                  required
                  value={formData.company}
                  onChange={(event) => setFormData({ ...formData, company: event.target.value })}
                  className={fieldClass}
                  placeholder="Nom de votre société"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2.5">
                <Label htmlFor="phone" className="text-[var(--bdc-color-muted-strong)]">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                  className={fieldClass}
                  placeholder="0692 XX XX XX"
                />
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-[var(--bdc-color-muted-strong)]">
                  Email professionnel
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  className={fieldClass}
                  placeholder="jean@entreprise.fr"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2.5">
                <Label htmlFor="size" className="text-[var(--bdc-color-muted-strong)]">Taille entreprise</Label>
                <Select
                  value={formData.size}
                  onValueChange={(value) => setFormData({ ...formData, size: value })}
                >
                  <SelectTrigger id="size" className={fieldClass}>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent className="border-[var(--bdc-hairline-strong)] bg-white text-[var(--bdc-color-ink)]">
                    <SelectItem value="tpe">TPE (1-9 salariés)</SelectItem>
                    <SelectItem value="pme">PME (10-249 salariés)</SelectItem>
                    <SelectItem value="eti">ETI (250-4999 salariés)</SelectItem>
                    <SelectItem value="ge">Grande entreprise (5000+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="budget" className="text-[var(--bdc-color-muted-strong)]">Budget estimé</Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => setFormData({ ...formData, budget: value })}
                >
                  <SelectTrigger id="budget" className={fieldClass}>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent className="border-[var(--bdc-hairline-strong)] bg-white text-[var(--bdc-color-ink)]">
                    <SelectItem value="moins-2k">Moins de 2 000 €</SelectItem>
                    <SelectItem value="2k-5k">2 000 - 5 000 €</SelectItem>
                    <SelectItem value="5k-10k">5 000 - 10 000 €</SelectItem>
                    <SelectItem value="plus-10k">Plus de 10 000 €</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="message" className="text-[var(--bdc-color-muted-strong)]">Décrivez votre projet</Label>
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                className={`${fieldClass} min-h-[120px]`}
                placeholder="Décrivez brièvement votre besoin..."
              />
            </div>

            <input
              type="text"
              name="website"
              value={formData.honeypot}
              onChange={(event) => setFormData({ ...formData, honeypot: event.target.value })}
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
                onChange={(event) => setFormData({ ...formData, consent: event.target.checked })}
                className="mt-1 h-4 w-4 rounded border-[var(--bdc-hairline-strong)] accent-[var(--bdc-color-accent)]"
              />
              <Label htmlFor="consent" className="cursor-pointer text-sm font-normal leading-relaxed text-[var(--bdc-color-muted)]">
                J&apos;accepte d&apos;être recontacté pour l&apos;étude d&apos;éligibilité et l&apos;audit.
              </Label>
            </div>

            <Button type="submit" className="bdc-button-primary h-auto w-full rounded-full px-7 py-4 text-base">
              Envoyer la demande
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

export default Form
