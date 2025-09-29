"use client"

import { useEffect } from "react"

const reels = [
  "https://www.instagram.com/reel/DMPt8IyJk7t/",
  "https://www.instagram.com/reel/DMpkSSOJsSZ/",
  "https://www.instagram.com/reel/DMk-SjPpMZ3/",
]

export default function Media() {
  // Load Instagram embed script once
  useEffect(() => {
    const id = "instagram-embed-script"
    if (!document.getElementById(id)) {
      const s = document.createElement("script")
      s.id = id
      s.async = true
      s.src = "https://www.instagram.com/embed.js"
      s.onload = () => {
        try {
          (window as any).instgrm?.Embeds?.process?.()
        } catch {}
      }
      document.body.appendChild(s)
    } else if ((window as any).instgrm?.Embeds?.process) {
      // Re-process in case of client navigations
      ;(window as any).instgrm.Embeds.process()
    }
  }, [])

  return (
    <section className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 font-gotham">Media</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reels.map((url) => (
            <div key={url} className="w-full">
              {/* Aspect ratio wrapper for consistency */}
              <div className="relative w-full overflow-hidden rounded-lg border border-black/10" style={{ paddingTop: "125%" }}>
                <div className="absolute inset-0">
                  {/* Instagram official embed. Captions hidden by omitting captioned flag. */}
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={url}
                    data-instgrm-version="14"
                    // data-instgrm-captioned is omitted to avoid showing captions
                    style={{
                      background: "#fff",
                      border: 0,
                      margin: 0,
                      padding: 0,
                      width: "100%",
                      minWidth: 0,
                    }}
                  >
                    <a href={url} aria-label="Instagram reel" />
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-black-500 text-center mt-6">Do visit Our Instagram Page for more updates.</p>
      </div>
    </section>
  )
}