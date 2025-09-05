"use client"
import { useEffect, useState } from "react";
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AuthDialog } from "@/components/auth-dialog"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/lib/auth-context"
import { Search, Menu, Heart } from "lucide-react"
import localFont from "next/font/local"
import { getCategories, getSubcategories } from "@/lib/api";
import type { Category, Subcategory } from "@/lib/types";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

const montserrat = localFont({
  src: [
    { path: "../Montserrat/Montserrat-VariableFont_wght.ttf", weight: "100 900", style: "normal" },
    { path: "../Montserrat/Montserrat-Italic-VariableFont_wght.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-montserrat",
})

export function Header() {
  const { isAuthenticated, isLoading } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategoriesBySlug, setSubcategoriesBySlug] = useState<Record<string, Subcategory[]>>({});
  const [loadingBySlug, setLoadingBySlug] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchCategories() {
      const response = await getCategories("sportswear");
      setCategories(response.data);
    }

    fetchCategories();
  }, []);

  async function ensureSubcategories(categorySlug: string) {
    if (subcategoriesBySlug[categorySlug] || loadingBySlug[categorySlug]) return;
    setLoadingBySlug((m) => ({ ...m, [categorySlug]: true }));
    const res = await getSubcategories("sportswear", categorySlug);
    setSubcategoriesBySlug((m) => ({ ...m, [categorySlug]: res.data }));
    setLoadingBySlug((m) => ({ ...m, [categorySlug]: false }));
  }

  return (
    <header className={`bg-white border-b ${montserrat.className}`}>
      {/* Top link bar */}
      <div className="border-b">
        <div className="container mx-auto px-4 h-10 flex items-center">
          {/* Mobile: logo left, menu right */}
          <div className="flex md:hidden w-full items-center justify-between">
            <Link href="/" className="flex items-center gap-2 min-w-[100px] py-2" aria-label="Jerseymise Home">
              <Image src="/logo/JERSEYMISE_LOGO_WHITE_BG.svg" alt="Jerseymise mark" width={36} height={36} priority />
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
                    <Input placeholder="Search For The Product" className="pl-10" />
                  </div>
                  <nav className="flex flex-col space-y-4">
                    {categories.map((category) => (
                      <Link href={`/products?category=${category.slug}`} key={category._id} className="text-lg font-medium">{category.name}</Link>
                    ))}
                    <Link href="/kitbuilder" className="text-lg font-medium">Kit Builder</Link>
                    <Link href="/products?category=sale" className="text-lg font-medium">Sale</Link>
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

          {/* Desktop links right aligned */}
          <nav className="hidden md:flex items-center gap-6 text-xs text-muted-foreground ml-auto">
            <Link href="/find-us" className="hover:text-foreground transition-colors">Find us</Link>
            <span className="text-muted-foreground/40">|</span>
            <Link href="/help" className="hover:text-foreground transition-colors">Help</Link>
            <span className="text-muted-foreground/40">|</span>
            <Link href="/join-us" className="hover:text-foreground transition-colors">Join us</Link>
            <span className="text-muted-foreground/40">|</span>
            <Link href="/login" className="hover:text-foreground transition-colors">Login</Link>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mx-auto px-4">
        {/* Desktop layout */}
        <div className="hidden md:flex items-center w-full h-16 gap-4">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3 min-w-[120px] py-2" aria-label="Jerseymise Home">
            <Image src="/logo/JERSEYMISE_LOGO_WHITE_BG.svg" alt="Jerseymise mark" width={56} height={56} priority />
            <span className="sr-only">Jerseymise</span>
          </Link>

          {/* Categories */}
          <nav className="flex items-center gap-8 ml-4">
            {categories.map((category) => (
              <HoverCard key={category._id} openDelay={80} closeDelay={80}>
                <HoverCardTrigger asChild>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="text-sm font-medium hover:text-primary transition-colors"
                    onMouseEnter={() => ensureSubcategories(category.slug)}
                  >
                    {category.name}
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent align="start" sideOffset={8} className="w-[480px]">
                  <div className="grid grid-cols-2 gap-4">
                    {(subcategoriesBySlug[category.slug] || []).map((sub) => (
                      <Link
                        key={sub._id}
                        href={`/products?category=${category.slug}&subcategory=${sub.slug}`}
                        className="group rounded-md p-2 hover:bg-muted/60 transition-colors"
                      >
                        <div className="text-sm font-medium group-hover:text-primary">{sub.name}</div>
                        <div className="text-xs text-muted-foreground">Explore {sub.name.toLowerCase()}</div>
                      </Link>
                    ))}
                    {loadingBySlug[category.slug] && (
                      <div className="col-span-2 text-sm text-muted-foreground">Loading...</div>
                    )}
                    {!loadingBySlug[category.slug] && (!subcategoriesBySlug[category.slug] || subcategoriesBySlug[category.slug].length === 0) && (
                      <div className="col-span-2 text-sm text-muted-foreground">No subcategories</div>
                    )}
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
            <Link href="/kitbuilder" className="text-sm font-medium hover:text-primary transition-colors">Kit Builder</Link>
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search For The Product" className="pl-10" />
            </div>
          </div>

          {/* Right: Profile / Wishlist */}
          <div className="flex items-center gap-2 ml-auto">
            {!isLoading && (isAuthenticated ? <UserMenu /> : <AuthDialog />)}
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile: quick actions without cart */}
        <div className="flex md:hidden items-center justify-end h-12 gap-2 px-1">
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
          {!isLoading && (isAuthenticated ? <UserMenu /> : <AuthDialog />)}
        </div>
      </div>

      {/* promo strip */}
      <div className="bg-black text-white text-center text-sm py-2">
        Easy Return Within 4 Days
      </div>
    </header>
  )
}

