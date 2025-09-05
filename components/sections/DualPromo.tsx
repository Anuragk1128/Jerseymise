import Image from "next/image"
import Link from "next/link"

export default function DualPromo() {
  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customise Teamwear */}
        <Link href="/kitbuilder" className="group">
          <div className="relative w-full h-48 md:h-60 lg:h-72 bg-white border rounded-md overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-between px-6">
              <div className="text-left">
                <h3 className="text-2xl md:text-3xl font-extrabold">CUSTOMISE YOUR
                  <br />TEAMWEAR</h3>
                <p className="mt-3 text-sm text-muted-foreground">Explore Now</p>
              </div>
              <div className="relative w-28 h-28 md:w-32 md:h-32">
                <Image src="/placeholder.svg?height=160&width=160&text=Jersey" alt="Teamwear" fill className="object-contain" />
              </div>
            </div>
          </div>
        </Link>
        {/* Explore Catalogues */}
        <Link href="/catalogue" className="group">
          <div className="relative w-full h-48 md:h-60 lg:h-72 bg-white border rounded-md overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-between px-6">
              <div className="text-left">
                <h3 className="text-2xl md:text-3xl font-extrabold">EXPLORE OUR
                  <br />CATALOGUES</h3>
                <p className="mt-3 text-sm text-muted-foreground">Know More</p>
              </div>
              <div className="relative w-28 h-28 md:w-32 md:h-32">
                <Image src="/placeholder.svg?height=160&width=160&text=Pages" alt="Catalogues" fill className="object-contain" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
