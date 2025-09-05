"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { Skeleton } from "@/components/ui/skeleton"
import { getAllProducts } from "@/lib/api"

export function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true)
        const res = await getAllProducts("sportswear", { limit: 12 })
        setFeaturedProducts(res.data.slice(0, 4))
      } catch (e) {
        console.error(e)
        setError("Failed to load featured products")
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular items, carefully selected for performance and style
          </p>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-sm text-red-500 mb-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((p) => (
              <ProductCard
                key={p._id}
                product={{
                  id: p._id,
                  name: p.title,
                  price: p.price,
                  originalPrice: p.compareAtPrice,
                  image: (p.images && p.images[0]) || "/placeholder.svg",
                  images: p.images || [],
                  category: typeof p.categoryId === 'string' ? p.categoryId : (p.categoryId?.slug || ''),
                  subcategory: typeof p.subcategoryId === 'string' ? p.subcategoryId : (p.subcategoryId?.slug || ''),
                  description: p.description,
                  inStock: (p.stock || 0) > 0,
                  rating: 4.5,
                  reviewCount: 0,
                  features: [],
                  sizes: p.attributes?.size || [],
                  colors: p.attributes?.color || [],
                }}
              />
            ))}
          </div>
        )}
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
