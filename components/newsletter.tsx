"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function Newsletter() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" })
      return
    }
    setLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setEmail("")
    toast({ title: "Subscribed!", description: "Thanks for joining our newsletter." })
  }

  return (
    <section className="relative py-16 sm:py-20">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/[0.04] to-transparent" />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Join our newsletter</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Be the first to know about new drops, exclusive offers, and behind‑the‑scenes stories.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              aria-label="Email address"
              required
            />
            <Button type="submit" className="h-12 px-6" disabled={loading}>
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}