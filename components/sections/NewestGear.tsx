"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getCategories } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

export default function NewestGear() {
  const [categories, setCategories] = useState<Array<{ _id: string; name: string; slug: string; image: string }>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true)
        const response = await getCategories("sportswear")
        // Take up to 3 categories for the newest gear section
        setCategories(response.data.slice(0, 3))
      } catch (err) {
        console.error("Error fetching categories:", err)
        setError("Failed to load categories. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (isLoading) {
    return (
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-base md:text-lg font-medium mb-6 md:mb-8">Add our newest gear to your collection</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="w-full aspect-square" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-base md:text-lg font-medium mb-6 md:mb-8">Add our newest gear to your collection</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category._id} 
              href={`/products?category=${category.slug}`} 
              className="group"
            >
              <div className="relative w-full aspect-square bg-muted overflow-hidden rounded-lg">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-3 text-sm md:text-base font-medium">{category.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
