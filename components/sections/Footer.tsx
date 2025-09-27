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
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="text-lg md:text-xl font-extrabold tracking-wide uppercase text-center md:text-left">
            Become a Member & Get 10% Off
          </h3>
          <Button className="bg-white text-black hover:bg-white/90">JOIN US</Button>
        </div>
      </div>

      {/* Links and newsletter */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-left">
            <h4 className="font-semibold mb-4">&nbsp;</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="font-semibold hover:underline">STOCKIST</Link></li>
              <li><Link href="#" className="font-semibold hover:underline">SEND US FEED BACK</Link></li>
              <li><Link href="#" className="font-semibold hover:underline">SIZE GUIDE</Link></li>
              <li><Link href="#" className="font-semibold hover:underline">CUSTOMISED TEAMWEAR</Link></li>
            </ul>
          </div>
          <div className="text-left">
            <h4 className="font-semibold mb-4">NEED HELP</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/return" className="hover:text-foreground">Delivery & Returns</Link></li>
              <li><Link href="#" className="hover:text-foreground">Payments Methods</Link></li>
              <li><Link href="#" className="hover:text-foreground">Passion Points</Link></li>
            </ul>
          </div>
          <div className="text-left">
            <h4 className="font-semibold mb-4">ABOUT JERSEYMISE</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/story" className="hover:text-foreground">About Story</Link></li>
              <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
              <li><Link href="/catalogue" className="hover:text-foreground">Catalogues</Link></li>
            </ul>
          </div>
          <div className="text-left">
            <h4 className="font-semibold mb-2">HEAR FROM US.</h4>
            <p className="text-sm text-muted-foreground mb-4">Register today for latest email updates!</p>
            <div className="flex gap-2 max-w-sm">
              <Input placeholder="Email Address" className="bg-white" />
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
            <span className="font-semibold tracking-wide">FOLLOW US</span>
            <a aria-label="Facebook" href="#" className="text-muted-foreground hover:text-foreground"><Facebook className="h-5 w-5"/></a>
            <a aria-label="Instagram" href="https://www.instagram.com/jerseymise?igsh=MW9sa2x5cHZ6MG9rOA==" className="text-muted-foreground hover:text-foreground" target="_blank"><Instagram className="h-5 w-5"/></a>
          
          </div>
        </div>
      </div>
    </footer>
  )
}
