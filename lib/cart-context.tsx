"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { Product } from "@/lib/mock-data"

export interface CartItem {
  product: Product
  quantity: number
  selectedSize: string
  selectedColor: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; size: string; color: string; quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: string; size: string; color: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; size: string; color: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartState }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, size, color, quantity = 1 } = action.payload
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color,
      )

      let newItems: CartItem[]
      if (existingItemIndex >= 0) {
        newItems = [...state.items]
        newItems[existingItemIndex].quantity += quantity
      } else {
        newItems = [...state.items, { product, quantity, selectedSize: size, selectedColor: color }]
      }

      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      const newState = { items: newItems, total, itemCount }

      if (typeof window !== "undefined") {
        localStorage.setItem("fitgear_cart", JSON.stringify(newState))
      }

      return newState
    }

    case "REMOVE_ITEM": {
      const { productId, size, color } = action.payload
      const newItems = state.items.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color),
      )

      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      const newState = { items: newItems, total, itemCount }

      if (typeof window !== "undefined") {
        localStorage.setItem("fitgear_cart", JSON.stringify(newState))
      }

      return newState
    }

    case "UPDATE_QUANTITY": {
      const { productId, size, color, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: { productId, size, color } })
      }

      const newItems = state.items.map((item) =>
        item.product.id === productId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity }
          : item,
      )

      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      const newState = { items: newItems, total, itemCount }

      if (typeof window !== "undefined") {
        localStorage.setItem("fitgear_cart", JSON.stringify(newState))
      }

      return newState
    }

    case "CLEAR_CART":
      if (typeof window !== "undefined") {
        localStorage.removeItem("fitgear_cart")
      }
      return { items: [], total: 0, itemCount: 0 }

    case "LOAD_CART":
      return action.payload

    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("fitgear_cart")
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart)
          dispatch({ type: "LOAD_CART", payload: parsedCart })
        } catch (error) {
          console.error("Failed to load cart from localStorage:", error)
          localStorage.removeItem("fitgear_cart")
        }
      }
    }
  }, [])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
