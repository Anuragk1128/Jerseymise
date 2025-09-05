"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { ProductFilters, type FilterState } from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, AlertCircle } from "lucide-react"
import { getAllProducts, getProductsByCategoryAndSubcategory } from "@/lib/api"
import type { Product } from "@/lib/types"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const subcategoryParam = searchParams.get("subcategory")

  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterState>({
    categories: categoryParam ? [categoryParam] : [],
    priceRange: [0, 5000], // Increased max price to accommodate higher product prices
    inStockOnly: false,
    minRating: 0,
  })

  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  // Update filters when URL params change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      categories: categoryParam ? [categoryParam] : []
    }))
  }, [categoryParam, subcategoryParam])

  // Fetch all products using admin endpoint; filter client-side
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const response = await getAllProducts("sportswear", { limit: 200 })
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

  const getSlug = (v: string | { _id: string; name: string; slug: string } | undefined | null) => {
    if (!v) return "";
    if (typeof v === "string") return v; // fallback if API sends string ids without slug
    return v.slug || "";
  };

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const productCategorySlug = getSlug(product.categoryId)
      const productSubcategorySlug = getSlug(product.subcategoryId)

      // If URL has category param, filter by it strictly
      if (categoryParam) {
        if (productCategorySlug.toLowerCase() !== categoryParam.toLowerCase()) {
          return false
        }
      }
      
      // If URL has subcategory param, filter by it strictly
      if (subcategoryParam) {
        if (productSubcategorySlug.toLowerCase() !== subcategoryParam.toLowerCase()) {
          return false
        }
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Stock filter
      if (filters.inStockOnly && product.stock <= 0) {
        return false
      }

      // Rating filter - Not available in the API yet
      // if (product.rating < filters.minRating) {
      //   return false
      // }

      return true
    })

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price)
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price)
      case "newest":
        return [...filtered].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      // case "rating":
      //   return [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0))
      default:
        return filtered
    }
  }, [products, filters, sortBy, subcategoryParam])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Error loading products</h3>
            <p className="text-muted-foreground mb-6">
              {error}
            </p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              Try again
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Filters and Sort Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">
              {categoryParam ? 
                `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}'s Collection` : 
                'All Products'}
            </h1>
            <span className="text-muted-foreground">({filteredAndSortedProducts.length} items)</span>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  {/* <SelectItem value="rating">Top Rated</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } md:block w-full md:w-64 flex-shrink-0`}
          >
            <ProductFilters 
              onFiltersChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))} 
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedProducts.map((product) => {
                  const categorySlug = getSlug(product.categoryId)
                  const subcategorySlug = getSlug(product.subcategoryId)
                  return (
                    <ProductCard key={product._id} product={{
                      id: product._id,
                      name: product.title,
                      price: product.price,
                      originalPrice: product.compareAtPrice,
                      image: product.images[0] || "/placeholder.svg",
                      images: product.images,
                      category: categorySlug,
                      subcategory: subcategorySlug,
                      description: product.description,
                      inStock: product.stock > 0,
                      rating: 4.5, // Default rating since not in API
                      reviewCount: 0,
                      features: [], // Not in API
                      sizes: product.attributes?.size || [],
                      colors: product.attributes?.color || [],
                    }} />
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search for something else.
                </p>
                <Button variant="outline" onClick={() => setFilters({
                  categories: [],
                  priceRange: [0, 5000],
                  inStockOnly: false,
                  minRating: 0,
                })}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
