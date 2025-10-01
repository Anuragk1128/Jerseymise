"use client"

import { useState, useMemo, useEffect, Dispatch, SetStateAction, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/Footer"
import { ProductCard } from "@/components/product-card"
import { ProductFilters, type FilterState } from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, AlertCircle, Search } from "lucide-react"
import { getAllProducts, getProductsByCategoryAndSubcategory } from "@/lib/api"
import type { Product } from "@/lib/types"

function ProductsPageInner() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const subcategoryParam = searchParams.get("subcategory")
  const searchQuery = searchParams.get("q")?.toLowerCase() || ""

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

  // Filter products based on active filters and search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filter out archived products
      if (product.status === 'archived') {
        return false;
      }

      // Search query filter - search in title, description, and tags
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase().trim();
        const searchTerms = searchLower.split(/\s+/); // Split search query into terms
        
        // Check if all search terms match in any of the product fields
        const matchesSearch = searchTerms.every(term => 
          product.title.toLowerCase().includes(term) ||
          (product.description && product.description.toLowerCase().includes(term)) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(term))) ||
          (typeof product.categoryId === 'object' && product.categoryId.name.toLowerCase().includes(term))
        );
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.categories.length > 0) {
        const categoryMatch = filters.categories.some(cat => 
          product.categoryId === cat || 
          (typeof product.categoryId === 'object' && product.categoryId.slug === cat)
        );
        if (!categoryMatch) return false;
      }

      // Subcategory filter
      if (subcategoryParam) {
        const subcategoryMatch = 
          product.subcategoryId === subcategoryParam ||
          (typeof product.subcategoryId === 'object' && product.subcategoryId.slug === subcategoryParam);
        if (!subcategoryMatch) return false;
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // In stock filter
      if (filters.inStockOnly && (!product.stock || product.stock <= 0)) {
        return false;
      }

      // Rating filter
      if (filters.minRating > 0 && (!product.rating || product.rating < filters.minRating)) {
        return false;
      }

      return true;
    });
  }, [products, searchQuery, filters, subcategoryParam]);

  // Sort products based on selected sort option
  const filteredAndSortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const aFeatured = a.isFeatured ? 1 : 0;
      const bFeatured = b.isFeatured ? 1 : 0;
      
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case 'price-asc':
          return (a.compareAtPrice || a.price) - (b.compareAtPrice || b.price);
        case 'price-desc':
          return (b.compareAtPrice || b.price) - (a.compareAtPrice || a.price);
        case 'featured':
        default:
          // Sort featured products first, then by newest
          if (aFeatured !== bFeatured) return bFeatured - aFeatured;
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
    });
  }, [filteredProducts, sortBy]);
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Skeleton className="h-10 w-full mb-4" />
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                {searchQuery ? (
                  <h1 className="text-2xl font-bold">Search results for "{searchQuery}"</h1>
                ) : categoryParam ? (
                  <h1 className="text-2xl font-bold">
                    {`${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}'s Collection`}
                  </h1>
                ) : (
                  <h1 className="text-2xl font-bold">All Products</h1>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <Skeleton className="h-10 w-40" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-5 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show no results message if no products match the search
  if (filteredProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Search className="h-12 w-12 text-muted-foreground" />
            <h2 className="text-2xl font-bold">
              {searchQuery 
                ? `No products found for "${searchQuery}"`
                : 'No products found'}
            </h2>
            <p className="text-muted-foreground">
              {searchQuery 
                ? 'Try adjusting your search or filter to find what you\'re looking for.'
                : 'There are currently no products available in this category.'}
            </p>
            {searchQuery && (
              <Button variant="outline" onClick={() => window.location.href = '/products'}>
                Clear search
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } md:block w-full md:w-64 flex-shrink-0`}
          >
            <div className="sticky top-4">
              <ProductFilters 
                onFiltersChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))}
              />
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold">
                  {searchQuery 
                    ? `Search results for "${searchQuery}"`
                    : categoryParam 
                      ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}'s Collection`
                      : 'All Products'}
                </h1>
                <span className="text-muted-foreground">
                  {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'item' : 'items'}
                </span>
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
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
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
      <FooterSection />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50"><Header /></div>}>
      <ProductsPageInner />
    </Suspense>
  )
}
