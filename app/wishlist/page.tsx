"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/Footer"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface WishlistProduct {
  _id: string
  title: string
  images: string[]
  price: number
  priceIncludingTax?: number | null
  brandId?: string
}

interface WishlistItem {
  _id: string
  product: WishlistProduct
  createdAt: string
}

export default function WishlistPage() {
  const { token, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) return
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("https://hoe-be.onrender.com/api/wishlist", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
          credentials: "include",
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.message || "Failed to load wishlist")
        }
        const data: WishlistItem[] = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
        setError(e instanceof Error ? e.message : "Failed to load wishlist")
        toast({ title: "Error", description: "Could not load wishlist", variant: "destructive" })
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated && token) fetchWishlist()
  }, [isAuthenticated, token, toast])

  const handleRemoveFromWishlist = async (productId: string) => {
    if (!token) return
    try {
      const res = await fetch(`https://hoe-be.onrender.com/api/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Failed to remove from wishlist')
      }
      setItems(prev => prev.filter(i => i.product._id !== productId))
      toast({ title: 'Removed', description: 'Product removed from wishlist.' })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Wishlist</h1>
        {!isAuthenticated ? (
          <p className="text-muted-foreground text-center">Please sign in to view your wishlist.</p>
        ) : loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (() => {
          const IRA_BRAND_ID = '68b6dbb8979adf12e46f2739'
          const filteredItems = items.filter((i) => i.product.brandId !== IRA_BRAND_ID)
          return filteredItems.length === 0 ? (
          <p className="text-muted-foreground">Your wishlist is empty.</p>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item._id} className="border rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={item.product.images?.[0] || "/placeholder.svg"}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium line-clamp-2">{item.product.title}</h3>
                <div className="p-4 space-y-2">
                  <p className="text-sm">₹{(item.product.priceIncludingTax ?? item.product.price).toFixed(2)}</p>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/products/${item.product._id}`}>View</Link>
                    </Button>
                    <Button size="sm" onClick={() => handleRemoveFromWishlist(item.product._id)}>Remove</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )
        })()}
      </div>
      <FooterSection />
    </div>
  )
}