import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[70vh] py-16 md:py-24 lg:py-32 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
      <Image
        src="/jerseymise_hero.jpg?height=800&width=1200"
        alt="Hero background"
        fill
        className="object-cover object-center md:object-top"
        priority
      />
      <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center gap-3 mb-8 min-w-[120px]">
          <Image src="/logo/jerseymise-mark-white.svg" alt="Jerseymise mark" width={40} height={40} priority />
          <span className="font-bold text-3xl md:text-4xl tracking-wide">JERSEYMISE</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6">
            
            Shop Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            View Collection
          </Button>
        </div>
      </div>
    </section>
  )
}
