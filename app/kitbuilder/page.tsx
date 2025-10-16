"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function KitBuilderPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    notes: "",
  })
  const [file, setFile] = useState<File | null>(null)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    // Basic validation
    if (!f.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image file.", variant: "destructive" })
      return
    }
    if (f.size > 8 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max size is 8MB.", variant: "destructive" })
      return
    }
    setFile(f)
    const url = URL.createObjectURL(f)
    setPreviewUrl(url)
  }

  const onChange = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      toast({ title: "Design image required", description: "Please upload your jersey design image.", variant: "destructive" })
      return
    }
    if (!form.name || !form.email || !form.address1 || !form.city || !form.state || !form.zip || !form.country) {
      toast({ title: "Missing details", description: "Please fill all required fields.", variant: "destructive" })
      return
    }
    setIsSubmitting(true)
    try {
      const data = new FormData()
      data.append("design", file)
      Object.entries(form).forEach(([k, v]) => data.append(k, v))

      const res = await fetch("/api/kitbuilder", { method: "POST", body: data })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Submission failed")

      toast({ title: "Design submitted", description: `Reference: ${json.reference}` })
      router.push("/")
    } catch (err: any) {
      toast({ title: "Failed to submit", description: err.message || String(err), variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Custom Jersey Kit Builder</h1>
            <p className="text-muted-foreground">Upload your desired design and share your shipping details. Well review and contact you.</p>
          </div>

          <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Design</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="design">Design Image (PNG/JPG, max 8MB)</Label>
                    <Input id="design" type="file" accept="image/*" onChange={onFileChange} />
                  </div>
                  {previewUrl && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                      <Image src={previewUrl} alt="Design preview" fill className="object-contain" />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Textarea id="notes" placeholder="Tell us about colors, names, numbers, fabric, sizes, quantities..." value={form.notes} onChange={(e) => onChange("notes", e.target.value)} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact & Shipping</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={form.name} onChange={(e) => onChange("name", e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => onChange("email", e.target.value)} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input id="phone" value={form.phone} onChange={(e) => onChange("phone", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address1">Address Line 1</Label>
                    <Input id="address1" value={form.address1} onChange={(e) => onChange("address1", e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="address2">Address Line 2 (optional)</Label>
                    <Input id="address2" value={form.address2} onChange={(e) => onChange("address2", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" value={form.city} onChange={(e) => onChange("city", e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Input id="state" value={form.state} onChange={(e) => onChange("state", e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP/Postal Code</Label>
                      <Input id="zip" value={form.zip} onChange={(e) => onChange("zip", e.target.value)} required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" value={form.country} onChange={(e) => onChange("country", e.target.value)} required />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button type="submit" size="lg" disabled={isSubmitting || !file} className="flex-1">
                  {isSubmitting ? "Submitting..." : "Payment"}
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>How it works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>1. Upload your design image and fill in your details.</p>
                  <p>2. Our team reviews feasibility, sizing, and pricing.</p>
                  <p>3. We contact you to confirm specs and payment.</p>
                  <p>4. We produce and ship to your address.</p>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </div>
      <FooterSection/>
    </div>
  )
}
