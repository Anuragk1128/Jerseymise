"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react"

export default function CartPage() {
  const { state, dispatch } = useCart()
  const { isAuthenticated } = useAuth()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const updateQuantity = (productId: string, size: string, color: string, newQuantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, size, color, quantity: newQuantity },
    })
  }

  const removeItem = (productId: string, size: string, color: string) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { productId, size, color },
    })
  }

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(state.total * 0.1)
    } else if (promoCode.toLowerCase() === "welcome20") {
      setDiscount(state.total * 0.2)
    } else {
      setDiscount(0)
    }
  }

  const subtotal = state.total
  const shipping = subtotal > 75 ? 0 : 9.99
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + shipping + tax

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Button asChild size="lg">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/products">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item, index) => (
              <Card key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.product.name}</h3>
                          <div className="text-sm text-muted-foreground">
                            <span>Size: {item.selectedSize}</span>
                            <span className="mx-2">•</span>
                            <span>Color: {item.selectedColor}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() =>
                              updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() =>
                              updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold text-lg">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-muted-foreground">${item.product.price} each</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({state.itemCount} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle>Promo Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={applyPromoCode}>
                    Apply
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2">Try: SAVE10 or WELCOME20</div>
              </CardContent>
            </Card>

            {/* Checkout Button */}
            <div className="space-y-3">
              {isAuthenticated ? (
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground text-center">Please sign in to continue</p>
                  <Button size="lg" className="w-full">
                    Sign In to Checkout
                  </Button>
                </div>
              )}

              <Button variant="outline" asChild size="lg" className="w-full bg-transparent">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>

            {/* Free Shipping Notice */}
            {subtotal < 75 && (
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  Add <strong>${(75 - subtotal).toFixed(2)}</strong> more for free shipping!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
