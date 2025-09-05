"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Simple static catalogue items. Replace or extend with real data as needed.
const catalogue = [
  { id: "cat-home-1", name: "Classic Home Kit", image: "/athletic-tank-front.png", tags: ["Home", "2025"] },
  { id: "cat-away-1", name: "Bold Away Kit", image: "/athletic-tank-back.png", tags: ["Away", "2025"] },
  { id: "cat-alt-1", name: "Alternate Neon", image: "/athletic-tank-top.png", tags: ["Alternate", "Limited"] },
  { id: "cat-training-1", name: "Training Pro", image: "/sports-bra.png", tags: ["Training"] },
  { id: "cat-keeper-1", name: "Goalkeeper Elite", image: "/sports-shoes-2.png", tags: ["Goalkeeper"] },
  { id: "cat-retro-1", name: "Retro Throwback", image: "/sports-shoes.png", tags: ["Retro"] },
]

export default function CataloguePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Catalogue</h1>
            <p className="text-muted-foreground">Browse sample jersey designs for inspiration.</p>
          </div>
          <Button asChild>
            <Link href="/kitbuilder">Build your own</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogue.map((item) => (
            <Card key={item.id} className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{item.name}</h3>
                  <div className="flex gap-1">
                    {item.tags.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href="/kitbuilder">Customize</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="#">View details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
