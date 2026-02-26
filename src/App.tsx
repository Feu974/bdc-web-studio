import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import MetricsBar from '@/components/MetricsBar'
import InfrastructuresSection from '@/components/InfrastructuresSection'
import PricingKapNumerik from '@/components/PricingKapNumerik'
import ZeroDefectMethodology from '@/components/ZeroDefectMethodology'
import EligibilityForm from '@/components/EligibilityForm'
import LegalFooter from '@/components/LegalFooter'

function App() {
  return (
    <div className="min-h-screen bg-black text-zinc-50">
      <Navbar />
      <HeroSection />
      <MetricsBar />
      <InfrastructuresSection />
      <PricingKapNumerik />
      <ZeroDefectMethodology />
      <EligibilityForm />
      <LegalFooter />
    </div>
  )
}

export default App
