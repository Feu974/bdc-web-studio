import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import MetricsBar from '@/components/MetricsBar'
import InfrastructuresSection from '@/components/InfrastructuresSection'
import PricingKapNumerik from '@/components/PricingKapNumerik'
import ZeroDefectMethodology from '@/components/ZeroDefectMethodology'
import EligibilityForm from '@/components/EligibilityForm'
import LegalFooter from '@/components/LegalFooter'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

function App() {
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
          <InfrastructuresSection />
          <PricingKapNumerik />
          <ZeroDefectMethodology />
          <EligibilityForm />
        </main>
        <LegalFooter />
      </div>
      <Toaster position="top-right" theme="dark" className="font-sans" />
    </QueryClientProvider>
  )
}

export default App
