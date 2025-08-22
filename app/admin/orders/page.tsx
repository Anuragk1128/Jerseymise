"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Eye, Download } from "lucide-react"

// Mock orders data
const mockOrders = [
  {
    id: "FG001234",
    customer: "John Doe",
    email: "john@example.com",
    total: 129.99,
    status: "completed",
    date: "2024-01-15",
    items: 2,
  },
  {
    id: "FG001235",
    customer: "Jane Smith",
    email: "jane@example.com",
    total: 89.5,
    status: "processing",
    date: "2024-01-15",
    items: 1,
  },
  {
    id: "FG001236",
    customer: "Mike Johnson",
    email: "mike@example.com",
    total: 199.99,
    status: "shipped",
    date: "2024-01-14",
    items: 3,
  },
  {
    id: "FG001237",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    total: 75.0,
    status: "pending",
    date: "2024-01-14",
    items: 1,
  },
  {
    id: "FG001238",
    customer: "David Brown",
    email: "david@example.com",
    total: 245.5,
    status: "completed",
    date: "2024-01-13",
    items: 4,
  },
]

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "processing":
        return "secondary"
      case "shipped":
        return "outline"
      case "pending":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Orders</h1>
          <p className="text-muted-foreground">Manage customer orders and fulfillment</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium font-mono">{order.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{new Date(order.date).toLocaleDateString()}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{order.items} items</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status)} className="capitalize">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
