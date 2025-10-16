"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, Truck, RotateCcw, Shield, Plus,Share2 ,Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { formatCurrency, formatCurrencyWithGST } from "@/lib/utils"
import { getAllProducts, getProductById, getPublicProductById, addToWishlist } from "@/lib/api"
import type { Product } from "@/lib/types"
import {ProductFilters, type FilterState} from "@/components/product-filters"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { ProductCard } from "@/components/product-card"



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
  const [isLoadingRelated, setIsLoadingRelated] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 5000],
    inStockOnly: false,
    minRating: 0,
  })
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
  const { toast } = useToast()
  const { token, isAuthenticated } = useAuth()
 

  const handleShare = () => {
    if (product) {
      const url = `${window.location.origin}/products/${product._id}`
      navigator.clipboard.writeText(url)
      toast({
        title: "Link copied!",
        description: "Product link has been copied to clipboard",
      })
    }
  }

  const handleAddToWishlist = async () => {
    if (!product) return
    if (!isAuthenticated || !token) {
      router.push('/account')
      return
    }
    try {
      const res = await addToWishlist(product._id, token)
      if (res.success) {
        toast({ title: 'Added to wishlist', description: `${product.title} was added to your wishlist.` })
      } else {
        toast({ title: 'Failed', description: res.error || 'Could not add to wishlist', variant: 'destructive' })
      }
    } catch (e) {
      toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' })
    }
  }

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

  // Helper function to get category slug
  const getSlug = (v: string | { _id: string; name: string; slug: string } | undefined | null) => {
    if (!v) return "";
    if (typeof v === "string") return v; // fallback if API sends string ids without slug
    return v.slug || "";
  };

  // Fetch related products when product or filters change
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return;

      try {
        setIsLoadingRelated(true);
        // Fetch all products and filter by the same category
        const response = await getAllProducts("sportswear", { limit: 100 });
        let related = response.data.filter(
          (p: any) =>
            p._id !== product._id &&
            p.status !== 'archived'
        );

        // Apply category filter if selected
        if (filters.categories.length > 0) {
          console.log('Filtering by categories:', filters.categories);
          related = related.filter((p: any) => {
            const productCategorySlug = getSlug(p.categoryId);
            console.log('Product category slug:', productCategorySlug, 'for product:', p.title);
            const matches = filters.categories.some(category =>
              productCategorySlug.toLowerCase() === category.toLowerCase()
            );
            console.log('Matches filter:', matches);
            return matches;
          });
        } else {
          // If no category filter, show products from same category as current product
          const currentProductCategorySlug = getSlug(product.categoryId);
          console.log('No category filter, showing products from category:', currentProductCategorySlug);
          related = related.filter((p: any) => {
            const productCategorySlug = getSlug(p.categoryId);
            return productCategorySlug === currentProductCategorySlug;
          });
        }

        // Apply price filter
        related = related.filter((p: any) => {
          const priceToFilter = p.priceIncludingTax || p.price;
          return priceToFilter >= filters.priceRange[0] && priceToFilter <= filters.priceRange[1];
        });

        // Apply stock filter
        if (filters.inStockOnly) {
          related = related.filter((p: any) => p.stock > 0);
        }

        setRelatedProducts(related.slice(0, 4));
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setIsLoadingRelated(false);
      }
    };

    fetchRelatedProducts();
  }, [product, filters]);

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
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">{formatCurrencyWithGST((product as any).priceIncludingTax || product.price)}</span>
                  <span className="text-sm text-muted-foreground">Incl. GST</span>
                </div>
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

            {/* Size and Color Selection */}
            <div className="space-y-4">
              
              {/* Size Selection */}
              {((p?.variants && p.variants.length > 0) || (product.attributes?.size && product.attributes.size.length > 0)) && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {(p?.variants?.find((v: any) => v.name === 'Size')?.options || product.attributes?.size || []).map((size: string) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedSize(size);
                        }}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {((p?.variants && p.variants.length > 0) || (product.attributes?.color && product.attributes.color.length > 0)) && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {(p?.variants?.find((v: any) => v.name === 'Color')?.options || product.attributes?.color || []).map((color: string) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedColor(color);
                        }}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
                  <p className="text-xs text-muted-foreground">7 days return policy</p>
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
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleShare}
                title="Share product"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleAddToWishlist}
                title="Add to wishlist"
              >
                <Heart className="h-4 w-4" />
              </Button>
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold">You might also like</h2>
          </div>

          {isLoadingRelated ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                </div>
              ))}
            </div>
          ) : relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No related products found.</p>
          )}
        </div>
      </div>
      <FooterSection/>
    </div>
  )
}
