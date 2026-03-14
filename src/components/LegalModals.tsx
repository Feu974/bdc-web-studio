import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

type ModalType = 'mentions' | 'confidentialite' | null

interface LegalModalsProps {
  open: ModalType
  onOpenChange: (modal: ModalType) => void
}

export function LegalModals({ open, onOpenChange }: LegalModalsProps) {
  return (
    <>
      {/* Mentions Legales */}
      <Dialog open={open === 'mentions'} onOpenChange={(v) => onOpenChange(v ? 'mentions' : null)}>
        <DialogContent className="bg-zinc-950 border-white/10 text-zinc-100 max-w-2xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-zinc-100">Mentions Legales</DialogTitle>
            <DialogDescription className="text-zinc-500">
              Informations legales relatives au site bdcweb.re
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-6 text-sm text-zinc-400 leading-relaxed">
              <section>
                <h3 className="text-base font-semibold text-zinc-200 mb-2">Editeur du site</h3>
                <ul className="space-y-1">
                  <li><span className="text-zinc-500">Raison sociale :</span> BDC Digital</li>
                  <li><span className="text-zinc-500">Forme juridique :</span> SAS en cours de constitution</li>
                  <li><span className="text-zinc-500">Siege social :</span> La Reunion (974)</li>
                  <li><span className="text-zinc-500">Code NAF :</span> 62.01Z — Programmation Informatique</li>
                  <li><span className="text-zinc-500">Email :</span> contact@bdcweb.re</li>
                </ul>
              </section>

              <section>
                <h3 className="text-base font-semibold text-zinc-200 mb-2">Hebergement</h3>
                <p>
                  Le site est heberge par des prestataires d'infrastructure cloud certifies,
                  avec des garanties de disponibilite et de securite conformes aux standards europeens.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-zinc-200 mb-2">Propriete intellectuelle</h3>
                <p>
                  L'ensemble du contenu (textes, images, logos, charte graphique) est protege par le droit
                  d'auteur. Toute reproduction, meme partielle, est soumise a autorisation prealable.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-zinc-200 mb-2">Financement europeen</h3>
                <p>
                  Ce projet a ete finance par l'Union Europeenne dans le cadre du programme FEDER-FSE+
                  Reunion dont l'Autorite de gestion est la Region Reunion. L'Europe s'engage a La Reunion
                  avec le fonds FEDER.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-zinc-200 mb-2">Responsabilite</h3>
                <p>
                  BDC Digital s'efforce de fournir des informations exactes et a jour. Toutefois,
                  l'editeur ne saurait garantir l'exactitude, la completude ou l'actualite des
                  informations diffusees sur le site.
                </p>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Politique de Confidentialite */}
      <Dialog open={open === 'confidentialite'} onOpenChange={(v) => onOpenChange(v ? 'confidentialite' : null)}>
        <DialogContent className="bg-zinc-950 border-white/10 text-zinc-100 max-w-2xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-zinc-100">Politique de Confidentialite</DialogTitle>
            <DialogDescription className="text-zinc-500">
              Traitement des donnees personnelles sur bdcweb.re
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-6 text-sm text-zinc-400 leading-relaxed">
              <section>
                <h3 className="text-base font-semibold text-zinc-200 mb-2">Responsable du traitement</h3>
                <p>
                  BDC Digital, SAS en cours de constitution, dont le siege social est situe
                  a La Reunion (974), code NAF 62.01Z.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-zinc-200 mb-2">Donnees collectees</h3>
                <p>
                  Les donnees collectees via le formulaire d'eligibilite comprennent :
                  nom, prenom, raison sociale, email, telephone, secteur d'activite, code postal.
                  Ces donnees sont strictement necessaires au traitement de votre demande.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-zinc-200 mb-2">Finalite du traitement</h3>
                <p>
                  Les donnees sont utilisees exclusivement pour verifier votre eligibilite au
                  dispositif Kap Numerik, etablir un devis et assurer le suivi administratif
                  de votre dossier FEDER.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-zinc-200 mb-2">Duree de conservation</h3>
                <p>
                  Les donnees sont conservees pendant une duree de 3 ans a compter du dernier
                  contact, conformement aux obligations legales et comptables.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-zinc-200 mb-2">Droits des utilisateurs</h3>
                <p>
                  Conformement au RGPD, vous disposez d'un droit d'acces, de rectification,
                  de suppression et de portabilite de vos donnees. Pour exercer ces droits,
                  contactez-nous a : contact@bdcweb.re.
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-zinc-200 mb-2">Cookies</h3>
                <p>
                  Le site utilise uniquement des cookies techniques strictement necessaires a
                  son fonctionnement. Aucun cookie publicitaire ou de tracking tiers n'est depose.
                </p>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}

/** Hook utilitaire pour gerer l'etat des modales legales */
export function useLegalModals() {
  const [openModal, setOpenModal] = useState<ModalType>(null)
  return { openModal, setOpenModal } as const
}
