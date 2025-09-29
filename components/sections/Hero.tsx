import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[70vh] py-16 md:py-24 lg:py-32 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/10 z-10" />
      <Image
        src="/jerseymise_hero.jpg?height=800&width=1200"
        alt="Hero background"
        fill
        className="object-cover object-center md:object-top"
        priority
      />
      <div className="relative z-20 w-full flex flex-col-reverse md:flex-row items-center md:items-start justify-between max-w-6xl mx-auto px-6 md:px-8">
        {/* CTAs left/center on small screens */}
        <div className="mt-8 md:mt-0 w-full md:w-auto flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link href="https://houseofevolve.in/" target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="text-lg px-8 py-6">
            
            Shop Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          </Link>
          <Link href="/collections">
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            View Collection
          </Button>
          </Link>
        </div>
        {/* Right aligned heading */}
        <h1 className="text-white text-right md:text-right text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide md:max-w-md font-gotham">
          SUMMER
          <br />
          ATHLEISURE
        </h1>
      </div>
    </section>
  )
}
