import { Truck, Shield, RotateCcw } from "lucide-react"

export function Features() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
              <Truck className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Free Shipping</h3>
              <p className="text-muted-foreground">On Orders Over ₹ 599</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Quality Guarantee</h3>
              <p className="text-muted-foreground">Premium Materials Only</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
              <RotateCcw className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Easy Returns</h3>
              <p className="text-muted-foreground">7 days return policy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
