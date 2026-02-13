import Navbar from "./components/NavBar"
import Hero from "./components/Hero"
import BackgroundGlow from "./components/BackgroundGlow"
import StatementSection from "./components/StatementSection"
import InfiniteMarquee from "./components/InfiniteMarquee"
import ServicesSection from "./components/ServicesSection"
import SelectedWork from "./components/SelectedWork"
import TestimonialsSection from "./components/TestimonialsSection"
import TeamSection from "./components/TeamSection"
import ContactFooterSection from "./components/ContactFooterSection"
// import WhoCanUse from "./components/WhoCanUse"
// import Comparison from "./components/Comparison"
// import FeaturesGrid from "./components/FeaturesGrid"
// import WaitlistFAQ from "./components/WaitlistFAQ"


function App() {
  return (
    <main className="w-full min-h-screen relative">
      <BackgroundGlow />
      <Navbar />
      <Hero />
      <InfiniteMarquee />
      <StatementSection />
      <ServicesSection />
      <SelectedWork />
      <TestimonialsSection />
      <TeamSection />
      <ContactFooterSection />
    </main>
  )
}

export default App