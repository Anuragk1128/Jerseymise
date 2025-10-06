"use client"
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { AuthDialog } from "@/components/auth-dialog"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/lib/auth-context"
import { Search, Menu, Heart, X } from "lucide-react"
import { getCategories, getSubcategories } from "@/lib/api";
import type { Category, Subcategory } from "@/lib/types";

export function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategoriesBySlug, setSubcategoriesBySlug] = useState<Record<string, Subcategory[]>>({});
  const [loadingBySlug, setLoadingBySlug] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  // Initialize search query from URL only once on mount
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(decodeURIComponent(query));
    }
  }, []); // Empty dependency array - only run once

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories("sportswear");
        setCategories(result.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Generate search suggestions based on query
  useEffect(() => {
    if (searchQuery.length > 1) {
      const suggestions = [
        'jersey', 't-shirt', 'shorts', 'pants', 'hoodie', 'jacket',
        'football', 'basketball', 'soccer', 'cricket', 'tennis',
        'nike', 'adidas', 'puma', 'reebok', 'under armour',
        'training', 'gym', 'fitness', 'sports', 'athletic'
      ].filter(item => 
        item.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      
      setSearchSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  async function ensureSubcategories(categorySlug: string) {
    if (subcategoriesBySlug[categorySlug] || loadingBySlug[categorySlug]) return;
    
    setLoadingBySlug(prev => ({ ...prev, [categorySlug]: true }));
    
    try {
      const res = await getSubcategories("sportswear", categorySlug);
      setSubcategoriesBySlug(prev => ({ ...prev, [categorySlug]: res.data }));
    } catch (error) {
      console.error(`Error fetching subcategories for ${categorySlug}:`, error);
    } finally {
      setLoadingBySlug(prev => ({ ...prev, [categorySlug]: false }));
    }
  }

  return (
    <header className={"bg-white border-b"}>
      {/* Top link bar */}
      <div className="border-b">
        <div className="container mx-auto px-4 h-10 flex items-center">
          {/* Mobile: logo left, menu right */}
          <div className="flex md:hidden w-full items-center justify-between">
            <Link href="/" className="flex items-center gap-2 min-w-[100px] py-2" aria-label="Jerseymise Home">
              <Image src="/logo/JERSEYMISE_LOGO_WHITE_BG.svg" alt="Jerseymise mark" width={36} height={36} priority />
              <span className="font-bold tracking-wide"></span>
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
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const query = searchQuery.trim();
                        if (query) {
                          const params = new URLSearchParams();
                          params.set('q', query);
                          router.push(`/products?${params.toString()}`);
                          setShowSuggestions(false);
                        }
                      }}
                      className="relative"
                    >
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                      <Input 
                        placeholder="Search for products..." 
                        className="pl-10 pr-8" 
                        value={searchQuery}
                        onChange={(e) => {
                          console.log('Mobile search input changed:', e.target.value);
                          setSearchQuery(e.target.value);
                        }}
                        onFocus={() => {
                          if (searchSuggestions.length > 0) {
                            setShowSuggestions(true);
                          }
                        }}
                        onBlur={() => {
                          setTimeout(() => setShowSuggestions(false), 200);
                        }}
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery('');
                            setShowSuggestions(false);
                            router.push('/products');
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
                          aria-label="Clear search"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </form>
                    
                    {/* Mobile Search Suggestions */}
                    {showSuggestions && searchSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1">
                        {searchSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                            onClick={() => {
                              setSearchQuery(suggestion);
                              setShowSuggestions(false);
                              const params = new URLSearchParams();
                              params.set('q', suggestion);
                              router.push(`/products?${params.toString()}`);
                            }}
                          >
                            <div className="flex items-center">
                              <Search className="h-3 w-3 text-gray-400 mr-2" />
                              {suggestion}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <nav className="flex flex-col space-y-4">
                    {categories.map((category) => (
                      <Link href={`/products?category=${category.slug}`} key={category._id} className="text-lg font-medium">{category.name}</Link>
                    ))}
                    <Link href="/kitbuilder" className="text-lg">Kit Builder</Link>
                    <Link href="/products?category=sale" className="text-lg">Sale</Link>
                  </nav>
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <Button variant="ghost" className="justify-start">
                      <Heart className="h-5 w-5 mr-2 " />
                      Wishlist
                    </Button>
                    {!isLoading && !isAuthenticated && (
                      <div className="pt-4">
                        <AuthDialog />
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop links right aligned */}
          <nav className="md:flex items-center gap-6 text-xs text-primary ml-auto">
            <Link href="/find-us" className="hover:text-foreground transition-colors">Find Us</Link>
            <span className="text-muted-foreground/40">|</span>
            <Link href="/help" className="hover:text-foreground transition-colors">Help</Link>
            <span className="text-muted-foreground/40">|</span>
            <Link href="/join-us" className="hover:text-foreground transition-colors">Join Us</Link>
            <span className="text-muted-foreground/40">|</span>
         
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
                        <div className="text-sm font-medium group-hover:text-primary font-gotham">{sub.name}</div>
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
            <Link href="/kitbuilder" className="text-sm font-medium hover:text-primary transition-colors ">Kit Builder</Link>
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-4 relative">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const query = searchQuery.trim();
                if (query) {
                  const params = new URLSearchParams();
                  params.set('q', query);
                  router.push(`/products?${params.toString()}`);
                  setShowSuggestions(false);
                }
              }}
              className="relative flex items-center"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Input 
                placeholder="Search For The Product" 
                className="pl-10 pr-8"
                value={searchQuery}
                onChange={(e) => {
                  console.log('Desktop search input changed:', e.target.value);
                  setSearchQuery(e.target.value);
                }}
                onFocus={() => {
                  if (searchSuggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                onBlur={() => {
                  // Delay hiding suggestions to allow clicking on them
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setShowSuggestions(false);
                    router.push('/products');
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </form>
            
            {/* Search Suggestions */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowSuggestions(false);
                      const params = new URLSearchParams();
                      params.set('q', suggestion);
                      router.push(`/products?${params.toString()}`);
                    }}
                  >
                    <div className="flex items-center">
                      <Search className="h-3 w-3 text-gray-400 mr-2" />
                      {suggestion}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Profile / Wishlist */}
          <div className="flex items-center gap-2 ml-auto">
            {!isLoading && (isAuthenticated ? <UserMenu /> : <AuthDialog />)}
            <Link href="/wishlist">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            </Link>
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

      {/* Animated promo strip with seamless loop */}
      <div className="bg-black text-white py-2 overflow-hidden relative">
        <div className="whitespace-nowrap">
          <div className="inline-block animate-marquee">
            <span className="inline-block mx-8 text-sm font-gotham">🚚 Free Shipping on Orders Over ₹699</span>
            <span className="inline-block mx-8 text-sm font-gotham">✨ Hassle Free Returns & Exchanges</span>
            <span className="inline-block mx-8 text-sm font-gotham">💳 Secure Payment Options Available</span>
            <span className="inline-block mx-8 text-sm font-gotham">🎁 Special Offers for New Customers</span>
            {/* Duplicate content for seamless loop */}
            <span className="inline-block mx-8 text-sm font-gotham">🚚 Free Shipping on Orders Over ₹699</span>
            <span className="inline-block mx-8 text-sm font-gotham">✨ Hassle Free Returns & Exchanges</span>
            <span className="inline-block mx-8 text-sm font-gotham">💳 Secure Payment Options Available</span>
            <span className="inline-block mx-8 text-sm font-gotham">🎁 Special Offers for New Customers</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

    </header>
  )
}

