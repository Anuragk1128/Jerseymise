"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { getAllProducts } from "@/lib/api"
import type { Product } from "@/lib/types"

export default function CataloguePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const response = await getAllProducts("sportswear", { limit: 20 })
        setProducts(response.data)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <Skeleton className="h-9 w-32 mb-2" />
              <Skeleton className="h-5 w-64" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <FooterSection />
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <h2 className="text-xl font-semibold mb-2">Error Loading Products</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
        <FooterSection />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Catalogue</h1>
            <p className="text-muted-foreground">Browse our collection of premium sportswear products.</p>
          </div>
          <Button asChild>
            <Link href="/kitbuilder">Build your own</Link>
          </Button>
        </div>

        <div className="space-y-12">
          {products.map((product) => (
            <Card key={product._id} className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="space-y-6">
                {/* Product Title */}
                <div className="px-6 pt-6">
                  <h3 className="font-semibold text-2xl leading-tight">{product.title}</h3>
                </div>

                {/* Product Images Grid */}
                {product.images && product.images.length > 0 && (
                  <div className="px-6">
                    <div className={`grid gap-3 ${product.images.length === 1 ? 'grid-cols-1' : product.images.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
                      {product.images.map((image, index) => (
                        <div key={index} className="relative aspect-square overflow-hidden bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                          <Image
                            src={image}
                            alt={`${product.title} - Image ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product Description and Details */}
                <CardContent className="px-6 pb-6">
                  <div className="space-y-4">
                    {product.description && (
                      <div className="min-h-[80px]">
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    )}

                    {product.attributes && (
                      <div className="space-y-3 pt-4 border-t border-gray-100">
                        {product.attributes.size && product.attributes.size.length > 0 && (
                          <div>
                            <span className="text-sm font-medium text-foreground block mb-1">Available Sizes:</span>
                            <span className="text-sm text-muted-foreground">
                              {product.attributes.size.join(", ")}
                            </span>
                          </div>
                        )}

                        {product.attributes.material && (
                          <div>
                            <span className="text-sm font-medium text-foreground block mb-1">Material:</span>
                            <span className="text-sm text-muted-foreground">
                              {product.attributes.material}
                            </span>
                          </div>
                        )}

                        {product.attributes.fit && (
                          <div>
                            <span className="text-sm font-medium text-foreground block mb-1">Fit:</span>
                            <span className="text-sm text-muted-foreground">
                              {product.attributes.fit}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <FooterSection />
    </div>
  )
}
