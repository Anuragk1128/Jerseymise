import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram,  } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="bg-white text-foreground border-t">
      {/* CTA strip */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between items-center gap-4">
       
          <Button className="bg-white text-black hover:bg-white/90 justify-center" > 
          <a href="https://www.instagram.com/jerseymise/" target="_blank">JOIN US</a>
          </Button>
        </div>
        
      </div>

      {/* Links and newsletter */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-left">
            <ul className="space-y-4">
              <li><Link href="#" className="tracking-wide hover:underline">STOCKIST</Link></li>
              <li><Link href="#" className="tracking-wide hover:underline">SEND US FEED BACK</Link></li>
              <li><Link href="#" className="tracking-wide hover:underline">SIZE GUIDE</Link></li>
              <li><Link href="#" className="tracking-wide hover:underline">CUSTOMISED TEAMWEAR</Link></li>
            </ul>
          </div>
          <div className="text-left">
            <h4 className="tracking-wide mb-4">NEED HELP</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/return" className="hover:text-foreground">Delivery & Returns</Link></li>
              <li><Link href="/payments" className="hover:text-foreground">Payments Methods</Link></li>
              <li><Link href="/passion" className="hover:text-foreground">Passion Points</Link></li>
            </ul>
          </div>
          <div className="text-left">
            <h4 className="tracking-wide mb-4">ABOUT JERSEYMISE</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/story" className="hover:text-foreground">About Story</Link></li>
              <li><Link href="/careers" className="hover:text-foreground">Careers</Link></li>
              <li><Link href="/catalogue" className="hover:text-foreground">Catalogues</Link></li>
            </ul>
          </div>
          <div className="text-left">
            <h4 className="font-gotham tracking-wide mb-4">HEAR FROM US</h4>
            <p className="font-gotham text-sm text-muted-foreground mb-4">Register Today For Latest Email Updates!</p>
            <div className="flex gap-2 max-w-sm">
              <Input placeholder="Email Address" className="bg-white"/>
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo/JERSEYMISE_LOGO_BLACK_BG.svg" alt="Jerseymise mark" width={40} height={40} />
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold tracking-wide font-gotham">FOLLOW US</span>
            <a aria-label="Facebook" href="#" className="text-muted-foreground hover:text-foreground"><Facebook className="h-5 w-5"/></a>
            <a aria-label="Instagram" href="https://www.instagram.com/jerseymise?igsh=MW9sa2x5cHZ6MG9rOA==" className="text-muted-foreground hover:text-foreground" target="_blank"><Instagram className="h-5 w-5"/></a>
          
          </div>
        </div>
      </div>
    </footer>
  )
}
