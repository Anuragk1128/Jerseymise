import { getCategories, getSubcategories } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default async function CollectionsPage() {
  const { data: categories } = await getCategories("sportswear")

  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Collections</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of high-quality sportswear collections designed for performance and style.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(async (category) => {
            const { data: subcategories } = await getSubcategories("sportswear", category.slug)
            
            return (
              <Card key={category._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {subcategories.slice(0, 3).map((subcategory) => (
                        <Link
                          key={subcategory._id}
                          href={`/products?category=${category.slug}&subcategory=${subcategory.slug}`}
                          className="group flex items-center justify-between py-2 text-sm hover:text-primary transition-colors"
                        >
                          <span>{subcategory.name}</span>
                          <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                    <Button asChild variant="outline" className="w-full mt-4">
                      <Link href={`/products?category=${category.slug}`}>
                        View All {category.name}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
