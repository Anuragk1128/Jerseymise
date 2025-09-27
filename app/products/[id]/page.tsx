"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, Truck, RotateCcw, Shield, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { getAllProducts, getProductById, getPublicProductById } from "@/lib/api"
import type { Product } from "@/lib/types"

export default function ProductPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)

  // Navigation functions - defined early to maintain hook order
  const goToPreviousImage = useCallback(() => {
    setSelectedImage(prev => {
      if (!product) return prev
      const productImages = product.images && product.images.length > 0 
        ? product.images 
        : (product as any)?.image 
          ? [(product as any).image]
          : ['/placeholder.svg']
      if (productImages.length <= 1) return prev
      return prev === 0 ? productImages.length - 1 : prev - 1
    })
  }, [product])

  const goToNextImage = useCallback(() => {
    setSelectedImage(prev => {
      if (!product) return prev
      const productImages = product.images && product.images.length > 0 
        ? product.images 
        : (product as any)?.image 
          ? [(product as any).image]
          : ['/placeholder.svg']
      if (productImages.length <= 1) return prev
      return prev === productImages.length - 1 ? 0 : prev + 1
    })
  }, [product])

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!product) return
      
      const productImages = product.images && product.images.length > 0 
        ? product.images 
        : (product as any)?.image 
          ? [(product as any).image]
          : ['/placeholder.svg']
          
      if (productImages.length <= 1) return
      
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goToPreviousImage()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        goToNextImage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [product, goToPreviousImage, goToNextImage])

  // Fetch related products when product changes
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return;
      
      try {
        // Fetch all products and filter by the same category
        const response = await getAllProducts("sportswear", { limit: 100 });
        const related = response.data.filter(
          (p: any) => 
            p._id !== product._id && 
            p.categoryId === product.categoryId
        );
        setRelatedProducts(related.slice(0, 4));
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const productId = params?.id
        if (!productId) {
          setError("Invalid product id")
          setIsLoading(false)
          return
        }
        try {
          // Try public endpoint first (no admin auth)
          const pub = await getPublicProductById(productId)
          setProduct(pub.data)
        } catch (e1) {
          try {
            // Try public single-product endpoint
            const response = await getProductById(productId)
            setProduct(response.data)
          } catch (e2) {
            // Fallback: page through products and find by id
            let page = 1
            const limit = 50
            let found: any = null
            while (!found) {
              const res = await getAllProducts("sportswear", { page, limit })
              found = res.data.find((p: any) => p._id === productId) || null
              const totalPages = res.pagination?.totalPages || 1
              if (found || page >= totalPages) break
              page += 1
            }
            setProduct(found)
          }
        }
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Failed to load product. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="aspect-square w-full rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-1/3" />
              <div className="flex space-x-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or could not be loaded.</p>
          <Button onClick={() => router.push('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  const discountPercentage = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0
    
  // Map API product to component props
  const p = product as any
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : p.image 
      ? [p.image]
      : ['/placeholder.svg']
  const externalShopUrl = `https://houseofevolve.in/products/${product._id}`
  
  const handleShopNow = () => {
    // In the future, we can add authentication token here
    window.open(externalShopUrl, '_blank', 'noopener,noreferrer');
  }


  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50 group">
              <Image
                src={productImages[selectedImage]}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              {discountPercentage > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">-{discountPercentage}%</Badge>
              )}
              
              {/* Navigation buttons - only show if there are multiple images */}
              {productImages.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white shadow-lg"
                    onClick={goToPreviousImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white shadow-lg"
                    onClick={goToNextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              {/* Image counter */}
              {productImages.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
                  {selectedImage + 1} / {productImages.length}
                </div>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all min-w-[80px] hover:scale-105 ${
                    selectedImage === i 
                      ? "border-primary shadow-md" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} - ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{p?.rating ?? '4.5'}</span>
                  <span className="text-muted-foreground">({p?.reviewCount ?? 0} reviews)</span>
                </div>
                {product.stock > 0 ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    Out of Stock
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold">{formatCurrency(product.price)}</span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-xl text-muted-foreground line-through">{formatCurrency(product.compareAtPrice)}</span>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <div className="prose max-w-none">
                <p>{product.description || "No description available."}</p>
                {p?.features && p.features.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {p.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {p?.variants && p.variants.length > 0 && (
              <div className="space-y-4">
                {p.variants.map((variant: any) => (
                  <div key={variant.name} className="space-y-2">
                    <h3 className="text-sm font-medium">{variant.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {variant.options.map((option: string) => (
                        <Button
                          key={option}
                          variant={
                            (variant.name === 'Size' && selectedSize === option) || 
                            (variant.name === 'Color' && selectedColor === option)
                              ? "default" 
                              : "outline"
                          }
                          size="sm"
                          onClick={() => {
                            if (variant.name === 'Size') setSelectedSize(option);
                            if (variant.name === 'Color') setSelectedColor(option);
                          }}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders over {formatCurrency(600)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">30-day policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Quality Guarantee</p>
                  <p className="text-xs text-muted-foreground">Premium materials</p>
                </div>
                
              </div>
              <Button onClick={handleShopNow}>Shop Now</Button>
            </div>
            
            {/* Product Attributes */}
            {(product.attributes || product.tags?.length) && (
              <div className="mt-8 space-y-6">
                <h3 className="text-lg font-semibold">Product Attributes</h3>

                {/* Material & Fit */}
                {(product.attributes?.material || product.attributes?.fit) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.attributes?.material && (
                      <div className="rounded-lg border p-4">
                        <p className="text-xs text-muted-foreground mb-1">Material</p>
                        <p className="font-medium">{product.attributes.material}</p>
                      </div>
                    )}
                    {product.attributes?.fit && (
                      <div className="rounded-lg border p-4">
                        <p className="text-xs text-muted-foreground mb-1">Fit</p>
                        <p className="font-medium">{product.attributes.fit}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Sizes */}
                {Array.isArray(product.attributes?.size) && product.attributes!.size.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Available Sizes</p>
                    <div className="flex flex-wrap gap-2">
                      {product.attributes!.size.map((s: string) => (
                        <Badge key={s} variant="secondary" className="px-3 py-1">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors */}
                {Array.isArray(product.attributes?.color) && product.attributes!.color.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Available Colors</p>
                    <div className="flex flex-wrap gap-2">
                      {product.attributes!.color.map((c: string) => (
                        <Badge key={c} variant="outline" className="px-3 py-1">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {Array.isArray(product.tags) && product.tags.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((t: string) => (
                        <Badge key={t} variant="secondary" className="px-3 py-1">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const relatedDiscount = relatedProduct.compareAtPrice && relatedProduct.compareAtPrice > relatedProduct.price
                  ? Math.round(((relatedProduct.compareAtPrice - relatedProduct.price) / relatedProduct.compareAtPrice) * 100)
                  : 0;
                const imageUrl = (Array.isArray(relatedProduct.images) && relatedProduct.images.length > 0)
                  ? relatedProduct.images[0]
                  : (relatedProduct as any)?.image ?? '/placeholder.svg';

                return (
                  <div key={relatedProduct._id} className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <Image
                        src={imageUrl}
                        alt={relatedProduct.title || 'Product image'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {relatedDiscount > 0 && (
                        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                          -{relatedDiscount}%
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {relatedProduct.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">{formatCurrency(relatedProduct.price)}</span>
                        {relatedProduct.compareAtPrice && relatedProduct.compareAtPrice > relatedProduct.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatCurrency(relatedProduct.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground">No related products found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
