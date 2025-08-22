"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { mockOrders } from "@/lib/mock-data"
import { Package, Eye, Download, ArrowLeft } from "lucide-react"
import { redirect } from "next/navigation"

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    redirect("/")
  }

  const userOrders = mockOrders.filter((order) => order.userId === user?.id)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">My Orders</h1>
          </div>

          {userOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
              <p className="text-muted-foreground mb-8">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>
              <Button asChild size="lg">
                <Link href="/products">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {userOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <p className="text-muted-foreground">
                          Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Order Items */}
                      <div>
                        <h4 className="font-medium mb-2">Items ({order.items.length})</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <div>
                                <span className="font-medium">{item.product.name}</span>
                                <span className="text-muted-foreground ml-2">
                                  Size: {item.selectedSize}, Color: {item.selectedColor}
                                </span>
                              </div>
                              <div className="text-right">
                                <div>Qty: {item.quantity}</div>
                                <div className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Total */}
                      <div className="flex justify-between items-center pt-4 border-t">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold text-lg">${order.total.toFixed(2)}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download Invoice
                        </Button>
                        {order.status === "delivered" && (
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
