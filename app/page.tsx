import { Header } from "@/components/header"
import { Hero } from "@/components/sections/Hero"
import Intro from "@/components/sections/Intro"
import NewestGear from "@/components/sections/NewestGear"
import { FeaturedProducts } from "@/components/sections/FeaturedProducts"
import DualPromo from "@/components/sections/DualPromo"
import Instagram from "@/components/sections/Instagram"
import { FooterSection } from "@/components/sections/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Intro />
      <FeaturedProducts />
      <NewestGear />
      <DualPromo />
      <Instagram />
      <FooterSection />
    </div>
  )
}
