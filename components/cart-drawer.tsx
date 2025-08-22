"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"

export function CartDrawer() {
  const { state, dispatch } = useCart()
  const { isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

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

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {state.itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {state.itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({state.itemCount} items)</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Your cart is empty</p>
                <p className="text-muted-foreground mb-4">Add some products to get started</p>
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {state.items.map((item, index) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                      className="flex gap-4"
                    >
                      <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm leading-tight mb-1">{item.product.name}</h4>
                        <div className="text-xs text-muted-foreground mb-2">
                          <span>Size: {item.selectedSize}</span>
                          <span className="mx-2">•</span>
                          <span>Color: {item.selectedColor}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedSize,
                                  item.selectedColor,
                                  item.quantity - 1,
                                )
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedSize,
                                  item.selectedColor,
                                  item.quantity + 1,
                                )
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total: ${state.total.toFixed(2)}</span>
                </div>
                <div className="space-y-2">
                  {isAuthenticated ? (
                    <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground text-center">Please sign in to checkout</p>
                      <Button className="w-full" onClick={() => setIsOpen(false)}>
                        Sign In to Checkout
                      </Button>
                    </div>
                  )}
                  <Button variant="outline" asChild className="w-full bg-transparent" onClick={() => setIsOpen(false)}>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
