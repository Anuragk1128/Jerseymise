import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Intro() {
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide">JERSEYMISE</h2>
        <p className="mt-4 text-sm md:text-base text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
          laoreet dolore magna aliquam erat
        </p>
        <div className="mt-6">
          <Link href="/products">
            <Button className="px-6">ShopNow</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
