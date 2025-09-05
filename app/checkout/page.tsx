"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Purchasing Disabled</h1>
        <p className="text-muted-foreground mb-8">
          This demo showcases products and pricing only. Cart and checkout are disabled.
        </p>
        <Button asChild size="lg">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    </div>
  )
}
