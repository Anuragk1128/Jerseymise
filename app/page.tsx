import { Header } from "@/components/header"
import { Hero } from "@/components/sections/Hero"
import { Features } from "@/components/sections/Features"
import { FeaturedProducts } from "@/components/sections/FeaturedProducts"
import { Categories } from "@/components/sections/Categories"
import { FooterSection } from "@/components/sections/Footer"
import Sale from "@/components/sale"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sale />
      <Hero />
      <Features />
      <FeaturedProducts />
      <Categories />
      <FooterSection />
    </div>
  )
}
