import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { useFadeIn } from '@/hooks/use-fade-in'
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

interface FieldErrors {
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  message?: string;
  consent?: string;
}

const inputClasses = "rounded-lg border-white/10 bg-white/[0.03] text-zinc-100 placeholder:text-zinc-600 transition-[border-color,box-shadow,background-color] duration-base focus-visible:border-emerald-400/50 focus-visible:ring-emerald-400/30 focus-visible:shadow-[0_0_0_4px] focus-visible:shadow-emerald-400/10"
const inputErrorClasses = "rounded-lg border-red-500/60 bg-white/[0.03] text-zinc-100 placeholder:text-zinc-600 transition-[border-color,box-shadow,background-color] duration-base focus-visible:border-red-400 focus-visible:ring-red-400/20"
const selectTriggerClasses = "rounded-lg border-white/10 bg-white/[0.03] text-zinc-100 transition-[border-color,box-shadow,background-color] duration-base focus:border-emerald-400/50 focus:ring-emerald-400/30 focus:shadow-[0_0_0_4px] focus:shadow-emerald-400/10"

const EligibilityForm: React.FC = () => {
  const { ref, isVisible } = useFadeIn()
  const [formData, setFormData] = useState<EligibilityFormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = (): FieldErrors => {
    const errs: FieldErrors = {}
    if (!formData.name.trim()) errs.name = 'Le nom est requis.'
    if (!formData.company.trim()) errs.company = 'La societe est requise.'
    if (!formData.phone.trim()) errs.phone = 'Le telephone est requis.'
    if (!formData.email.trim()) errs.email = "L'email est requis."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "L'email n'est pas valide."
    if (!formData.message.trim()) errs.message = 'La description du projet est requise.'
    if (!formData.consent) errs.consent = 'Vous devez accepter les conditions.'
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    // Guard: empêche les doubles soumissions
    if (isSubmitting) return

    // Honeypot anti-spam
    if (formData.honeypot) {
      return
    }

    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
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
      setErrors({})
      setSubmitted(false)
    } catch {
      toast.error('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldError = (field: keyof FieldErrors) => submitted ? errors[field] : undefined

  return (
    <section id="eligibilite" className="relative bg-zinc-950 py-24 md:py-36 px-6 md:px-8 overflow-hidden">
      {/* Gradient mesh subtil */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-emerald-950/30 rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-950/30 rounded-full blur-3xl opacity-10" />
      </div>
      <div
        ref={ref}
        className={`relative max-w-3xl mx-auto fade-in-section ${isVisible ? 'is-visible' : ''}`}
      >
        <p className="text-xs tracking-widest uppercase text-zinc-500 font-medium mb-4">
          Formulaire d'eligibilite
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-5 text-zinc-100">
          Verifier votre eligibilite.
        </h2>
        <p className="text-zinc-400 mb-10">
          Remplissez ce formulaire pour recevoir une etude d'eligibilite personnalisee sous 24-48h.
        </p>
        <p className="text-xs text-zinc-600 mb-6">
          Les champs marques d'un <span className="text-red-400">*</span> sont obligatoires.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 shadow-[0_30px_70px_-50px_rgba(0,0,0,0.9)]" noValidate>
          {/* Live region for form errors */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {submitted && Object.keys(errors).length > 0 && (
              <p>Le formulaire contient {Object.keys(errors).length} erreur(s). Veuillez corriger les champs indiques.</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs tracking-widest uppercase text-zinc-500 font-medium">
                Nom complet <span className="text-red-400" aria-hidden="true">*</span>
              </Label>
              <Input
                id="name"
                required
                aria-required="true"
                aria-invalid={!!fieldError('name')}
                aria-describedby={fieldError('name') ? 'name-error' : undefined}
                autoComplete="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={fieldError('name') ? inputErrorClasses : inputClasses}
                placeholder="Jean Dupont"
              />
              {fieldError('name') && (
                <p id="name-error" className="text-xs text-red-400 mt-1" role="alert">{fieldError('name')}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-xs tracking-widest uppercase text-zinc-500 font-medium">
                Societe <span className="text-red-400" aria-hidden="true">*</span>
              </Label>
              <Input
                id="company"
                required
                aria-required="true"
                aria-invalid={!!fieldError('company')}
                aria-describedby={fieldError('company') ? 'company-error' : undefined}
                autoComplete="organization"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={fieldError('company') ? inputErrorClasses : inputClasses}
                placeholder="Nom de votre societe"
              />
              {fieldError('company') && (
                <p id="company-error" className="text-xs text-red-400 mt-1" role="alert">{fieldError('company')}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs tracking-widest uppercase text-zinc-500 font-medium">
                Telephone <span className="text-red-400" aria-hidden="true">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                aria-required="true"
                aria-invalid={!!fieldError('phone')}
                aria-describedby={fieldError('phone') ? 'phone-error' : undefined}
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={fieldError('phone') ? inputErrorClasses : inputClasses}
                placeholder="0692 XX XX XX"
              />
              {fieldError('phone') && (
                <p id="phone-error" className="text-xs text-red-400 mt-1" role="alert">{fieldError('phone')}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs tracking-widest uppercase text-zinc-500 font-medium">
                Email professionnel <span className="text-red-400" aria-hidden="true">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                required
                aria-required="true"
                aria-invalid={!!fieldError('email')}
                aria-describedby={fieldError('email') ? 'email-error' : undefined}
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={fieldError('email') ? inputErrorClasses : inputClasses}
                placeholder="jean@entreprise.fr"
              />
              {fieldError('email') && (
                <p id="email-error" className="text-xs text-red-400 mt-1" role="alert">{fieldError('email')}</p>
              )}
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
              Decrivez votre projet <span className="text-red-400" aria-hidden="true">*</span>
            </Label>
            <Textarea
              id="message"
              required
              aria-required="true"
              aria-invalid={!!fieldError('message')}
              aria-describedby={fieldError('message') ? 'message-error' : undefined}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`${fieldError('message') ? inputErrorClasses : inputClasses} min-h-[120px]`}
              placeholder="Decrivez brievement votre besoin..."
            />
            {fieldError('message') && (
              <p id="message-error" className="text-xs text-red-400 mt-1" role="alert">{fieldError('message')}</p>
            )}
          </div>

          {/* Honeypot anti-spam — hidden from assistive technology */}
          <div aria-hidden="true" className="absolute -left-[9999px]">
            <input
              type="text"
              name="website"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              required
              aria-required="true"
              aria-invalid={!!fieldError('consent')}
              aria-describedby={fieldError('consent') ? 'consent-error' : undefined}
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-zinc-950 accent-zinc-100 focus:ring-emerald-400/30 focus:ring-offset-0"
              />
            <div>
              <Label htmlFor="consent" className="text-sm text-zinc-500 font-normal cursor-pointer leading-relaxed">
                J'accepte d'etre recontacte pour l'etude d'eligibilite et l'audit. <span className="text-red-400" aria-hidden="true">*</span>
              </Label>
              {fieldError('consent') && (
                <p id="consent-error" className="text-xs text-red-400 mt-1" role="alert">{fieldError('consent')}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="w-full bg-gradient-to-b from-white to-zinc-100 text-black hover:shadow-lg hover:shadow-emerald-500/10 hover:scale-[1.02] transition-[transform,box-shadow,background-color] duration-base font-medium py-6 text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Envoi en cours\u2026' : 'Envoyer la demande'}
          </Button>
        </form>
      </div>
    </section>
  )
}

export default EligibilityForm
