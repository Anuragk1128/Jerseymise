import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

export function Categories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground">Find exactly what you need for your fitness journey</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/products?category=men" className="group">
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Men's Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">Men's Collection</h3>
                  <p className="text-gray-200">Performance gear for every workout</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link href="/products?category=women" className="group">
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Women's Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">Women's Collection</h3>
                  <p className="text-gray-200">Stylish and functional activewear</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link href="/products?category=equipment" className="group">
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Equipment Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">Equipment</h3>
                  <p className="text-gray-200">Professional-grade fitness gear</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  )
}
