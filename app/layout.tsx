import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: "Jerseymise - Premium Sportswear & Equipment",
  description: "Premium sportswear and equipment designed for athletes who demand excellence",
  generator: "v0.app",
}

// Global Montserrat for body text
const montserrat = localFont({
  src: [
    { path: "../Montserrat/Montserrat-VariableFont_wght.ttf", weight: "100 900", style: "normal" },
    { path: "../Montserrat/Montserrat-Italic-VariableFont_wght.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-montserrat",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <head />
      
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
