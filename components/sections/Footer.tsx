import Link from "next/link"
import Image from "next/image"

export function FooterSection() {
  return (
    <footer className="bg-black text-white border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 lg:gap-12">
          <div className="text-left">
            <div className="flex items-center justify-start gap-3 mb-4 min-w-[120px]">
              <Image src="/logo/jerseymise-mark-white.svg" alt="Jerseymise mark" width={32} height={32} />
              <span className="font-bold text-xl tracking-wide">JERSEYMISE</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Premium sportswear and equipment for athletes who demand excellence.
            </p>
          </div>
          <div className="text-left">
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/products?category=men" className="hover:text-foreground">
                  Men's
                </Link>
              </li>
              <li>
                <Link href="/products?category=women" className="hover:text-foreground">
                  Women's
                </Link>
              </li>
              <li>
                <Link href="/products?category=equipment" className="hover:text-foreground">
                  Equipment
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-foreground">
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-left">
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-foreground">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-foreground">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-foreground">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-left">
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 JERSEYMISE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
