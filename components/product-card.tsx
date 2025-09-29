"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart } from "lucide-react"
import type { Product } from "@/lib/types"
import { formatCurrency, formatCurrencyWithGST } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="flex">
          <div className="relative w-48 h-48 bg-gray-50">
            <Link href={`/products/${product._id}`}>
              <Image
                src={product.images?.[0] || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </Link>
            {discountPercentage > 0 && (
              <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">-{discountPercentage}%</Badge>
            )}
            {product.stock === 0 && (
              <Badge variant="secondary" className="absolute top-3 right-3">
                Out of Stock
              </Badge>
            )}
          </div>
          <CardContent className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Link href={`/products/${product._id}`}>
                  <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">{product.title}</h3>
                </Link>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating || 0}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.numReviews || 0} reviews)</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold">{formatCurrencyWithGST(product.priceIncludingTax || product.price)}</span>
                    <span className="text-xs text-muted-foreground">Incl. GST</span>
                  </div>
                  {product.compareAtPrice && (
                    <span className="text-sm text-muted-foreground line-through">{formatCurrency(product.compareAtPrice)}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button asChild>
                  <Link href={`/products/${product._id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
    <Link href={`/products/${product._id}`}>
      <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.images?.[0] || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discountPercentage > 0 && (
            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">-{discountPercentage}%</Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="secondary" className="absolute top-3 right-3">
              Out of Stock
            </Badge>
          )}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
            onClick={(e) => {
              e.preventDefault()
              // Add to wishlist functionality
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating || 0}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.numReviews || 0} reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-xl font-bold">{formatCurrencyWithGST(product.priceIncludingTax || product.price)}</span>
              <span className="text-xs text-muted-foreground">Incl. GST</span>
            </div>
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">{formatCurrency(product.compareAtPrice)}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
