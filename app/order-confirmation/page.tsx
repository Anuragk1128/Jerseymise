"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"

export default function OrderConfirmationPage() {
  const orderNumber = `FG${Date.now().toString().slice(-6)}`

  useEffect(() => {
    // In a real app, you might want to track this page view for analytics
    console.log("Order confirmation page viewed")
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Number:</span>
                <span className="font-mono text-lg">{orderNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Estimated Delivery:</span>
                <span>{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Confirmation Email</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive an email confirmation with your order details shortly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Package className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Order Processing</h3>
                <p className="text-sm text-muted-foreground">
                  We'll prepare your items for shipment within 1-2 business days.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Shipping Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Track your package with the tracking number we'll send you.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/account">View Account</Link>
            </Button>
          </div>

          {/* Support */}
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you have any questions about your order, our customer support team is here to help.
            </p>
            <Button variant="outline" size="sm">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
