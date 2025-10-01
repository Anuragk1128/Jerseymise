"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react"

function CheckoutSuccessInner() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order") || "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground mb-2">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <p className="text-sm text-muted-foreground">
              Order Number: <span className="font-mono font-medium">{orderNumber}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Confirmation Email</h3>
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to your email address with order details.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Package className="h-8 w-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Shipping Updates</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive tracking information once your order ships.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/orders">
                View Order Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <div>
              <Button variant="outline" asChild size="lg" className="w-full sm:w-auto bg-transparent">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's Next?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your order will be processed within 1-2 business days</li>
              <li>• You'll receive a shipping confirmation with tracking details</li>
              <li>• Standard delivery takes 3-5 business days</li>
              <li>• Contact us if you have any questions about your order</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background"><Header /></div>}>
      <CheckoutSuccessInner />
    </Suspense>
  )
}
