import Navbar from '@/components/Navbar'
import HeroSplit from '@/components/HeroSplit'
import ProofGallery from '@/components/ProofGallery'
import Metrics from '@/components/Metrics'
import Offers from '@/components/Offers'
import Method from '@/components/Method'
import Form from '@/components/Form'
import Footer from '@/components/Footer'

function App() {
  return (
    <div className="bdc-shell min-h-screen text-[var(--bdc-color-ink)]">
      <Navbar />
      <main className="overflow-x-clip">
        <HeroSplit />
        <ProofGallery />
        <Metrics />
        <Offers />
        <Method />
        <Form />
      </main>
      <Footer />
    </div>
  )
}

export default App
