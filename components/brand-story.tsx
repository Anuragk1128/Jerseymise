"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BrandStory() {
  return (
    <section className="relative py-16 sm:py-24">
      {/* subtle background accent */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/[0.03] to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Copy */}
          <div>
            <p className="text-xs tracking-widest text-muted-foreground mb-3">OUR JOURNEY</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Built for performance. Designed for passion.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Jerseymise was born from a simple belief: athletes deserve kit that works as hard as they do. From
              breathable fabrics to precision fits, every detail is crafted to elevate your game—on and off the field.
            </p>

            {/* Highlights */}
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="rounded-xl border border-black/10 bg-white p-4">
                <p className="font-semibold">Engineered Materials</p>
                <p className="text-sm text-muted-foreground">Lightweight, durable, game‑ready.</p>
              </li>
              <li className="rounded-xl border border-black/10 bg-white p-4">
                <p className="font-semibold">Athlete‑First Fit</p>
                <p className="text-sm text-muted-foreground">Tested by players, refined for comfort.</p>
              </li>
              <li className="rounded-xl border border-black/10 bg-white p-4">
                <p className="font-semibold">Sustainable Mindset</p>
                <p className="text-sm text-muted-foreground">Better choices for you and the planet.</p>
              </li>
              <li className="rounded-xl border border-black/10 bg-white p-4">
                <p className="font-semibold">Custom Teamwear</p>
                <p className="text-sm text-muted-foreground">Your identity, your colours, your kit.</p>
              </li>
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/about">Read our story</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/products">Shop collection</Link>
              </Button>
            </div>
          </div>

          {/* Visual / Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 aspect-[4/3] rounded-2xl bg-[url('/athletic-tank-front.png')] bg-cover bg-center border border-black/10" />
            <div className="rounded-2xl border border-black/10 bg-white p-6 text-center">
              <p className="text-4xl font-bold">250K+</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">Products Worn</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-6 text-center">
              <p className="text-4xl font-bold">5,000+</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">Teams Served</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}