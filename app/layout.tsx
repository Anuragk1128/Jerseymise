import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: "Jerseymise - Premium Sportswear & Equipment",
  description: "Premium sportswear and equipment designed for athletes who demand excellence",
  generator: "v0.app",
}

// Global Gotham for body text
const gotham = localFont({
  src: [
    // Normal styles (use OTFs with standard names)
    { path: "../gotham/Gotham Fonts Family/Gotham-Light.otf", weight: "300", style: "normal" },
    { path: "../gotham/Gotham Fonts Family/Gotham-Medium.otf", weight: "400", style: "normal" },
    { path: "../gotham/Gotham Fonts Family/Gotham-Medium.otf", weight: "500", style: "normal" },
    { path: "../gotham/Gotham Fonts Family/Gotham-Ultra.otf", weight: "700", style: "normal" },
    // Italic styles
    { path: "../gotham/Gotham Fonts Family/Gotham-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../gotham/Gotham Fonts Family/Gotham-MediumItalic.otf", weight: "400", style: "italic" },
    { path: "../gotham/Gotham Fonts Family/Gotham-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../gotham/Gotham Fonts Family/Gotham-UltraItalic.otf", weight: "700", style: "italic" },
  ],
  variable: "--font-gotham",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={gotham.className}>
      <head />
      
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
