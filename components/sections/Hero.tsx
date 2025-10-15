import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] py-8 sm:py-12 md:py-16 lg:py-20 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/10 z-10" />
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://res.cloudinary.com/deamrxfwp/image/upload/v1760439561/web_cover_page_high_resolution._rva3a2.webp"
          alt="Hero background"
          fill
          className="object-cover object-center w-full h-full"
          sizes="100vw"
          priority
        />
      </div>
      {/* Bottom-centered CTA overlay */}
      <div className="absolute inset-x-0 bottom-6 sm:bottom-8 md:bottom-10 z-20 flex justify-center px-4 sm:px-6 lg:px-8 pb-[env(safe-area-inset-bottom)]">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="https://houseofevolve.in/" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/collections">
            <Button
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 bg-white/10 border-white/20 text-white hover:bg-white/20 hidden sm:flex"
            >
              View Collection
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
