import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { lazy, Suspense } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import MetricsBar from '@/components/MetricsBar'
import { ChatWidget } from '@/components/ChatWidget'
import { LegalModals, useLegalModals } from '@/components/LegalModals'

// ── Lazy-loaded : sous la ligne de flottaison ──────────────────────────────────
const TargetSectors = lazy(() => import('@/components/TargetSectors'))
const InfrastructuresSection = lazy(() => import('@/components/InfrastructuresSection'))
const PricingKapNumerik = lazy(() => import('@/components/PricingKapNumerik'))
const KapNumerikProcess = lazy(() => import('@/components/KapNumerikProcess'))
const ZeroDefectMethodology = lazy(() => import('@/components/ZeroDefectMethodology'))
const EligibilityForm = lazy(() => import('@/components/EligibilityForm'))
const LegalFooter = lazy(() => import('@/components/LegalFooter'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

function App() {
  const { openModal, setOpenModal } = useLegalModals()

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-black text-zinc-50 font-sans">
        <a
          href="#contenu-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium focus:text-sm"
        >
          Aller au contenu principal
        </a>
        <Navbar />
        <main id="contenu-principal">
          <HeroSection />
          <MetricsBar />
          <Suspense fallback={null}>
            <TargetSectors />
            <InfrastructuresSection />
            <PricingKapNumerik />
            <KapNumerikProcess />
            <ZeroDefectMethodology />
            <EligibilityForm />
          </Suspense>
        </main>
        <ChatWidget />
        <Suspense fallback={null}>
          <LegalFooter onOpenLegal={setOpenModal} />
        </Suspense>
      </div>
      <LegalModals open={openModal} onOpenChange={setOpenModal} />
      <Toaster position="top-right" theme="dark" className="font-sans" />
    </QueryClientProvider>
  )
}

export default App
