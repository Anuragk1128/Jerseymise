"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartDrawer } from "@/components/cart-drawer"
import { AuthDialog } from "@/components/auth-dialog"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/lib/auth-context"
import { Search, Menu, Heart } from "lucide-react"
import localFont from "next/font/local"

const montserrat = localFont({
  src: [
    { path: "../Montserrat/Montserrat-VariableFont_wght.ttf", weight: "100 900", style: "normal" },
    { path: "../Montserrat/Montserrat-Italic-VariableFont_wght.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-montserrat",
})

export function Header() {
  const { isAuthenticated, isLoading } = useAuth()

  return (
    <header className={`bg-white border-b ${montserrat.className}`}>
      {/* Top bar */}
      <div className="border-b">
        <div className="container mx-auto px-4 h-8 flex items-center justify-end text-xs">
          <nav className="hidden md:flex items-center gap-6 text-muted-foreground">
            <Link href="/help" className="hover:text-foreground transition-colors">Help</Link>
            <Link href="/join-us" className="hover:text-foreground transition-colors">Join Us</Link>
          </nav>
          {/* Mobile: logo left, menu right */}
          <div className="flex md:hidden w-full items-center justify-between">
            <Link href="/" className="flex items-center gap-2 min-w-[100px] py-2" aria-label="Jerseymise Home">
              <Image src="/logo/jerseymise-mark-black.svg" alt="Jerseymise mark" width={28} height={28} priority />
              <span className="font-bold tracking-wide">JERSEYMISE</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search products..." className="pl-10" />
                  </div>
                  <nav className="flex flex-col space-y-4">
                    <Link href="/products?category=men" className="text-lg font-medium">Men</Link>
                    <Link href="/products?category=women" className="text-lg font-medium">Women</Link>
                    <Link href="/products?category=kitbuilder" className="text-lg font-medium">Kitbuilder</Link>
                    <Link href="/products?category=sales" className="text-lg font-medium">Sales</Link>
                  </nav>
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <Button variant="ghost" className="justify-start">
                      <Heart className="h-5 w-5 mr-2" />
                      Wishlist
                    </Button>
                    {!isLoading && !isAuthenticated && (
                      <div className="pt-2">
                        <AuthDialog />
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mx-auto px-4">
        {/* Desktop layout */}
        <div className="hidden md:flex items-center w-full h-16 gap-4">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3 min-w-[120px] py-2" aria-label="Jerseymise Home">
            <Image src="/logo/jerseymise-mark-black.svg" alt="Jerseymise mark" width={32} height={32} priority />
            <span className="font-bold text-xl tracking-wide">JERSEYMISE</span>
          </Link>

          {/* Categories */}
          <nav className="flex items-center gap-6 ml-4">
            <Link href="/products?category=men" className="text-sm font-medium hover:text-primary transition-colors">Men</Link>
            <Link href="/products?category=women" className="text-sm font-medium hover:text-primary transition-colors">Women</Link>
            <Link href="/products?category=kitbuilder" className="text-sm font-medium hover:text-primary transition-colors">Kitbuilder</Link>
            <Link href="/products?category=sales" className="text-sm font-medium hover:text-primary transition-colors">Sales</Link>
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-10" />
            </div>
          </div>

          {/* Right: Profile / Wishlist / Cart */}
          <div className="flex items-center gap-2 ml-auto">
            {!isLoading && (isAuthenticated ? <UserMenu /> : <AuthDialog />)}
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <CartDrawer />
          </div>
        </div>

        {/* Mobile: keep quick actions row under top bar */}
        <div className="flex md:hidden items-center justify-end h-12 gap-2 px-1">
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
          {!isLoading && (isAuthenticated ? <UserMenu /> : <AuthDialog />)}
          <CartDrawer />
        </div>
      </div>
    </header>
  )
}

