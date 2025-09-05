"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { getCategories } from "@/lib/api"
import { Category } from "@/lib/types"

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterState) => void
}

export interface FilterState {
  categories: string[]
  priceRange: [number, number]
  inStockOnly: boolean
  minRating: number
}

export function ProductFilters({ onFiltersChange }: ProductFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    inStockOnly: false,
    minRating: 0,
  })

  useEffect(() => {
    async function fetchCategories() {
      const response = await getCategories("sportswear");
      setCategories(response.data);
    }

    fetchCategories();
  }, []);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      priceRange: [0, 500],
      inStockOnly: false,
      minRating: 0,
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="font-medium mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category._id} className="flex items-center space-x-2">
                <Checkbox
                  id={category._id}
                  checked={filters.categories.includes(category.slug)}
                  onCheckedChange={(checked) => {
                    const newCategories = checked
                      ? [...filters.categories, category.slug]
                      : filters.categories.filter((c) => c !== category.slug)
                    updateFilters({ categories: newCategories })
                  }}
                />
                <Label htmlFor={category._id} className="capitalize">
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
              max={500}
              min={0}
              step={10}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Stock Status */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="inStock"
            checked={filters.inStockOnly}
            onCheckedChange={(checked) => updateFilters({ inStockOnly: !!checked })}
          />
          <Label htmlFor="inStock">In Stock Only</Label>
        </div>

        {/* Minimum Rating */}
        <div>
          <h4 className="font-medium mb-3">Minimum Rating</h4>
          <div className="px-2">
            <Slider
              value={[filters.minRating]}
              onValueChange={(value) => updateFilters({ minRating: value[0] })}
              max={5}
              min={0}
              step={0.5}
              className="mb-2"
            />
            <div className="text-sm text-muted-foreground">{filters.minRating} stars and up</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
